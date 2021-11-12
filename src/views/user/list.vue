<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true">
      <el-form-item>
        <el-input v-model="searchObj.username" placeholder="用户名" />
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchObj.utype" clearable placeholder="头衔">
          <el-option :value="'1'" label="会员" />
          <el-option :value="'2'" label="专家" />
        </el-select>
      </el-form-item>
      <el-form-item label="注册时间">
        <el-date-picker
          v-model="searchObj.create_time_Begin"
          placeholder="开始时间"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item label="-">
        <el-date-picker
          v-model="searchObj.create_time_End"
          placeholder="结束时间"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="fetchData">查询</el-button>
        <el-button type="default" @click="resetData()">清空</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="list" border stripe>
      <el-table-column label="#" width="50">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="username" label="名称" width="120" />
      <el-table-column label="头衔" width="80">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.utype === '1'" type="success" size="mini">会员</el-tag>
          <el-tag v-if="scope.row.utype === '2'" size="mini">专家</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" width="120" />
      <el-table-column prop="level" label="等级" width="60" />
      <el-table-column prop="integral" label="积分" width="60" />
      <el-table-column label="头像" width="100" align="center">
        <template slot-scope="scope">
          <!-- <img v-if="scope.row.utype !== null" src="~@/views/user/1.jpg" alt="头像" width="100%"> -->
          <img v-if="scope.row.utype !== null" :src="scope.row.avatar" alt="头像" width="100%">
        </template>
      </el-table-column>
      <el-table-column prop="signature" label="个人签名" />
      <el-table-column prop="createTime" label="注册时间" width="160" />
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/user/edit/'+scope.row.uid">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button size="mini" type="danger" @click="removeById(scope.row.uid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      :current-page="page"
      :total="total"
      :page-size="limit"
      :page-sizes="[10, 20, 30, 40, 50, 100]"
      style="padding: 30px 0; text-align: center"
      layout="total, sizes, prev, pager, next, jumper"
      @current-change="changeCurrentPage"
      @size-change="changePageSize"
    />
  </div>
</template>

<script>
import userApi from '@/api/user'
export default {
  data() {
    return {
      list: [], // 数据列表
      total: 0, // 总记录数
      page: 1, // 页码
      limit: 10, // 每页记录数
      searchObj: {} // 查询条件
    }
  },

  created() {
    this.fetchData()
  },

  methods: {
    // 调用api模块 ，加载用户列表
    fetchData() {
      userApi
        .pageList(this.page, this.limit, this.searchObj)
        .then((response) => {
          this.list = response.data.rows
          this.total = response.data.total
        })
    },

    // 改变页码，page：回调参数，表示当前选中的“页码”
    changeCurrentPage(page) {
      this.page = page
      this.fetchData()
    },

    // 每页记录数改变，size：回调参数，表示当前选中的“每页条数”
    changePageSize(size) {
      this.limit = size
      this.fetchData()
    },

    // 重置表单
    resetData() {
      this.searchObj = {}
      this.fetchData()
    },

    // 每页记录数改变，size：回调参数，表示当前选中的“每页条数”
    removeById(id) {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return userApi.removeById(id)
        })
        .then((response) => {
          this.fetchData()
          this.$message.success(response.message);
        })
        .catch((error) => {
          console.log("error", error)
          // 当取消时会进入catch语句:error = 'cancel'
          // 当后端服务抛出异常时：error = 'error'
          if (error === "cancel") {
            this.$message.info("取消删除")
          }
        })
    }
  }
}
</script>