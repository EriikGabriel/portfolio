import IconButton from "@packages/react/Button/IconButton";
import Heading from "@packages/react/Heading/Heading";
import Text from "@packages/react/Text/Text";

import { Eye, GitHub } from "react-feather";

import { Container } from "./styles";

export const ProjectsOverview: React.FC = () => {
  return (
    <Container>
      <Heading size="sm">Projetos</Heading>
      <div>
        <div>
          <Text size="lg">Do it!</Text>
          <Text size="sm">Aplicativo Web - React</Text>
        </div>
        <div>
          <IconButton variant="tertiary">
            <GitHub />
          </IconButton>
          <IconButton variant="tertiary">
            <Eye />
          </IconButton>
        </div>
      </div>
      <div>
        <div>
          <Text size="lg">Can Learn!</Text>
          <Text size="sm">Aplicativo Web - React</Text>
        </div>
        <div>
          <IconButton variant="tertiary">
            <GitHub />
          </IconButton>
          <IconButton variant="tertiary">
            <Eye />
          </IconButton>
        </div>
      </div>
      <div>
        <a href="#projects">Ver mais outros 10 projetos...</a>
      </div>
    </Container>
  );
};
