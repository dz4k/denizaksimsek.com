const assets = [
	[
		'https://the.missing.style/v0.0.5/missing.min.css',
		'/assets/css/missing.css',
	],
	[
		'https://the.missing.style/v0.0.5/missing-prism.min.css',
		'/assets/css/missing-prism.css',
	],
];

export default function* () {
	for (const [fetchHref, outputUrl] of assets) {
		yield {
			url: outputUrl,
			content: fetch(fetchHref).then((res) => res.text()),
		};
	}
}
