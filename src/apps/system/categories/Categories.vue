<template>
  <el-card>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="分类名称">
        <el-input v-model="formInline.user" placeholder="分类名称" clearable/>
      </el-form-item>
      <el-form-item label="状态">
        <el-select
            v-model="formInline.region"
            placeholder="选择状态"
            clearable
        >
          <el-option label="正常" value="shanghai"/>
          <el-option label="禁用" value="beijing"/>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit" :icon="Search" plain >查询</el-button>
        <el-button type="primary" @click="onSubmit" plain>新增</el-button>
        <el-button color="#626aef" @click="onSubmit" plain>导出</el-button>
      </el-form-item>
    </el-form>
    <el-table
        :data="tableData"
        border
        style="width: 100%"
        :row-class-name="tableRowClassName"
    >
      <el-table-column prop="date" label="Date" />
      <el-table-column prop="name" label="Name"/>
      <el-table-column prop="address" label="Address"/>
    </el-table>
  </el-card>

</template>

<script setup>
import {reactive} from 'vue'
import {Search} from "@element-plus/icons-vue";

const formInline = reactive({
  user: '',
  region: '',
  date: '',
})
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
const onSubmit = () => {
  console.log('submit!')
}

const tableRowClassName = ({
                             row,
                             rowIndex,
                           }) => {
  if (rowIndex === 1) {
    return 'warning-row'
  } else if (rowIndex === 3) {
    return 'success-row'
  }
  return ''
}
</script>

<style>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>