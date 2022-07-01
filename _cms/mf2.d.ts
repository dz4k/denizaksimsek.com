export type Types = [string, ...string[]];

export interface MF2 {
	items: Microformat[];
	rels: {
		[k: string]: [string, ...string[]];
	};
	'rel-urls': {
		[k: string]: {
			rels: string[];
			hreflang?: string;
			media?: string;
			title?: string;
			type?: string;
			[k: string]: unknown;
		};
	};
}
export interface Microformat {
	type: Types;
	properties: Properties;
	children?: Microformat[];
	id?: string;
	lang?: string;
}
export interface Properties {
	/**
	 * This interface was referenced by `Properties`'s JSON-Schema definition
	 * via the `patternProperty` "^([0-9a-z]+-)?[a-z]+(-[a-z]+)*$".
	 */
	[k: string]: (string | HtmlProperty | ComplexProperty | ImageProperty)[];
}
export interface HtmlProperty {
	html: string;
	value: string;
}
export interface ComplexProperty {
	type: Types;
	properties: Properties;
	value: string;
	html?: string;
	id?: string;
}
export interface ImageProperty {
	value: string;
	alt: string;
}
