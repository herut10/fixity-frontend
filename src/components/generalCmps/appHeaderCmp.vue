<template>
    <section class="app-header container flex space-between">
        <router-link to="/">
            <div class="logo">
                <img src="img/logo/logo-traffic-light.png" class="logo-img" />
                <img src="img/logo/logo-txt.png" class="logo-txt" />
            </div>
        </router-link>
        <div class="site-navigation flex align-center">
            <header-navbar/>
            <div class="navbar-icon">
                <font-awesome-icon icon="info-circle" class="about" @click="$emit('openAbout')" />
                <h6>About</h6>
            </div>
        </div>
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
}

.logo {
  margin: 5px 0;
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
