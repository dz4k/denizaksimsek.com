import * as path from 'https://deno.land/std@0.158.0/path/mod.ts';
import type { Page, Site } from 'lume/core.ts';

import "https://deno.land/std@0.158.0/node/global.ts";
import { WebC } from 'npm:@11ty/webc@0.4.5';

export default () => {
	return (site: Site) => {
		site.process('*', async (page: Page) => {
			if (page.dest.ext !== '.html') return;
            console.log(page.dest.path);

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
