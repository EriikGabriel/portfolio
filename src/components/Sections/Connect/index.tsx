import { useEffect, useState } from "react";

import Text from "@packages/react/Text/Text";
import Heading from "@packages/react/Heading/Heading";

import { m } from "framer-motion";
import { Container } from "./styles";
import { TypeStage, useTypedText } from "src/hooks/useTypedText";
import { GitHub, Instagram, Linkedin, Twitter } from "react-feather";
import { SocialButton } from "./SocialButton";
import { SocialType } from "src/components/AdminPanel/Social";

import cn from "classnames";
import axios from "axios";

export const Connect: React.FC = () => {
  const [startTyping, setStartTyping] = useState(false);
  const [socials, setSocials] = useState<SocialType[]>([]);

  const sectionText = useTypedText({
    texts: ["Para quem deseja entrar em contato comigo"],
    typingInterval: 80,
    startTyping,
  });

  const emailText = useTypedText({
    texts: ["erikgabriel.work@gmail.com"],
    typingInterval: 80,
    startTyping,
  });

  const connectVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    axios
      .get("/api/admin/socials")
      .then(res => setSocials(res.data))
      .catch(err => {
        throw new Error(`Ocorreu um erro: ${err}`);
      });
  }, []);

  function switchSocialIcon(social: string) {
    switch (social) {
      case "Github":
        return <GitHub />;
      case "Instagram":
        return <Instagram />;
      case "Twitter":
        return <Twitter />;
      case "Linkedin":
        return <Linkedin />;
      default:
        return <GitHub />;
    }
  }

  return (
    <Container id="connect">
      <m.div
        variants={connectVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        onAnimationStart={() => setStartTyping(true)}
      >
        <div>
          <Heading>
            Conecte-se <span>comigo</span>
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
        <Heading
          className={cn({
            ["end-cursor"]:
              emailText.stage !== TypeStage.Deleting && !emailText.hideCursor,
            ["blinking"]: emailText.stage !== TypeStage.Holding,
          })}
          aria-label={emailText.selectedTexts}
        >
          {emailText.typedText}
        </Heading>
        <div>
          {socials.length !== 0 &&
            socials.map((socialData, index) => (
              <SocialButton socialData={socialData} delay={0.4 + index * 0.1}>
                {switchSocialIcon(socialData.social)}
              </SocialButton>
            ))}
        </div>
      </div>
    </Container>
  );
};
