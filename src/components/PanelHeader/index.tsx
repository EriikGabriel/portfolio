import IconButton from "@packages/react/Button/IconButton";
import { User } from "react-feather";
import { DropdownMenu } from "../Menu/DropdownMenu";
import { Container } from "./styles";

export const PanelHeader: React.FC = () => {
  return (
    <Container>
      <DropdownMenu>
        <IconButton
          variant="tertiary"
          aria-label="Opções de perfil do usuário: Sair"
        >
          <div>
            <div>
              <User />
            </div>
            ErikGabriel
          </div>
        </IconButton>
      </DropdownMenu>
    </Container>
  );
};
