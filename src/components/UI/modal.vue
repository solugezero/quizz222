<template>
    <Teleport to="body">
        <div class="modal" v-if="active">
            <div class="modal_content" ref="content">
                <component :is="component" v-bind="props"></component>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
import { useModalStore } from "~/store/modal.js"
import { onClickOutside } from '@vueuse/core'

const modalStore = useModalStore()
const content = ref(null)
const { active, props, component } = toRefs(modalStore)
const { close } = modalStore

onClickOutside(content, () => close())
</script>

<style scoped lang="scss">
.modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    background: rgba(0, 0, 0, 0.507);
    backdrop-filter: blur(2px);

    &_content {
        max-width: 50vw;
        max-height: 90vh;
        overflow-y: auto;
    }
}
</style>