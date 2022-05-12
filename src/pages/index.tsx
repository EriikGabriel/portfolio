import React, { useContext, useEffect } from "react";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

import HeadSeo from "src/components/HeadSeo";
import siteMetadata from "@data/siteMetadata";

import { Main } from "src/styles/style";

import { Header } from "src/components/Header";
import { Introduction } from "src/components/Sections/Introduction";
import { About } from "src/components/Sections/About";
import { Skills } from "src/components/Sections/Skills";
import { Projects } from "src/components/Sections/Projects";
import { Connect } from "src/components/Sections/Connect";

import { ProjectType } from "@utils/types/projects";
import { SocialType } from "@utils/types/social";

import { LazyMotion, domAnimation } from "framer-motion";
import { LoaderContext } from "src/contexts/LoaderContext";
import { Footer } from "src/components/Footer";

import { handleGetProjects } from "./api/admin/projects";
import { handleGetSocials } from "./api/admin/socials";

type StaticPropsResponse = {
  projects: ProjectType[];
  socials: SocialType[];
};

const Home: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  projects,
  socials,
}) => {
  const { isLoading } = useContext(LoaderContext);

  useEffect(() => {
    if (location.hash) {
      const timeout = setTimeout(() => {
        document.querySelector(`${location.hash}`)?.scrollIntoView({
          behavior: "smooth",
        });
      }, 1.5 * 1000);

      return () => clearTimeout(timeout);
    }
  }, [isLoading]);

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
              <Projects projects={projects} />
              <Connect socials={socials} />
            </>
          )}
        </Main>
        {!isLoading && <Footer />}
      </LazyMotion>
    </>
  );
};

export const getStaticProps: GetStaticProps<StaticPropsResponse> = async () => {
  try {
    const resultProjects = await handleGetProjects();
    const resultSocial = await handleGetSocials();

    const projects = JSON.stringify(resultProjects);
    const socials = JSON.stringify(resultSocial);

    return {
      props: { projects: JSON.parse(projects), socials: JSON.parse(socials) },
      revalidate: 10 * 60,
    };
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export default Home;
