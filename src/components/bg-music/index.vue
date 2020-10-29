<template>
    <div
        class="bg-music"
        @click="playing ? pause() : play()"
        :class="[stateClass, 'bg-music__icon']"
    ></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import wx from "weixin-js-sdk";
import { getSystemInfo } from "@/utils/tools";

/**
 * @todo [x] 自动播放，不支持则点击触发播放
 */

@Component
export default class BgMusic extends Vue {
    /**
     * 背景音乐路径
     */
    @Prop() private src!: string;
    /**
     * 自动播放（仅支持微信浏览器内）
     */
    @Prop({ default: true }) private autoplay!: boolean;

    private audio!: HTMLAudioElement;
    private playing = false;

    private get stateClass() {
        return this.playing ? "bg-music--play" : "bg-music--pause";
    }

    private load() {
        const { isWechat } = getSystemInfo();
        /**
         * 微信浏览器支持自动播放
         */
        if (isWechat) {
            wx.config({
                debug: false
            });
            wx.ready(() => {
                this.play();
                !this.autoplay && this.pause();
            });
            return;
        }
        /**
         * 点击触发播放
         */
        const handler = (() => {
            this.play();
            document.body.removeEventListener("click", handler);
        }).bind(this);
        document.body.addEventListener("click", handler);
    }

    private init() {
        const audio = new Audio();
        audio.src = this.src;
        audio.loop = true;
        this.audio = audio;
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

    created() {
        this.init();
    }
}
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
