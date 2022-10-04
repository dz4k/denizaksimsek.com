import { Page } from "lume/core.ts";

export const layout = 'layouts/entry.eta',
	templateEngine = 'eta,md',
	renderOrder = -10,
	content = '',
	tags = ["blog"],
	date = "git created",
	url = (page: Page) => {
		const [, _entriesDir, ...rest] = page.src.path.split("/");
		if (rest[0] === 'blog') rest.shift();
		const href = '/' + rest.join('/') + '/';
		return href;
	};
