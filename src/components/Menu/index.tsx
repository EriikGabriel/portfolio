import Button from "@packages/react/Button/Button";
import IconButton from "@packages/react/Button/IconButton";

import LogoSvg from "../../assets/icons/logo.svg";

import { Box, Home, Smartphone, User } from "react-feather";
import { Container } from "./styles";
import { DropdownMenu } from "./DropdownMenu";

export const Menu: React.FC = () => {
  return (
    <Container>
      <div>
        <LogoSvg />
      </div>
      <ul>
        <li>
          <Button variant="tertiary" leftIcon={<Home />}>
            Home
          </Button>
          <IconButton variant="tertiary">
            <Home />
          </IconButton>
        </li>
        <li>
          <Button variant="tertiary" leftIcon={<Box />}>
            Projetos
          </Button>
          <IconButton variant="tertiary">
            <Box />
          </IconButton>
        </li>
        <li>
          <Button variant="tertiary" leftIcon={<Smartphone />}>
            Social
          </Button>
          <IconButton variant="tertiary">
            <Smartphone />
          </IconButton>
        </li>
        <li>
          <DropdownMenu>
            <IconButton
              variant="tertiary"
              aria-label="Opções de perfil do usuário: Sair"
            >
              <div>
                <User />
              </div>
            </IconButton>
          </DropdownMenu>
        </li>
      </ul>
    </Container>
  );
};
