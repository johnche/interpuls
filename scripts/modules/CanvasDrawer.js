import { debounce } from './utils.js';

export class CanvasDrawer {
	constructor(canvasId) {
		this.canvas = document.getElementById(canvasId);
		window.onresize = debounce(() => {
			this.setSize(window.innerWidth, )
		})
	};

	setSize = () => {
		//
	};
}