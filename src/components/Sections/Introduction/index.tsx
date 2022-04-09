import Text from "@packages/react/Text/Text";
import Heading from "@packages/react/Heading/Heading";
import Button from "@packages/react/Button/Button";

import cn from "classnames";

import { TypeStage, useTypedText } from "src/hooks/useTypedText";
import { Container } from "./styles";
import GlitchEffect from "src/components/GlitchEffect";

export const Introduction: React.FC = () => {
  const { typedText, selectedTexts, stage, hideCursor } = useTypedText({
    texts: ["Olá, meu nome é"],
    idleInterval: 2600,
  });

  const introductionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Container>
      <Text
        initial="hidden"
        animate="visible"
        variants={introductionVariants}
        transition={{ delay: 1.8 }}
        className={cn({
          ["end-cursor"]: stage !== TypeStage.Deleting && !hideCursor,
          ["blinking"]: stage !== TypeStage.Holding,
        })}
        aria-label={selectedTexts}
      >
        {typedText}
      </Text>

      <div>
        <Heading
          size="2xl"
          initial={{ display: "none" }}
          animate={{ display: "block" }}
          transition={{
            delay: 1.7,
          }}
        >
          <GlitchEffect>
            <span>Erik Gabriel.</span>
          </GlitchEffect>
        </Heading>
        <Heading
          size="xl"
          initial="hidden"
          animate="visible"
          variants={introductionVariants}
          transition={{ delay: 2 }}
        >
          Sou Fullstack e Game Developer
        </Heading>
      </div>
      <Text
        initial="hidden"
        animate="visible"
        variants={introductionVariants}
        transition={{ delay: 2.1 }}
      >
        Sou desenvolvedor fullstack, construo e projeto aplicações buscando
        alcançar melhores experiências digitais. Atualmente focado em
        desenvolver aplicações acessíveis e jogos dinâmicos.
      </Text>
      <Button
        initial="hidden"
        animate="visible"
        variants={introductionVariants}
        transition={{ delay: 2.2 }}
        size="lg"
        outlined
        onClick={() => {
          document.getElementById("projects")?.scrollIntoView({
            block: "center",
          });
        }}
      >
        Veja meus projetos!
      </Button>
    </Container>
  );
};
