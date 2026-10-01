// Builds the GitHub Pages version into docs/ (served from https://<user>.github.io/munir-e-s-/).
// Run: npm run build:pages, then commit and push. In the repo: Settings → Pages → main branch, /docs folder.
import { execSync } from "node:child_process";
import { copyFileSync, writeFileSync } from "node:fs";

const base = process.env.PAGES_BASE || "/munir-e-s-/"; // = the GitHub repo name
execSync(`npx vite build --base=${base} --outDir docs --emptyOutDir`, { stdio: "inherit" });
// GitHub Pages has no URL rewrites: serving index.html as 404.html lets links like /products/indus-bracket-fan open directly.
copyFileSync("docs/index.html", "docs/404.html");
writeFileSync("docs/.nojekyll", "");
console.log(`GitHub Pages build ready in docs/ (base ${base})`);
