<template>
    <div class="index">
        <div @click="onMusic('tap')">tap</div>
        <div @click="onMusic('bgMusic')">bgMusic</div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import audio, { EasyAudioType } from "@/utils/audio";

@Component({
    components: {}
})
export default class extends Vue {
    public onMusic(key: string) {
        if (key === "tap") {
            audio.play(EasyAudioType.Tap);
        } else {
            audio.play(EasyAudioType.BgMusic);
        }
    }
}
</script>

<style scoped lang="scss">
@import "./index.scss";

.index {
    font-size: 100px;
}
</style>
