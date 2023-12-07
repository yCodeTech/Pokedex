// https://pokeapi.co/

/**
 * Inspiration
 *
 * https://sg.portal-pokemon.com/play/pokedex
 * https://www.pokemon.com/uk/pokedex
 */

/**
 * Packages to possibly use:
 *
 * Isotope - https://www.npmjs.com/package/isotope-layout
 */

import * as util from "./utility.js";
import {Card} from "./modules/card.js";
import displayAll from "./modules/display.js";

/**
 * Note:
 *
 * toSentenceCase(), addClass() and removeClass() methods are imported
 * automatically since they are added to their respective prototypes.
 */

function paginate(offset = 0) {
	const data = util.getDataFromSessionStorage("allPokemon");

	const max = 20;
	offset = Number(offset);

	// Slice the array at the offset item until the offset + max.
	const paginated = data.slice(offset, offset + max);

	const loadMoreBtn = document.querySelector("#loadMoreBtn");
	loadMoreBtn.setAttribute("data-nextpage", offset + max);

	displayAll(paginated);

	if (offset + max >= data.length) {
		document.querySelector("#loadMoreBtn").addClass("d-none");
	}
}

function init() {
	const searchInput = document.querySelector(".search__input");
	const loadMoreBtn = document.querySelector("#loadMoreBtn");

	loadMoreBtn.addEventListener("click", loadMore);
	searchInput.addEventListener("keyup", searchPokemon);
	searchInput.addEventListener("search", searchPokemon);

	if (!util.sessionStorageExists()) {
		util.loadData("https://pokeapi.co/api/v2/pokemon?limit=1017&offset=0", false, function (data) {
			util.setDataToSessionStorage("allPokemon", data.results);
			console.log("Data is loaded to Session Storage as allPokemon");

			paginate();
		});
	} else {
		paginate();
	}

	// if (searchInput.value === "") {
	// Get all 1017 Pokemon
	// util.loadData("https://pokeapi.co/api/v2/pokemon?limit=1017&offset=0", displayAll);

	// }

	// Get all Gen 1 data
	// util.loadData("https://pokeapi.co/api/v2/generation/1", displayAll);
}

function searchPokemon() {
	const data = util.getDataFromSessionStorage("allPokemon");

	const pokemonContainer = document.querySelector("#pokemon");

	const searchVal = document.querySelector(".search__input").value.toLowerCase();

	if (searchVal != "") {
		removeAll();

		const filteredPokemon = data.filter(function (pokemon) {
			util.extractID(pokemon);

			const id = pokemon.id.toString().padStart(4, "0");

			if ((isNaN(searchVal) && pokemon.name.search(searchVal) > -1) || id.search(searchVal) > -1) {
				// if (pokemon.name.search(searchVal) > -1) {
				console.log(pokemon.name);
				return true;
			}
			// return false;
		});

		displayAll(filteredPokemon, "pokemon-search");

		document.querySelector("#loadMoreBtn").addClass("d-none");
	} else if (!pokemonContainer.classList.contains("all-pokemon")) {
		removeAll();
		document.querySelector("#loadMoreBtn").removeClass("d-none");

		paginate();
	}
}

function removeAll() {
	const pokemonContainer = document.querySelector("#pokemon");
	// Remove all child elements
	while (pokemonContainer.firstChild) {
		pokemonContainer.removeChild(pokemonContainer.firstChild);
	}
	// Remove all-pokemon class
	pokemonContainer.removeClass("all-pokemon");
}

function loadMore() {
	const loadMoreBtn = document.querySelector("#loadMoreBtn");

	const nextPage = loadMoreBtn.getAttribute("data-nextpage");

	paginate(nextPage);
}

// function displayPokemonCard(data) {
// 	const card = new Card("li", "card animate__animated animate__fadeInUp");

// 	// createContent(data, card);
// 	// createImg(data, card);
// }

init();
