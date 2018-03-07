<template>
  <div class="password">
    <h1>{{ msg }}</h1>

  </div>
</template>

<script>
  export default {
    name: 'password',
    data () {
      return {
        msg: '学籍管理员--忘记密码'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }


  a {
    color: #42b983;
  }
</style>
