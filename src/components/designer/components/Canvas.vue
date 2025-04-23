<script setup lang="ts">
import CanvasItem from "./CanvasItem.vue";
import { useDesignerStore } from "@/store/designer";
import { storeToRefs } from "pinia";
import draggable from "vuedraggable";

const store = useDesignerStore();
const { componentList } = storeToRefs(store);

const formData = ref<Record<string, any>>({});
provide("formData", formData);

const handleAdd = (event: any) => {
  const { item } = event;
  const { _underlying_vm_ } = item;
  if (_underlying_vm_) {
    store.setSelectedComponent(_underlying_vm_.id);
  }
};
const handleItemClick = (element: any) => {
  store.setSelectedComponent(element.id);
};
</script>

<template>
  <div class="p-4 bg-gray-100 h-full">
    <draggable
      v-model="componentList"
      class="gap-1 grid grid-cols-24 w-full overflow-y-auto"
      :class="{ 'h-full': componentList.length <= 0 }"
      :group="{ name: 'designer', pull: true, put: true }"
      item-key="id"
      @add="handleAdd"
    >
      <template #item="{ element }">
        <div
          :style="{ '--col-span': 12 }"
          class="col-span-[var(--col-span)]"
          @click="handleItemClick(element)"
        >
          <CanvasItem :component-options="element" />
        </div>
      </template>
    </draggable>
  </div>
</template>
