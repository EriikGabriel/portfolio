import React from "react";
import HeadSeo from "src/components/HeadSeo/HeadSeo";
import siteMetadata from "@data/siteMetadata";

const Home: React.FC = () => {
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
      <body>
        <section></section>
      </body>
    </>
  );
};

export default Home;
