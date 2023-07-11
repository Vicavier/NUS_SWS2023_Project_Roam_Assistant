<!--App.vue是主vue模块，主要是使用router-link引入其他模块，App.vue是项目的主组件，所有的页面都是在App.vue下切换的-->
<template>
  <div id="app">
    <router-view/>
  </div>

</template>

<script>
export default {
  name: 'App'
}
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>