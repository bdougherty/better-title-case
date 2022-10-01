declare module 'better-title-case' {
	interface TitleCaseOptions {
		/**
		 * Additional words to exclude from capitalization.
		 * @default []
		 */
		excludedWords?: string[];

		/**
		 * Disable the usage of the default list of excluded words.
		 * @default true
		 */
		useDefaultExcludedWords?: boolean;

		/**
		 * Maintain extra whitespace between words. By default, all whitespace between words is collapsed to a single space.
		 * @default false
		 */
		preserveWhitespace?: boolean;
	}

	/**
	 * Convert a string to title case based on the Daring Fireball rules.
	 */
	export default function titleCase(string?: string, options?: TitleCaseOptions): string;
}
