import { Motion } from "@components/motion";
import { Meteors } from "@ui/meteors";
import { Sparkles } from "@ui/sparkles";
import { Spotlight } from "@ui/spotlight";
import { ProjectsButton } from "../../projects-button";

export function Hero() {
	const variants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
	};

	return (
		<section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-md antialiased px-4 md:px-0">
			<div className="absolute inset-0 h-screen w-full">
				<Meteors number={10} className="bg-orange-500 before:from-orange-500" />
				<Sparkles
					background="transparent"
					minSize={0.2}
					maxSize={1}
					particleDensity={20}
					className="h-full w-full"
					particleColor="#FFFFFF"
				/>
			</div>

			<Spotlight
				className="-top-40 left-0 md:-top-20 md:left-60"
				fill="white"
			/>
			<div className="w-10/12 md:w-8/12">
				<article className="relative z-10 flex w-full flex-col gap-5 py-5 md:pt-0">
					<Motion
						as="p"
						variants={variants}
						initial="hidden"
						animate="visible"
						transition={{ delay: 0.5 }}
						className="text-primary"
						style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)" }}
					>
						Olá, meu nome é
					</Motion>
					<Motion
						as="h1"
						variants={variants}
						initial="hidden"
						animate="visible"
						transition={{ delay: 0.5 }}
						className="bg-opacity-50 bg-linear-to-b from-neutral-50 to-neutral-400 bg-clip-text font-bold text-transparent"
						style={{ fontSize: "clamp(2.25rem, 6vw, 4.5rem)" }}
					>
						<span className="animate-text-gradient bg-linear-to-r from-neutral-500 via-neutral-300/30 to-neutral-500 bg-size-[200%_auto] bg-clip-text text-center text-transparent">
							Erik Gabriel
						</span>
						<p style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)" }}>Sou Fullstack e Game Developer.</p>
					</Motion>
					<Motion
						as="p"
						variants={variants}
						initial="hidden"
						animate="visible"
						transition={{ delay: 0.7 }}
						className="mt-4 max-w-xl font-normal text-neutral-300"
						style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)" }}
					>
						Sou desenvolvedor fullstack, construo e projeto aplicações buscando
						alcançar melhores experiências digitais. Atualmente focado em
						desenvolver aplicações acessíveis e jogos dinâmicos.
					</Motion>
				</article>
				<Motion
					as="div"
					variants={variants}
					initial="hidden"
					animate="visible"
					transition={{ delay: 0.9 }}
					className="pt-10"
				>
					<ProjectsButton />
				</Motion>
			</div>
		</section>
	);
}
