<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: 'my-button'
    }
</script>

<style scoped>
.btn {
    border-radius: 30px;
    justify-content: center;
    cursor: pointer;
}
</style>