import { Page } from "lume/core.ts";

export const
layout = 'layouts/entry.eta',
templateEngine = 'eta,md',
renderOrder = -10,
content = '',
date = "git created",
url = (page: Page) => {
	const [, _entriesDir, ...rest] = page.src.path.split("/");
	return '/' + rest.join('/') + '/';
};
