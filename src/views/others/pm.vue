<template>
  <div>
    <el-card>
      <el-form ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="活动名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="项目类型">
              <el-select v-model="form.type" placeholder="请选择项目类型">
                <el-option
                  v-for="(item,index) in type"
                  :key="index"
                  :value="item.value"
                  :label="item.lable"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="地区/国家">
              <el-select v-model="form.area" placeholder="请选择地区/国家">
                <el-option
                  v-for="(item,index) in area"
                  :key="index"
                  :value="item.value"
                  :label="item.lable"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="状态">
              <el-select v-model="form.status" placeholder="请选择状态">
                <el-option label="显示" value="显示"></el-option>
                <el-option label="不显示" value="不显示"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button type="primary" style="width:150px" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card style="margin-top:10px;height:65vh">
      <el-row>
        <el-col :span="2">
          <el-button type="primary">批量上架</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="warning">批量下架</el-button>
        </el-col>
        <el-col :offset="18" :span="2">
          <el-button type="danger">发项目</el-button>
        </el-col>
      </el-row>
      <el-table
        :data="tabledata.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        border
        style="margin-top:4px"
        height="360"
        v-loading="loading"
        highlight-current-row
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column align="center" prop="项目名称" label="项目名称" width="220"></el-table-column>
        <el-table-column align="center" prop="项目类型" label="项目类型" width="180"></el-table-column>
        <el-table-column align="center" prop="国家/地区" label="国家/地区" width="120"></el-table-column>
        <el-table-column align="center" prop="状态" label="状态" width="80"></el-table-column>
        <el-table-column align="center" prop="发布人" label="发布人" width="180"></el-table-column>
        <el-table-column align="center" prop="发布时间" label="发布时间" width="180"></el-table-column>
        <el-table-column label="操作"  align="center">
          <template >
            <el-button @click="alertMes" type="primary" size="small">显示</el-button>
            <el-button
              @click="alertMes"
              type="warning"
              size="small"
              style="margin-left:5px"
            >不显示</el-button>
            <el-button
              type="danger"
              @click.native.prevent="alertMes"
              size="small"
              style="margin-left:5px"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 40]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tabledata.length"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "pm",
  data() {
    return {
      loading: false,
      form: {
        name: "",
        type: "",
        area: "",
        status: ""
      },
      tabledata: [],
      type: [],
      area: [],
      currentPage: 1, // 初始页
      pagesize: 10 //    每页的数据
    };
  },
  methods: {
    async onSubmit() {
      this.loading = true;
      const { data } = await this.$http.post(
        "/API/querytable.py",
        this.$qs.stringify(this.form)
      );
      this.loading = false;
      this.tabledata = data.data;
      console.log(this.tabledata);
    },
    async quertType() {
      const { data } = await this.$http.post("/API/type.py");
      let type = data.data.split(",");
      type.forEach(ele => {
        this.type.push({
          label: ele,
          value: ele
        });
      });
    },
    async quertArea() {
      const { data } = await this.$http.post("/API/area.py");
      let type = data.data.split(",");
      type.forEach(ele => {
        this.area.push({
          label: ele,
          value: ele
        });
      });
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pagesize = size;
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
    },
    alertMes() {
        this.$message("点击事件~");
    }
  },
  created() {
    this.quertType();
    this.quertArea();
  }
};
</script>
<style lang="less">
.el-form-item {
  margin: 8px;
}
.pagination {
  margin-top: 4px;
  background: #fff;
  position: relative;
  width: 100%;
}
</style>