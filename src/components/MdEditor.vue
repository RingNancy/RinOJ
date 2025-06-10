<template>
  <!--  监听编辑器change事件-->
  <Editor :value="value" :plugins="plugins" @change="handleChange" />
</template>

<script setup lang="ts">
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import { Editor, Viewer } from "@bytemd/vue-next";
import { ref, withDefaults, defineProps } from "vue";

/**
 * 定义组件属性类型
 */
interface Probs {
  value: string;
  handleChange: (v: string) => void;
}

const probs = withDefaults(defineProps<Probs>(), {
  value: () => "",
  handleChange: (v: string) => {
    console.log(v);
  },
});

const value = ref(""); //默认为空

const handleChange = (v: string) => {
  value.value = v;
  probs.handleChange(v); //通知父组件完成更新
};

const plugins = [
  gfm(),
  highlight(),
  // Add more plugins here
];
</script>

<style scoped></style>
