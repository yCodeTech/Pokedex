/**
 * Create the card HTML elements.
 *
 * @returns An object of all the created HTML elements.
 */
export class Card {
	constructor(el, attrs) {
		this.el = el;
		this.attrs = attrs;

		const childElements = {
			link: {
				tag: "a",
			},
			inner: {
				tag: "div",
				class: "card__inner",
			},
			imgContainer: {
				tag: "div",
				class: "card__img-container",
			},
			img: {
				tag: "img",
			},
			numFavRow: {
				tag: "div",
				class: "row",
			},
			number: {
				tag: "sup",
				class: "card__number",
			},
			favourite: {
				tag: "div",
				class: "card__favourite",
			},
			favIcon: {
				tag: "i",
				class: "fa-regular fa-star",
			},
			semiCircle: {
				tag: "div",
				class: "semi-circle",
			},
			name: {
				tag: "span",
				class: "card__name",
			},
		};

		this.element = this.create();
		this.children = this.createChildren(childElements);
		this.card = this.appendChildren();
	}
	create() {
		const element = document.createElement(this.el);

		Object.keys(this.attrs).forEach((attr) => {
			const val = this.attrs[attr];
			element.setAttribute(attr, val);
		});

		return element;
	}
	createChildren(childElements) {
		const elements = {};

		Object.keys(childElements).forEach((element) => {
			const child = childElements[element];
			const el = document.createElement(child.tag);

			if (child.hasOwnProperty("class")) {
				el.addClass(child.class);
			}
			elements[element] = el;
		});

		return elements;
	}
	appendChildren() {
		/**
		 * Favourite and Number
		 */
		this.children.favourite.appendChild(this.children.favIcon);
		this.children.numFavRow.appendChild(this.children.number);
		this.children.numFavRow.appendChild(this.children.favourite);
		this.children.inner.appendChild(this.children.numFavRow);

		/**
		 * Image
		 */
		this.children.imgContainer.appendChild(this.children.img);
		this.children.inner.appendChild(this.children.imgContainer);

		/**
		 * Semi Circle
		 */
		this.children.inner.appendChild(this.children.semiCircle);

		/**
		 * Name
		 */
		this.children.inner.appendChild(this.children.name);

		/**
		 * Inner and Link
		 */
		this.children.link.appendChild(this.children.inner);
		this.element.appendChild(this.children.link);

		return this.element;
	}
	addContent(element, content) {
		this.children[element].textContent = content;

		return this;
	}
	addAttrs(element, attr, val) {
		this.children[element].setAttribute(attr, val);

		return this;
	}
	createNewChild(parent, child, content) {
		const newChild = this.createChildren(child);

		const key = Object.keys(newChild);

		Object.assign(this.children, newChild);

		this.children[parent].appendChild(this.children[key]);

		if (typeof content === "function") {
			const callback = content;
			callback();
		}
		else {
			this.addContent(key, content);
		}
		return this;
	}
	createImg(imgURL) {
		if (imgURL) {
			this.addAttrs("img", "src", imgURL);
		}
		else {
			this.addContent("imgContainer", "New Pokemon image coming soon.");
		}
	}
	getChild(childName) {
		return this.children[childName];
	}
}
