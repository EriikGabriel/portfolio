import { Footer } from "@components/footer";
import { About } from "@sections/about";
import { Hero } from "@sections/hero";
import { Projects } from "@sections/projects";
import { Social } from "@sections/social";
import { Techs } from "@sections/techs";
import GradualBlurMemo from "@ui/effects/gradual-blur";
import { WavyBackground } from "@ui/effects/wavy-background";
import { siteMetadata, siteUrl } from "@utils/site";

interface HomeProps {
	searchParams: Promise<Record<string, string | string[] | undefined>>;
}

const personJsonLd = {
	"@context": "https://schema.org",
	"@type": "Person",
	name: siteMetadata.name,
	url: siteUrl,
	image: `${siteUrl}/assets/me.jpeg`,
	jobTitle: siteMetadata.role,
	sameAs: [...siteMetadata.socialUrls],
	knowsAbout: [...siteMetadata.keywords],
};

export default async function Home({ searchParams }: HomeProps) {
	return (
		<main className="min-h-dvh">
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: conteúdo estático e confiável (constantes do próprio site), exigido pelo Next.js para embutir JSON-LD direto no HTML do SSR.
				dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
			/>
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
