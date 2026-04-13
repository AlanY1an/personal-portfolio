import { getBlogProjects } from "@/lib/get-projects";
import ProjectsClient from "./projects-client";

// Async server component. At build time it fetches the canonical
// project list from the blog's /api/projects.json endpoint, then
// hands it off to the client component that owns Framer Motion +
// useSectionInView behavior.
export default async function Projects() {
  const projects = await getBlogProjects();
  return <ProjectsClient projects={projects} />;
}
