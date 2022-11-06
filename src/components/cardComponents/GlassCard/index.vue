<template>
    <div ref="cardDOM" class="glass-card" :style="{ height, width }">
        <slot />
    </div>
</template>

<script setup>
import VanillaTilt from 'vanilla-tilt'
import { onMounted, ref } from 'vue'
const cardDOM = ref(null)

const props = defineProps({
    height: {
        type: String,
        default: 'infinite'
    },
    width: {
        type: String,
        default: 'infinite'
    },
    isAction: {
        type: Boolean,
        default: true
    }
})

onMounted(() => {
    if (props.isAction) {
        VanillaTilt.init(cardDOM.value, {
            max: 25,
            speed: 400,
            glare: true
        })
    }
})



</script>

<style lang="scss" scoped>
.glass-card {
    height: infinite;
    width: infinite;
    // padding: 5px 0 10px 0;
    border-radius: 10px;
    border-top: 1px solid #FFF;
    border-left: 1px solid #FFF;
    overflow: hidden;
    // display:inline-block;
    background: rgba(255, 255, 255, 0.3);
    box-shadow: 8px 8px 12px rgba(0, 0, 0, 0.5);
}
</style>
