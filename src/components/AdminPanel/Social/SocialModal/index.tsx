import { FormEvent, ReactNode, useState } from "react";

import Button from "@packages/react/Button/Button";
import IconButton from "@packages/react/Button/IconButton";
import Heading from "@packages/react/Heading/Heading";

import axios from "axios";
import Image from "next/image";

import {
  Container,
  DialogClose,
  DialogContent,
  DialogForm,
  DialogOverlay,
  DialogTrigger,
} from "./styles";

type SocialModalProps = {
  children: ReactNode;
  editId: string;
};

export const SocialModal: React.FC<SocialModalProps> = ({
  children,
  editId,
}) => {
  const [profileImage, setProfileImage] = useState("");
  const [social, setSocial] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [following, setFollowing] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  function handleGetEditFormData() {
    axios
      .get(`/api/admin/socials/${editId}`)
      .then(res => {
        setProfileImage(res.data.profileImage);
        setSocial(res.data.social);
        setName(res.data.name);
        setUsername(res.data.username);
        setDescription(res.data.description);
        setFollowing(res.data.following);
        setFollowers(res.data.followers);
      })
      .catch(err => {
        throw new Error(`Ocorreu um erro: ${err}`);
      });
  }

  function handleEditSocial(e: FormEvent) {
    e.preventDefault();

    const data = {
      name,
      username,
      description,
      following,
      followers,
    };

    axios
      .patch(`/api/admin/socials/${editId}`, data)
      .then(res => {
        location.reload();
      })
      .catch(err => {
        throw new Error(`Ocorreu um erro: ${err}`);
      });
  }

  return (
    <Container
      open={openModal}
      onOpenChange={open => {
        setOpenModal(!openModal);

        if (open) handleGetEditFormData();
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogOverlay>
        <DialogContent>
          <Heading size="sm">Editar rede social</Heading>
          <DialogForm onSubmit={handleEditSocial}>
            <div>
              <div>
                <Image
                  src={
                    profileImage
                      ? profileImage
                      : "https://avatars.githubusercontent.com/u/61809874?v=4"
                  }
                  layout="fill"
                  objectFit="cover"
                  className="cover"
                  priority
                />
              </div>
              <Heading size="sm">{social}</Heading>
            </div>
            <fieldset>
              <div>
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
              </div>
              <div>
                <label htmlFor="username">Nome de usuário</label>
                <input
                  type="text"
                  id="username"
                  placeholder="Digite o nome de usuário"
                  autoComplete="off"
                  onChange={e => {
                    if (social === "Instagram" || social === "Twitter") {
                      setUsername(`@${e.target.value.split("@")[1] ?? ""}`);
                    } else setUsername(e.target.value);
                  }}
                  value={username}
                  required
                />
              </div>
            </fieldset>
            <fieldset>
              <label htmlFor="description">Descrição</label>
              <textarea
                id="description"
                placeholder="Digite a descrição"
                autoComplete="off"
                maxLength={150}
                onChange={e => setDescription(e.target.value)}
                value={description}
                required
              />
            </fieldset>
            <fieldset>
              <div>
                <label htmlFor="following">Seguindo</label>
                <input
                  type="number"
                  id="following"
                  placeholder="Quantos você está seguindo?"
                  autoComplete="off"
                  min={0}
                  onChange={e => setFollowing(Number(e.target.value))}
                  value={following}
                  required
                />
              </div>
              <div>
                <label htmlFor="followers">Seguidores</label>
                <input
                  type="number"
                  id="followers"
                  placeholder="Quantos estão te seguindo?"
                  autoComplete="off"
                  min={0}
                  onChange={e => setFollowers(Number(e.target.value))}
                  value={followers}
                  required
                />
              </div>
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

export default SocialModal;
