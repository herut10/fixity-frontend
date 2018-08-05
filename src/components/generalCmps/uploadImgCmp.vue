<template>
    <label>
      <slot>default</slot>
      <input  type="file" 
      accept="image/*" 
      v-bind:multiple="!single"  v-on:change="upload($event.target.files)"/>
    </label>
</template>
​
<script>
import axios from 'axios';
export default {
  props: {
    single: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  data() {
    return {
      cloudinary: {
        uploadPreset: 'qtz1qjeq',
        apiKey: '746648462286187',
        cloudName: 'djewvb6ty'
      }
    };
  },
  computed: {
    clUrl() {
      return `https://api.cloudinary.com/v1_1/${
        this.cloudinary.cloudName
      }/upload`;
    }
  },
  methods: {
    upload(files) {
      var uploadPrms = [];
      var that = this;
      var formData;
      for (let i = 0; i < files.length; i++) {
        formData = new FormData();
        formData.append('file', files[i]);
        formData.append('upload_preset', this.cloudinary.uploadPreset);
        uploadPrms[i] = axios.post(this.clUrl, formData);
      }
      Promise.all(uploadPrms)
        .then(results => {
          return results.map(res => {
            return res.data.url;
          });
        })
        .then(URLs => {
          that.$emit('imgsUploaded', URLs);
        });

      //   axios.post(this.clUrl, formData, { withCredentials: false }).then(res => {
      //     debugger;
      //     // let newUrl = res.data.secure_url;
      //   });
    }
  }
};
</script>
​
<style lang="scss" scoped>
input {
  position: fixed;
  top: -100vh;
  width: 0;
  height: 0;
}

label {
  cursor: pointer;
  width: fit-content;
  border-radius: 4px;
  border: 1.5px solid #6baad8;
  color: #248fde;
  font-size: 0.7em;
  background-color: white;
  padding: 5px 10px;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  margin: 10px 0;
  &:hover {
    color: white;
    border-color: #6491b3;
    background-color: #6baad8;
  }
}
</style>