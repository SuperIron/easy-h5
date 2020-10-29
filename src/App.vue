<template>
    <div id="app">
        <!-- 如果有使用路由， -->
        <router-view v-show="!isLoadingOpened" />

        <!-- 加载页 -->
        <!-- <loading
            v-if="isLoadingOpened"
            @on-complete="handleLoadingComplete"
        ></loading> -->

        <bg-music
            :autoplay="bgMusic.autoplay"
            :src="require(`@/assets/${bgMusic.src}`)"
            ref="bgMusic"
        />
        <router-view />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BgMusic from "@/components/bg-music/index.vue";
import config from "./config";

const { bgMusic } = config;

@Component({
    components: {
        BgMusic
    }
})
export default class App extends Vue {
    private bgMusic = bgMusic;
    private isLoadingOpened = true;
}
</script>

<style lang="scss">
body {
    min-width: 100vw;
    min-height: 100vh;
}
</style>
