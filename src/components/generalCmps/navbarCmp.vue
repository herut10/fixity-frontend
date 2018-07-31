<template>
    <section class="navbar">
        <router-link to="/">Home</router-link>
        <router-link to="/issueAdd">Report</router-link>
        <router-link to="/user">Profile</router-link>
    </section>
</template>

<script>
export default {
  name: 'navbar'
};
</script>

<style lang="scss" scoped>
@media (min-width: 527px) {
  .navbar {
    a {
      margin: 0 50px;
    }
  }
}

.navbar {
  text-align: center;
  box-shadow: inset 0px 2px #1b1a1a;
  background-color: #312e2e;
  position: fixed;
  bottom: 0;
  padding: 15px 0;
  width: 100%;
  z-index: 2;
}

a {
  font-family: 'Open Sans', sans-serif;
  color: white;
  text-shadow: -2px 1px black;
  margin: 0 20px;
  transition: all 0.3s;
  &.router-link-exact-active {
    color: #69c8b2;
  }
  &:hover {
    color: #498b7c;
  }
}
</style>
