<template>
    <div
        class="bg-music"
        :class="[stateClass, 'bg-music__icon']"
        @click="playing ? pause() : play()"
    >
        <audio loop ref="audio">
            <source ref="source" src="@/assets/audios/bg_music.mp3" />
        </audio>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import wx from "weixin-js-sdk";
import { getSystemInfo } from "@/utils/tools";

@Component
export default class BgMusic extends Vue {
    /** 背景音乐路径 */
    @Prop() public src!: string;
    /** 自动播放（仅支持微信浏览器内） */
    @Prop({ default: true }) public autoplay!: boolean;

    public audio!: HTMLAudioElement;
    public playing = false;
    public $refs!: {
        audio: HTMLAudioElement;
        source: HTMLSourceElement;
    };

    public get stateClass() {
        return this.playing ? "bg-music--play" : "bg-music--pause";
    }

    public load() {
        const { isWechat } = getSystemInfo();
        // 微信浏览器支持自动播放
        if (isWechat) {
            // wx.config();
            wx.ready(() => {
                this.play();
                !this.autoplay && this.pause();
            });
            return;
        }
        // 点击触发播放
        const handler = (() => {
            this.play();
            document.body.removeEventListener("click", handler);
        }).bind(this);
        document.body.addEventListener("click", handler);
    }

    public init() {
        this.audio = this.$refs.audio;
        this.$refs.source.src = require(`@/${this.src}`);
        this.load();
    }

    public play() {
        this.audio.play();
        this.playing = true;
    }

    public pause() {
        this.audio.pause();
        this.playing = false;
    }

    mounted() {
        this.init();
    }
}
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
