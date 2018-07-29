<template>
  <section class="about">
    <h2>About the app</h2>
    <h2>About the developers</h2>
  </section>
</template>

<script>
export default {
  name: 'about'
};
</script>

<style lang="scss" scoped>
.about {
  background-color: #fac929;
  padding: 10px;
  width: 82vw;
  max-width: 400px;
  height: 100%;
  position: fixed;
  top: 60px;
  right: -82vw;
  transition: all .6s ease-in-out;
}
</style>
