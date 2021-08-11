interface EasyAudioOptions {
    /** 音频路径 */
    src: string;
    /** 是否循环播放 */
    loop: boolean;
}

/**
 * 默认参数
 */
const DEFAULT_OPTIONS = {
    src: "",
    loop: false
};

export default class EasyAudio<EasyAudioType> {
    constructor(options: Partial<EasyAudioOptions> = {}) {
        const { loop, src } = Object.assign(DEFAULT_OPTIONS, options);
        const audio = document.createElement("audio");
        loop && (audio.loop = true);
        src && (audio.src = src);
        document.querySelector("body")?.appendChild(audio);
        this.audio = audio;
    }

    private audio!: HTMLAudioElement;

    /**
     * 播放
     */
    public play(type?: EasyAudioType) {
        if (type) {
            this.audio.src = require(`@/assets/audios/${type}.mp3`);
        }
        this.audio.play();
    }

    /**
     * 暂停
     */
    public pause() {
        this.audio.pause();
    }
}
