import { Motion } from "@components/Motion";
import { EvervaultCard, Icon } from "@ui/evervault-card";
import { Lamp } from "@ui/lamp";
import Image from "next/image";

interface AboutProps {}

export function About({}: AboutProps) {
  return (
    <section className="flex h-dvh w-full flex-col items-center gap-5 pt-24">
      <Lamp title="Quem sou?" subtitle="Um pouco sobre mim">
        <Motion
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-8 w-3/5 bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text py-4 text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          <div className="relative flex w-full items-center gap-10 border border-white/[0.2] p-4">
            <Icon className="absolute -left-3 -top-3 h-6 w-6 text-white" />
            <Icon className="absolute -bottom-3 -left-3 h-6 w-6 text-white" />
            <Icon className="absolute -right-3 -top-3 h-6 w-6 text-white" />
            <Icon className="absolute -bottom-3 -right-3 h-6 w-6 text-white" />

            <EvervaultCard className="h-96 w-3/4">
              <Image
                src="/me.jpeg"
                alt="Me"
                width={200}
                height={200}
                className="h-full w-full rounded-full shadow-lg shadow-orange-500/20"
              ></Image>
            </EvervaultCard>

            <div className="flex h-full w-full flex-col justify-center gap-3 text-start text-white">
              <h1 className="text-bright-primary text-5xl">Olá,</h1>
              <p className="font-inter pr-5 text-justify text-xl font-normal tracking-tight">
                eu sou Erik Gabriel, desenvolvedor fullstack e desenvolvedor de
                jogos. Iniciei na área de TI em 2018, onde me formei no ensino
                técnico em informática da ETEC de Lins e atualmente curso
                Ciência da Computação pela UFSCar. Gosto de estudar novas
                tecnologias e estou sempre disposto a novos desafios! Trabalho
                principalmente com tecnologias como{" "}
                <span className="text-primary">React</span>,{" "}
                <span className="text-primary">Typescript</span> e{" "}
                <span className="text-primary">Unity</span>.
              </p>
            </div>
          </div>
        </Motion>
      </Lamp>
    </section>
  );
}
