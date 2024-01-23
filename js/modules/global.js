import * as util from "../utility.js";
import {searchPokemon} from "./search.js";
import {types, addTypeIcon} from "./display.js";

/**
 * A global init function that all pages will need.
 *
 * @param {function} callback A callback function to run.
 */
export function globalInit(callback) {
	const searchInputEl = document.querySelector(".search__input");
	const searchFilterEl = document.querySelector(".search__filter");

	searchInputEl?.addEventListener("keyup", searchPokemon);
	searchInputEl?.addEventListener("search", searchPokemon);
	searchFilterEl?.addEventListener("click", function () {
		const filterByTypeEL = document.querySelector("#filter-by-type");

		filterByTypeEL.classList.toggle("hidden");
	});

	displayFilteringIcons();

	if (!util.sessionStorageExists("allPokemon")) {
		util.loadData("https://pokeapi.co/api/v2/pokemon?limit=1017&offset=0", false, function (data) {
			util.setDataToSessionStorage("allPokemon", data.results);
			console.log("Data is loaded to Session Storage as allPokemon");

			callback();
		});
	}
	else {
		callback();
	}

	// If a search value exists and is not empty string, then display the search results.
	// Used for the details page custom back button.

	// Caveat: Doesn't work for the browser back button, only the custom back button.
	// This is because the app needs to reset it's session storage on (re)load,
	// but the browser back button instigates a full page load whereas the
	// custom back button does not.
	if (
		util.sessionStorageExists("searchValue") &&
		util.getDataFromSessionStorage("backToSearchResults") === true &&
		util.getDataFromSessionStorage("searchValue") != ""
	) {
		// Reset the input value back to the search value.
		searchInputEL.value = util.getDataFromSessionStorage("searchValue");
		// Re-search and display the pokemon again.
		searchPokemon();
	}
	else {
		// Reset the searchValue session storage to empty.
		util.setDataToSessionStorage("searchValue", "");
	}

	// Reset the backToSearchResults session storage to false.
	util.setDataToSessionStorage("backToSearchResults", false);
}

/**
 * Display the type icons in the filter overlay.
 */
function displayFilteringIcons() {
	util.loadData("https://pokeapi.co/api/v2/type", false, function (data) {
		const typesData = data.results;

		// Remove the unknown and shadow type, because there is no pokemon
		// types according to the official website, and there is no icon either.
		// So it prevents errors.
		const newTypesData = typesData.filter((type) => {
			const typeName = type.name;
			if (typeName != "unknown" && typeName != "shadow") {
				return true;
			}
		});

		console.log(newTypesData);

		const filterByTypeEL = document.querySelector("#filter-by-type");

		const typesElement = types(newTypesData, "", true);

		filterByTypeEL.appendChild(typesElement);
	});
}
