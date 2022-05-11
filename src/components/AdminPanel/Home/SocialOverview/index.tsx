import { useEffect, useState } from "react";

import Heading from "@packages/react/Heading/Heading";
import Text from "@packages/react/Text/Text";

import { GitHub, Instagram, Linkedin, Twitter } from "react-feather";

import axios from "axios";
import { SocialType } from "@utils/types/social";

import { Container } from "./styles";

export const SocialOverview: React.FC = () => {
  const [socials, setSocials] = useState<SocialType[]>([]);

  useEffect(() => {
    axios
      .get("/api/admin/socials")
      .then(res => {
        setSocials(res.data);
      })
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
    <Container>
      <Heading size="sm">Redes Sociais</Heading>
      <div>
        {socials.length !== 0 &&
          socials.map(
            ({ _id, social, name, username, following, followers }) => (
              <div key={_id}>
                {switchSocialIcon(social)}
                <div>
                  <Text size="lg">{name}</Text>
                  <Text size="sm">{username}</Text>
                  <Text size="sm">Seguindo: {following} </Text>
                  <Text size="sm">Seguidores: {followers} </Text>
                </div>
              </div>
            )
          )}
      </div>
    </Container>
  );
};
