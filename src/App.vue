<template>
  <div id="app">
    <Header/>
    <router-view/>
  </div>
</template>

<script>
  import Header from "./components/content/Header/Header";
  export default {
    name: "App",
    data() {
      return {}
    },
    methods: {},
    components: {Header},
    props: {}

  }
</script>

<style>
  #app{
    background-color: #f5f5f5;
  }
  .bigPhoto{
    font-size: 20px;
  }
  .myPopover{
    width: 100px;
  }
</style>