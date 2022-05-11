import { ReactNode } from "react";

import Heading from "@packages/react/Heading/Heading";
import Text from "@packages/react/Text/Text";
import Button from "@packages/react/Button/Button";

import { Edit3 } from "react-feather";
import Image from "next/image";

import { Container } from "./styles";
import SocialModal from "../SocialModal";

type CardProps = {
  children: ReactNode;
  social: {
    id: string;
    profileImage: string;
    name: string;
    username: string;
    description: string;
    following: number;
    followers: number;
  };
};

export const Card: React.FC<CardProps> = ({ children, social }) => {
  return (
    <Container>
      <div>
        <div>
          <div>
            <Image
              src={social.profileImage}
              layout="fill"
              objectFit="cover"
              className="cover"
              crossOrigin="anonymous"
            />
          </div>
          <div>
            <Heading size="sm">{social.name}</Heading>
            <Text size="sm">{social.username}</Text>
          </div>
        </div>
        {children}
      </div>
      <Text>{social.description}</Text>
      <div>
        <Text>
          <strong>{social.following}</strong> Seguindo
        </Text>
        <Text>
          <strong>{social.followers}</strong> Seguidores
        </Text>
      </div>
      <SocialModal editId={social.id}>
        <Button leftIcon={<Edit3 />} size="sm">
          Editar
        </Button>
      </SocialModal>
    </Container>
  );
};
