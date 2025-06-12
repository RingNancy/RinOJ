<template>
  <!--  监听编辑器change事件-->
  <Editor
    :value="value"
    :plugins="plugins"
    @change="handleChange"
    :locale="zhHans"
  />
</template>

<script setup lang="ts">
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import { Editor, Viewer } from "@bytemd/vue-next";
import zhHans from "bytemd/locales/zh_Hans.json";
import { ref, watch, defineProps, defineEmits } from "vue";

/**
 * 定义组件属性类型
 */
const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const value = ref(props.modelValue);

// 同步外部值变化
watch(
  () => props.modelValue,
  (val) => {
    value.value = val;
  }
);

// 编辑器值改变时通知外部
const handleChange = (v: string) => {
  value.value = v;
  emit("update:modelValue", v);
};

const plugins = [
  gfm(),
  highlight(),
  // Add more plugins here
];
</script>

<style>
.bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:last-child {
  display: none;
}
</style>
