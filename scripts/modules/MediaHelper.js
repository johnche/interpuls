export default class MediaHelper {
	constructor(mediaData) {
		this._mediaData = mediaData;
	}

	getNumTracks = (category, directoryNum) => {
		return this._mediaData[category][directoryNum - 1];
	}

	getNumDirs = (category) => {
		return this._mediaData[category].length;
	}

	isTrackOverflow = (category, directoryNum, trackNum) => {
		return trackNum >= this.getNumTracks(category, directoryNum);
	}

	isDirOverflow = (category, directoryNum) => {
		return directoryNum >= this.getNumDirs(category);
	}
}
