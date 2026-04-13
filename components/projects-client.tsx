"use client";

import React from "react";
import SectionHeading from "./section-heading";
import Project from "./project";
import useSectionInView from "@/lib/hooks";
import type { BlogProject } from "@/lib/get-projects";

interface ProjectsClientProps {
  projects: BlogProject[];
}

export default function ProjectsClient({ projects }: ProjectsClientProps) {
  const { ref } = useSectionInView("Projects", 0.5);

  return (
    <section ref={ref} id="projects" className="scroll-mt-28 mb-28">
      <SectionHeading>My Projects</SectionHeading>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4">
        {projects.map((project) => (
          <Project key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
