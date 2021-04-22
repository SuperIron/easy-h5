<template>
    <div id="app">
        <router-view v-show="!isLoadingOpened" />
        <!-- 加载组件 -->
        <Loading v-show="isLoadingOpened" @on-complete="onLoadingComplete" />
        <!-- 背景音乐组件 -->
        <BgMusic
            :autoplay="bgMusic.autoplay"
            :src="bgMusic.src"
            ref="bgMusic"
        />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BgMusic from "@/components/bg-music/index.vue";
import Loading from "@/components/loading/index.vue";
import config from "@/config";

const { bgMusic } = config;

@Component({
    components: {
        BgMusic,
        Loading
    }
})
export default class App extends Vue {
    public bgMusic = bgMusic;
    public isLoadingOpened = true;

    public onLoadingComplete() {
        this.isLoadingOpened = false;
    }
}
</script>

<style lang="scss">
@import "~@/styles/normalize.css";
@import "~@/styles/animate.css";
@import "@/styles/index.scss";
@import "@/styles/mixins.scss";
</style>
