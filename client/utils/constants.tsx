import * as Yup from "yup";

import { PersonIcon, BookIcon, BranchIcon } from "./icons";
import { InputProps } from "./interfaces";

export const wrapperClassName: string = "flex flex-col mb-8";
export const inputClassName: string =
  "text-lg py-2 w-full px-4 text-lg rounded-lg border-2 border-opacity-40 focus:border-opacity-100 mt-1 bg-white";
export const inputClassNameError: string = "border-red-500 border-opacity-100";
export const labelClassName: string = "font-medium";
export const descriptionClass: string = "text-sm font-medium text-right mt-1";

export const colors: string[] = [
  "base-black",
  "base-green",
  "base-smoke",
  "base-blue",
  "base-teal",
];

export const newMaintainerInputs: {
  section: string;
  description: string;
  icon: JSX.Element;
  inputs: InputProps[];
}[] = [
  {
    section: "Personal",
    icon: <PersonIcon />,
    description:
      "Ipsum id ullamco ipsum qui voluptate esse ad excepteur dolore commodo.",
    inputs: [
      {
        id: "name",
        label: "Name",
        type: "text",
        placeholder: "GithubSRM",
        required: true,
      },
      {
        id: "email",
        label: "Email",
        type: "email",
        placeholder: "johndoe@mail.com",
        required: true,
      },
      {
        id: "github_id",
        label: "Github Id",
        type: "text",
        placeholder: "srm-ist-ktr",
        required: true,
      },
    ],
  },
  {
    section: "SRM Details",
    icon: <BookIcon />,
    description: "Nostrud id officia dolor Lorem mollit aute consectetur est.",
    inputs: [
      {
        id: "srm_email",
        label: "SRM Email",
        type: "email",
        placeholder: "gs123@srmist.edu.in",
        required: true,
      },
      {
        id: "reg_number",
        label: "Registration Number or Employee ID",
        type: "text",
        placeholder: "RAXXXXXXXXXXXXX",
        required: true,
      },
      {
        id: "branch",
        label: "Branch",
        type: "text",
        placeholder: "CSE-BD",
        required: true,
      },
    ],
  },
  {
    section: "Projects",
    icon: <BranchIcon />,
    description:
      "Incididunt aute quis culpa aute in dolor aliqua laboris commodo exercitation laboris.",
    inputs: [
      {
        id: "project_name",
        label: "Project Name",
        type: "text",
        placeholder: "GitHubSRM",
        required: true,
      },
      {
        id: "project_url",
        label: "Public Project GitHub URL",
        type: "text",
        placeholder: "https://github.com/SRM-IST-KTR/githubsrm",
        description: {
          content:
            "If an existing project, please give its Public Project GitHub URL! ",
          class: descriptionClass,
        },
        required: true,
      },
      {
        id: "tags",
        label: "Project Tags",
        type: "text",
        placeholder: "ReactJS, TailwindCSS, Django",
        description: {
          content: "2-4 Comma separated values please!",
          class: descriptionClass,
        },
        required: true,
      },
      {
        id: "description",
        label: "Project Description",
        type: "textarea",
        placeholder: "Your project description",
        textareaOptions: { rows: 4, cols: 30 },
      },
    ],
  },
];

export const newMaintainerValidation = Yup.object().shape({
  name: Yup.string().trim().required("**Name**: Missing"),
  email: Yup.string()
    .trim()
    .required("**Email**: Missing")
    .email("**Email**: Invalid"),
  github_id: Yup.string().trim().required("**GitHub ID**: Missing"),
  srm_email: Yup.string()
    .trim()
    .required("**SRM Email ID**: Missing")
    .test("test-srm-email", "**SRM Email ID**: Invalid", (value) =>
      value?.endsWith("@srmist.edu.in")
    ),
  reg_number: Yup.string().trim().required("**Registration Number**: Missing"),
  branch: Yup.string().trim().required("**Branch**: Missing"),
  project_name: Yup.string().trim().required("**Project URL**: Missing"),
  project_url: Yup.string().trim().url("**Project URL**: Invalid"),
  tags: Yup.string()
    .trim()
    .required("**Tags:** Missing")
    .test(
      "test-tags",
      "**Tags**: Invalid Quantity",
      (value) =>
        value?.split(",").filter((i) => i.trim().length > 0).length >= 2 &&
        value?.split(",").filter((i) => i.trim().length > 0).length <= 4
    ),
  description: Yup.string()
    .trim()
    .required("**Feature or Bugfix:** Missing")
    .min(30, "**Feature or Bugfix:** Too small"),
});

