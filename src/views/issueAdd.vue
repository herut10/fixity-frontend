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
      <autoComplete @place_changed="placeChanged" :placeholder="'heyo'" v-model="newIssue.address" ></autoComplete>
      <button @click="setLocationSelf">my location</button>
        </div>
      <input v-model="newIssue.title" type="text" placeholder="title"/>
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
      
      <button @click="onSubmit">submit</button>

      </form>
      <button @click="openWidget" id="upload_widget_opener">Upload multiple images</button>


    </section>
</template>

<script>
import { ISSUES_TO_DISPLAY } from "@/store/issueModule.js";
import autoComplete from "vue2-google-maps/dist/components/autocomplete.vue";
import mapService from "@/services/mapService.js";

// import cloudinary from "//widget.cloudinary.com/global/all.js";

export default {
  components: {
    autoComplete
  },
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
  watch: {
    center: {
      handler(center, oldCenter) {
        mapService.converCoordsToAddress(center).then(address => {
          this.newIssue.address = address;
        });
      },
      deep: true
    }
  },
  methods: {
    placeChanged(val) {
      var loc = val.geometry.location;
      [this.center.lat, this.center.lng] = [loc.lat(), loc.lng()];
    },
    openWidget() {
      cloudinary.openUploadWidget(
        { cloud_name: "demo", upload_preset: "a5vxnzbp" },
        function(error, result) {
          console.log(error, result);
        }
      );
    },
    onFileChanged(event) {
      const file = event.target.files[0];
      console.log(file);
      this.selectedFile = event.target.files[0];
    },
    onSubmit() {},
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
