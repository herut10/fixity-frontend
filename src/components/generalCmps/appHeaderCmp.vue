<template>
    <section class="app-header">
        <img src="img/beginning-of-logo.png" class="logo" />
        <router-link to="/about">
            <button class="about">ℹ</button>
        </router-link>
    </section>
</template>

<script>
export default {
    name: 'appHeader'
};
</script>

<style scoped>
.app-header {
    background-color: #fdc612;
    position: fixed;
    top: 0;
    height: 60px;
    width: 100%;
    z-index: 1;
}

.logo {
    float: left;
    margin: 15px;
    width: 80px;
}

.about {
    float: right;
    margin: 20px 10px;
}
</style>
