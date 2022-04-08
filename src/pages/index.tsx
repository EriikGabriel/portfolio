import React, { useContext } from "react";
import HeadSeo from "src/components/HeadSeo";
import siteMetadata from "@data/siteMetadata";

import { Main } from "src/styles/style";

import { Header } from "src/components/Header";
import { Introduction } from "src/components/Sections/Introduction";
import { About } from "src/components/Sections/About";
import { Skills } from "src/components/Sections/Skills";
import { Projects } from "src/components/Sections/Projects";
import { Connect } from "src/components/Sections/Connect";

import { LazyMotion, domAnimation } from "framer-motion";
import { LoaderContext } from "src/contexts/LoaderContext";
import { Footer } from "src/components/Footer";

const Home: React.FC = () => {
  const { isLoading } = useContext(LoaderContext);

  return (
    <>
      <HeadSeo
        title="Erik Gabriel | Fullstack & Game Developer"
        description="Eu sou Erik Gabriel, desenvolvedor fullstack e desenvolvedor de jogos. Atualmente curso Ciência da Computação pela UFSCar."
        canonicalUrl={siteMetadata.siteUrl}
        ogTwitterImage={siteMetadata.siteLogoSquare}
        ogImageUrl={siteMetadata.siteLogo}
        ogType="website"
      />

      <Header />
      <LazyMotion features={domAnimation}>
        <Main>
          {!isLoading && (
            <>
              <Introduction />
              <About />
              <Skills />
              <Projects />
              <Connect />
            </>
          )}
        </Main>
        {!isLoading && <Footer />}
      </LazyMotion>
    </>
  );
};

export default Home;
