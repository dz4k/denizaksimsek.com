import { Page, Site } from 'lume/core.ts';

/**
 * Implement Wiki-style links and backlinks for pages under `/wiki/`.
 */
export default () => {
	return (site: Site) => {
		site.preprocess(['.md'], (page: Page) => {
			const [newContent, links] = renderWikilinks(
				page.data.content as string,
				page.data.lang as string,
			);
			page.data.content = newContent;
			page.data.internalLinks = links.join(' ');
		});
	};
};

const markdownUrlRE = /^\[[^\]]+\]: (\/[^\s]+)$/;
const wikilinkRE = /\[\[([^\]]+)\]\]/g;

function renderWikilinks(markdown: string, lang: string): [string, string[]] {
	const links: string[] = [];
	const markdownOut = markdown.replace(wikilinkRE, (match, text) => {
		const url = `/wiki/${lang}/${encodeURIComponent(text)}/`;
		links.push(url);
		return `[${text}](${url})`;
	});
	return [markdownOut, links];
}
