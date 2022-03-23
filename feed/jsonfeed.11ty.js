
const
	version = new URL("https://jsonfeed.org/version/1"),
	homepage = new URL("https://denizaksimsek.com"),
	avi = new URL("/assets/me.jpeg", homepage),
	myName = "Deniz Akşimşek"

module.exports = class {
	data() {
		return {
		  permalink: '/feed.json'
		}
	}
	
	render({ collections, permalink }) {
		return JSON.stringify({
			version,
			title: myName,
			icon: avi,
			home_page_url: homepage,
			feed_url: new URL(permalink, homepage),
			author: {
				name: myName,
				url: homepage,
				avatar: avi,
			},
			items: collections.posts.map(post => ({
				id: post.url,
				title: post.data.title,
				content_html: post.templateContent,
				url: new URL(post.url, homepage),
				summary: post.data.summary,
				image: new URL(post.data.photo && post.data.photo.src, homepage),
				date_published: this.isodatetime(post.date),
			}))
		})
	}
}

