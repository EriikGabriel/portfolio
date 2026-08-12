import { Footer } from "@components/Footer";
import { Header } from "@components/Header";
import { About } from "@components/Sessions/About";
import { Hero } from "@components/Sessions/Hero";
import { Projects } from "@components/Sessions/Projects";
import { Social } from "@components/Sessions/Social";
import { Techs } from "@components/Sessions/Techs";
import GradualBlurMemo from "@ui/gradual-blur";
import { WavyBackground } from "@ui/wavy-background";

export default function Home() {
	return (
		<main className="min-h-dvh">
			<Header />

			<Hero />
			<About />
			<Techs />
			<Projects />
			<Social />
			<WavyBackground />
			<Footer />

			<GradualBlurMemo
				target="page"
				position="bottom"
				height="7rem"
				strength={3}
				divCount={5}
				curve="bezier"
				exponential
				opacity={1}
			/>
		</main>
	);
}
