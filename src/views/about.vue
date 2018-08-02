<template>
  <section class="about">
    <h2>The App</h2>
    <p>Lorem ipsum lorem ipsum.</p>
    <h2>The Developers</h2>
    <h3>Herut Yona</h3>
    <p>Lorem ipsum lorem ipsum.</p>
    <h3>Kareen Ben Ari</h3>
    <p>Lorem ipsum lorem ipsum.</p>
    <h3>Mark Kopolov</h3>
    <p>Lorem ipsum lorem ipsum.</p>
  </section>
</template>

<script>
export default {
  name: 'about'
};
</script>

<style lang="scss" scoped>
.about {
  background-color: #474747;
  color: white;
  padding: 10px;
  width: 82vw;
  max-width: 400px;
  height: 100%;
  position: fixed;
  top: 60px;
  right: -82vw;
  transition: all 0.6s ease-in-out;
  z-index: 3;
  &.about-open {
    right: 0;
  }
}

h2 {
  color: white;
  font-weight: normal;
}

p {
  color: white;
}
</style>
