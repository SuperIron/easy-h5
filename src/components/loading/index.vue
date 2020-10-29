<template>
    <div class="loading">
        {{ percent }}
    </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import preload from "@/mixins/preload";

@Component({
    components: {}
})
export default class Loading extends mixins(preload) {
    private init() {
        this.preload();
    }

    created() {
        this.init();
    }
}
</script>

<style lang="scss" scoped></style>
