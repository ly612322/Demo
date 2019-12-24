<template>
  <div>
    <el-scrollbar>
      <el-menu
        class="el-menu-vertica"
        background-color="#304156"
        text-color="white"
        :show-timeout="200"
        router
        unique-opened
        :collapse="this.$store.state.collapse"
        :collapse-transition="true"
        :default-active="this.$route.path"
      >
        <template>
          <el-menu-item>
            <span v-show="!this.$store.state.collapse">
              <h3>中非商贸服务平台</h3>
            </span>
          </el-menu-item>
        </template>
        <template v-for="item in menulist">
          <el-menu-item v-if="item.children.length == 0 " :key="item.id" :index="'/' + item.path">
            <i :class="iconlist[1]"></i>
            <span slot="title">{{item.title}}</span>
          </el-menu-item>
          <el-submenu v-else :key="item.id + '' " :index="'/' + item.path">
            <template slot="title">
              <i :class="iconlist[1]"></i>
              <span slot="title">{{item.title}}</span>
            </template>
            <el-menu-item
              :index="'/' + subitem.path"
              v-for="subitem in item.children"
              :key="subitem.id"
            >
              <i class="el-icon-edit-outline"></i>
              <span slot="title">{{subitem.title}}</span>
            </el-menu-item>
          </el-submenu>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menulist: [
        {
          id: 1,
          title: "控制台",
          path: "控制台",
          children: []
        },
        {
          id: 2,
          title: "文件管理",
          path: "文件管理",
          children: []
        },
        {
          id: 3,
          title: "商品管理",
          path: "商品管理",
          children: []
        },
        {
          id: 4,
          title: "项目管理",
          path: "项目管理",
          children: []
        },
        {
          id: 5,
          title: "公司管理",
          path: "公司管理",
          children: []
        },
        {
          id: 6,
          title: "成员管理",
          path: "成员管理",
          children: []
        },
        {
          id: 7,
          title: "商贸图谱",
          path: "商贸图谱",
          children: []
        }
      ],
      iconlist: {
        "1": "el-icon-s-home"
      }
    };
  },
  methods: {
    // async getMenuList () {
    //   const { data: res } = await this.$http.get('/menulist')
    //   if (res.mate.status !== 200) {
    //     this.$message.error('获取失败')
    //   } else {
    //     this.menulist = res.data
    //   }
    // },
    collapse() {
      this.$store.commit("toCollapse");
    }
  },
  created() {}
};
</script>

<style lang='less'>
.el-menu-vertica:not(.el-menu--collapse) {
  width: 200px;
  height: 100vh;
}
.el-menu-vertica {
  width: 60px;
  height: 110vh;
}

h3 {
  display: inline-block;
  color: #fff;
  text-align: center;
  font-size: 20px;
  margin: 0px 0px 0px 0px;
  padding: 0;
}
</style>
