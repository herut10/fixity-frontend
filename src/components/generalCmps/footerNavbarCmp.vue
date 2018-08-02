<template>
    <section>
        <div class="footer-navbar space-evenly mobile">
            <router-link to="/">
                <div class="navbar-icon">
                    <font-awesome-icon icon="home" />
                    <h6>Home</h6>
                </div>
            </router-link>
            <router-link to="/issueAdd">
                <div class="navbar-icon">
                    <font-awesome-icon icon="plus" />
                    <h6>Report</h6>
                </div>
            </router-link>
            <router-link to="/user">
                <div class="navbar-icon">
                    <font-awesome-icon icon="user-circle" />
                    <h6>Profile</h6>
                </div>
            </router-link>
        </div>
        <div class="footer-navbar space-evenly desktop">
            <span>© CoffeeRights</span>
        </div>
    </section>
</template>

<script>
export default {
  name: "footerNavbar"
};
</script>

<style lang="scss" scoped>
section div.footer-navbar {
  &.desktop {
    display: none;
  }
  @media (min-width: 992px) {
    position: static;
    &.mobile {
      display: none;
    }
    &.desktop {
      font-size: .7em;
      color: lightgray;
      box-shadow: none;
      background-color: transparent;
      display: block;
    }
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

a,
.desktop {
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