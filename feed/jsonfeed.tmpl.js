
const
	version = new URL("https://jsonfeed.org/version/1"),
	homepage = new URL("https://denizaksimsek.com"),
	avi = new URL("/assets/me.jpeg", homepage),
	myName = "Deniz Akşimşek"

export const url = '/feed.json'

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
		items: search.pages("blog", "date=desc").map(post => ({
			id: filters.url(post.data.url),
			title: post.data.name ?? post.data.title
				?? filters.peekHtml(filters.md(post.data.content)),
			content_html: filters.htmlUrl(post.content),
			content_text: post.data.content,
			url: new URL(post.url, homepage),
			summary: post.data.summary,
			image: new URL(post.data.photo && post.data.photo.src, homepage),
			date_published: comp.date({ date: post.date, iso: true }),
		}))
	})
}

