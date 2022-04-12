import { useEffect, useState } from "react";

import Heading from "@packages/react/Heading/Heading";
import Text from "@packages/react/Text/Text";

import { Container, BigCircle, SmallCircle } from "./styles";
import { TypeStage, useTypedText } from "src/hooks/useTypedText";
import { Carousel } from "./Carousel";
import { Card } from "./Card";
import { m } from "framer-motion";

import Link from "next/link";
import cn from "classnames";
import axios from "axios";

export const Projects: React.FC = () => {
  const [startTyping, setStartTyping] = useState(false);

  const sectionText = useTypedText({
    texts: ["Alguns projetos desenvolvidos por mim"],
    typingInterval: 100,
    startTyping,
  });

  const projectsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const bigCircleVariants = {
    hidden: { y: 0, x: 0 },
    visible: {
      y: [0, -150, 0, -150, 0],
      x: ["0vw", "35vw"],
    },
  };

  const smallCircleVariants = {
    hidden: { y: 0, x: 0 },
    visible: {
      y: [0, 400, 0],
      x: ["0vw", "-35vw", "4vw", "-35vw", "0vw"],
    },
  };

  const CardVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
    },
  };

  useEffect(() => {
    axios
      .get("/api/techs")
      .then(techs => {
        console.log(techs.data);
      })
      .catch(error => {
        throw new Error(error);
      });
  }, []);

  return (
    <Container id="projects">
      <m.div
        variants={projectsVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        onAnimationStart={() => setStartTyping(true)}
      >
        <div>
          <Heading>
            Meus <span>projetos</span>
          </Heading>
          <Text
            size="sm"
            className={cn({
              ["end-cursor"]:
                sectionText.stage !== TypeStage.Deleting &&
                !sectionText.hideCursor,
              ["blinking"]: sectionText.stage !== TypeStage.Holding,
            })}
            aria-label={sectionText.selectedTexts}
          >
            {sectionText.typedText}
          </Text>
        </div>
      </m.div>
      <div>
        <BigCircle
          variants={bigCircleVariants}
          initial="hidden"
          animate="visible"
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <SmallCircle
          variants={smallCircleVariants}
          initial="hidden"
          animate="visible"
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <Carousel>
          <m.div
            variants={CardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Card
              imageSrc=""
              githubUrl="#"
              deployUrl="#"
              tags={["Aplicativo Web", "React"]}
            >
              Do it!
            </Card>
          </m.div>
          <m.div
            variants={CardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Card
              imageSrc=""
              githubUrl="#"
              deployUrl="#"
              tags={["Aplicativo Web", "React"]}
            >
              CanLearn!
            </Card>
          </m.div>
        </Carousel>
        <Text
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          Para ver mais projetos acesse meu{" "}
          <Link href="https://github.com/EriikGabriel">Github</Link>
        </Text>
      </div>
    </Container>
  );
};
