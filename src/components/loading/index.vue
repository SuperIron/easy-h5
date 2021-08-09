<template>
    <div class="loading"></div>
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

    @Watch("percent")
    onPercentChange(value: number) {
        this.$emit("change", value);
    }

    created() {
        this.init();
    }
}
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
