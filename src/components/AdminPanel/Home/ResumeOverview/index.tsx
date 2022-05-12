import { useEffect, useState } from "react";

import IconButton from "@packages/react/Button/IconButton";
import Heading from "@packages/react/Heading/Heading";
import Text from "@packages/react/Text/Text";

import { Edit, Eye, FileText } from "react-feather";
import { ResumeModal } from "./ResumeModal";
import { File } from "formidable";

import axios from "axios";

import { Container } from "./styles";

export const ResumeOverview: React.FC = () => {
  const [resume, setResume] = useState<File>();

  useEffect(() => {
    axios
      .get("/api/admin/resume")
      .then(res => setResume(res.data.file))
      .catch(err => {
        throw new Error(`Ocorreu um erro: ${err}`);
      });
  }, []);

  return (
    <Container>
      <Heading size="sm">Currículo</Heading>
      <div>
        <div>
          <FileText size={30} />
          <Text>{resume?.newFilename}</Text>
        </div>
        <div>
          <IconButton
            variant="tertiary"
            onClick={() => window.open("/resume.pdf", "_blank")}
          >
            <Eye />
          </IconButton>
          <ResumeModal>
            <IconButton variant="tertiary">
              <Edit />
            </IconButton>
          </ResumeModal>
        </div>
      </div>
    </Container>
  );
};
