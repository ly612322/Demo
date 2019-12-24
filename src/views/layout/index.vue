<template>
  <div>
    <el-container>
      <el-aside style=" width: auto;">
        <sidebar ></sidebar>
      </el-aside>
      <el-container>
        <el-header >
          <navbar />
        </el-header>
        <elmain></elmain>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import sidebar from './components/sliderBar'
import navbar from './components/navBar'
import elmain from './components/main'
export default {
  data () {
    return {
      showMain: ''
    }
  },
  components: {
    sidebar,
    navbar,
    elmain
  }
}
</script>

<style scoped>
.el-header{
  padding: 0;
  height: auto !important;
}
.el-main {
  padding: 0px 10px;
}
.el-container{
  height: 100vh;
}
.el-aside{
  overflow: hidden;
}
</style>
