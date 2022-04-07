import { ReactNode } from "react";
import Image from "next/image";

import Heading from "@packages/react/Heading/Heading";
import Tag from "@packages/react/Tag/Tag";

import { GitHub, Eye } from "react-feather";
import { Container } from "./styles";
import { m } from "framer-motion";

type CardProps = {
  children: ReactNode;
  tags: string[];
  imageSrc: string;
  githubUrl?: string;
  deployUrl?: string;
};

export const Card: React.FC<CardProps> = ({
  children,
  tags,
  imageSrc,
  githubUrl,
  deployUrl,
}) => {
  return (
    <Container glareBorderRadius="" gyroscope>
      <div>
        <Image
          src="/cover.jpg"
          layout="fill"
          objectFit="cover"
          className="cover"
        />
      </div>
      <Heading>{children}</Heading>
      <div>
        {tags.map((tag, index) => (
          <Tag key={index}>{tag}</Tag>
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
    </Container>
  );
};
