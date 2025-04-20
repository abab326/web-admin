<script setup lang="ts">
const currentPage = ref(1);
const pageSize = ref(10);
const tableData = ref<{ id: number; name: string; age: number; gender: string; email: string }[]>(
  []
);
let currentRequest: Promise<void> | null = null;
onMounted(() => {
  handlePaginationChange();
});
const generateData = (current: number, size: number) => {
  const data = [];
  for (let i = 1; i <= size; i++) {
    data.push({
      id: current * 10 + i,
      name: `第${current}页-用户${i}`,
      age: Math.floor(Math.random() * 30) + 18,
      gender: Math.random() < 0.5 ? "男" : "女",
      email: `user${i}@example.com`
    });
  }
  return data;
};

const handlePaginationChange = async () => {
  if (currentRequest) {
    // 取消之前的请求
    currentRequest = null;
  }

  const request = new Promise<void>(resolve => {
    setTimeout(() => {
      if (request === currentRequest) {
        tableData.value = [...generateData(currentPage.value, pageSize.value)];
        resolve();
      }
    }, 1500); // 模拟异步请求延迟
  });
  currentRequest = request;
  await request;
};
</script>

<template>
  <div>
    <el-table :data="tableData">
      <el-table-column label="ID" prop="id"></el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="年龄" prop="age"></el-table-column>
      <el-table-column label="性别" prop="gender"></el-table-column>
      <el-table-column label="邮箱" prop="email"></el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-count="10"
      @change="handlePaginationChange"
    />
  </div>
</template>

<style scoped></style>
