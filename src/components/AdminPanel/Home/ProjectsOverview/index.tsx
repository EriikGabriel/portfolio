import { useEffect, useState } from "react";

import IconButton from "@packages/react/Button/IconButton";
import Heading from "@packages/react/Heading/Heading";
import Text from "@packages/react/Text/Text";

import { ProjectType } from "@utils/types/projects";

import { Eye, GitHub } from "react-feather";
import axios from "axios";

import { Container } from "./styles";

export const ProjectsOverview: React.FC = () => {
  const [projects, setProjects] = useState<ProjectType[]>([]);

  useEffect(() => {
    axios
      .get("/api/admin/projects")
      .then(res => {
        setProjects(res.data);
      })
      .catch(err => {
        throw new Error(`Ocorreu um erro: ${err}`);
      });
  }, []);

  return (
    <Container>
      <Heading size="sm">Projetos</Heading>
      {projects.length !== 0 ? (
        projects.map(({ _id, name, tags, githubUrl, deployUrl }, index) => {
          if (index < 2) {
            return (
              <div key={_id}>
                <div>
                  <Text size="lg">{name}</Text>
                  <Text size="sm">{tags.join(" - ")}</Text>
                </div>
                <div>
                  {githubUrl && (
                    <IconButton
                      variant="tertiary"
                      onClick={() => (location.href = githubUrl)}
                    >
                      <GitHub />
                    </IconButton>
                  )}
                  {deployUrl && (
                    <IconButton
                      variant="tertiary"
                      onClick={() => (location.href = deployUrl)}
                    >
                      <Eye />
                    </IconButton>
                  )}
                </div>
              </div>
            );
          }
        })
      ) : (
        <Text>Sem projetos para exibir...</Text>
      )}

      {projects.length > 2 && (
        <div>
          <a href="#projects">
            Ver mais outros {projects.length - 2} projetos...
          </a>
        </div>
      )}
    </Container>
  );
};
