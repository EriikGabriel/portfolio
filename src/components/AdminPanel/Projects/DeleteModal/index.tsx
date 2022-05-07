import { ReactNode } from "react";

import Button from "@packages/react/Button/Button";
import Heading from "@packages/react/Heading/Heading";
import Text from "@packages/react/Text/Text";

import axios from "axios";

import {
  Container,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogTrigger,
} from "./styles";

type DeleteModalProps = {
  children: ReactNode;
  projectInfo: {
    id: string;
    name: string;
  };
};

export const DeleteModal: React.FC<DeleteModalProps> = ({
  children,
  projectInfo,
}) => {
  function handleDeleteProject() {
    axios
      .delete(`/api/admin/projects/${projectInfo.id}`)
      .then(res => {
        location.reload();
      })
      .catch(err => {
        throw new Error(`Ocorreu um erro: ${err}`);
      });
  }

  return (
    <Container>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogOverlay>
        <DialogContent>
          <Heading size="sm">Deletar projeto</Heading>
          <Text>
            Deseja realmente deletar o projeto{" "}
            <strong>"{projectInfo.name}"</strong>
            ?
            <br />
            <span>Esta ação não poderá ser desfeita!!</span>
          </Text>
          <div>
            <Button onClick={handleDeleteProject}>Deletar</Button>
            <DialogClose asChild>
              <Button aria-label="Close" variant="primary" outlined>
                Cancelar
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </DialogOverlay>
    </Container>
  );
};
