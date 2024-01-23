import * as util from "../utility.js";
import {displayAll, paginate} from "./display.js";

/**
 * The main (init) function to search the pokemon for the search term.
 */
export function searchPokemon() {
	const pokemonContainer = document.querySelector(".pokemon");

	const searchVal = document.querySelector(".search__input").value.toLowerCase();

	// Add the search value to session storage, for use later.
	util.setDataToSessionStorage("searchValue", searchVal);

	// Remove the pokemon being displayed.
	util.removeAll();

	// If the search value isn't empty,
	// then it's a new search, so filter through the pokemon.
	if (searchVal != "") {
		// Setup an empty array.
		let filteredPokemon = [];

		// If is home page, then search all pokemon for the search term.
		if (util.isHomePage()) {
			filteredPokemon = search(searchVal);
		}
		// Otherwise, if is favourites page, then search the favourited pokemon for the search term.
		else if (util.isFavouritesPage()) {
			filteredPokemon = search(searchVal);
		}

		displayAll(filteredPokemon, "pokemon-search");

		// If the load more button exists then add a class.
		if (document.querySelector(".loadMoreBtn")) {
			document.querySelector(".loadMoreBtn").addClass("d-none");
		}
	}
	// Otherwise, the value is empty, so the value was just cleared,
	// so reset and display all the pokemon again.
	else {
		// If the load more button exists then remove it's class.
		if (document.querySelector(".loadMoreBtn")) {
			document.querySelector(".loadMoreBtn").removeClass("d-none");
		}
		// Remove the pokemon search class.
		pokemonContainer.removeClass("pokemon-search");

		// If is home page, then display all paginated pokemon.
		if (util.isHomePage()) {
			paginate();
		}
		// Otherwise, if is favourites page, then diplay the favourited pokemon.
		else if (util.isFavouritesPage()) {
			const filteredPokemon = getFavouritedPokemon();
			displayAll(filteredPokemon, "favourited-pokemon");
		}
	}
}

/**
 * The search function to search/filter through the data and find the matching pokemon
 * to the search term.
 * @param {string | number} searchVal The value from the search input
 * @returns {array} The matching/filtered pokemon.
 */
function search(searchVal) {
	let data = [];

	// If is home page, get all pokemon data.
	if (util.isHomePage()) {
		data = util.getDataFromSessionStorage("allPokemon");
	}
	// Otherwise, if is favourites page, get the favourited pokemon data.
	else if (util.isFavouritesPage()) {
		data = getFavouritedPokemon();
	}

	// Return a new array of the filtered pokemon that matches the search term.
	return data.filter(function (pokemon) {
		const id = pokemon.id.addLeadingZeros();

		// If search value is a string AND the pokemon name matches the value
		// OR the pokemon id matches the value as a number,
		// then insert the pokemon into the new filtered array.
		if ((isNaN(searchVal) && pokemon.name.search(searchVal) > -1) || id.search(searchVal) > -1) {
			console.log(pokemon.name);
			return true;
		}
	});
}

/**
 * Get the favourited pokemon from the local storage,
 * and search through all pokemon array to find the details
 * of the favourited pokemon based on the names.
 *
 * @returns {array} The favourited pokemon details.
 */
export function getFavouritedPokemon() {
	const allPokemon = util.getDataFromSessionStorage("allPokemon");

	const favouritedPokemon = util.getFavouritedPokemon();

	/**
	 * Search through the array to find the matching favourited pokemon's details.
	 */

	// Return a new array of the filtered pokemon.
	// Filter through the allPokemon array and for each pokemon...
	return allPokemon.filter(function (pokemon) {
		// Loop through the favourited pokemon array and...
		for (let i = 0; i < favouritedPokemon.length; i++) {
			// If the allPokemon array name matches the favourited pokemon name
			// then add it to the new filtered array.
			if (pokemon.name.search(favouritedPokemon[i].name) > -1) {
				return true;
			}
		}
	});
}

/**
 * Filter/search by type menu
 *
 * ? Note: Filter by type is not fully implemented. Ideally, it would filter the search results
 * ? that has the selected type. Currently, it works as listing all pokemon with the selected
 * ? type.
 * ? And if the max 2 types are selected, it would also only filter the pokemon that only
 * ? has those 2 types.
 *
 * ? Also doesn't work on the favourites page.
 *
 * ? This would be another future feature.
 */
export function searchFilters(event) {
	const target = event.currentTarget;
	const filterByTypeEL = document.querySelector("#filter-by-type");
	const allFilterBtns = filterByTypeEL.querySelectorAll(".pokemon-types__item");

	target.classList.toggle("active");

	let filtersSelected = [];
	for (let index = 0; index < allFilterBtns.length; index++) {
		if (allFilterBtns[index].classList.contains("active")) {
			filtersSelected.push(allFilterBtns[index]);
		}
	}

	console.log(filtersSelected);

	if (filtersSelected.length === 2) {
		allFilterBtns.forEach((item) => {
			if (item != filtersSelected[0] && item != filtersSelected[1]) {
				item.addClass("disabled");
			}
		});
	}
	else {
		allFilterBtns.forEach((btn) => {
			btn.removeClass("disabled");
		});
	}
	// Remove the pokemon being displayed.
	util.removeAll();

	// If no filters selected, reset the results.
	if (filtersSelected.length === 0) {
		paginate();
	}

	filtersSelected.forEach((btn) => {
		const id = btn.id;

		util.loadData(`https://pokeapi.co/api/v2/type/${id}`, false, function (data) {
			console.log(data.pokemon);

			const typedPokemon = [];

			data.pokemon.forEach((item) => {
				typedPokemon.push(item.pokemon);
			});

			util.addPokemonIds(typedPokemon);

			paginate(0, typedPokemon);

			// Hide the filter overlay menu.
			filterByTypeEL.addClass("hidden");
		});
	});
}
