<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.title" placeholder="标题" />
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="searchObj.u_id"
          clearable
          placeholder="请选择作者">
          <el-option
            v-for="user in userList"
            :key="user.uid"
            :label="user.username"
            :value="user.uid"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="searchObj.t_id"
          clearable
          placeholder="请选择分类">
          <el-option
            v-for="type in typeList"
            :key="type.tid"
            :label="type.typename"
            :value="type.tid"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchObj.statement" clearable placeholder="声明">
          <el-option :value="'原创'" label="原创" />
          <el-option :value="'转载'" label="转载" />
          <el-option :value="'翻译'" label="翻译" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchObj.authority" clearable placeholder="权限">
          <el-option :value="'off'" label="公开" />
          <el-option :value="'on'" label="不公开" />
        </el-select>
      </el-form-item>
      <el-form-item label="分布时间">
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
      <el-table-column prop="title" label="标题"/>
      <el-table-column prop="username" label="作者" width="120" />
      <el-table-column prop="typename" label="分类" width="80"/>
      <el-table-column prop="statement" label="声明" width="80" />
      <el-table-column prop="authority" label="权限" width="60" />
      <el-table-column prop="views" label="浏览量" width="60" />
      <el-table-column prop="heat" label="热度" width="60" />
      <el-table-column prop="thumbs" label="点赞" width="60" />
      <el-table-column prop="createTime" label="分布时间" width="160" />
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
import blogApi from '@/api/blog'
import userApi from '@/api/user'
import typeApi from '@/api/type'
export default {
  data() {
    return {
      list: [], // 数据列表
      total: 0, // 总记录数
      page: 1, // 页码
      limit: 10, // 每页记录数
      searchObj: {}, // 查询条件
      userList: [], // 用户列表
      typeList: [] // 分类列表
    }
  },

  created() {
    this.fetchData()
    // 获取用户列表
    this.initUserList()
    // 获取分类列表
    this.initTypeList()
  },

  methods: {
    // 调用api模块 ，加载用户列表
    fetchData() {
      blogApi
        .pageList(this.page, this.limit, this.searchObj)
        .then((response) => {
          this.list = response.data.rows
          this.total = response.data.total
        })
    },
    initUserList() {
      userApi.list().then(response => {
        this.userList = response.data.items
      })
    },
    initTypeList() {
      typeApi.list().then(response => {
        this.typeList = response.data.items
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