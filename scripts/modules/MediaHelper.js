import {sleep} from "./utils.js";

export default class MediaHelper {
	constructor(mediaData) {
		this._mediaData = mediaData;
		this.currentTrack = {
			howlerInstance: null,
			startTimestamp: null,
			finishTimestamp: null
		};
		this._listeners = [];
	}

	addListener = (cb) => {
		this._listeners.push(cb);
	};

	removeListener = (cb) => {
		this._listeners = this._listeners.filter(func => func !== cb);
	};

	update = (eventName, data) => {
		this._listeners.forEach(cb => cb(eventName, data));
	};

	play = (trackPath) => {
		if (this.getCurrentTrack()?.playing ?? false) {
			this.stop(this.getCurrentTrack());
		}

		this.update('newTrack', null);
		const sound = new Howl({
			src: [trackPath],
			onend: () => {
				this.currentTrack = {
					...this.currentTrack,
					startTimestamp: null,
					finishTimestamp: Date.now()
				}
			}
		});
		sound.play();

		this.setCurrentTrack(sound);
	};

	stop = async (howlerTrack) => {
		howlerTrack.fade(1, 0, 200);
		await sleep(200);
		howlerTrack.stop();
	};

	setCurrentTrack = (howlerInstance) => {
		this.currentTrack = {
			...this.currentTrack,
			howlerInstance: howlerInstance,
			startTimestamp: Date.now(),
			finishTimestamp: null
		};
	};

	getCurrentTrack = () => {
		return this.currentTrack.howlerInstance;
	};

	getNumTracks = (category, directoryNum) => {
		return this._mediaData[category][directoryNum - 1];
	};

	getNumDirs = (category) => {
		return this._mediaData[category].length;
	};

	isTrackOverflow = (category, directoryNum, trackNum) => {
		return trackNum >= this.getNumTracks(category, directoryNum);
	};

	isDirOverflow = (category, directoryNum) => {
		return directoryNum >= this.getNumDirs(category);
	};
}
