import test from 'ava';
import titleCase from './index.js';

const convert = test.macro({
	exec(t, input, expected) {
		t.is(titleCase(input), expected);
	},
	title(_, input) {
		return `Properly capitalizes “${input}”`;
	}
});

test(convert, undefined, '');
test(convert, '', '');
test(
	convert,
	`For step-by-step directions email someone@gmail.com`,
	`For Step-by-Step Directions Email someone@gmail.com`
);
test(
	convert,
	`2lmc Spool: 'Gruber on OmniFocus and Vapo(u)rware'`,
	`2lmc Spool: 'Gruber on OmniFocus and Vapo(u)rware'`
);
test(convert, `Have you read “The Lottery”?`, `Have You Read “The Lottery”?`);
test(convert, `your hair[cut] looks (nice)`, `Your Hair[cut] Looks (Nice)`);
test(
	convert,
	`People probably won't put http://foo.com/bar/ in titles`,
	`People Probably Won't Put http://foo.com/bar/ in Titles`
);
test(
	convert,
	`Scott Moritz and TheStreet.com’s million iPhone la‑la land`,
	`Scott Moritz and TheStreet.com’s Million iPhone La‑La Land`
);
test(convert, `BlackBerry vs. iPhone`, `BlackBerry vs. iPhone`);
test(
	convert,
	`Notes and observations regarding Apple’s announcements from ‘The Beat Goes On’ special event`,
	`Notes and Observations Regarding Apple’s Announcements From ‘The Beat Goes On’ Special Event`
);
test(
	convert,
	`Read markdown_rules.txt to find out how _underscores around words_ will be interpretted`,
	`Read markdown_rules.txt to Find Out How _Underscores Around Words_ Will Be Interpretted`
);
test(
	convert,
	`Q&A with Steve Jobs: 'That's what happens in technology'`,
	`Q&A With Steve Jobs: 'That's What Happens in Technology'`
);
test(convert, `What is AT&T's problem?`, `What Is AT&T's Problem?`);
test(convert, `Apple deal with AT&T falls through`, `Apple Deal With AT&T Falls Through`);
test(convert, `this v that`, `This v That`);
test(convert, `this vs that`, `This vs That`);
test(convert, `this v. that`, `This v. That`);
test(convert, `this vs. that`, `This vs. That`);
test(
	convert,
	`The SEC's Apple probe: what you need to know`,
	`The SEC's Apple Probe: What You Need to Know`
);
test(
	convert,
	`'by the way, small word at the start but within quotes.'`,
	`'By the Way, Small Word at the Start but Within Quotes.'`
);
test(
	convert,
	`Small word at end is nothing to be afraid of`,
	`Small Word at End Is Nothing to Be Afraid Of`
);
test(
	convert,
	`Starting sub-phrase with a small word: a trick, perhaps?`,
	`Starting Sub-Phrase With a Small Word: A Trick, Perhaps?`
);
test(
	convert,
	`Sub-phrase with a small word in quotes: 'a trick, perhaps?'`,
	`Sub-Phrase With a Small Word in Quotes: 'A Trick, Perhaps?'`
);
test(
	convert,
	`Sub-phrase with a small word in quotes: "a trick, perhaps?"`,
	`Sub-Phrase With a Small Word in Quotes: "A Trick, Perhaps?"`
);
test(convert, `"Nothing to Be Afraid of?"`, `"Nothing to Be Afraid Of?"`);
test(convert, `a thing`, `A Thing`);
test(
	convert,
	`Dr. Strangelove (or: how I Learned to Stop Worrying and Love the Bomb)`,
	`Dr. Strangelove (Or: How I Learned to Stop Worrying and Love the Bomb)`
);
test(convert, `  this is trimming`, `This Is Trimming`);
test(convert, `this is trimming  `, `This Is Trimming`);
test(convert, `  this is trimming  `, `This Is Trimming`);
test(convert, `this is  removing extra space`, `This Is Removing Extra Space`);
test(convert, `IF IT’S ALL CAPS, FIX IT`, `If It’s All Caps, Fix It`);
test(convert, `___if emphasized, keep that way___`, `___If Emphasized, Keep That Way___`);
test(
	convert,
	`What could/should be done about slashes?`,
	`What Could/Should Be Done About Slashes?`
);
test(
	convert,
	`Never touch paths like /var/run before/after /boot`,
	`Never Touch Paths Like /var/run Before/After /boot`
);

test('exclusions', (t) => {
	t.is(
		titleCase('Nothing to Be Afraid of?', {
			excludedWords: ['be', 'of']
		}),
		'Nothing to be Afraid Of?'
	);

	t.is(
		titleCase('Nothing to Be Afraid of?', {
			excludedWords: ['be', 'of'],
			useDefaultExcludedWords: false
		}),
		'Nothing To be Afraid Of?'
	);
});

test('preserve whitespace', (t) => {
	t.is(
		titleCase('this  is  preserving   extra space', {
			preserveWhitespace: true
		}),
		'This  Is  Preserving   Extra Space'
	);
});
