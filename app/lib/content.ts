// Thin content loader — reads the plain Markdown+frontmatter files in
// content/ at build time and returns typed objects the pages render. This is
// deliberately not a general Markdown/CMS library: the frontmatter shape
// supported is exactly what this site's content needs (flat string fields,
// string lists, and repeating H2 sections for project/research bodies), per
// CLAUDE.md rule 1 (no overengineering) and STRUCTURE.md §3 ("editing a file
// in the repo is the CMS").
//
// To change what's on the site, edit a file in content/ — see
// CONTENT_GUIDE.md for exactly which file controls which text. Nothing in
// this file should ever contain actual site copy.

import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content");

// Splits a Markdown file into its frontmatter block and body text.
function splitFrontmatter(raw: string): { frontmatter: string; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    return { frontmatter: "", body: raw.trim() };
  }
  return { frontmatter: match[1], body: match[2].trim() };
}

// Parses the constrained YAML subset used in this project's frontmatter:
// `key: value` strings and `key:` followed by `  - item` string lists.
// Not a general YAML parser — deliberately doesn't support nesting beyond
// this, since no content file here needs more than that.
function parseFrontmatter(frontmatter: string): Record<string, string | string[]> {
  const result: Record<string, string | string[]> = {};
  const lines = frontmatter.split(/\r?\n/);
  let currentListKey: string | null = null;

  for (const line of lines) {
    if (line.trim() === "") continue;

    const listItemMatch = line.match(/^\s+-\s+(.*)$/);
    if (listItemMatch && currentListKey) {
      (result[currentListKey] as string[]).push(listItemMatch[1].trim());
      continue;
    }

    const keyMatch = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (keyMatch) {
      const [, key, value] = keyMatch;
      if (value === "") {
        result[key] = [];
        currentListKey = key;
      } else {
        result[key] = value.trim();
        currentListKey = null;
      }
    }
  }

  return result;
}

function readMarkdownFile(filePath: string) {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { frontmatter, body } = splitFrontmatter(raw);
  return { data: parseFrontmatter(frontmatter), body };
}

function str(data: Record<string, string | string[]>, key: string): string {
  const value = data[key];
  return typeof value === "string" ? value : "";
}

function strList(data: Record<string, string | string[]>, key: string): string[] {
  const value = data[key];
  return Array.isArray(value) ? value : [];
}

