import * as path from 'https://deno.land/std@0.158.0/path/mod.ts';
import type {
	Data,
	Engine,
	Helper,
	HelperOptions,
	Page,
	Site,
} from 'lume/core.ts';

import 'https://github.com/denoland/deno_std/raw/main/node/fs.ts';
import 'https://github.com/denoland/deno_std/raw/main/node/path.ts';
import 'https://github.com/denoland/deno_std/raw/main/node/crypto.ts';
import 'https://github.com/denoland/deno_std/raw/main/node/stream.ts';
import { WebC } from 'npm:@11ty/webc@0.4.5';

interface WebCEngineOptions {
	components: string;
}
export class WebCEngine implements Engine {
	cssMap = new Map<string, string>();
	jsMap = new Map<string, string>();
	helpers = new Map<string, Helper>();

	constructor(readonly options: WebCEngineOptions) {}

	async render(
		content: unknown,
		data?: Data | undefined,
		filename?: string | undefined,
	) {
		const webc = new WebC();
		webc.setBundlerMode(true);
		webc.defineComponents(this.options.components);
		for (const [key, val] of this.helpers) {
			webc.setHelper(key, val);
		}
		webc.setContent(content, filename);

		const { html, css, js } = await webc.compile({ data });

		if (filename) {
			this.cssMap.set(filename, css);
			this.jsMap.set(filename, js);
		}

		return html;
	}

	renderSync(
		_content: unknown,
		_data?: Data | undefined,
		_filename?: string | undefined,
	): string {
		throw 'Cannot render webc synchronously';
	}

	addHelper(name: string, fn: Helper, _options: HelperOptions): void {
		this.helpers.set(name, fn);
	}

	deleteCache(file: string): void {
		this.cssMap.delete(file);
		this.jsMap.delete(file);
	}
}

export default (options: { components?: string } = {}) => {
	return (site: Site) => {
		const includesPath = options.components ?? path.join(
			site.includesLoader.includes,
			'webc/**.webc',
		);
		const webcEngine = new WebCEngine({ components: includesPath })

		site.engine([".webc"], webcEngine)

		site.helper("getCSS", (filename) => webcEngine.cssMap.get(filename), { type: "filter" });
		site.helper("getJS", (filename) => webcEngine.jsMap.get(filename), { type: "filter" });
	};
};
