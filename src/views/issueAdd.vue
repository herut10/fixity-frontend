<template>
    <section>
      <GmapMap
        :center="center"
        @click="setCenter"
        :zoom="7"
        map-type-id="terrain"
      >
        <GmapMarker
          :position="center"
          :clickable="true"
          :draggable="false"
        />
      </GmapMap>
      <form >
      <input v-model="newIssue.address" type="text" placeholder="address"/>
      <input v-model="newIssue.title" type="text" placeholder="title" maxlength="25" />
      <textarea v-model="newIssue.title" type="text" placeholder="title" ></textarea>
      <select>
        <option value="pedestrian">pedestrian</option>
        <option value="garbage">garbage</option>
        <option value="road hazzard">road hazzard</option>
      </select>
      </form>
    </section>
</template>

<script>
import { ISSUES_TO_DISPLAY } from "@/store/issueModule.js";
export default {
  data() {
    return {
      newIssue: {
        title: '',
        address: '',
        body:'',
        category:''
      },
      center: {
        lat: 10,
        lng: 10
      }
    };
  },
  methods: {
    setCenter(ev) {
      [this.center.lat, this.center.lng] = [ev.latLng.lat(), ev.latLng.lng()];
      console.log('click');
    },
  },
  created() {
    navigator.geolocation.getCurrentPosition(position => {
      [this.center.lat, this.center.lng] = [
        position.coords.latitude,
        position.coords.longitude
      ];
    });
  }
};
</script>

<style scoped>
.vue-map-container {
  width: 100%;
  height: 200px;
}
</style>
