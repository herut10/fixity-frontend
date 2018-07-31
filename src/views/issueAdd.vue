<template>
    <section class="issue-add container flex column align-center">
      <GmapMap
        :center="center"
        @click="setCenter"
        :zoom="17"
        map-type-id="terrain"
      >
        <GmapMarker
          :position="center"
          :clickable="true"
          :draggable="false"
          :icon="`img/map-icons/${newIssue.category}-open.png`"
        />
      </GmapMap>
      <form action.prevent="" class="flex column align-center" >
        <div class="flex justify-center">
      <autoComplete @place_changed="placeChanged" :placeholder="'heyo'" v-model="newIssue.address" ></autoComplete>
      <button @click.prevent="setLocationSelf">my location</button>
        </div>
      <input v-model="newIssue.title" type="text" placeholder="title" required maxlength="25"/>
      <textarea v-model="newIssue.body" placeholder="enter description" required ></textarea>
      <select v-model="newIssue.category">
        <option value="pedestrian">Pedestrian</option>
        <option value="garbage">Garbage</option>
        <option value="construction">Construction</option>
      </select>
      <label>
        Submit as anonymous
        <input type="checkbox"/>
      </label>
      <button @click.prevent="openWidget" id="upload_widget_opener">Upload images</button>
      
      <button @click.prevent="onSubmit">submit</button>
      {{center}}
      </form>
    <pre>{{newIssue}}</pre>
    

    </section>
</template>

<script>
import { ISSUES_TO_DISPLAY } from '@/store/issueModule.js';
import { SUBMIT_ISSUE } from '@/store/issueModule.js';
import { CURRLOC } from '@/store/userModule.js';
import { SET_CURRLOC } from '@/store/userModule.js';
import { USER } from '@/store/userModule.js';
import autoComplete from 'vue2-google-maps/dist/components/autocomplete.vue';
import mapService from '@/services/mapService.js';

export default {
  components: {
    autoComplete
  },

  data() {
    return {
      newIssue: {
        title: '',
        address: '',
        body: '',
        category: 'pedestrian',
        status: 'open',
        imgUrls: [],
        nonIssueReportCount: 0,
        likes: {
          likeHappy: 0,
          likeSad: 0,
          likeAngry: 0,
          likeShocked: 0,
          likeDisgusted: 0
        }
      },
      center: {
        lat: 10,
        lng: 10
      },
      isAnon: false,
      selectedFile: null
    };
  },

  watch: {
    center: {
      handler(center, oldCenter) {
        mapService.convertCoordsToAddress(center).then(address => {
          this.newIssue.address = address;
        });
      },
      deep: true
    }
  },
  computed: {
    currLoc() {
      return this.$store.getters[CURRLOC];
    }
  },
  methods: {
    placeChanged(val) {
      var loc = val.geometry.location;
      [this.center.lat, this.center.lng] = [loc.lat(), loc.lng()];
    },
    openWidget() {
      new Promise((reject, resolve) => {
        cloudinary.openUploadWidget(
          {
            cloud_name: 'djewvb6ty',
            upload_preset: 'qtz1qjeq',
            sources: ['local']
          },
          function(result, error) {
            if (error) reject(error);
            else resolve(result);
          }
        );
      })
        .then(images => {
          images.forEach(image => {
            this.newIssue.imgUrls.push(image.secure_url);
          });
        })
        .catch(res => {
          console.log('catch', res);
        });
    },
    onFileChanged(event) {
      const file = event.target.files[0];
      this.selectedFile = event.target.files[0];
    },
    onSubmit() {
      var userId = this.$store.getters[USER]._id;
      if (this.newIssue.imgUrls.length === 0)
        this.newIssue.imgUrls.push(
          'https://res.cloudinary.com/djewvb6ty/image/upload/v1532962154/placeholder.png'
        );
      var issueToSubmit = JSON.parse(JSON.stringify(this.newIssue));
      issueToSubmit.loc = JSON.parse(JSON.stringify(this.center));
      issueToSubmit.loc.lat = issueToSubmit.loc.lat;
      issueToSubmit.loc.lng = issueToSubmit.loc.lng;
      if (!this.isAnon) {
        issueToSubmit.reportedBy = userId;
      }
      this.$socket.emit('issueAdd', issueToSubmit);
      this.$router.push('/');
    },
    setLocationSelf() {
      var loc = this.$store.getters[CURRLOC];
      if (loc) {
        this.center = JSON.parse(JSON.stringify(loc));
      } else {
        navigator.geolocation.getCurrentPosition(position => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          this.$store.commit({
            type: SET_CURRLOC,
            currLoc: this.center
          });
        });
      }
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
