import { About } from "@components/Sessions/About";
import { Hero } from "@components/Sessions/Hero";

export default function Home() {
  return (
    <main className="min-h-dvh">
      <Hero />
      <About />
    </main>
  );
}
