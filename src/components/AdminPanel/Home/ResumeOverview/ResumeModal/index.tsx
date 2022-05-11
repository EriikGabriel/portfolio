import { FormEvent, ReactNode, useState } from "react";

import Heading from "@packages/react/Heading/Heading";

import {
  Container,
  DialogClose,
  DialogContent,
  DialogForm,
  DialogOverlay,
  DialogTrigger,
} from "./styles";
import IconButton from "@packages/react/Button/IconButton";
import Button from "@packages/react/Button/Button";
import axios from "axios";

type ResumeModalProps = {
  children: ReactNode;
};

export const ResumeModal: React.FC<ResumeModalProps> = ({ children }) => {
  const [resume, setResume] = useState<File>();

  function handleEditResume(e: FormEvent) {
    e.preventDefault();

    const data = new FormData();

    data.append("file", resume ?? "", resume?.name);

    axios
      .patch("/api/admin/resume", data)
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
          <Heading size="sm">Editar Currículo</Heading>
          <DialogForm onSubmit={handleEditResume}>
            <fieldset>
              <label htmlFor="resume">Currículo</label>
              <input
                type="file"
                id="resume"
                accept=".pdf"
                onChange={e => {
                  const filesInput = e.target.files ?? [];
                  if (filesInput.length > 0) setResume(filesInput[0]);
                }}
                required
              />
            </fieldset>

            <div>
              <Button type="submit">Concluir</Button>
              <DialogClose asChild>
                <Button aria-label="Close" variant="primary" outlined>
                  Cancelar
                </Button>
              </DialogClose>
            </div>
          </DialogForm>
        </DialogContent>
      </DialogOverlay>
    </Container>
  );
};
