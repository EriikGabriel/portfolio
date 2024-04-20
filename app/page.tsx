import { About } from "@components/Sessions/About";
import { Hero } from "@components/Sessions/Hero";
import { Techs } from "./components/Sessions/Techs";

export default function Home() {
  return (
    <main className="min-h-dvh">
      <Hero />
      <About />
      <Techs />
    </main>
  );
}
