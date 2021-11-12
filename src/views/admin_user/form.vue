<template>
  <div class="app-container">
    <!-- 输入表单 -->
    <el-form label-width="120px">
      <el-form-item label="管理员名称" width="100">
        <el-input v-model="admin_user.name" />
      </el-form-item>
      <!--el-form-item label="入驻时间">
        <el-date-picker v-model="admin_user.createTime" value-format="yyyy-MM-dd" />
      </el-form-item-->
      <el-form-item label="权限">
        <el-select v-model="admin_user.authority">
          <!--
            数据类型一定要和取出的json中的一致，否则没法回填
            因此，这里value使用动态绑定的值，保证其数据类型是number
          -->
          <el-option :value="1" label="普通管理员"/>
          <el-option :value="2" label="超级管理员"/>
        </el-select>
      </el-form-item>
      <el-form-item label="个人简介">
        <el-input v-model="admin_user.signature" :rows="10" type="textarea"/>
      </el-form-item>
      <!-- 讲师头像：TODO -->
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate()">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import userApi from '@/api/admin_user'
export default {
  data() {
    return {
      // 初始化讲师默认数据
      admin_user: {
        authority: 1
      },
      saveBtnDisabled: false // 保存按钮是否禁用，防止表单重复提交
    }
  },

  // 页面渲染成功
  created() {
    if (this.$route.params.id) {
      this.fetchDataById(this.$route.params.id)
    }
  },

  methods: {
    saveOrUpdate() {
    // 禁用保存按钮
      this.saveBtnDisabled = true
      if (!this.admin_user.id) {
        this.saveData()
      } else {
        this.updateData()
      }
    },
    // 新增讲师
    saveData() {
    // debugger
      userApi.save(this.admin_user).then(response => {
        this.$message({
          type: 'success',
          message: response.message
        })
        this.$router.push({ path: '/admin_user/list' })
      })
    },

    // 根据id查询记录
    fetchDataById(id) {
      userApi.getById(id).then(response => {
        this.admin_user = response.data.item
      })
    },
    // 根据id更新记录
    updateData() {
    // teacher数据的获取
      userApi.updateById(this.admin_user).then(response => {
        this.$message({
          type: 'success',
          message: response.message
        })
        this.$router.push({ path: '/admin_user' })
      })
    }
  }
}
</script>
