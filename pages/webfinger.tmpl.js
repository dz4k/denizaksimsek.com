export const url = '/.well-known/webfinger';
export default async () =>
	JSON.stringify(
		await fetch(
			'https://indieweb.social/.well-known/webfinger?resource=acct:dz4k@indieweb.social',
		).then((res) => res.json()),
		null,
		2,
	);
