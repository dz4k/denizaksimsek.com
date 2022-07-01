export const layout = './index.eta';

export default function* () {
	for (const lang of ['tr', 'en', 'tok']) {
		yield {
			lang,
			url: '/' + lang + '/',
			content: lang,
		};
	}
}
