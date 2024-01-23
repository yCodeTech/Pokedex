# Pokedex app

A front-end assignment for University.

### Tools, techniques, and approaches used

-   OOP for creating the cards for the Pokemon listings.
-   JS ES2025 module pattern with multiple files to separate out the functions.
-   Icons and SVGs - FontAwesome unless otherwise stated in-code.
-   Node
-   Sass/SCSS
    -   Partials
    -   Mixins
    -   Variables
    -   Nesting
    -   And more
-   Animate.css for simple pre-made animation effects.
-   Reset CSS
-   BEM
-   Local Storage API for the favouriting functionality
-   Session Storage API
-   History API
-   Custom prototype methods
    -   toSentenceCase
    -   toTitleCase
    -   addLeadingZeros
    -   addClass and removeClass - inspired by jQuery functions of the same name.

### References

#### Images

-   Pokedex logo from https://github.com/CodesdaLu/pokedex
-   Search filter icon from [Google Fonts](https://fonts.google.com/icons?selected=Material+Symbols+Outlined:tune:FILL@0;wght@400;GRAD@0;opsz@24&icon.query=filter)
-   The Generations page navbar Pokeball icon from [The Noun Project](https://thenounproject.com/icon/pokeball-594337/) and SVG code was cleaned up by [SVGOMG](https://jakearchibald.github.io/svgomg/)
-   The Open Pokeball SVG on the Details page is from https://copyicon.com/icons/open-pokeball/69026 and edited by me in Illustrator to create the Closed version.
-   The Pokemon type icons are from https://github.com/duiker101/pokemon-type-svg-icons

#### Tutorials or code used

-   To remove all duplicate values in an array.`weaknesses = [...new Set(weaknesses)];` code in the `buildWeaknesses` function in details.js from https://stackoverflow.com/a/9229821/2358222

-   To convert strings to title case. Code in the `toTitleCase` prototype method in utility.js from https://stackoverflow.com/a/196991/2358222

-   Colour hex codes for the types in \_colours.scss from https://gist.github.com/apaleslimghost/0d25ec801ca4fc43317bcff298af43c3

-   Recursively loop through an array and flatten it. Code in the `flatten`` function in details.js from https://stackoverflow.com/a/40787928/2358222

-   Inspiration for the search filter types glow and scale effect in main.scss from https://github.com/duiker101/pokemon-type-svg-icons
