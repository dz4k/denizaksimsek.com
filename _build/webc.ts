import * as path from 'https://deno.land/std@0.158.0/path/mod.ts';
import type { Page, Site } from 'lume/core.ts';
import { WebC } from 'https://github.com/11ty/webc/raw/main/webc.js';

export default () => {
	return (site: Site) => {
		site.process('*', async (page: Page) => {
            console.log(page.dest.ext)
			if (page.dest.ext === '.html') return;

			const webc = new WebC();
			
            webc.defineComponents(
				path.join(site.includesLoader.includes, 'webc/**.webc'),
			);

            webc.setContent(page.content, page.dest.path + page.dest.ext)

            const { html } = await webc.compile(page.data);

            page.content = html;
		});
	};
};
