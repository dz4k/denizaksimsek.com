function post(filename, folder, body) {
	open(
		`https://github.com/dz4k/denizaksimsek.com/` +
			`new/master/entries/${folder}/new` +
			`?filename=${filename}` +
			`&value=${encodeURIComponent(body)}`,
	);
}

function blogPost(body) {
	const date = new Date();
	const folder = `blog/${date.getFullYear()}`;
	const filename = date.toISOString() + '.md';

	post(filename, folder, body);
}

addEventListener('blog-post', (e) => {
	blogPost(e.detail.content);
});
