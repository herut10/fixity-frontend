<template>
  <section class="about">
    <h2>The App</h2>
    <p>Fixity is a social community for reporting deficiencies in your surroundings,
      meant to increase public involvement in improving their environment.</p>
    <p>This is a final project that demonstrates the abilities we have acquired
      during a three-months bootcamp Full Stack Development course.
      It was built with Vue.js as the frontend framework and Node.js as the server environment.</p>
    
    <h2>The Developers</h2>

    <div class="team-member">
      <div>
        <h3>Herut Yona</h3>
        <p>23 year old full stack developer from Eshbol.</p>
      </div>
      <img src="/img/team/herut.jpg" alt="Herut Yona" />
    </div>

    <div class="team-member">
      <div>
        <h3>Kareen Ben Ari</h3>
        <p>29 year old full stack developer from Tel Aviv.</p>
      </div>
      <img src="/img/team/kareen.jpg" alt="Kareen Ben Ari" />
    </div>

    <div class="team-member">
      <div>
        <h3>Mark Kopolov</h3>
        <p>33 year old full stack developer from Beer Sheva.</p>
      </div>
      <img src="/img/team/mark.jpg" alt="Mark Kopolov" />
    </div>

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
  padding: 10px 10px 80px 10px;
  width: 82vw;
  max-width: 400px;
  height: 100%;
  position: fixed;
  top: 60px;
  right: -82vw;
  transition: all 0.6s ease-in-out;
  z-index: 3;
  overflow-y: scroll;
  &.about-open {
    right: 0;
  }
}

.team-member {
  img {
    border-radius: 50%;
    width: 20%;
    min-width: 100px;
    // max-width: 200px;
  }
}

h2 {
  font-family: 'Roboto', sans-serif;
  color: #cdcdcd;
  font-weight: normal;
  margin-bottom: 15px;
}

h3 {
  font-weight: normal;
}

p {
  color: white;
}
</style>
