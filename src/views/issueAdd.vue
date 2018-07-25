<template>
    <section class="flex column align-center">
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
      <form class="flex column align-center" >
        <div class="flex justify-center">
      <input v-model="newIssue.address" type="text" placeholder="address"/>
      <button>search</button>
      <button @click="setLocationSelf">my location</button>
        </div>
      <input v-model="newIssue.title" type="text" placeholder="title" />
      <textarea v-model="newIssue.title" type="text" placeholder="title" ></textarea>
      <select>
        <option value="pedestrian">Pedestrian</option>
        <option value="garbage">Garbage</option>
        <option value="road hazzard">Road Hazzard</option>
      </select>
      <label>
        Submit as anonymous
        <input type="checkbox"/>
      </label>
      <button>upload picture</button>
      <input type="file" @change="onFileChanged">
<button @click="onUpload">Upload!</button>
      
      <button @click="submit">submit</button>

      </form>
    </section>
</template>

<script>
import { ISSUES_TO_DISPLAY } from "@/store/issueModule.js";
export default {
  data() {
    return {
      newIssue: {
        title: "",
        address: "",
        body: "",
        category: ""
      },
      center: {
        lat: 10,
        lng: 10
      },
       selectedFile: null
    };
  },
  methods: {
    onFileChanged(event) {
      const file = event.target.files[0];
      console.log(file);
      this.selectedFile = event.target.files[0]
      
    },
    onUpload() {
      // upload file
    },
    submit() {
      console.log("heyo");
    },
    setLocationSelf() {
      navigator.geolocation.getCurrentPosition(position => {
        [this.center.lat, this.center.lng] = [
          position.coords.latitude,
          position.coords.longitude
        ];
      });
    },
    setCenter(ev) {
      [this.center.lat, this.center.lng] = [ev.latLng.lat(), ev.latLng.lng()];
    }
  },
  created() {
    this.setLocationSelf();
  }
};
</script>


<style scoped>
.vue-map-container {
  width: 100%;
  height: 200px;
}

form {
  border: 1px black solid;
  padding: 10px;
}
</style>
