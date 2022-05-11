const alwaysLowercase = [
	'a',
	'an',
	'and',
	'at',
	'but',
	'by',
	'for',
	'in',
	'nor',
	'of',
	'on',
	'or',
	'so',
	'the',
	'to',
	'up',
	'yet',
	'v',
	'v.',
	'vs',
	'vs.'
];

const containers = new Set(['(', '[', '{', '"', `'`, '_']);

const isEmail = /.+@.+\..+/;
const isFilePath = /^(\/[\w.]+)+/;
const isFileName = /^\w+\.\w{1,3}$/;
const hasInternalCapital = /(?![‑–—-])[a-z]+[A-Z].*/;
const hasHyphen = /[‑–—-]/g;

function isUrl(url) {
	try {
		const parsed = new URL(url);
		return Boolean(parsed.hostname);
	} catch {
		return false;
	}
}

function capitalize(string) {
	if (string.length === 0) {
		return string;
	}

	const letters = [...string];
	const firstLetter = letters.shift();

	if (containers.has(firstLetter)) {
		return `${firstLetter}${capitalize(letters)}`;
	}

	return `${firstLetter.toUpperCase()}${letters.join('')}`;
}

export default function titleCase(
	string = '',
	{ excludedWords = [], useDefaultExcludedWords = true, preserveWhitespace = false } = {}
) {
	if (string.toUpperCase() === string) {
		string = string.toLowerCase();
	}

	if (useDefaultExcludedWords) {
		excludedWords.push(...alwaysLowercase);
	}

	const words = string.trim().split(/(\s+)/);

	const capitalizedWords = words.map((word, index, array) => {
		if (/\s+/.test(word)) {
			return preserveWhitespace ? word : ' ';
		}

		if (
			isEmail.test(word) ||
			isUrl(word) ||
			isFilePath.test(word) ||
			isFileName.test(word) ||
			hasInternalCapital.test(word)
		) {
			return word;
		}

		const hyphenMatch = word.match(hasHyphen);

		if (hyphenMatch) {
			const isMultiPart = hyphenMatch.length > 1;
			const [hyphenCharacter] = hyphenMatch;

			return word
				.split(hyphenCharacter)
				.map((subWord) => {
					if (isMultiPart && excludedWords.includes(subWord.toLowerCase())) {
						return subWord;
					}

					return capitalize(subWord);
				})
				.join(hyphenCharacter);
		}

		if (word.includes('/')) {
			return word
				.split('/')
				.map((part) => capitalize(part))
				.join('/');
		}

		const isFirstWord = index === 0;
		const isLastWord = index === words.length - 1;
		const previousWord = index > 1 ? array[index - 2] : '';
		const startOfSubPhrase = index > 1 && previousWord.endsWith(':');

		if (
			!isFirstWord &&
			!isLastWord &&
			!startOfSubPhrase &&
			excludedWords.includes(word.toLowerCase())
		) {
			return word.toLowerCase();
		}

		return capitalize(word);
	});

	return capitalizedWords.join('');
}
