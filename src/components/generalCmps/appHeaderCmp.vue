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
    /* background-color: #fdc612; */
    background-color: #0b83d9;
    position: fixed;
    top: 0;
    height: 60px;
    width: 100%;
    z-index: 1;
}

.logo {
    border-radius: 15px;
    float: left;
    margin: 15px;
    width: 80px;
}

.about {
    border-radius: 50%;
    border: none;
    background-color: white;
    width: 30px;
    height: 30px;
    float: right;
    margin: 15px 10px;
}
</style>
