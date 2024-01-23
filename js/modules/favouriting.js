import * as util from "../utility.js";

export function favourite(event) {
	// Stop propagation
	event.stopPropagation();
	// Stop default action
	event.preventDefault();

	const fav = event.currentTarget;
	const favIcon = fav.querySelector("i");
	const theCard = event.currentTarget.closest(".card");
	let name = "";
	if (!util.isDetailsPage()) {
		name = theCard.id;
	}
	else {
		name = document.querySelector("body").id;
	}

	let favourited = [];
	const stored = util.getFavouritedPokemon();

	// Add Pokemon to favourites.
	if (!favIcon.classList.contains("fa-solid")) {
		favIcon.addClass("fa-solid");

		favourited.push({name: name});

		if (stored != null) {
			favourited = stored.concat(favourited);
		}

		setFavouritesToLocalStorage(favourited);
	}
	else {
		favourited = stored.filter((element) => {
			return element.name != name;
		});

		favIcon.removeClass("fa-solid");

		setFavouritesToLocalStorage(favourited);

		// Only on the favourites page.
		if (util.isFavouritesPage()) {
			theCard.remove();
		}
	}
}
function setFavouritesToLocalStorage(data) {
	localStorage.setItem("favouritedPokemon", JSON.stringify(data));
}

export function setIconForFavourited(pokemonId, favIcon) {
	const favourited = util.getFavouritedPokemon();

	if (favourited != null) {
		favourited.forEach((fav) => {
			const name = fav.name.toLowerCase();
			if (pokemonId === name) {
				// const favIcon = document.querySelector(`#${name} .${favouriteClass} i`);
				favIcon.addClass("fa-solid");
			}
		});
	}
}
