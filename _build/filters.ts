import type { Site } from 'lume/core.ts';

/**
 * Includes the filters:
 *   - `repeat`, a loop with extra features
 */
export default () => {
	return (site: Site) => {
		site.filter('repeat', repeat);
	};
};

interface LoopContext {
	i: number;
	first: boolean;
	last?: boolean;
	sep(s: string): string;
}

function repeat<T>(
	root: Iterable<T>,
	cb: (t: T, loop: LoopContext) => void,
): void {
	// deno-lint-ignore no-explicit-any
	function hasLength(a: any): a is { length: number } {
		return 'length' in a && typeof a.length === 'number';
	}

	let i = 0;
	for (const t of root) {
		const ctx: LoopContext = {
			i,
			first: i === 0,
			sep(s) {
				return this.last ? '' : s;
			},
		};

		if (hasLength(root)) {
			ctx.last = i === root.length - 1;
		}

		cb(t, ctx);
		i++;
	}
}
