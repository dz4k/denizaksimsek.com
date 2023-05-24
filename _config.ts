import 'https://deno.land/x/dotenv@v3.2.0/load.ts';

import lume from 'lume/mod.ts';
import date from 'lume/plugins/date.ts';
import basePath from 'lume/plugins/base_path.ts';
import resolveUrls from 'lume/plugins/resolve_urls.ts';
import eta from 'lume/plugins/eta.ts';
import pug from 'lume/plugins/pug.ts';

import tr from 'https://deno.land/x/date_fns@v2.22.1/locale/tr/index.js';
import en_US from 'https://deno.land/x/date_fns@v2.22.1/locale/en-US/index.js';

import highlighting from './_build/highlighting.ts';
import prose, { markdownOptions } from './_build/prose.ts';
import myFilters from './_build/filters.ts';
import webc from './_build/webc.ts';

export default lume(
	{ location: new URL('https://denizaksimsek.com/') },
	{ markdown: markdownOptions },
)
	.ignore('README.md')
	.copy('assets')
	.copy('client')
	.copy('fileshare')
	.remoteFile("/assets/css/missing.css", "https://unpkg.com/missing.css@1.0.13/dist/missing.min.css")
	.remoteFile("/assets/css/missing-prism.css", "https://unpkg.com/missing.css@1.0.13/dist/missing-prism.min.css")
	.remoteFile("/assets/css/linja-pona.css", "https://davidar.github.io/linja-pona/stylesheet.css")
	.data('lang', 'en')
	.use(date({ locales: { tr, en_US } }))
	.use(highlighting())
	.use(basePath())
	.use(resolveUrls())
	.use(eta())
	.use(pug())
	.use(myFilters())
	.use(webc())
	.use(prose());
