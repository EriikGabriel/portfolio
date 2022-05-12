import siteMetadata from "@data/siteMetadata";
import HeadSeo from "src/components/HeadSeo";

import animation404Data from "../assets/animations/404animation.json";
import {
  Lottie,
  ReactLottiePlayingState,
} from "@alfonmga/react-lottie-light-ts";

import { Container } from "src/styles/404";
import { useState } from "react";
import GlitchEffect from "src/components/GlitchEffect";
import Heading from "@packages/react/Heading/Heading";

const Page404: React.FC = () => {
  const [playingState, setPlayingState] =
    useState<ReactLottiePlayingState>("stopped");
  const [leaveEvent, setLeaveEvent] = useState(true);

  return (
    <>
      <HeadSeo
        title="Erik Gabriel | Erro 404"
        description="Erro 404 - Página não encontrada!"
        canonicalUrl={siteMetadata.siteUrl}
        ogTwitterImage={siteMetadata.siteLogoSquare}
        ogImageUrl={siteMetadata.siteLogo}
        ogType="website"
      />
      <Container>
        <div>
          <Heading>
            <GlitchEffect>
              <span>Erro 404_</span>
            </GlitchEffect>
          </Heading>
          <Heading>Página não encontrada!</Heading>
          <small>
            Se acha que isso pode ser algum erro, contate o dono da página...
          </small>
        </div>
        <div
          onMouseEnter={() => {
            setPlayingState("playing");
            setLeaveEvent(false);
          }}
        >
          <Lottie
            config={{ animationData: animation404Data, loop: true }}
            playingState={playingState}
            lottieEventListeners={[
              {
                name: "loopComplete",
                callback: () => {
                  if (leaveEvent) setPlayingState("paused");
                },
              },
            ]}
          />
        </div>
      </Container>
    </>
  );
};

export default Page404;
