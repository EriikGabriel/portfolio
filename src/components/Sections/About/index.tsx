import Heading from "@packages/react/Heading/Heading";
import Text from "@packages/react/Text/Text";
import Image from "next/image";

import { m } from "framer-motion";

import { Container } from "./styles";
import { TypeStage, useTypedText } from "src/hooks/useTypedText";
import cn from "classnames";
import { useState } from "react";

export const About: React.FC = () => {
  const [startTyping, setStartTyping] = useState(false);

  const { typedText, selectedTexts, stage, hideCursor } = useTypedText({
    texts: ["Um pouco sobre mim"],
    typingInterval: 100,
    startTyping,
  });

  const aboutVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Container id="about">
      <m.div
        variants={aboutVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        onAnimationStart={() => setStartTyping(true)}
      >
        <div>
          <Heading>
            Quem <span>sou</span>
          </Heading>
          <Text
            size="sm"
            className={cn({
              ["end-cursor"]: stage !== TypeStage.Deleting && !hideCursor,
              ["blinking"]: stage !== TypeStage.Holding,
            })}
            aria-label={selectedTexts}
          >
            {typedText}
          </Text>
        </div>
      </m.div>
      <div>
        <m.div
          variants={aboutVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <span></span>
          <span></span>
          <span></span>
          <div>
            <Image
              src="/assets/me.jpg"
              alt="Minha foto de rosto"
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
        </m.div>
        <m.div
          variants={aboutVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <Heading size="lg">Olá,</Heading>
          <Text>
            eu sou Erik Gabriel, desenvolvedor fullstack e desenvolvedor de
            jogos. Iniciei na área de TI há 4 anos, me formei no ensino técnico
            em informática e atualmente curso Ciência da Computação pela UFSCar.
            Gosto de estudar novas tecnologias e estou sempre disposto a novos
            desafios! Trabalho principalmente com tecnologias como{" "}
            <span>React</span>, <span>Typescript</span> e <span>Unity</span>.
          </Text>
        </m.div>
      </div>
    </Container>
  );
};
