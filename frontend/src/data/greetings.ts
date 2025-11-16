export type Greeting = string;

export const greetings: Greeting[] = [
	"👋 Hey explorer! Ready to unlock some new words today?",
	"✨ One word at a time, you’re becoming unstoppable!",
	"🌍 Hello, language adventurer! Let’s dive in.",
	"🪄 Words are magic—ready to learn a new spell?",
	"🚀 Buckle up! It’s time for a language adventure!",
	"🎉 Hello, word wizard! Let’s cast some learning spells.",
	"🌟 Every word is a step closer to your language dreams!",
	"🗺️ Ready to travel the world one word at a time?",
	"💡 Fun fact: learning a word today is a superpower!",
	"🥳 Greetings, language hero! Let’s conquer some words!",
];

export function getRandomGreetings(): Greeting {
	return greetings[Math.floor(Math.random() * greetings.length)];
}
