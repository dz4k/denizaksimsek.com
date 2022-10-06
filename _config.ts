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

export default lume(
	{ location: new URL('https://denizaksimsek.com/') },
	{ markdown: markdownOptions },
)
	.ignore('README.md')
	.copy('assets')
	.copy('client')
	.remoteFile("/assets/css/missing.css", "https://the.missing.style/v0.0.5/missing.min.css")
	.remoteFile("/assets/css/missing-prism.css", "https://the.missing.style/v0.0.5/missing-prism.min.css")
	.remoteFile("/assets/css/linja-pona.css", "https://davidar.github.io/linja-pona/stylesheet.css")
	.data('lang', 'en')
	.use(date({ locales: { tr, en_US } }))
	.use(highlighting())
	.use(basePath())
	.use(resolveUrls())
	.use(eta())
	.use(pug())
	.use(myFilters())
	.use(prose());
