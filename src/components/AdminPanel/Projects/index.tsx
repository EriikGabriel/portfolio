import { useEffect, useState } from "react";

import Button from "@packages/react/Button/Button";
import IconButton from "@packages/react/Button/IconButton";
import Heading from "@packages/react/Heading/Heading";

import { Card } from "./Card";
import { ProjectModal } from "./ProjectModal";
import { PlusCircle } from "react-feather";
import { ProjectResponse } from "src/pages/api/admin/projects";

import { Container } from "./styles";

import axios from "axios";

export type ProjectType = {
  _id: string;
} & ProjectResponse;

export const Projects: React.FC = () => {
  const [projects, setProjects] = useState<ProjectType[]>([]);

  useEffect(() => {
    axios
      .get("/api/admin/projects")
      .then(res => setProjects(res.data))
      .catch(err => {
        throw new Error(`Ocorreu um erro: ${err}`);
      });
  }, []);

  return (
    <Container>
      <div>
        <Heading>Projetos</Heading>
        <ProjectModal>
          <Button leftIcon={<PlusCircle />}>Adicionar Projeto</Button>
        </ProjectModal>
      </div>

      <div>
        {projects.length !== 0 &&
          projects.map(({ cover, name, tags, githubUrl, deployUrl, _id }) => (
            <Card
              imageSrc={cover.path}
              githubUrl={githubUrl}
              deployUrl={deployUrl}
              tags={tags}
              key={_id}
            >
              {name}
            </Card>
          ))}

        <ProjectModal>
          <IconButton variant="tertiary" size="lg">
            <PlusCircle size={80} />
          </IconButton>
        </ProjectModal>
      </div>
    </Container>
  );
};
