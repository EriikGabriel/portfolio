import { File } from "formidable";

export type FormDataFields = {
  name: string;
  tags: string;
  githubUrl: string;
  deployUrl: string;
};

export type ProjectResponse = {
  cover:
    | {
        file: File;
        path: string;
        fileName: string;
      }
    | undefined;
  name: string;
  tags: string[];
  githubUrl: string;
  deployUrl: string;
};

export type ProjectType = {
  _id: string;
} & ProjectResponse;
