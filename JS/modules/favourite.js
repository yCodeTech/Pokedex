import * as util from "../utility.js";

export function favourite(event) {
	// Stop propagation
	event.stopPropagation();
	// Stop default action
	event.preventDefault();

	const fav = event.currentTarget;
	const favIcon = fav.childNodes[0];
	const theCard = event.currentTarget.closest(".card");

	const name = theCard.id;

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
	// Remove Pokemon from Favourites.
	else {
		favourited = stored.filter((element) => {
			return element.name != name;
		});

		favIcon.removeClass("fa-solid");

		setFavouritesToLocalStorage(favourited);
	}
}
function setFavouritesToLocalStorage(data) {
	localStorage.setItem("favouritedPokemon", JSON.stringify(data));
}

export function setIconForFavourited() {
	const favourited = util.getFavouritedPokemon();

	console.log(favourited);

	if (favourited != null) {
		const cards = document.querySelectorAll(".card");
		cards.forEach((card) => {
			favourited.forEach((fav) => {
				const name = fav.name.toLowerCase();
				if (card.id === name) {
					const cardFav = document.querySelector(`#${name} .card__favourite i`);
					cardFav.addClass("fa-solid");
				}
			});
		});
	}
}

// TODO: create the favourite sidebar.
