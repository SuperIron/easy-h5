interface EasyAudioOptions {}

export enum EasyAudioType {
    Tap = "tap",
    BgMusic = "bg_music"
}

export default class EasyAudio {
    constructor(options?: EasyAudioOptions) {
        const audio = document.createElement("audio");
        const source = document.createElement("source");
        // source.src = require("@/assets/audios/bg_music.mp3");
        // audio.id = "easyAudio";
        // audio.appendChild(source);
        // document.querySelector("body")?.appendChild(audio);
        audio.src = require("@/assets/audios/bg_music.mp3");
        this.audio = audio;
        this.source = source;
    }

    private type!: EasyAudioType;
    private audio!: HTMLAudioElement;
    private source!: HTMLSourceElement;

    public play(type?: EasyAudioType) {
        this.audio.play();
    }
}
