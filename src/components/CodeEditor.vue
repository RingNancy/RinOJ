<template>
  <div id="code-editor" ref="codeEditorRef" style="min-height: 70vh" />
</template>

<script setup lang="ts">
import * as monaco from "monaco-editor";
import { onMounted, ref, toRaw, withDefaults, defineProps } from "vue";
import { editor } from "monaco-editor";
import getModel = editor.getModel;

const codeEditorRef = ref();
const codeEditor = ref();

/**
 * 定义组件属性类型
 */
interface Props {
  value: string;
  language?: string;
  handleChange: (v: string) => void;
}

const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  language: () => "java",
  handleChange: (v: string) => {
    console.log(v);
  },
});

onMounted(() => {
  if (!codeEditorRef.value) {
    return;
  }
  // Hover on each property to see its docs!
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    value: props.value,
    language: props.language,
    automaticLayout: true,
    colorDecorators: true,
    minimap: {
      enabled: true,
    },
    readOnly: false,
    theme: "vs-dark",
    fontSize: 18,
    tabSize: 2,
    // lineNumbers: "off",
    // roundedSelection: false,
    scrollBeyondLastLine: false, //设置编辑器是否可以滚动到最后一行
  });
  monaco.editor.setModelLanguage(
    toRaw(codeEditor.value).getModel(),
    props.language
  );
  /**
   * 监听代码编辑器
   */
  codeEditor.value.onDidChangeModelContent(() => {
    props.handleChange(toRaw(codeEditor.value).getValue());
  });
});
</script>

<style scoped></style>
