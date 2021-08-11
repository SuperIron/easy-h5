import EasyAudio from "./Audio";

export enum EasyAudioType {
    Tap = "tap",
    BgMusic = "bg_music"
}

const audio = new EasyAudio<EasyAudioType>();

export default audio;
