import Heading from "@packages/react/Heading/Heading";
import Text from "@packages/react/Text/Text";
import {
  Box,
  Eye,
  GitHub,
  Instagram,
  Linkedin,
  Smartphone,
  Twitter,
} from "react-feather";
import { OverviewCard } from "./OverviewCard";
import { ProjectsOverview } from "./ProjectsOverview";
import { ResumeOverview } from "./ResumeOverview";
import { SocialOverview } from "./SocialOverview";
import { Container } from "./styles";

export const Home: React.FC = () => {
  return (
    <Container>
      <section>
        <OverviewCard icon={<Box size={40} />} quantity={6}>
          Total de Projetos
        </OverviewCard>
        <OverviewCard icon={<Smartphone size={40} />} quantity={4}>
          Total de Redes Sociais
        </OverviewCard>
      </section>
      <section>
        <article>
          <ProjectsOverview />
          <ResumeOverview />
        </article>
        <SocialOverview />
      </section>
    </Container>
  );
};
