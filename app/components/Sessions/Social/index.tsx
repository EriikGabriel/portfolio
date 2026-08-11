import { EncryptedText } from "@ui/encrypted-text";
import { Lamp } from "@ui/lamp";
import { Motion } from "../../Motion";
import { SocialMedias } from "./social-medias";

export function Social() {
	return (
		<section className="relative flex min-h-dvh w-full flex-col items-center gap-5 pt-24 overflow-hidden">
			<Lamp
				title="Conecte-se comigo"
				subtitle="Para quem deseja entrar em contato comigo"
			>
				<Motion
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2, duration: 0.6, ease: "easeInOut" }}
					className="mt-12 flex w-full max-w-4xl flex-col gap-6 px-4"
				>
					<div className="flex flex-col gap-52 justify-center items-center">
						<EncryptedText
							text="erikgabriel.work@gmail.com"
							encryptedClassName="text-neutral-500 font-geist-mono text-4xl"
							revealedClassName="dark:text-white text-black font-geist-mono text-4xl"
							revealDelayMs={50}
						/>

						<SocialMedias />
					</div>
				</Motion>
			</Lamp>
		</section>
	);
}
