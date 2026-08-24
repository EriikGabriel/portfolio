import { Footer } from "@components/footer";
import { About } from "@sections/about";
import { Hero } from "@sections/hero";
import { Projects } from "@sections/projects";
import { Social } from "@sections/social";
import { Techs } from "@sections/techs";
import GradualBlurMemo from "@ui/effects/gradual-blur";
import { WavyBackground } from "@ui/effects/wavy-background";

interface HomeProps {
	searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function Home({ searchParams }: HomeProps) {
	return (
		<main className="min-h-dvh">
			<Hero />
			<About />
			<Techs />
			<Projects searchParams={searchParams} />
			<Social />
			<WavyBackground />
			<Footer />

			<GradualBlurMemo
				target="page"
				position="bottom"
				height="5rem"
				responsive
				mobileHeight="2rem"
				tabletHeight="3.5rem"
				strength={2}
				divCount={5}
				curve="bezier"
				exponential
				opacity={1}
			/>
		</main>
	);
}
