<template>
  <div class="sidebar">
    <router-link
      v-for="{ name } of tenses"
      :key="name"
      :to="`/${name}`"
      :class="['item', { 'router-link-active': $route.params.tense === name }]"
    >
      {{ name.toUpperCase() }}
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'sidebar',
};
</script>

<style lang="stylus" scoped>
.sidebar
  min-width: 200px
  max-width: 300px
  flex-basis: auto
  padding: 150px 50px
  font-family: "Roboto Condensed", Helvetica, Arial, sans-serif
  flex: 1

.item
  text-decoration: none
  display: block
  color: #B4B4B4
  font-size: 25px
  transition: color 0.5s
  margin: 10px 0
  -webkit-user-select: none
  -moz-user-select: none
  -ms-user-select: none
  user-select: none

.router-link-active
  color: black
</style>
