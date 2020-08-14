<template>
  <div>
    <top-header></top-header>
    <nav-menu></nav-menu>
    <div class="main">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import TopHeader from '@/components/TopHeader'
import NavMenu from '@/components/NavMenu'
export default {
  name: 'home',
  components: { TopHeader, NavMenu },
  data() {
    return {

    }
  },
  moouted() {
    console.log('home mouted')
  }
}
</script>

<style lang="scss" scoped>
</style>
