<script setup lang="ts">
import CanvasItem from "./CanvasItem.vue";
import { useDesignerStore } from "@/store/designer";
import { storeToRefs } from "pinia";
import draggable from "vuedraggable";

const store = useDesignerStore();
const { componentList } = storeToRefs(store);

const formData = ref<Record<string, any>>({});
provide("formData", formData);
const getData = () => {
  console.log("formData", formData.value);
};
</script>

<template>
  <div class="p-4 bg-gray-100 h-full">
    <el-button @click="getData">获取数据</el-button>
    <draggable
      v-model="componentList"
      class="gap-1 grid grid-cols-24 w-full overflow-y-auto"
      :class="{ 'h-full': componentList.length <= 0 }"
      :group="{ name: 'designer', pull: true, put: true }"
      item-key="id"
    >
      <template #item="{ element }">
        <div :style="{ '--col-span': 12 }" class="col-span-[var(--col-span)]">
          <CanvasItem :component-options="element" />
        </div>
      </template>
    </draggable>
  </div>
</template>
