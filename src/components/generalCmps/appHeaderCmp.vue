<template>
    <section class="app-header">
        <router-link to="/">
            <div class="logo">
                <img src="img/logo/logo-traffic-light.png" class="logo-img" />
                <img src="img/logo/logo-txt.png" class="logo-txt" />
            </div>
        </router-link>
        <button class="about" @click="$emit('openAbout')">i</button>
    </section>
</template>

<script>
export default {
  name: 'appHeader'
};
</script>

<style lang="scss" scoped>
.app-header {
  background-color: #69c8b2;
  box-shadow: 0px 2px #54a290;
  position: fixed;
  top: 0;
  height: 60px;
  width: 100%;
  z-index: 4;
}

.logo {
  float: left;
  margin: 5px 2px;
}

.logo-txt {
  width: 100px;
  padding-bottom: 3px;
}

.logo-img {
  height: 55.5px;
}

.about {
  font-weight: bold;
  font-size: 1em;
  border-radius: 50%;
  border: none;
  background-color: white;
  width: 30px;
  height: 30px;
  float: right;
  margin: 15px 10px;
  transition: all 0.3s;
  &:hover {
    background-color: #448475;
    color: white;
  }
}
</style>
