<template>
    <section class="issue-add container flex column align-center">
      <GmapMap
        :center="mapCenter"
        @click="setCenter"
        :zoom="17"
        map-type-id="terrain"
      >
        <GmapMarker
          :position="center"
          :clickable="true"
          :draggable="false"
          :animation=2
          :icon="`img/map-icons/${newIssue.category}-open.png`"
        />
      </GmapMap>
      <form action.prevent="" class="flex column " >
        <div class="location-input flex align-baseline">
          <autoComplete @place_changed="placeChanged" :placeholder="'Address (required)'" v-model="newIssue.address" ></autoComplete>
          <button @click.prevent="setLocationSelf">my location</button>
        </div>
        <input v-model="newIssue.title" type="text" placeholder="Title (required)"  maxlength="25"/>
        <textarea class="desc-input" v-model="newIssue.desc" placeholder="Description (required)"  ></textarea>
          <img-upload @imgsUploaded="saveURLs">Upload <font-awesome-icon icon="camera" class="active"/></img-upload>
        <label class="flex" >Category:
          <select  v-model="newIssue.category">
            <option value="pedestrian">Pedestrian</option>
            <option value="garbage">Garbage</option>
            <option value="construction">Construction</option>
          </select>
        </label>
        <label class="anonymous">
          <input type="checkbox"/>
          Submit as anonymous
        </label>
        <button @click.prevent="promptUser">submit</button>
      </form>

        <modal name="hello-world">
          hello, world!
        </modal>
    </section>
</template>

<script>
import { ISSUES_TO_DISPLAY, SUBMIT_ISSUE } from '@/store/issueModule.js';
import {
  SET_CURRLOC,
  USER,
  CURRLOC,
  HASBEENPROMPTED,
  SET_HASBEENPROMPTED
} from '@/store/userModule.js';
import autoComplete from 'vue2-google-maps/dist/components/autocomplete.vue';
import mapService from '@/services/mapService.js';
import utilsService from '@/services/utilsService.js';
import imgUpload from '@/components/generalCmps/uploadImgCmp.vue';
export default {
  components: {
    autoComplete,
    imgUpload
  },

  data() {
    return {
      newIssue: {
        title: '',
        address: '',
        desc: '',
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
      mapCenter: {
        lat: 10,
        lng: 10
      },
      center: {
        lat: 10,
        lng: 10
      },
      isAnon: false
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
    promptUser() {
      var that = this;

      if (!this.$store.getters[USER] && !this.$store.getters[HASBEENPROMPTED]) {
        this.$store.commit(SET_HASBEENPROMPTED);
        this.$modal.show('dialog', {
          title: 'YOU ARE NOT LOGGED IN',
          text:
            'Not being logged in prevents us from providing you with the best service that you deserve.',
          buttons: [
            {
              title: 'Tell me more',
              handler: () => {
                that.$modal.hide('dialog');
                that.$modal.show('loginModal');
              }
            },
            {
              title: 'Maybe next time',
              handler: () => {
                that.$modal.hide('dialog');
                that.onSubmit();
              }
            }
          ]
        });
      } else {
        that.onSubmit();
      }
    },
    saveURLs(URLs) {
      this.newIssue.imgUrls = URLs;
    },
    placeChanged(val) {
      var loc = val.geometry.location;
      [this.center.lat, this.center.lng] = [loc.lat(), loc.lng()];
    },
    onSubmit() {
      if (
        !(this.newIssue.title && this.newIssue.desc && this.newIssue.address)
      ) {
        this.$modal.show('dialog', {
          title: 'MISSING DETAILS',
          text:
            'One or more of the required field are missing, please make sure you fill them all.',
          buttons: [
            {
              title: 'close'
            }
          ]
        });
        return;
      }
      var user = this.$store.getters[USER];
      var userId = user ? this.$store.getters[USER]._id : '';
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
      this.$notify({
        group: 'foo',
        title: 'Important message',
        text: this.newIssue.title + ' ' + 'added successfuly!',
        type: 'success',
        duration: 5000
      });
      this.$router.push('/');
    },
    setLocationSelf() {
      var loc = this.$store.getters[CURRLOC];
      if (loc) {
        this.center = JSON.parse(JSON.stringify(loc));
        this.mapCenter = JSON.parse(JSON.stringify(this.center));
      } else {
        navigator.geolocation.getCurrentPosition(position => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          this.mapCenter = JSON.parse(JSON.stringify(this.center));

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



<style lang="scss" scoped>
.issue-add {
  padding-top: 15px;
  padding-bottom: 15px;
}

@media (min-width: 980px) {
  .issue-add {
    flex-direction: row-reverse;
    justify-content: space-around;
    padding-top: 35px;

    form {
      width: 50%;
    }

    .vue-map-container {
      margin: 0;
    }
  }
}

label.anonymous,
input[type="checkbox"],
select {
  cursor: pointer;
}
.location-input {
  width: 100%;
}
input[type="password"],
input[type="text"],
textarea,
select {
  color: #3c9ee4;
  display: block;
  box-sizing: border-box;
  margin-bottom: 4px;
  width: 100%;
  font-size: 12px;
  line-height: 2;
  border: 0;
  border-bottom: 1px solid #dddedf;
  padding: 4px 8px;
  font-family: inherit;
  transition: 0.5s all;
  outline: none;
}
input[type="text"] {
  margin-right: 20px;
}
button,
input[type="file"] {
  background: white;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 10px;
  letter-spacing: 1px;
  font-family: "Open Sans", sans-serif;
  font-weight: 400;
  min-width: 140px;
  margin-top: 8px;
  // color: #8b8c8d;
  color: #248fde;
  cursor: pointer;
  // border: 1px solid #dddedf;
  border: 1.5px solid #6baad8;
  text-transform: capitalize;
  transition: 0.1s all;
  // font-size: 10px;
  font-size: 0.7em;
  outline: none;
  &:hover {
    // border-color: mix(#dddedf, black, 90%);
    // color: mix(#8b8c8d, black, 80%);
    color: white;
    border-color: #6491b3;
    background-color: #6baad8;
  }
}

input[type="file"] {
  width: 100%;
}

.vue-map-container {
  width: 100%;
  max-width: 450px;
  height: 320px;
  margin-bottom: 15px;
}

form {
  border-radius: 4px;
  border: 1px #c4c0c0 solid;
  padding: 10px;
  width: 100%;
  max-width: 450px;
  height: 320px;
}
</style>
