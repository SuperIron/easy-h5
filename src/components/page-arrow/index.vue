<template>
    <div class="page-arrow">
        <img
            class="page-arrow__icon page-arrow__to-up"
            src="@/assets/images/page-arrow/arrow.png"
            v-show="toUp"
        />
        <img
            class="page-arrow__icon page-arrow__to-down"
            src="@/assets/images/page-arrow/arrow.png"
            v-show="toDown"
        />
        <img
            class="page-arrow__icon page-arrow__to-left"
            src="@/assets/images/page-arrow/arrow.png"
            v-show="toLeft"
        />
        <img
            class="page-arrow__icon page-arrow__to-right"
            src="@/assets/images/page-arrow/arrow.png"
            v-show="toRight"
        />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
    components: {}
})
export default class PageArrow extends Vue {
    @Prop({ default: false }) public toUp!: boolean;
    @Prop({ default: false }) public toDown!: boolean;
    @Prop({ default: false }) public toLeft!: boolean;
    @Prop({ default: false }) public toRight!: boolean;
}
</script>

<style lang="scss" scoped>
$width: 67rpx;
$height: 52rpx;
$padding: 5%;

.page-arrow {
    min-width: 100vw;
    min-height: 100vh;
    position: fixed;
    left: 0;
    top: 0;

    &__icon {
        width: $width;
        height: $height;
        position: absolute;
        animation: arrow-to-up 1.5s linear 0s infinite forwards;
    }

    &__to-up {
        left: 50%;
        bottom: $padding;
        margin-left: -$width / 2;
        animation-name: arrow-to-up;
    }

    &__to-down {
        left: 50%;
        top: $padding;
        margin-left: -$width / 2;
        animation-name: arrow-to-down;
    }

    &__to-left {
        left: $padding;
        top: 50%;
        margin-top: -$height / 2;
        animation-name: arrow-to-left;
    }

    &__to-right {
        right: $padding;
        top: 50%;
        margin-top: -$height / 2;
        animation-name: arrow-to-right;
    }
}

@keyframes arrow-to-up {
    0% {
        transform: translateY(0%);
    }
    40% {
        transform: translateY(100%);
    }
    50% {
        transform: translateY(0%);
    }
    90% {
        transform: translateY(80%);
    }
    100% {
        transform: translateY(0%);
    }
}

@keyframes arrow-to-down {
    0% {
        transform: rotate(180deg) translateY(0%);
    }
    40% {
        transform: rotate(180deg) translateY(-100%);
    }
    50% {
        transform: rotate(180deg) translateY(0%);
    }
    90% {
        transform: rotate(180deg) translateY(-80%);
    }
    100% {
        transform: rotate(180deg) translateY(0%);
    }
}

@keyframes arrow-to-left {
    0% {
        transform: rotate(-90deg) translateY(0%);
    }
    40% {
        transform: rotate(-90deg) translateY(100%);
    }
    50% {
        transform: rotate(-90deg) translateY(0%);
    }
    90% {
        transform: rotate(-90deg) translateY(80%);
    }
    100% {
        transform: rotate(-90deg) translateY(0%);
    }
}

@keyframes arrow-to-right {
    0% {
        transform: rotate(90deg) translateY(0%);
    }
    40% {
        transform: rotate(90deg) translateY(100%);
    }
    50% {
        transform: rotate(90deg) translateY(0%);
    }
    90% {
        transform: rotate(90deg) translateY(80%);
    }
    100% {
        transform: rotate(90deg) translateY(0%);
    }
}
</style>
