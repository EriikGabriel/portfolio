import { ReactElement } from "react";
import Image from "next/image";

import IconButton from "@packages/react/Button/IconButton";
import Text from "@packages/react/Text/Text";

import {
  Flex,
  HoverCard,
  HoverCardArrow,
  HoverCardContent,
  HoverCardTrigger,
  ImageWrapper,
} from "./styles";

import { SocialType } from "@utils/types/social";
import { m } from "framer-motion";

type SocialButtonProps = {
  children: ReactElement;
  delay?: number;
  socialData: SocialType;
};

export const SocialButton: React.FC<SocialButtonProps> = ({
  children,
  delay = 0.4,
  socialData,
}) => {
  const SocialButtonVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1 },
  };

  return (
    <m.div
      variants={SocialButtonVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
    >
      <HoverCard>
        <HoverCardTrigger href={socialData.url}>
          <IconButton size="lg" aria-label={socialData.social}>
            {children}
          </IconButton>
        </HoverCardTrigger>
        <HoverCardContent sideOffset={1}>
          <ImageWrapper>
            <Image src={socialData.profileImage} layout="fill" />
          </ImageWrapper>
          <Flex css={{ flexDirection: "column", gap: 7 }}>
            <Flex css={{ flexDirection: "column", gap: 15 }}>
              <Flex column>
                <Text css={{ fontWeight: "bold" }}>{socialData.name}</Text>
                <Text size="sm">{socialData.username}</Text>
              </Flex>
              <Text>{socialData.description}</Text>
              <Flex css={{ gap: 15 }}>
                <Flex css={{ gap: 5 }}>
                  <Text css={{ fontWeight: "bold" }}>
                    {socialData.following}
                  </Text>{" "}
                  <Text>Seguindo</Text>
                </Flex>
                <Flex css={{ gap: 5 }}>
                  <Text css={{ fontWeight: "bold" }}>
                    {socialData.followers}
                  </Text>{" "}
                  <Text>Seguidores</Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          <HoverCardArrow />
        </HoverCardContent>
      </HoverCard>
    </m.div>
  );
};
