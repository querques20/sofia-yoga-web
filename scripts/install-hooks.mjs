/**
 * Points git at the committed `.githooks/`, so everyone gets the hooks by
 * installing dependencies, with no extra package. Stays silent without a git
 * repo (a tarball, a CI checkout without `.git`): this never breaks an install.
 */
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";

if (!existsSync(new URL("../.git", import.meta.url))) process.exit(0);

try {
  execFileSync("git", ["config", "core.hooksPath", ".githooks"], { stdio: "ignore" });
} catch {
  // No git on the PATH, or a repo in an odd state: let the install continue.
}
