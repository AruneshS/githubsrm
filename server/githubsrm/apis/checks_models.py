import pymongo
from django.conf import settings
from typing import Dict, Any


class EntryCheck:
    def __init__(self) -> None:
        client = pymongo.MongoClient(settings.DATABASE['mongo_uri'])
        self.db = client[settings.DATABASE['db']]

    def check_existing(self, description: str, project_name: str, project_url: str) -> bool:
        """Checks existing project proposals

        Args:
            description (str)
            project_name (str)
            project_url (str)

        Returns:
            bool:
        """

        checks = [{"project_name": project_name}, {"description": description}]
        if project_url != "":
            checks.append({"project_url": project_url})

        result = self.db.project.find_one({"$or": checks})

        if result:
            return True

    def check_approved_project(self, identifier: str) -> bool:
        """Checks if given identifier is valid and approved status

        Args:
            identifier (str): project_id

        Returns:
            bool
        """
        result = self.db.project.find_one({"_id": identifier})

        if result:
            if not result["is_admin_approved"]:
                return result
        return

    def check_contributor(self, interested_project: str,
                          reg_number: str, github_id: str,
                          srm_email: str) -> bool:
        """Existing contributor to same project

        Args:
            interested_project (str): Project ID
            reg_number (str): Contributor Registration Number

        Returns:
            bool
        """

        result = self.db.project.find_one({"_id": interested_project})

        try:
            if not result['is_admin_approved']:
                return True
        except Exception as e:
            return True

        result = self.db.contributor.find_one({"$and": [
            {"interested_project": interested_project},
            {"$or": [{"reg_number": reg_number},
                     {"github_id": github_id}, {"srm_email": srm_email}]
             }]})

        results = self.db.maintainer.find_one({
            "$and": [
                {"project_id": interested_project},
                {"$or": [{"reg_number": reg_number},
                         {"github_id": github_id}, {"srm_email": srm_email}]}
            ]
        })

        if results:
            return True

        if result:
            return True

        return

    def check_existing_beta(self, github_id: str, project_id: str, srm_email: str) -> bool:
        """Checks for existing beta maintainer

        Args:
            github_id (str): beta github ID
            project_id (str): project ID
        Returns:
            bool
        """

        result = self.db.maintainer.count_documents({
            "project_id": project_id,
            "$or": [
                {"github_id": github_id}, {"srm_email": srm_email}
            ]
        })

        if result >= 1:
            return True

        return False

    def validate_beta_maintainer(self, doc: Dict[str, Any]) -> Any:
        """Checks for valid beta maintainer

        Args:
            doc (Dict[str, Any]): beta maintainer data

        Returns:
            Any: Returns document if checks pass
        """
        if self.check_existing_beta(github_id=doc.get("github_id"), project_id=doc.get("project_id"),
                                    srm_email=doc.get("srm_email")):
            return None

        if details := self.check_approved_project(identifier=doc.get("project_id")):
            return details

        else:
            return None