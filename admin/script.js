import { API_URL, ADMIN_API_KEY } from "../admin/config.js";

const getWords = async () => {
	const response = await fetch(`${API_URL}/api/v1/admin/words`);
	if (!response.ok) {
		throw new Error(`Response status: ${response.status}`);
	}
	return response.json();
};

const data = await getWords();
const words = data.words;

const tableHeader = document.querySelector(".table-header");
const section = document.getElementById("admin-section");

const languages = Object.keys(words[0]?.translations ?? {});

tableHeader.innerHTML = `
		<span>ID</span>
		<span>Category</span>
		${languages.map((l) => `<span>${l.toUpperCase()}</span>`).join("")}
		<span>Actions</span>
`;

section.innerHTML = words
	.map((word) => {
		const translationsHTML = languages
			.map((lang) => `<input type="text" value="${word.translations[lang] ?? ""}" data-lang="${lang}" />`)
			.join("");

		return `
			<div class="table-row">
				<span class="id">${word._id}</span>
				<span>${word.sub_category_label}</span>
				${translationsHTML}
				<button class="save-btn"  data-id="${word._id}">Save</button>
			</div>
		`;
	})
	.join("");

async function patchWord(wordId, translations) {
	const myHeaders = new Headers();

	myHeaders.append("Content-Type", "application/json");
	myHeaders.append("x-api-key",ADMIN_API_KEY);
	

	const response = await fetch(`${API_URL}/api/v1/admin/words/${wordId}`, {
		method: "PATCH",
		headers: myHeaders,
		body: JSON.stringify({ translations }),
	});

	if (!response.ok) {
		console.error("Patch failed:", response.status);
		return;
	}

	const data = await response.json();

	const updatedID = data._id;

	showMessage(updatedID);
}

function showMessage(updatedID) {
	alert(`Updated: ${updatedID}`);
}

section.addEventListener("click", (e) => {
	if (!e.target.classList.contains("save-btn")) return;

	const row = e.target.closest(".table-row");
	const wordId = e.target.dataset.id;

	const inputs = row.querySelectorAll("input[data-lang]");
	const translations = {};

	inputs.forEach((input) => {
		const lang = input.dataset.lang;
		translations[lang] = input.value.trim();
	});

	patchWord(wordId, translations);
});
