<template>
  <!-- 顶部navbar 包含折叠按钮 面包屑导航 退出按钮-->
  <div>
    <!-- 折叠按钮切换 -->
    <i
      :class="[listicon ?'el-icon-s-unfold':'el-icon-s-fold']"
      class="navbar-img"
      @click="collapse"
      id="collapseButton"
    ></i>
    <!-- 退出下拉菜单 -->
    <!-- <fullscreen v-model="isFullscreen" class="fullscr" /> -->
    <!-- <i class="refresh" :class="refreshIcon" @click="refreshMain"></i> -->
    <el-dropdown class="user" placement="bottom" @command="logout">
      <i class="el-icon-user-solid">{{this.$store.state.username}}</i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command='change'>切换账号</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!-- 面包屑导航 -->
    <el-breadcrumb class="elbreadcrumb" separator="/">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path">
          <span
            v-if="item.redirect==='noredirect'|| index==levelList.length-1"
            class="no-redirect"
          >{{item.meta.title}}</span>
          <router-link v-else :to="item.redirect||item.path">{{item.meta.title}}</router-link>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  data () {
    return {
      levelList: null,
      listicon: false,
      isFullscreen: false,
      refreshIcon: 'el-icon-refresh'
    }
  },
  watch: {
    $route () {
      // 监听路由
      this.getBreadcrumb()
    }
  },
  methods: {
    logout (command) {
      if(command == 'change'){
        // 退出清空token 跳转登录页
        window.sessionStorage.clear()
        this.$router.push('/login')
      }
      if(command == 'close'){
       this.$store.state.tabsbar = !this.$store.state.tabsbar
      }
    },
    collapse () {
      this.listicon = !this.listicon
      this.$store.commit('toCollapse')
    },
    getBreadcrumb () {
      // 获取route的matched
      let matched = this.$route.matched.filter(item => item.name)
        // 如果不是在首页 则在头部加入首页 ，不需要时注释即可
        // matched = [{ path: '/项目管理', meta: { title: '项目管理' } }]
      
      this.levelList = matched
    },
    refreshMain () {
      this.refreshIcon = 'el-icon-loading'
      let rotate = setTimeout(() => {
        this.refreshIcon = 'el-icon-refresh'
      }, 1000)
      this.$store.state.refresh = new Date().getTime()
    }
    // refreshMain() {
    //   this.refresh = false
    //   // 在组件移除后，重新渲染组件
    //   // 可实现在DOM 状态更新后，执行传入的方法。
    //   this.$nextTick(() => {
    //     this.refresh = true
    //   })
    // }
  },
  created () {
    this.getBreadcrumb()
  }
}
</script>
<style scoped>
.elbreadcrumb {
  height: 49px;
  line-height: 49px;
  border-bottom: 1px solid rgb(196, 196, 196);
  font-size: 16px;
  color: gray;
}
.navbar-img {
  width: 30px;
  height: 30px;
  float: left;
  margin: 10px 10px 10px 15px;
  font-size: 30px;
  color: gray;
}
.user {
  float: right;
  margin: 10px 10px;
  font-size: 20px;
}
.refresh {
  float: left;
  color: #808080;
  line-height: 50px;
  font-size: 26px;
  font-weight: 550;
  margin-right: 10px;
}
.fullscr {
  float: right;
  line-height: 51px;
  margin-right: 15px;
  font-size: 23px;
}
</style>
