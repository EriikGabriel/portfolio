import { ReactElement } from "react";

import IconButton from "@packages/react/Button/IconButton";

import {
  Flex,
  HoverCard,
  HoverCardArrow,
  HoverCardContent,
  HoverCardTrigger,
  ImageWrapper,
} from "./styles";
import Text from "@packages/react/Text/Text";
import Image from "next/image";
import { m } from "framer-motion";

type SocialButtonProps = {
  children: ReactElement;
  delay?: number;
};

export const SocialButton: React.FC<SocialButtonProps> = ({
  children,
  delay = 0.4,
}) => {
  const SocialButtonVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
    },
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
        <HoverCardTrigger>
          <IconButton size="lg">{children}</IconButton>
        </HoverCardTrigger>
        <HoverCardContent sideOffset={1}>
          <ImageWrapper>
            <Image
              src="https://avatars.githubusercontent.com/u/61809874?v=4"
              layout="fill"
            />
          </ImageWrapper>
          <Flex css={{ flexDirection: "column", gap: 7 }}>
            <Flex css={{ flexDirection: "column", gap: 15 }}>
              <Flex column>
                <Text css={{ fontWeight: "bold" }}>Erik Gabriel</Text>
                <Text size="sm">@Erik_Gabriel</Text>
              </Flex>
              <Text>
                Components, icons, colors, and templates for building
                high-quality, accessible UI. Free and open-source.
              </Text>
              <Flex css={{ gap: 15 }}>
                <Flex css={{ gap: 5 }}>
                  <Text css={{ fontWeight: "bold" }}>0</Text>{" "}
                  <Text>Following</Text>
                </Flex>
                <Flex css={{ gap: 5 }}>
                  <Text css={{ fontWeight: "bold" }}>2,900</Text>{" "}
                  <Text>Followers</Text>
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

export default SocialButton;
