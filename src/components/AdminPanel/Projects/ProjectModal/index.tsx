import { FormEvent, ReactNode, useState } from "react";

import Button from "@packages/react/Button/Button";
import Heading from "@packages/react/Heading/Heading";
import Text from "@packages/react/Text/Text";
import IconButton from "@packages/react/Button/IconButton";
import Tag from "@packages/react/Tag/Tag";

import Image from "next/image";
import axios from "axios";

import { useDropzone } from "react-dropzone";
import { Edit2, Image as ImageIcon, XCircle } from "react-feather";
import {
  Container,
  DialogClose,
  DialogContent,
  DialogForm,
  DialogOverlay,
  DialogTrigger,
} from "./styles";

type ProjectModalProps = {
  children: ReactNode;
  editId?: string;
};

type CoverType = {
  file: File;
  preview: string;
};

export const ProjectModal: React.FC<ProjectModalProps> = ({
  children,
  editId,
}) => {
  const [cover, setCover] = useState<CoverType>();
  const [name, setName] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [githubUrl, setGithubUrl] = useState("");
  const [deployUrl, setDeployUrl] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    multiple: false,
    accept: {
      "image/*": [],
    },
    onDropAccepted: acceptedFiles => {
      console.log(acceptedFiles);
      setCover({
        file: acceptedFiles[0],
        preview: URL.createObjectURL(acceptedFiles[0]),
      });
    },
  });

  function handleGetEditFormData() {
    axios
      .get(`/api/admin/projects/${editId}`)
      .then(res => {
        setCover({
          file: res.data.cover.file,
          preview: `/tmp/uploads/${res.data.cover.fileName}`,
        });
        setName(res.data.name);
        setTags(res.data.tags);
        setGithubUrl(res.data.githubUrl);
        setDeployUrl(res.data.deployUrl);
      })
      .catch(err => {
        throw new Error(`Ocorreu um erro: ${err}`);
      });
  }

  function handleAddProject(e: FormEvent) {
    e.preventDefault();
    if (cover?.file) {
      const data = new FormData();

      console.log(cover.file);

      data.append("cover", cover.file, cover.file.name);
      data.append("name", name);
      data.append("tags", JSON.stringify(tags));
      data.append("githubUrl", githubUrl);
      data.append("deployUrl", deployUrl);

      axios
        .post("/api/admin/projects", data)
        .then(res => {
          location.reload();
        })
        .catch(err => {
          throw new Error(`Ocorreu um erro: ${err}`);
        });
    }
  }

  function handleEditProject(e: FormEvent) {
    e.preventDefault();
    if (cover?.file) {
      const data = new FormData();

      if (acceptedFiles.length !== 0) {
        data.append("cover", cover.file, cover.file.name);
      }
      data.append("name", name);
      data.append("tags", JSON.stringify(tags));
      data.append("githubUrl", githubUrl);
      data.append("deployUrl", deployUrl);

      axios
        .patch(`/api/admin/projects/${editId}`, data)
        .then(res => {
          location.reload();
        })
        .catch(err => {
          throw new Error(`Ocorreu um erro: ${err}`);
        });
    }
  }

  return (
    <Container
      open={openModal}
      onOpenChange={open => {
        setOpenModal(!openModal);

        if (open && editId) handleGetEditFormData();

        if (!open) {
          setCover(undefined);
          setTags([]);
        }
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogOverlay>
        <DialogContent>
          <Heading size="sm">{editId ? "Editar" : "Adicionar"} projeto</Heading>
          <DialogForm onSubmit={editId ? handleEditProject : handleAddProject}>
            <fieldset>
              <label htmlFor="dndCover">Cover</label>
              {cover && (
                <IconButton
                  variant="tertiary"
                  size="sm"
                  onClick={() => setCover(undefined)}
                >
                  <XCircle />
                </IconButton>
              )}
              <div id="dndCover" {...getRootProps()}>
                <input {...getInputProps()} />
                {cover ? (
                  <>
                    <Edit2 />
                    <Image
                      src={cover.preview}
                      onLoad={() => URL.revokeObjectURL(cover.preview)}
                      layout="fill"
                    />
                  </>
                ) : (
                  <>
                    <ImageIcon size={30} />
                    <Text>Solte a imagem aqui, ou clique para buscar</Text>
                    <Text size="sm">Suporta: JPG, PNG...</Text>
                  </>
                )}
              </div>
            </fieldset>
            <fieldset>
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                id="name"
                placeholder="Digite o nome"
                autoComplete="off"
                onChange={e => setName(e.target.value)}
                value={name}
                required
              />
            </fieldset>
            <fieldset>
              <label htmlFor="tags">
                Tags -{" "}
                <small>Separe as tags por vírgula (Ex: React, Mobile)</small>
              </label>
              <input
                type="text"
                id="tags"
                placeholder="Digite o nome"
                autoComplete="off"
                spellCheck="false"
                onChange={e => {
                  setTags(e.target.value.replace(/,\s*/g, ",").split(","));
                }}
                value={tags}
                required
              />
              <div>
                {tags &&
                  tags[0] !== "" &&
                  tags.map((tag, index) => <Tag key={index}>{tag}</Tag>)}
              </div>
            </fieldset>
            <fieldset>
              <div>
                <label htmlFor="github-url">URL do Github</label>
                <input
                  type="url"
                  id="github-url"
                  placeholder="Digite a URL do repositório"
                  autoComplete="off"
                  onChange={e => setGithubUrl(e.target.value)}
                  value={githubUrl}
                />
              </div>
              <div>
                <label htmlFor="deploy-url">URL do Deploy</label>
                <input
                  type="url"
                  id="deploy-url"
                  placeholder="Digite a URL do deploy"
                  autoComplete="off"
                  onChange={e => setDeployUrl(e.target.value)}
                  value={deployUrl}
                />
              </div>
            </fieldset>

            <div>
              <Button type="submit">{editId ? "Concluir" : "Adicionar"}</Button>
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
