import Vue from "vue";
import { Component } from "vue-property-decorator";
import createjs from "preload-js";

export interface Manifest {
    /** 文件名 */
    filename: string;
    /** 文件路径 */
    path: string;
}

export interface Asset {
    /** 资源路径，不带别名`@` */
    src: string;
}

const manifest: Manifest[] = require("./manifest.json");
const assets = manifest.reduce((pre: Asset[], item) => {
    try {
        pre.push({
            /** @不能在遍历item里面，不然解析不了 */
            src: require(`@/${item.path}`)
        });
    } catch (err) {
        console.error(err.message);
    }
    return pre;
}, []);

// You can declare mixins as the same style as components.
@Component
export default class Preload extends Vue {
    /**
     * 加载进度
     */
    public percent = 0;

    /**
     * 加载完成
     */
    public complete() {
        this.$emit("on-complete");
    }

    /**
     * 进度更新
     */
    public progress(e: any) {
        this.percent = Math.floor(e.loaded * 100);
    }

    /**
     * 初始化
     */
    public preload() {
        let preload = new createjs.LoadQueue(true);
        preload.installPlugin(createjs.SOUND); // 加载音频
        preload.addEventListener("progress", this.progress);
        preload.addEventListener("complete", this.complete);
        preload.loadManifest(assets);
    }
}