// Splits a project/research body of repeating "## Problem / ## Solution /
// ## Result" sections into structured triples, in source order.
function parseProblemSolutionResult(body: string) {
  const firstHeadingIndex = body.search(/\r?\n##\s+/);
  const lede = (firstHeadingIndex === -1 ? body : body.slice(0, firstHeadingIndex)).trim();
  const rest = firstHeadingIndex === -1 ? "" : body.slice(firstHeadingIndex);
  const headed = rest
    .split(/\r?\n##\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  const details: { problem: string; solution: string; result: string }[] = [];
  for (let i = 0; i < headed.length; i += 3) {
    const problem = headed[i]?.replace(/^Problem\r?\n/, "").trim() ?? "";
    const solution = headed[i + 1]?.replace(/^Solution\r?\n/, "").trim() ?? "";
    const result = headed[i + 2]?.replace(/^Result\r?\n/, "").trim() ?? "";
    if (problem || solution || result) {
      details.push({ problem, solution, result });
    }
  }

  return { lede, details };
}

export type Identity = {
  name: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  image: string;
  positioning: string;
  story: string;
  thread: string;
};

export function getIdentity(): Identity {
  const { data, body } = readMarkdownFile(path.join(CONTENT_DIR, "identity.md"));
  const sections = body.replace(/^##\s+/, "").split(/\r?\n##\s+/).map((s) => s.trim());
  const byHeading: Record<string, string> = {};
  for (const section of sections) {
    const [heading, ...rest] = section.split(/\r?\n/);
    byHeading[heading.trim().toLowerCase()] = rest.join("\n").trim();
  }

  return {
    name: str(data, "name"),
    location: str(data, "location"),
    email: str(data, "email"),
    github: str(data, "github"),
    linkedin: str(data, "linkedin"),
    image: str(data, "image"),
    positioning: byHeading["positioning statement"] ?? byHeading["positioning"] ?? "",
    story: byHeading["story"] ?? "",
    thread: byHeading["thread"] ?? "",
  };
}

export type NavLink = { href: string; label: string };

export function getNav(): NavLink[] {
  // nav.md's frontmatter is a list of objects (label + href per item), which
  // is one level deeper than the flat parser above handles, so it gets its
  // own small pass here rather than growing that parser to fit one file.
  const raw = fs.readFileSync(path.join(CONTENT_DIR, "nav.md"), "utf-8");
  const { frontmatter } = splitFrontmatter(raw);
  const links: NavLink[] = [];
  let current: Partial<NavLink> = {};

  for (const line of frontmatter.split(/\r?\n/)) {
    const itemStart = line.match(/^\s*-\s+label:\s*(.*)$/);
    const hrefLine = line.match(/^\s+href:\s*(.*)$/);
    if (itemStart) {
      if (current.label && current.href) links.push(current as NavLink);
      current = { label: itemStart[1].trim() };
    } else if (hrefLine && current.label) {
      current.href = hrefLine[1].trim();
    }
  }
  if (current.label && current.href) links.push(current as NavLink);

  return links;
}

export type HomeTaglines = { hiring: string; research: string };

export function getHomeTaglines(): HomeTaglines {
  const { data } = readMarkdownFile(path.join(CONTENT_DIR, "home.md"));
  return {
    hiring: str(data, "hiringTagline"),
    research: str(data, "researchTagline"),
  };
}

export type Project = {
  slug: string;
  title: string;
  dates: string;
  featured: boolean;
  summary: string;
  outcome: string;
  stack: string[];
  details: { problem: string; solution: string; result: string }[];
  keywords: string[];
};

export function getProjects(): Project[] {
  const dir = path.join(CONTENT_DIR, "projects");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md") && !f.startsWith("_"));

  const projects = files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const { data, body } = readMarkdownFile(path.join(dir, file));
    const { lede, details } = parseProblemSolutionResult(body);

    return {
      slug,
      title: str(data, "title"),
      dates: str(data, "dates"),
      featured: str(data, "featured") === "true",
      summary: lede,
      outcome: str(data, "outcome"),
      stack: strList(data, "stack"),
      details,
      keywords: strList(data, "keywords"),
    };
  });

  // Fixed display order (directory reads aren't guaranteed alphabetical
  // across platforms) — featured-first, matching REPORT.md's ordering.
  const order = [
    "careerflow-ai",
    "datamind",
    "ww2-historical-rag-pipeline",
    "ottawa-rental-market-etl",
    "pistachio-dataset-analysis",
    "dallas-police-incident-analysis",
    "gesture-based-multimodal-robotic-control",
  ];
  return projects.sort((a, b) => order.indexOf(a.slug) - order.indexOf(b.slug));
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}

export type ResearchEntry = {
  slug: string;
  title: string;
  role: string;
  dates: string;
  summary: string;
  outcome: string;
  stack: string[];
};

export function getResearchEntries(): ResearchEntry[] {
  const dir = path.join(CONTENT_DIR, "research");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md") && !f.startsWith("_"));

  const entries = files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const { data, body } = readMarkdownFile(path.join(dir, file));

    return {
      slug,
      title: str(data, "title"),
      role: str(data, "role"),
      dates: str(data, "dates"),
      summary: body,
      outcome: str(data, "outcome"),
      stack: strList(data, "stack"),
    };
  });

  const order = ["vit-vs-cnn-fire-detection", "ct-reconstruction"];
  return entries.sort((a, b) => order.indexOf(a.slug) - order.indexOf(b.slug));
}

export type Note = {
  slug: string;
  title: string;
  dates: string;
  published: boolean;
  body: string;
};

// No essays exist yet — content/notes/ only holds _template.md, which is
// skipped (leading underscore). Once real essay files are added, this
// returns them the same way getProjects() does.
export function getNotes(): Note[] {
  const dir = path.join(CONTENT_DIR, "notes");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md") && !f.startsWith("_"));

  return files
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const { data, body } = readMarkdownFile(path.join(dir, file));
      return {
        slug,
        title: str(data, "title"),
        dates: str(data, "dates"),
        published: str(data, "published") === "true",
        body,
      };
    })
    .filter((note) => note.published);
}

export function getNote(slug: string): Note | undefined {
  const filePath = path.join(CONTENT_DIR, "notes", `${slug}.md`);
  if (!fs.existsSync(filePath) || slug.startsWith("_")) return undefined;
  const { data, body } = readMarkdownFile(filePath);
  const published = str(data, "published") === "true";
  if (!published) return undefined;
  return { slug, title: str(data, "title"), dates: str(data, "dates"), published, body };
}
