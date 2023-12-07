import * as util from "../utility.js";
import {Card} from "./card.js";
import {favourite, setIconForFavourited} from "./favourite.js";

export default function displayAll(data, className = "all-pokemon") {
	const pokemonContainer = document.querySelector("#pokemon");
	pokemonContainer.addClass(className);

	let pokemonArray = data;

	console.log(pokemonArray);

	pokemonArray.forEach((pokemon) => {
		util.extractID(pokemon);
		const id = pokemon.id.toString().padStart(4, "0");

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

			data.types.forEach((item) => {
				const pokemonType = item.type.name;

				card.createNewChild(
					"types",
					{
						type: {
							tag: "div",
							class: `card__pokemon-types__item ${pokemonType}`,
						},
					},
					function () {
						card.createNewChild(
							"type",
							{
								typeTxt: {
									tag: "span",
								},
							},
							pokemonType.toSentenceCase(),
						);
					},
				);

				const typeIconURL = `../../images/SVG/types/${pokemonType}.svg`;
				const typeElement = card.getChild("type");
				util.loadData(typeIconURL, true, function (typeIcon) {
					typeElement.insertAdjacentHTML("afterbegin", typeIcon);
				});
			});
		});

		const cardFavBtn = document.querySelector(`#${pokemon.name} .card__favourite`);
		cardFavBtn.addEventListener("click", favourite, true);
	});

	setIconForFavourited();
}
