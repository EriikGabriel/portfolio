import { Container } from "../styles/resume";

import siteMetadata from "@data/siteMetadata";
import HeadSeo from "../components/HeadSeo";

const Resume: React.FC = () => {
  return (
    <>
      <HeadSeo
        title="Erik Gabriel | Currículo"
        description="Currículo - Erik Gabriel Rodrigo da Silva"
        canonicalUrl={siteMetadata.siteUrl}
        ogTwitterImage={siteMetadata.siteLogoSquare}
        ogImageUrl={siteMetadata.siteLogo}
        ogType="website"
      />
      <Container
        src="lib/web/viewer.html?file=../../tmp/uploads/currículo.pdf"
        title="Currículo"
      ></Container>
    </>
  );
};

export default Resume;
