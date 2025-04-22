<script setup lang="ts">
import type { ElForm, FormItemRule } from "element-plus";

// 定义 formItems 的类型
export interface FormItem {
  label: string;
  prop: string;
  component: "input" | "select" | "date-picker";
  options?: Array<{ label: string; value: string | number }>;
  colSpan?: number;
  rules?: FormItemRule[];
}

export interface SearchFormProps {
  formItems: FormItem[];
  options?: Partial<InstanceType<typeof ElForm>>;
}
// 定义 modelValue 的类型（动态键值对）
type ModelValue = Record<string, any>;

defineProps<SearchFormProps>();

const emit = defineEmits(["search", "reset"]);

// 双向绑定模型
const modelValue = defineModel<ModelValue>({
  default: () => ({})
});

// 暴露表单引用
const formRef = ref<InstanceType<typeof ElForm> | null>(null);
const handleSearch = () => {
  emit("search", modelValue.value);
};
const handleReset = () => {
  formRef.value?.resetFields();
  emit("reset");
};
defineExpose({
  formRef
});
</script>

<template>
  <div class="search-container flex">
    <el-form ref="formRef" class="flex-1 gap-x-2 grid cols-24" :model="modelValue" v-bind="options">
      <el-form-item
        v-for="(item, index) in formItems"
        :key="index"
        :style="{ 'grid-column': `span ${item.colSpan || 6}` }"
        class="items-start"
        :label="item.label"
        :prop="item.prop"
        :rules="item.rules"
      >
        <component
          :is="'el-' + item.component"
          v-model="modelValue[item.prop]"
          :options="item.options"
        >
          <template v-if="item.component === 'select'">
            <el-option
              v-for="option in item.options"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </template>
        </component>
      </el-form-item>
    </el-form>
    <div class="button-container flex flex-col items-center">
      <el-button type="primary" @click="handleSearch">查询</el-button>
      <el-button @click="handleReset">重置</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.button-container {
  margin-left: calc(var(--spacing) * 3);
  .el-button + .el-button {
    margin-top: calc(var(--spacing) * 3);
    margin-left: 0;
  }
}
</style>
