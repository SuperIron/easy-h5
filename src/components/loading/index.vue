<template>
    <div class="loading">
        <!-- Loading -->
    </div>
</template>

<script lang="ts">
import { Component, Watch } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import preload from "@/mixins/preload";

@Component({
    components: {}
})
export default class Loading extends mixins(preload) {
    public init() {
        this.preload();
    }

    // progress change
    // @Watch("progress")
    // onProgressChange(value: number) {}

    created() {
        this.init();
    }
}
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
