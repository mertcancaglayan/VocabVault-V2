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

const tableHeadRow = document.getElementById("table-head-row");
const tbody = document.getElementById("admin-section");

const languages = Object.keys(words[0]?.translations ?? {});

tableHeadRow.innerHTML = `
	<th scope="col">ID</th>
<th scope="col" class="category-header">
	<span>Category</span>
	<select id="categoryFilter">
		<option value="">All</option>
	</select>
</th>
	${languages.map((l) => `<th scope="col">${l.toUpperCase()}</th>`).join("")}
	<th scope="col">Actions</th>
`;

tbody.innerHTML = words
	.map((word) => {
		const translationsHTML = languages
			.map(
				(lang) => `
					<td>
						<input
							type="text"
							value="${word.translations[lang] ?? ""}"
							data-lang="${lang}"
						/>
					</td>
				`,
			)
			.join("");

		return `
			<tr class="table-row">
				<td class="id">${word._id}</td>
				<td>${word.sub_category_label}</td>
				${translationsHTML}
				<td>
					<button class="save-btn" data-id="${word._id}">Save</button>
				</td>
			</tr>
		`;
	})
	.join("");

async function patchWord(wordId, translations) {
	const response = await fetch(`${API_URL}/api/v1/admin/words/${wordId}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			"x-api-key": ADMIN_API_KEY,
		},
		body: JSON.stringify({ translations }),
	});

	if (!response.ok) {
		console.error("Patch failed:", response.status);
		return;
	}

	const data = await response.json();
	alert(`Updated: ${data._id}`);
}

tbody.addEventListener("click", (e) => {
	if (!e.target.classList.contains("save-btn")) return;

	const row = e.target.closest("tr");
	const wordId = e.target.dataset.id;

	const inputs = row.querySelectorAll("input[data-lang]");
	const translations = {};

	inputs.forEach((input) => {
		translations[input.dataset.lang] = input.value.trim();
	});

	patchWord(wordId, translations);
});

const categoryFilter = document.getElementById("categoryFilter");

const subCategories = [...new Set(words.map((word) => word.sub_category_label))].sort();

subCategories.forEach((category) => {
	const option = document.createElement("option");
	option.value = category;
	option.textContent = category;
	categoryFilter.appendChild(option);
});

categoryFilter.addEventListener("change", () => {
	const selected = categoryFilter.value;

	document.querySelectorAll("#admin-section tr").forEach((row) => {
		const categoryCell = row.children[1].textContent.trim();

		const match = !selected || categoryCell === selected;
		
		row.style.display = match ? "" : "none";
	});
});
