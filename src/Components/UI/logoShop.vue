<template>
    <!-- логотип -->
    <div class="logo">
        <img width="45" src="https://cdn-icons-png.flaticon.com/512/64/64367.png" alt="logo">
        <div class="logo__text">
            <span class="logo__text-name">AUTO PARTS STORE</span>
            <span>Автозапчасти вовремя</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'logo-shop'
    }
</script>

<style scoped>
.logo {
    display: flex;
    align-items: center;
    width: 70%;
}
.logo__text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 15px;
}
.logo__text-name {
    font-weight: 800;
    font-size: 25px;
}
</style>