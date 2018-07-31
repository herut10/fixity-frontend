<template>
    <section>
        <notifications group="foo"  
               position="bottom right">
   <template slot="body" scope="props">
    <div>
        <a class="title">
          {{props.item.title}}
        </a>
        <a class="close" @click="props.close">
          <i class="fa fa-fw fa-close"></i>
        </a>
        <div v-html="props.item.text">
        </div>
    </div>
  </template>
</notifications>
    </section>
</template>

<script>
export default {
  name: 'notifications',

  data () {
      return {
          
      }
  },

  created () {
    //   this.$notify('text')
//       this.$notify({
//     group: 'foo',
//     title: 'Important message',
//     text: 'Hello user! This is a notification!'
//   });
  }
};
</script>

<style lang="scss" scoped>
    .vue-notification {
  padding: 10px;
  margin: 0 5px 5px;
 
  font-size: 12px;
 
  color: #ffffff;
  background: #44A4FC;
  border-left: 5px solid #187FE7;
 
  &.warn {
    background: #ffb648;
    border-left-color: #f48a06;
  }
 
  &.error {
    background: #E54D42;
    border-left-color: #B82E24;
  }
 
  &.success {
    background: #68CD86;
    border-left-color: #42A85F;
  }
}

</style>
