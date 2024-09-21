import { Lamp } from "@ui/lamp";

import Image from "next/image";
import { Motion } from "../../Motion";
import { PinCard } from "../../ui/3d-pin-card";
import { AspectRatio } from "../../ui/aspect-ratio";
import { ProjectForm } from "./project-form";

type ProjectsType = {
  title: string;
  description: string;
  href: string;
};

interface ProjectsProps {}

export function Projects({}: ProjectsProps) {
  const projects: ProjectsType[] = [
    {
      title: "teste1",
      description: "teste1",
      href: "https://twitter.com/mannupaaji",
    },
    {
      title: "teste2",
      description: "teste2",
      href: "https://twitter.com/mannupaaji",
    },
    {
      title: "teste3",
      description: "teste3",
      href: "https://twitter.com/mannupaaji",
    },
  ];

  return (
    <section className="flex h-dvh w-full flex-col items-center gap-5 pt-24">
      <Lamp
        title="Meus projetos"
        subtitle="Alguns projetos desenvolvidos por mim"
      >
        <Motion
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-8 flex w-3/5 justify-center gap-5 bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text py-4 text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          <div className="flex w-full flex-col gap-5">
            <ProjectForm />
            <div className="grid grid-cols-3 grid-rows-2">
              {projects.map(({ title, description, href }, index) => (
                <PinCard
                  key={index}
                  title={title}
                  href="https://twitter.com/mannupaaji"
                >
                  <div className="flex h-[20rem] w-[20rem] basis-full flex-col p-4 tracking-normal text-slate-100/50 sm:basis-1/2 ">
                    <div>
                      <h3 className="!m-0 max-w-xs !pb-2 text-base  font-bold text-slate-100">
                        {title}
                      </h3>
                      <div className="!m-0 !p-0 text-base font-normal">
                        <span className="text-slate-500 ">{description}</span>
                      </div>
                    </div>

                    <AspectRatio ratio={16 / 9}>
                      <Image
                        src="/cover.png"
                        alt="cover"
                        layout="fill"
                        objectFit="cover"
                        className="mt-4 flex h-full w-full flex-1 rounded-lg"
                      />
                    </AspectRatio>
                  </div>
                </PinCard>
              ))}
            </div>
          </div>
        </Motion>
      </Lamp>
    </section>
  );
}
