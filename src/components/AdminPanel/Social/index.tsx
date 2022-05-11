import { useEffect, useState } from "react";

import IconButton from "@packages/react/Button/IconButton";
import Heading from "@packages/react/Heading/Heading";

import { Card } from "./Card";
import { SocialType } from "@utils/types/social";
import { GitHub, Instagram, Linkedin, Twitter } from "react-feather";

import { Container } from "./styles";

import axios from "axios";

export const Social: React.FC = () => {
  const [socials, setSocials] = useState<SocialType[]>([]);

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
    <Container>
      <Heading>Social</Heading>
      <div>
        {socials.length !== 0 &&
          socials.map(
            ({
              _id,
              social,
              profileImage,
              name,
              username,
              description,
              following,
              followers,
              url,
            }) => (
              <Card
                social={{
                  id: _id,
                  profileImage,
                  name,
                  username,
                  description,
                  following,
                  followers,
                }}
                key={_id}
              >
                <IconButton
                  variant="tertiary"
                  onClick={() => (location.href = url)}
                >
                  {switchSocialIcon(social)}
                </IconButton>
              </Card>
            )
          )}
      </div>
    </Container>
  );
};
