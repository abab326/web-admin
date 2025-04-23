<script setup lang="ts">
defineOptions({
  name: "SvgDemo"
});
</script>

<template>
  <div class="flex justify-center">
    <div>
      <svg-icon class="p-2" name="Edit" type="element" :size="50" color="red" />
    </div>
    <svg-icon name="message" type="local" :size="24" color="green" />
    <svg-icon name="message" type="local" :size="24" color="green" />
    <svg-icon
      name="http://gips3.baidu.com/it/u=3886271102,3123389489&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960"
      type="network"
      size="300"
    />
  </div>
</template>

<style scoped></style>
