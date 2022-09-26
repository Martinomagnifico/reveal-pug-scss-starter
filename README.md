# Reveal Pug Scss Starter kit

This GitHub repo is a quick starter to make a [Reveal.js](https://revealjs.com) presentation with support for Pug and Scss. Pug is a preprocessor for HTML, Scss is a preprocessor for CSS.


## Inclusion of Reveal

This project will install Reveal.js as a dependency, and then automatically copy it to the `/assets/js` folder, where it will be available to the browser.

```javascript
"dependencies": {
  "reveal.js": "^4.3.1"
}
```
This way, the presentation will also work offline, from a server without node, or from the filesystem.

Any other dependency in the `dependencies` object in the `package.json` file will be treated the same: it will be copied to the assets folder. 

Whenever you want to add packages that only help during the development process, please install them using the `--save-dev` flag, like this:`npm install <package name> --save-dev`. Packages installed like this won't be copied to the assets folder, which is good in that case.


## Installation

* Download or clone this project, then open the folder in your editor or terminal.
* Run `npm install`.
* Run `npm start`. 


## Pug setup

This starter project uses Pug to be able to use templates, and to include partials, like a `head` and a block of scripts that is included at the end of the HTML.

```
.
├── build                       # Compiled files
├── src                         # Source folder
│   ├── assets                  # Assets for the presentation
│       ├── img                 # Images
│       ├── js                  # Javascript files
│       ├── scss                # Scss files to be compiled into CSS
│           ├──  styles.scss    # Main Scss file
│   ├── templates               # Templates for Pug
│       ├── includes            # Includes for the Pug template
│           ├──  _head.pug      # The head for the HTML
│           ├──  _mixins.pug    # Pug mixins
│           ├──  _scripts.pug   # Main scripts block
│       ├── layouts             # Pug layouts
│           ├──  _base.pug      # The basic layout
│           ├──  _reveal.pug    # Layout with Reveal additions
│   ├── _slides.pug             # Put the content of the slides here
│   └── index.pug               # Main Pug file to be compiled to HTML
```

Pug files that are prefixed with an underscore (_) are not rendered to HTML. That means that any Pug file that is only *used*, like the template, other includes etcetera, should all have an underscore.

This projects uses a lot of Pug `block` syntax, where a named block is defined, which can then be overwritten or added to, by using `append block` or `prepend block`. For example, in the Reveal layout, there are two blocks defined, `block beforeslides` and `block beforeslides` that can be used to add things like a fixed menubar or footer. 

### Use of Pug to write content

#### What is Pug? 

From Google: 
*Pug is a template engine for Node and for the browser. It compiles to HTML and has a simplified syntax, which can make you more productive and your code more readable. Pug makes it easy both to write reusable HTML, as well as to render data pulled from a database or API.*

Pug uses indents to separate levels in HTML. Make sure that you use the same way of indenting in each Pug file. It can be either spaces or tabs, but not both.

You can learn more at the Pug website: [pugjs.org](https://pugjs.org/api/getting-started.html)  or other resources like [www.educative.io](https://www.educative.io/answers/what-is-pug-syntax).

#### But does Reveal not have Markdown support?

It does. Markdown is indeed a very simple markup language that compiles to HTML, but if you want some more influence on the layout or specific classes or attributes, Pug is more powerful. 

So instead of using Markdown and trying to add attributes to your elements like any of these solutions:

```
- Item 1 <!-- .element: class="fragment" data-fragment-index="3" -->
- Item 2 <!-- class="fragment" data-fragment-index="2" -->
- Item 3 <!-- .fragment data-fragment-index="1" -->
```

you write it in Pug like this:

```
ul
	li.fragment(data-fragment-index="3") Item 1
	li.fragment(data-fragment-index="2") Item 2
	li.fragment(data-fragment-index="1") Item 3
```

or like this:

```
ul
	- mylist = [1,2,3]
	each nr in mylist
		li.fragment(data-fragment-index=(mylist.length - nr)) Bullet #{nr}
```

## Scss

In the `assets` folder is another folder called `scss`. Any scss files in that folder will be converted to CSS in the `build/assets/css` folder. The main file is `styles.scss`, in which you can write scss code, or import other files. 


## Additional packages

As mentioned before: any other dependency in the `dependencies` object in the `package.json` file will be treated the same: it will be copied to the assets folder. 

For example, to add the [Appearance](https://github.com/Martinomagnifico/reveal.js-appearance) plugin, install it with `npm install reveal.js-appearance`. The package.json file will then look like this:

```javascript
"dependencies": {
  "reveal.js": "^4.3.1",
  "reveal.js-appearance": "^1.1.2"
}
```

The Appearance package will then be copied to the assets folder whenever you use `npm start`. But to be able to use it, you should add it to the `scripts` block in your index.pug file, and register it in the Reveal config like this:

```pug
block append scripts
	script(src="assets/js/reveal.js-appearance/plugin/appearance/appearance.js")
	script.
		const deck = document.querySelector(".reveal");
		let revealdeck = new Reveal(deck);
			revealdeck.initialize({
			history: false,
			overview: false,
			center: true,
			controlsTutorial: false,
			plugins: [ Appearance ]
		});
```
You can then add animation effects to your HTML like this:

```pug
li.animate__fadeInDown Bullet
```
which is converted to HTML like this:

```html
<li class="animate__fadeInDown">Bullet</li>
```
and the plugin then adds a base class like this:

```html
<li class="animate__fadeInDown animate__animated">Bullet</li>
```

## Other assets

This project also automatically copies images from the source folder to the build folder.


## Like it?
If you like it, please star this repo! 

And if you want to show off what you made with it, please do :-)


## License
MIT licensed

Copyright (C) 2022 Martijn De Jongh (Martino)
