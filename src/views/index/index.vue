<template>
    <div class="index"></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
    components: {},
    created() {
        this.$toast("ssss");
    }
})
export default class extends Vue {}
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
