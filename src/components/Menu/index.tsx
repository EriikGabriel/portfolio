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
          <Button
            variant="tertiary"
            leftIcon={<Home />}
            onClick={() => {
              location.href = "#home";
              location.reload();
            }}
          >
            Home
          </Button>
          <IconButton
            variant="tertiary"
            onClick={() => {
              location.href = "#home";
              location.reload();
            }}
          >
            <Home />
          </IconButton>
        </li>
        <li>
          <Button
            variant="tertiary"
            leftIcon={<Box />}
            onClick={() => {
              location.href = "#projects";
              location.reload();
            }}
          >
            Projetos
          </Button>
          <IconButton
            variant="tertiary"
            onClick={() => {
              location.href = "#projects";
              location.reload();
            }}
          >
            <Box />
          </IconButton>
        </li>
        <li>
          <Button
            variant="tertiary"
            leftIcon={<Smartphone />}
            onClick={() => {
              location.href = "#social";
              location.reload();
            }}
          >
            Social
          </Button>
          <IconButton
            variant="tertiary"
            onClick={() => {
              location.href = "#social";
              location.reload();
            }}
          >
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
