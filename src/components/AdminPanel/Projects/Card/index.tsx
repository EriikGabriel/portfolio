import Button from "@packages/react/Button/Button";
import Heading from "@packages/react/Heading/Heading";
import Tag from "@packages/react/Tag/Tag";
import Image from "next/image";
import { ReactNode } from "react";
import { Edit3, Eye, GitHub, Trash2 } from "react-feather";
import { DeleteModal } from "../DeleteModal";
import { ProjectModal } from "../ProjectModal";

import { Container } from "./styles";

type CardProps = {
  children: ReactNode;
  id: string;
  tags: string[];
  imageName: string;
  githubUrl?: string;
  deployUrl?: string;
};

export const Card: React.FC<CardProps> = ({
  children,
  id,
  tags,
  imageName,
  githubUrl,
  deployUrl,
}) => {
  return (
    <Container>
      <div>
        <Image
          src={`/tmp/uploads/${imageName}`}
          layout="fill"
          objectFit="cover"
          className="cover"
          priority
        />
      </div>
      <Heading>{children}</Heading>
      <div>
        {tags.map((tag, index) => (
          <Tag key={index} variant="secondary">
            {tag}
          </Tag>
        ))}
      </div>
      <div>
        {githubUrl && (
          <a href={githubUrl}>
            <GitHub size={25} />
          </a>
        )}
        {deployUrl && (
          <a href={deployUrl}>
            <Eye size={25} />
          </a>
        )}
      </div>
      <div>
        <ProjectModal editId={id}>
          <Button size="sm" leftIcon={<Edit3 />} outlined>
            Editar
          </Button>
        </ProjectModal>
        <DeleteModal
          projectInfo={{
            id,
            name: children ? children.toString() : "P_NAME",
          }}
        >
          <Button size="sm" leftIcon={<Trash2 />} outlined>
            Excluir
          </Button>
        </DeleteModal>
      </div>
    </Container>
  );
};