export const existingMaintainerInputs: {
  section: string;
  description: string;
  icon: JSX.Element;
  inputs: InputProps[];
}[] = [
  {
    section: "Personal",
    icon: <PersonIcon />,
    description:
      "Ipsum id ullamco ipsum qui voluptate esse ad excepteur dolore commodo.",
    inputs: [
      {
        id: "name",
        label: "Name",
        type: "text",
        placeholder: "GithubSRM",
        required: true,
      },
      {
        id: "email",
        label: "Email",
        type: "email",
        placeholder: "johndoe@mail.com",
        required: true,
      },
      {
        id: "github_id",
        label: "Github Id",
        type: "text",
        placeholder: "srm-ist-ktr",
        required: true,
      },
    ],
  },
  {
    section: "SRM Details",
    icon: <BookIcon />,
    description: "Nostrud id officia dolor Lorem mollit aute consectetur est.",
    inputs: [
      {
        id: "srm_email",
        label: "SRM Email",
        type: "email",
        placeholder: "gs123@srmist.edu.in",
        required: true,
      },
      {
        id: "reg_number",
        label: "Registration Number or Employee ID",
        type: "text",
        placeholder: "RAXXXXXXXXXXXXX",
        required: true,
      },
      {
        id: "branch",
        label: "Branch",
        type: "text",
        placeholder: "CSE-BD",
        required: true,
      },
    ],
  },
  {
    section: "Projects",
    icon: <BranchIcon />,
    description:
      "Incididunt aute quis culpa aute in dolor aliqua laboris commodo exercitation laboris.",
    inputs: [
      {
        id: "project_id",
        label: "Project ID",
        type: "text",
        placeholder: "GitHubSRM",
        required: true,
      },
    ],
  },
];

export const existingMaintainerValidation = Yup.object().shape({
  name: Yup.string().trim().required("**Name**: Missing"),
  email: Yup.string()
    .trim()
    .required("**Email**: Missing")
    .email("**Email**: Invalid"),
  github_id: Yup.string().trim().required("**GitHub ID**: Missing"),
  srm_email: Yup.string()
    .trim()
    .required("**SRM Email ID**: Missing")
    .test("test-srm-email", "**SRM Email ID**: Invalid", (value) =>
      value?.endsWith("@srmist.edu.in")
    ),
  reg_number: Yup.string().trim().required("**Registration Number**: Missing"),
  branch: Yup.string().trim().required("**Branch**: Missing"),
  project_id: Yup.string().trim().required("**Project ID**: Missing"),
});

export const contributorInputs: {
  section: string;
  description: string;
  icon: JSX.Element;
  inputs: InputProps[];
}[] = [
  {
    section: "Personal",
    icon: <PersonIcon />,
    description:
      "Ipsum id ullamco ipsum qui voluptate esse ad excepteur dolore commodo.",
    inputs: [
      {
        id: "name",
        label: "Name",
        type: "text",
        placeholder: "GithubSRM",
        required: true,
      },
      {
        id: "email",
        label: "Email",
        type: "email",
        placeholder: "johndoe@mail.com",
        required: true,
      },
      {
        id: "github_id",
        label: "Github Id",
        type: "text",
        placeholder: "srm-ist-ktr",
        required: true,
      },
    ],
  },
  {
    section: "SRM Details",
    icon: <BookIcon />,
    description: "Nostrud id officia dolor Lorem mollit aute consectetur est.",
    inputs: [
      {
        id: "srm_email",
        label: "SRM Email",
        type: "email",
        placeholder: "gs123@srmist.edu.in",
        required: true,
      },
      {
        id: "reg_number",
        label: "Registration Number or Employee ID",
        type: "text",
        placeholder: "RAXXXXXXXXXXXXX",
        required: true,
      },
      {
        id: "branch",
        label: "Branch",
        type: "text",
        placeholder: "CSE-BD",
        required: true,
      },
    ],
  },
  {
    section: "Projects",
    icon: <BranchIcon />,
    description:
      "Incididunt aute quis culpa aute in dolor aliqua laboris commodo exercitation laboris.",
    inputs: [
      {
        id: "interested_project",
        label: "Project ID",
        type: "text",
        placeholder: "Select your preferred project!",
        description: {
          content:
            "Please provide the Project ID given to you by your Maintainer / found on the Projects Page",
          class: descriptionClass,
        },
        required: true,
      },
      {
        id: "poa",
        label: "Feature or Bugfix",
        type: "textarea",
        placeholder: "Your project proposal",
        textareaOptions: { rows: 4, cols: 30 },
      },
    ],
  },
];

export const contributorValidation = Yup.object().shape({
  name: Yup.string().trim().required("**Name**: Missing"),
  email: Yup.string()
    .trim()
    .required("**Email**: Missing")
    .email("**Email**: Invalid"),
  github_id: Yup.string().trim().required("**GitHub ID**: Missing"),
  srm_email: Yup.string()
    .trim()
    .required("**SRM Email ID**: Missing")
    .test("test-srm-email", "**SRM Email ID**: Invalid", (value) =>
      value?.endsWith("@srmist.edu.in")
    ),
  reg_number: Yup.string().trim().required("**Registration Number**: Missing"),
  branch: Yup.string().trim().required("**Branch**: Missing"),
  interested_project: Yup.string()
    .trim()
    .required("**Project ID**: Missing")
    .test("test-srm-email", "**Project ID**: Invalid", async (value) => true),
  poa: Yup.string().trim(),
});
