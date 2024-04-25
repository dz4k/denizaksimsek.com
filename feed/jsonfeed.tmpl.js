const version = new URL('https://jsonfeed.org/version/1'),
	homepage = new URL('https://denizaksimsek.com'),
	avi = new URL('/assets/me.jpeg', homepage),
	myName = 'Deniz Akşimşek';

export const url = '/feed.json';

export const renderOrder = 1;

export default ({ search, comp }, filters) => {
	return JSON.stringify({
		version,
		title: myName,
		icon: avi,
		home_page_url: homepage,
		feed_url: new URL(url, homepage),
		author: {
			name: myName,
			url: homepage,
			avatar: avi,
		},
		items: search.pages("page.src.path^=/entries", "date=desc").map((post) => ({
			id: filters.url(post.data.url),
			title: post.data.name ?? post.data.title,
			content_html: filters.htmlUrl(post.content),
			content_text: post.data.content,
			url: new URL(post.data.url, homepage),
			summary: post.data.summary,
			image: post.data.photo
				? new URL(post.data.photo.src, homepage)
				: undefined,
			date_published: comp.date({ date: post.data.date, iso: true }),
		})),
	});
};
