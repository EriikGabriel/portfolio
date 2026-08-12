import { Footer } from "@components/footer";
import { About } from "@sections/about";
import { Hero } from "@sections/hero";
import { Projects } from "@sections/projects";
import { Social } from "@sections/social";
import { Techs } from "@sections/techs";
import GradualBlurMemo from "@ui/gradual-blur";
import { WavyBackground } from "@ui/wavy-background";

export default function Home() {
	return (
		<main className="min-h-dvh">
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
