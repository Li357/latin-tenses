<template>
  <div id="app">
    <sidebar />
    <router-view></router-view>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar';

export default {
  name: 'App',
  components: { Sidebar },
};
</script>

<style lang="stylus">
html, body
  height: 100%
  width: 100%
  margin: 0
  overflow: hidden

#app
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  display: flex
  height: 100%;
  flex-direction: row
</style>
