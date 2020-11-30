<template>
    <div id="app">
        <!-- 如果有使用路由， -->
        <router-view v-show="!isLoadingOpened" />

        <!-- 加载页 -->
        <loading
            v-show="isLoadingOpened"
            @on-complete="onLoadingComplete"
        ></loading>

        <bg-music
            :autoplay="bgMusic.autoplay"
            :src="require(`@/assets/${bgMusic.src}`)"
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
    private bgMusic = bgMusic;
    private isLoadingOpened = true;

    private onLoadingComplete() {
        this.isLoadingOpened = false;
    }
}
</script>

<style lang="scss">
@import "~@/styles/normalize.css";
@import "~@/styles/animate.css";
</style>
