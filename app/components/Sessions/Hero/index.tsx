import { Motion } from "@components/Motion";

import { Sparkles } from "@ui/sparkles";
import { Spotlight } from "@ui/spotlight";
import { Meteors } from "../../ui/meteors";
import SpecularButton from "../../ui/specular-button";

export function Hero() {
	const variants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
	};

	return (
		<section className="relative flex h-screen w-full flex-col overflow-hidden rounded-md antialiased md:items-center md:justify-center">
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
			<div className="w-8/12">
				<article className="relative z-10 flex w-full flex-col gap-5 py-5 md:pt-0">
					<Motion
						as="p"
						variants={variants}
						initial="hidden"
						animate="visible"
						transition={{ delay: 0.5 }}
						className="text-xl text-primary"
					>
						Olá, meu nome é
					</Motion>
					<Motion
						as="h1"
						variants={variants}
						initial="hidden"
						animate="visible"
						transition={{ delay: 0.5 }}
						className="bg-opacity-50 bg-linear-to-b from-neutral-50 to-neutral-400 bg-clip-text text-7xl font-bold text-transparent"
					>
						<span className="animate-text-gradient bg-linear-to-r from-neutral-500 via-neutral-300/30 to-neutral-500 bg-size-[200%_auto] bg-clip-text text-center text-transparent">
							Erik Gabriel
						</span>
						<p className="text-5xl">Sou Fullstack e Game Developer.</p>
					</Motion>
					<Motion
						as="p"
						variants={variants}
						initial="hidden"
						animate="visible"
						transition={{ delay: 0.7 }}
						className="mt-4 max-w-xl text-xl font-normal text-neutral-300"
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
					<SpecularButton
						size="lg"
						radius={18}
						tint="#ffffff"
						tintOpacity={0}
						blur={0}
						textColor="#f5f5f5"
						lineColor="#f67800"
						baseColor="#525252"
						intensity={1}
						shineSize={10}
						shineFade={40}
						thickness={1}
						speed={0.35}
						followMouse
						proximity={250}
					>
						Veja meus projetos
					</SpecularButton>
				</Motion>
			</div>
		</section>
	);
}
