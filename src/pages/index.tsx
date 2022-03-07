import React from "react";
import HeadSeo from "src/components/HeadSeo/HeadSeo";
import siteMetadata from "@data/siteMetadata";
import Text from "src/components/Text/Text";
import Tag from "src/components/Tag/Tag";

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
      <div
        style={{
          background: "#3C3C3D",
          padding: 0,
          margin: 0,
          height: "97vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></div>
    </>
  );
};

export default Home;
