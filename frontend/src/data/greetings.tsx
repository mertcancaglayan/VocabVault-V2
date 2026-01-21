export type LanguageKey = keyof typeof greetings;

export interface Greetings {
	EN: string[];
	TR: string[];
	PL: string[];
}

export const greetings: Greetings = {
	EN: [
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
	],

	TR: [
		"👋 Selam kaşif! Bugün yeni kelimeler keşfetmeye hazır mısın?",
		"✨ Kelime kelime, durdurulamaz oluyorsun!",
		"🌍 Merhaba dil maceracısı! Hadi başlayalım.",
		"🪄 Kelimeler sihirlidir—yeni bir büyü öğrenmeye hazır mısın?",
		"🚀 Kemerini bağla! Dil macerası başlıyor!",
		"🎉 Merhaba kelime sihirbazı! Öğrenme büyülerini yapalım.",
		"🌟 Her kelime, dil hayallerine bir adım daha!",
		"🗺️ Kelime kelime dünyayı gezmeye hazır mısın?",
		"💡 Eğlenceli bilgi: Bugün bir kelime öğrenmek süper güçtür!",
		"🥳 Selam dil kahramanı! Birkaç kelime fethedelim!",
	],

	PL: [
		"👋 Cześć odkrywco! Gotowy na nowe słowa?",
		"✨ Krok po kroku stajesz się nie do zatrzymania!",
		"🌍 Witaj, językowy podróżniku! Zanurzmy się.",
		"🪄 Słowa to magia — gotowy na nowe zaklęcie?",
		"🚀 Zapnij pasy! Czas na językową przygodę!",
		"🎉 Witaj, czarodzieju słów! Rzućmy kilka zaklęć nauki.",
		"🌟 Każde słowo przybliża Cię do językowych marzeń!",
		"🗺️ Gotowy podróżować po świecie słowo po słowie?",
		"💡 Ciekawostka: nauka jednego słowa dziennie to supermoc!",
		"🥳 Pozdrowienia, językowy bohaterze! Podbijmy kilka słów!",
	],
};

export function getLanguage(): LanguageKey {
	const stored = localStorage.getItem("wordvault2_fromLang")?.toUpperCase();

	if (stored === "EN" || stored === "TR" || stored === "PL") {
		return stored;
	}

	return "EN";
}

export function useRandomGreetings(): string {
	const lang = getLanguage();
	const list = greetings[lang];
	const index = Math.floor(Math.random() * list.length);
	return list[index];
}
