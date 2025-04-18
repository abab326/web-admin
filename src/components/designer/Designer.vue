<script setup lang="ts">
import Toolbar from "./components/Toolbar.vue";
import ComponentPanel from "./components/ComponentPanel.vue";
import Canvas from "./components/Canvas.vue";
import PropertyPanel from "./components/PropertyPanel.vue";
</script>

<template>
  <div class="designer-container flex flex-col h-full">
    <Toolbar />
    <div class="flex flex-1">
      <ComponentPanel />
      <Canvas class="flex-1" />
      <PropertyPanel />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
