<template>
    <section class="header-navbar">
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
  name: 'headerNavbar'
};
</script>

<style lang="scss" scoped>
@media (min-width: 992px) {
  section.header-navbar {
    display: flex;
  }
}

.header-navbar {
  display: none;
}

a {
  color: white;
  transition: all 0.3s;
  &:hover, &.router-link-exact-active {
    color: #3f7a64;
  }
}

svg {
  margin: 0 15px;
}

h6 {
  font-size: 0.35em;
  font-weight: normal;
  width: fit-content;
  margin: 0 auto;
}
</style>
