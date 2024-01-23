import * as util from "./utility.js";
import {globalInit} from "./modules/global.js";
import {Card} from "./modules/card.js";
import {displayAll} from "./modules/display.js";
import {searchPokemon, getFavouritedPokemon} from "./modules/search.js";

globalInit(init);

function init() {
	const filteredPokemon = getFavouritedPokemon();

	displayAll(filteredPokemon, "favourited-pokemon");
}
