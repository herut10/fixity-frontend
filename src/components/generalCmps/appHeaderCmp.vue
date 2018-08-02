<template>
  <section class="app-header">
    <section class="container flex space-between">
        <router-link to="/">
            <div class="logo">
              <div class="logo-circle-1"></div>
              <div class="logo-circle-2"></div>
              <div class="logo-circle-3"></div>
              <h1>Fixity</h1>
            </div>
        </router-link>
        <div class="site-navigation flex align-center">
            <header-navbar/>
            <div class="navbar-icon" @click="$emit('openAbout')">
                <font-awesome-icon icon="info-circle" class="about" />
                <h6>About</h6>
            </div>
        </div>
    </section>
  </section>
</template>

<script>
import headerNavbar from '@/components/generalCmps/headerNavbarCmp.vue';

export default {
  name: 'appHeader',

  components: {
    headerNavbar
  }
};
</script>

<style lang="scss" scoped>
.app-header {
  background-color: #69c8a4;
  box-shadow: 0px 2px #4b9076;
  position: fixed;
  top: 0;
  height: 60px;
  width: 100%;
  z-index: 4;
  .container {
    height: 100%;
  }
}

.logo {
  position: relative;
  margin: 5px 0;

  h1 {
    display: inline-block;
    color: white;
    font-size: 3em;
    text-shadow: -1px 1px 9px #454444;
    padding-bottom: 5px;
    position: absolute;
    left: 15px;
    top: -3px;
  }
}

.logo-circle-1 {
  background-color: rgba(255, 0, 0, 0.69);
  border-radius: 50%;
  height: 23px;
  width: 23px;
  position: absolute;
  top: 0;
}

.logo-circle-2 {
  height: 23px;
  width: 23px;
  background-color: rgba(255, 255, 0, 0.69);
  border-radius: 50%;
  position: absolute;
  top: 13px;
  left: 1px;
}

.logo-circle-3 {
  height: 23px;
  width: 23px;
  background-color: rgba(0, 128, 0, 0.69);
  border-radius: 50%;
  position: absolute;
  top: 28px;
}

.logo-txt {
  width: 100px;
  padding-bottom: 3px;
}

.logo-img {
  height: 55.5px;
}

.site-navigation {
  font-size: 1.7em;
  color: white;
}

.navbar-icon {
  cursor: pointer;
  color: white;
  transition: all 0.3s;
  &:hover {
    color: #4b9076;
  }
}

svg {
  margin: 0 0 0 15px;
}

h6 {
  font-size: 0.35em;
  font-weight: normal;
  width: fit-content;
  margin: 0 auto;
  margin-right: 0;
}
</style>
