import { Container } from "./styles";

import LogoSvg from "../../assets/icons/logo.svg";
import Text from "@packages/react/Text/Text";

export const Footer: React.FC = () => {
  return (
    <Container>
      <div>
        <LogoSvg />
      </div>
      <Text>Erik Gabriel &copy; 2022</Text>
    </Container>
  );
};
