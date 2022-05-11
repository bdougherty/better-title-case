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
	{ excludedWords = [], useDefaultExcludedWords = true } = {}
) {
	if (string.toUpperCase() === string) {
		string = string.toLowerCase();
	}

	if (useDefaultExcludedWords) {
		excludedWords.push(...alwaysLowercase);
	}

	const words = string.trim().split(/\s+/);

	const capitalizedWords = words.map((word, index, array) => {
		const isFirstWird = index === 0;
		const isLastWord = index === words.length - 1;
		const isEmail = /.+@.+\..+/.test(word);
		const isFilePath = /^(\/[\w.]+)+/.test(word);
		const isFileName = /^\w+\.\w{1,3}$/.test(word);
		const hasInternalCapital = /(?![‑–—-])[a-z]+[A-Z].*/.test(word);

		const previousWord = index > 1 ? array[index - 1] : '';
		const startOfSubPhrase = index > 1 && [...previousWord].pop() === ':';

		if (isEmail || isUrl(word) || isFilePath || isFileName || hasInternalCapital) {
			return word;
		}

		const hasHyphen = word.match(/[‑–—-]/g);
		if (hasHyphen) {
			const isMultiPart = hasHyphen.length > 1;
			const [hyphenCharacter] = hasHyphen;

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

		if (isFirstWird || isLastWord) {
			return capitalize(word);
		}

		if (!startOfSubPhrase && excludedWords.includes(word.toLowerCase())) {
			return word.toLowerCase();
		}

		return capitalize(word);
	});

	return capitalizedWords.join(' ');
}
