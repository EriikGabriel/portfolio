import axios from "axios";
import { useEffect, useState } from "react";

import { Box, Smartphone } from "react-feather";

import { OverviewCard } from "./OverviewCard";
import { ProjectsOverview } from "./ProjectsOverview";
import { ResumeOverview } from "./ResumeOverview";
import { SocialOverview } from "./SocialOverview";
import { Container } from "./styles";

export const Home: React.FC = () => {
  const [projectsCount, setProjectsCount] = useState(0);
  const [socialsCount, setSocialsCount] = useState(0);

  useEffect(() => {
    axios
      .get("/api/admin/count")
      .then(res => {
        setProjectsCount(res.data.projects);
        setSocialsCount(res.data.socials);
      })
      .catch(err => {
        throw new Error(`Ocorreu um erro: ${err}`);
      });
  }, []);

  return (
    <Container>
      <section>
        <OverviewCard icon={<Box size={40} />} quantity={projectsCount}>
          Total de Projetos
        </OverviewCard>
        <OverviewCard icon={<Smartphone size={40} />} quantity={socialsCount}>
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
