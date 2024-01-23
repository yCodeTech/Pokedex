import * as util from "../utility.js";
import {Card} from "./card.js";
import {favourite, setIconForFavourited} from "./favouriting.js";
import {searchFilters} from "./search.js";

export function displayAll(data, className = "all-pokemon") {
	const pokemonContainer = document.querySelector(".pokemon");
	pokemonContainer.addClass(className);

	let pokemonArray = data;

	console.log(pokemonArray);

	pokemonArray.forEach((pokemon) => {
		const id = pokemon.id.addLeadingZeros();

		const card = new Card("li", {
			class: "card animate__animated animate__fadeInUp",
			id: pokemon.name,
			"data-number": id,
		});
		pokemonContainer.appendChild(card.element);

		card.addContent("name", pokemon.name.toSentenceCase());
		card.addContent("number", id);
		card.addAttrs("link", "href", `details.html?id=${pokemon.id}&name=${pokemon.name}`);

		// Get image and other details by fetching the individual Pokemon's URL.
		util.loadData(pokemon.url, false, function (data) {
			/**
			 * Image
			 */
			util.pokemonImage(data, card);

			/**
			 * Add the main type (first type in the array) as a class to the semi-circle
			 * so we can add colour accordingly.
			 */

			const semiCircle = card.getChild("semiCircle");
			const mainType = data.types[0].type.name;

			semiCircle.addClass(mainType);

			/**
			 * Types
			 */
			const typesElement = types(data, "card__");
			const cardInner = card.getChild("inner");
			cardInner.appendChild(typesElement);
		});

		const cardFavBtn = document.querySelector(`#${pokemon.name} .card__favourite`);
		cardFavBtn.addEventListener("click", favourite, true);
		const cards = document.querySelectorAll(".card");

		setIconForFavourited(card.attrs.id, card.children.favIcon);
	});
}

export function types(data, classPrefix = "", typeFilters = false) {
	const typeContainerEl = document.createElement("div").addClass(`${classPrefix}pokemon-types`);

	let array = data;

	if (!typeFilters) {
		array = data.types;
	}

	array.forEach((item) => {
		let pokemonType = "";

		if (!typeFilters) {
			pokemonType = item.type.name;
		}
		else {
			pokemonType = item.name;
		}

		const typeEl = document.createElement("div").addClass(`${classPrefix}pokemon-types__item ${pokemonType}`);
		typeContainerEl.appendChild(typeEl);

		if (!typeFilters) {
			// Type name
			const typeSpanEl = document.createElement("span");
			typeSpanEl.textContent = pokemonType.toSentenceCase();
			typeEl.appendChild(typeSpanEl);
		}

		addTypeIcon(pokemonType, typeEl);

		if (typeFilters) {
			typeEl.id = pokemonType;
			typeEl.addEventListener("click", searchFilters);
		}
	});
	return typeContainerEl;
}

/**
 * Add Type Icons
 *
 * Icons are from https://github.com/duiker101/pokemon-type-svg-icons
 */
export function addTypeIcon(pokemonType, element, returnable = false) {
	const typeIconURL = `../../images/SVG/types/${pokemonType}.svg`;
	util.loadData(typeIconURL, true, function (typeIcon) {
		element.insertAdjacentHTML("afterbegin", typeIcon);
	});

	if (returnable === true) {
		return element;
	}
}

export function paginate(offset = 0, data = null) {
	if (data === null) {
		data = util.getDataFromSessionStorage("allPokemon");
	}

	const max = 20;
	offset = Number(offset);

	// Slice the array at the offset item until the offset + max.
	const paginated = data.slice(offset, offset + max);

	const loadMoreBtn = document.querySelector(".loadMoreBtn");
	loadMoreBtn.setAttribute("data-nextpage", offset + max);

	displayAll(paginated);

	if (offset + max >= data.length) {
		document.querySelector(".loadMoreBtn").addClass("d-none");
	}
}
