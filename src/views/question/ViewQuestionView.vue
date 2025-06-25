<template>
  <div id="questionView">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-tabs>
          <a-tab-pane key="question">
            <template #title> <icon-book /> 题目 </template>
            <a-card v-if="question" :title="question.title">
              <a-descriptions
                title="判题条件:"
                :column="{ xs: 1, md: 3, lg: 4 }"
              >
                <a-descriptions-item label="时间限制">
                  {{ question.judgeConfig?.timeLimit ?? 0 }} ms
                </a-descriptions-item>
                <a-descriptions-item label="内存限制">
                  {{ question.judgeConfig?.memoryLimit ?? 0 }} KB
                </a-descriptions-item>
                <a-descriptions-item label="堆栈限制">
                  {{ question.judgeConfig?.stackLimit ?? 0 }} KB
                </a-descriptions-item>
              </a-descriptions>
              <MdViewer :value="question.content || ''" />
              <template #extra>
                <a-space>
                  <a-tag
                    v-for="(tag, index) of question.tags"
                    :key="index"
                    color="arcoblue"
                    size="large"
                  >
                    {{ tag }}
                  </a-tag>
                </a-space>
              </template>
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="comments" disabled>
            <template #title> <icon-history /> 提交记录 </template>
            Content of Tab Panel 2
          </a-tab-pane>
          <a-tab-pane key="answer">
            <template #title> <icon-experiment /> 题解 </template>
            Content of Tab Panel 3
          </a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col :md="12" :xs="24">
        <a-tabs>
          <a-tab-pane key="comments">
            <template #title> <icon-code /> 代码编辑 </template>
          </a-tab-pane>
        </a-tabs>
        <a-form :model="submitData" layout="inline">
          <a-form-item
            field="language"
            label="编程语言"
            style="min-width: 240px"
          >
            <a-select
              v-model="submitData.language"
              :style="{ width: '320px' }"
              placeholder="选择编程语言"
            >
              <a-option>java</a-option>
              <a-option>cpp</a-option>
              <a-option>go</a-option>
              <a-option>html</a-option>
            </a-select>
          </a-form-item>
          <a-button type="primary" status="success" @click="handleSubmit">
            提交代码
          </a-button>
        </a-form>
        <CodeEditor
          :value="submitData.code as string"
          :language="submitData.language"
          :handleChange="changeCode"
        />
      </a-col>
    </a-row>
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import { ref, withDefaults, defineProps, onMounted } from "vue";
import CodeEditor from "@/components/CodeEditor.vue";
import {
  QuestionControllerService,
  QuestionSubmitAddRequest,
  QuestionSubmitControllerService,
  QuestionVO,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import MdViewer from "@/components/MdViewer.vue";

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

const question = ref<QuestionVO>();

/**
 * 定义提交信息
 */
const submitData = ref<QuestionSubmitAddRequest>({
  language: "java",
  code: "",
});

const loadData = async () => {
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
    props.id as any
  );
  if (res.code === 0) {
    question.value = res.data;
    message.success("获取成功");
  } else {
    message.error("请求失败" + res.message);
  }
};

/**
 * 提交代码
 */
const handleSubmit = async () => {
  if (!question.value?.id) {
    return;
  }
  console.log("提交 ID：", question.value?.id);
  const res = await QuestionSubmitControllerService.doQuestionSubmitUsingPost({
    ...submitData.value,
    questionId: question.value.id,
  });
  if (res.code === 0) {
    message.success("提交成功");
  } else {
    message.error("提交失败" + res.message);
  }
  console.log("提交的代码长度：", submitData.value.code?.length);
  console.log("提交的代码内容：", submitData.value.code);
};

onMounted(() => {
  loadData();
});
const changeCode = (value: string) => {
  console.log("Code changed:", value);
  submitData.value.code = value;
};
</script>

<style></style>
