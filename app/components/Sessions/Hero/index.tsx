import { Motion } from "@components/Motion";
import { ButtonAnimatedBorder } from "@ui/button-animated-border";
import { Sparkles } from "@ui/sparkles";
import { Spotlight } from "@ui/spotlight";
import { Meteors } from "../../ui/meteors";

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
      <div>
        <article className="relative z-10 flex w-full max-w-7xl flex-col gap-5 py-5 md:pt-0">
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
            className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-7xl font-bold text-transparent"
          >
            <span className="animate-text-gradient bg-gradient-to-r from-neutral-500 via-neutral-300/30 to-neutral-500 bg-[200%_auto] bg-clip-text text-center font-medium text-transparent">
              Erik Gabriel
            </span>{" "}
            <br /> Sou Fullstack e Game Developer.
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
          <ButtonAnimatedBorder
            className="px-8 py-3"
            childrenClassName="text-lg"
          >
            Veja meus projetos
          </ButtonAnimatedBorder>
        </Motion>
      </div>
    </section>
  );
}
