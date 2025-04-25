<script setup lang="ts">
import { useElementSize } from "@vueuse/core";
import { type FormItem } from "@/components/SearchForm.vue";
import { useSafeFunctionExecutor } from "@/composables/useSafeFunctionExecutor";

const safeFunctionExecutor = useSafeFunctionExecutor();
const tableContainerRef = useTemplateRef("tableContainerRef");
const { height } = useElementSize(tableContainerRef);

const searchForm = ref({});
const formItems = ref<FormItem[]>([
  { label: "姓名", prop: "name", component: "input" },
  { label: "年龄", prop: "age", component: "input" },
  {
    label: "性别",
    prop: "gender",
    component: "select",
    options: [
      { label: "男", value: "男" },
      { label: "女", value: "女" }
    ]
  },
  { label: "邮箱", prop: "email", component: "input" },
  { label: "邮箱", prop: "email", component: "input" }
]);
const currentPage = ref(1);
const pageSize = ref(10);
const tableData = ref<{ id: number; name: string; age: number; gender: string; email: string }[]>(
  []
);
let currentRequest: Promise<void> | null = null;
onMounted(() => {
  handlePaginationChange();
});

const handleSearch = () => {
  validateInput("测试动态执行", "第二个参数");
};
const handleReset = () => {
  console.log("handleReset", searchForm.value);
};
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
// 直接执行代码
const validateInput = (value: string, value2: string) =>
  safeFunctionExecutor.execute(
    `function(context,value,value2,...args){
        if (!value) throw new Error('值不能为空');
        console.log('执行成功', value);
        console.log('执行成功2', value2);
        console.log('执行成功3', args);
        return value.trim();
      }`,
    value,
    value2
  );
</script>

<template>
  <div class="p-3 flex flex-col h-screen relative">
    <SearchForm
      v-model="searchForm"
      :form-items="formItems"
      :options="{ size: 'default', labelWidth: '80px' }"
      @search="handleSearch"
      @reset="handleReset"
    />

    <div ref="tableContainerRef" class="flex-1 overflow-hidden">
      <div>
        <el-table
          :data="tableData"
          :max-height="height - 44"
          border
          header-row-class-name="table-header-row"
        >
          <el-table-column label="ID" prop="id" width="65"></el-table-column>
          <el-table-column label="姓名" prop="name" min-width="165"></el-table-column>
          <el-table-column label="年龄" prop="age" width="65"></el-table-column>
          <el-table-column label="性别" prop="gender" width="65"></el-table-column>
          <el-table-column label="邮箱" prop="email" width="165"></el-table-column>
        </el-table>
        <div class="mt-3 flex justify-end">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-count="10"
            layout="total, sizes, prev, pager, next, jumper"
            @change="handlePaginationChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>
