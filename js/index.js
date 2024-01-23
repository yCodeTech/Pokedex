// https://pokeapi.co/

/**
 * Inspiration
 *
 * https://sg.portal-pokemon.com/play/pokedex - Singapore
 * https://www.pokemon.com/uk/pokedex - UK
 */

import * as util from "./utility.js";
import {globalInit} from "./modules/global.js";
import {Card} from "./modules/card.js";
import {displayAll, paginate} from "./modules/display.js";
import {searchPokemon} from "./modules/search.js";

/**
 * Note:
 *
 * toSentenceCase(), addClass() and removeClass() methods are imported
 * automatically since they are added to their respective prototypes.
 */

globalInit(init);

function init() {
	const loadMoreBtn = document.querySelector(".loadMoreBtn");

	loadMoreBtn.addEventListener("click", loadMore);

	paginate();

	// if (searchInput.value === "") {
	// Get all 1017 Pokemon
	// util.loadData("https://pokeapi.co/api/v2/pokemon?limit=1017&offset=0", displayAll);

	// }

	// Get all Gen 1 data
	// util.loadData("https://pokeapi.co/api/v2/generation/1", displayAll);
}

function loadMore() {
	const loadMoreBtn = document.querySelector(".loadMoreBtn");

	const nextPage = loadMoreBtn.getAttribute("data-nextpage");

	paginate(nextPage);
}

// function displayPokemonCard(data) {
// 	const card = new Card("li", "card animate__animated animate__fadeInUp");

// 	// createContent(data, card);
// 	// createImg(data, card);
// }
