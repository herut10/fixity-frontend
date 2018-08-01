<template>
    <section class="footer-navbar space-evenly">
        <router-link to="/">
            <div class="navbar-icon">
                <font-awesome-icon icon="home" />
                <h6>Home</h6>
            </div>
        </router-link>
        <router-link to="/issueAdd">
            <div class="navbar-icon">
                <font-awesome-icon icon="clipboard" />
                <h6>Report</h6>
            </div>
        </router-link>
        <router-link to="/user">
            <div class="navbar-icon">
                <font-awesome-icon icon="user-circle" />
                <h6>Profile</h6>
            </div>
        </router-link>
    </section>
</template>

<script>
export default {
  name: 'footerNavbar'
};
</script>

<style lang="scss" scoped>
@media (min-width: 992px) {
  section.footer-navbar {
    display: none;
  }
}

.footer-navbar {
  text-align: center;
  box-shadow: inset 0px 2px #232222;
  background-color: #413e3e;
  display: flex;
  position: fixed;
  bottom: 0;
  padding: 10px 0;
  width: 100%;
  z-index: 2;
}

a {
  color: white;
  transition: all 0.3s;
  &:hover,
  &.router-link-exact-active {
    color: #69c8a4;
  }
}

h6 {
  font-weight: normal;
}
</style>