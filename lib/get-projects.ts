// Fetches the canonical project list from the Astro blog at build time.
//
// The blog (alanyian.com) is now the single source of truth for projects;
// this module adapts the JSON shape returned by /api/projects.json into
// the local `BlogProject` type the React components consume.
//
// Next.js will cache the response for 1 hour and revalidate. To force
// an immediate refresh when the blog publishes new content, configure
// a Vercel Deploy Hook on this project and trigger it from the blog's
// post-deploy hook.

export type BlogProject = {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  repoUrl: string | null;
  liveUrl: string | null;
  status: "active" | "archived" | "wip";
  role: "solo" | "lead" | "contributor" | "design";
  type: string;
  startDate: string;
  endDate: string | null;
  coverUrl: string | null;
  detailUrl: string;
};

type ApiResponse = {
  generatedAt: string;
  count: number;
  projects: BlogProject[];
};

const BLOG_PROJECTS_URL = "https://alanyian.com/api/projects.json";

export async function getBlogProjects(): Promise<BlogProject[]> {
  try {
    const res = await fetch(BLOG_PROJECTS_URL, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      console.error(
        `getBlogProjects: ${BLOG_PROJECTS_URL} returned ${res.status} ${res.statusText}`,
      );
      return [];
    }
    const data: ApiResponse = await res.json();
    return data.projects;
  } catch (err) {
    console.error("getBlogProjects: fetch failed", err);
    return [];
  }
}
