<script setup lang="ts">
import { useDesignerStore } from "@/store/designer";
import type { ComponentSchema } from "@/types/designer";
import { storeToRefs } from "pinia";
import { ref, watchEffect } from "vue";

const store = useDesignerStore();
const { selectedComponentId, componentList } = storeToRefs(store);

const currentComponent = ref<ComponentSchema>();
const formModel = ref<Record<string, any>>({});

watchEffect(() => {
  currentComponent.value = componentList.value.find(c => c.id === selectedComponentId.value);
  formModel.value = { ...currentComponent.value?.props };
});

const handlePropChange = (key: string, value: any) => {
  if (currentComponent.value) {
    store.updateComponentProps(currentComponent.value.id, { [key]: value });
  }
};
</script>

<template>
  <div class="w-61">
    <el-form v-if="currentComponent" :model="formModel" label-width="80px">
      <template v-for="(item, key) in currentComponent.props" :key="key">
        <el-form-item :label="key + ''">
          <el-switch
            v-if="typeof item === 'boolean'"
            v-model="formModel[key]"
            @change="handlePropChange(key as string, $event)"
          />
          <el-input
            v-else
            v-model="formModel[key]"
            @change="handlePropChange(key as string, $event)"
          />
        </el-form-item>
      </template>
    </el-form>
    <div v-else class="empty-tip">请选择要编辑的组件</div>
  </div>
</template>
