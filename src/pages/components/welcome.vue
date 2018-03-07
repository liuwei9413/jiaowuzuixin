<template>
  <div class="welcome">
    <h1>{{ msg }}</h1>
    <h2>译泰教务系统</h2>
  </div>
</template>

<script>
  export default {
    name: 'welcome',
    data () {
      return {
        msg: 'Welcome Educational',
        }
      }
  }
</script>
<style>
  .welcome {
    padding: 30px;
    min-height: 774px;
    text-align: center;
  }
</style>
