
# Doodle Background Generator

A modern React app to generate fun, downloadable doodle backgrounds using emojis, built-in SVG icons, and Freepik vector icons. Features a beautiful blue gradient UI, Tailwind CSS, and live canvas preview.

## Features

- Select multiple emojis or icons to fill the canvas in a repeating pattern
- Search and use vector icons from Freepik (API key required)
- Download your doodle as a PNG image
- Responsive, modern UI with Tailwind CSS
- Built-in SVG icon set and emoji picker

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Setup
1. Clone this repository:
	```sh
	git clone <your-repo-url>
	cd doodle-background
	```
2. Install dependencies:
	```sh
	npm install
	```
3. Add your Freepik API key in `src/components/FlaticonSearch.jsx`:
	```js
	const FREEPIK_API_KEY = 'YOUR_API_KEY_HERE';
	```
4. Start the development server:
	```sh
	npm run dev
	```
5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage
- Choose Emoji or Icon mode from the dropdown.
- Select emojis, built-in icons, or search for Freepik icons.
- Click "Generate Doodle" to update the canvas.
- Click "Download" to save your doodle as a PNG.

## Customization
- Add more emojis or SVG icons in `EmojiPicker.jsx` and `IconPicker.jsx`.
- Tweak canvas size or pattern in `DoodleCanvas.jsx`.
- Style the app via Tailwind classes or `App.css`.

## Credits
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Freepik API](https://developers.freepik.com/)
- [Flaticon](https://www.flaticon.com/)

## License
MIT
