import type { Site, Page } from "https://deno.land/x/lume@v1.7.1/core.ts";
import { exec } from "./util.ts";

export default () => {
    return (site: Site) => {
        site.process("*", async (page: Page) => {
            // Pull content dates from git.
        
            const gitLog = await exec([
                "git", "log", // git commits
                "--follow", // handle renames
                "--format=%aI", // commit date, as ISO date
                "." + page.src.path + page.src.ext // for this file
            ])
        
            const dates = gitLog.split("\n")
            dates.pop() // remove trailing newline
        
            // Page has no explicit last-modified set.
            if (!("last modified" in page.data) && dates.length > 0) {
                if (dates.length > 1) page.data["last modified"] = new Date(dates[0])
            }
        
            // Page has not explicit date set.
            if (!page.data.date || page.data.date === page.src.created) {
                page.data.date ??= new Date(dates[dates.length - 1])
            }
        })
    }
}
