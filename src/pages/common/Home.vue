<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content clearfix" id="content">
            <transition name="move" mode="out-in"><router-view></router-view></transition>
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './sidebar.vue';
    export default {
        components:{
            vHead,
          vSidebar
        },
      methods: {
        //设置content最小高度
        setMinHeight() {
          var content = document.getElementById('content');
          var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
          content.style.minHeight = (clientHeight - 90) + 'px';
        }
      },
      mounted() {
        this.setMinHeight();
      }
    }
</script>
<style>
  .wrapper {
    height:auto;
    background: #F6F6F6;
  }
  .content {
    box-sizing: border-box;
    margin: 0 auto;
    width: 1024px;
    height:auto;
    background: #fff;
    /*padding: 30px;*/
  }
</style>
