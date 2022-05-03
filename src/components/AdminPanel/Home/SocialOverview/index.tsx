import Heading from "@packages/react/Heading/Heading";
import Text from "@packages/react/Text/Text";

import { GitHub, Instagram, Linkedin, Twitter } from "react-feather";

import { Container } from "./styles";

export const SocialOverview: React.FC = () => {
  return (
    <Container>
      <Heading size="sm">Redes Sociais</Heading>
      <div>
        <div>
          <GitHub />
          <div>
            <Text size="lg">Erik Gabriel</Text>
            <Text size="sm">@Erik_Gabriel</Text>
            <Text size="sm">Seguindo: 10000 </Text>
            <Text size="sm">Seguidores: 9.200 </Text>
          </div>
        </div>
        <div>
          <Instagram />
          <div>
            <Text size="lg">Erik Gabriel</Text>
            <Text size="sm">@Erik_Gabriel</Text>
            <Text size="sm">Seguindo: 10000 </Text>
            <Text size="sm">Seguidores: 9.200 </Text>
          </div>
        </div>
      </div>
      <div>
        <div>
          <Twitter />
          <div>
            <Text size="lg">Erik Gabriel</Text>
            <Text size="sm">@Erik_Gabriel</Text>
            <Text size="sm">Seguindo: 10000 </Text>
            <Text size="sm">Seguidores: 9.200 </Text>
          </div>
        </div>
        <div>
          <Linkedin />
          <div>
            <Text size="lg">Erik Gabriel</Text>
            <Text size="sm">@Erik_Gabriel</Text>
            <Text size="sm">Seguindo: 10000 </Text>
            <Text size="sm">Seguidores: 9.200 </Text>
          </div>
        </div>
      </div>
    </Container>
  );
};
