<script setup lang="ts">
import Draggrable from "vuedraggable";
import { cloneDeep } from "lodash-es";
import { constantComponents } from "../constant";
const handleClone = (element: any) => {
  const cloneElement = cloneDeep(element);
  const time = new Date().getTime();
  cloneElement.id = `${cloneElement.id}-${time}`;
  if (cloneElement.modelKey) {
    cloneElement.modelKey = `${cloneElement.modelKey}-${time}`;
  }
  return cloneElement;
};
</script>

<template>
  <el-scrollbar class="w-61">
    <Draggrable
      :list="constantComponents"
      item-key="id"
      :group="{ name: 'designer', pull: 'clone', put: false }"
      :clone="handleClone"
      class="gap-px grid grid-cols-3"
    >
      <template #item="{ element }">
        <div
          class="group p-2 flex flex-col transition-colors duration-200 items-center justify-center relative hover:bg-gray-50"
        >
          <el-icon class="text-blue-500"><MagicStick /></el-icon>
          <span class="text-sm mt-1">{{ element.name }}</span>
        </div>
      </template>
    </Draggrable>
  </el-scrollbar>
</template>
