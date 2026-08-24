import { EncryptedText } from "@ui/effects/encrypted-text";
import { Lamp } from "@ui/effects/lamp";
import Link from "next/link";
import { Motion } from "../../motion";
import { SocialMedias } from "./social-medias";

export function Social() {
	return (
		<section
			className="relative flex w-full flex-col items-center gap-5 pt-24 pb-20 overflow-hidden"
			id="connect"
		>
			<Lamp
				title="Conecte-se comigo"
				subtitle="Para quem deseja entrar em contato comigo"
				className="min-h-auto! pb-28"
			>
				<Motion
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
					transition={{ delay: 0.2, duration: 0.6, ease: "easeInOut" }}
					className="mt-12 flex w-full max-w-4xl flex-col gap-6 px-4"
				>
					<div className="flex flex-col gap-12 md:gap-52 justify-center items-center">
						<Link
							href="mailto:erikgabriel.work@gmail.com"
							className="w-full text-center md:w-auto"
						>
							<EncryptedText
								text="erikgabriel.work@gmail.com"
								encryptedClassName="text-neutral-500 font-geist-mono text-center"
								revealedClassName="dark:text-white text-black text-center font-geist-mono"
								className="text-center"
								revealDelayMs={50}
								style={{ fontSize: "clamp(1rem, 3.5vw, 2.25rem)" }}
							/>
						</Link>

						<SocialMedias />
					</div>
				</Motion>
			</Lamp>
		</section>
	);
}
