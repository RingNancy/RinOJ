<template>
  <div class="page-container">
    <a-form
      :model="form"
      @submit="handleSubmit"
      ref="formRef"
      class="main-form"
    >
      <!-- 基础信息区域 -->
      <div class="form-section">
        <h3 class="section-title">基础信息</h3>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item field="title" label="标题" class="form-item">
              <a-input
                v-model="form.title"
                placeholder="请输入题目标题"
                size="large"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              field="tags"
              label="标签"
              help="关于题目难度或相关知识标签"
              :validate-status="status"
              feedback
              class="form-item"
            >
              <a-input-tag
                v-model="form.tags"
                placeholder="请输入题目标签"
                size="large"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </div>

      <!-- 题目内容区域 -->
      <div class="form-section">
        <h3 class="section-title">题目内容</h3>
        <a-form-item field="content" class="form-item">
          <div class="md-editor-wrapper">
            <MdEditor />
          </div>
        </a-form-item>
      </div>

      <!-- 判题配置区域 -->
      <div class="form-section">
        <h3 class="section-title">判题配置</h3>
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item
              field="judgeConfig.memoryLimit"
              label="内存限制"
              help="单位：KB"
              class="form-item"
            >
              <a-input
                v-model="form.judgeConfig.memoryLimit"
                placeholder="Memory Limit ..."
                size="large"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              field="judgeConfig.stackLimit"
              label="堆栈限制"
              help="单位：KB"
              class="form-item"
            >
              <a-input
                v-model="form.judgeConfig.stackLimit"
                placeholder="Stack Limit ..."
                size="large"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              field="judgeConfig.timeLimit"
              label="时间限制"
              help="单位：ms"
              class="form-item"
            >
              <a-input
                v-model="form.judgeConfig.timeLimit"
                placeholder="Time Limit ..."
                size="large"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </div>

      <!-- 判题用例区域 -->
      <div class="form-section">
        <div class="section-header">
          <h3 class="section-title">判题用例</h3>
          <a-button @click="handleAdd" type="primary" size="large">
            <template #icon>
              <icon-plus />
            </template>
            新增用例
          </a-button>
        </div>

        <div class="judge-cases">
          <div
            v-for="(post, index) in form.judgeCase"
            :key="index"
            class="case-item"
          >
            <div class="case-header">
              <span class="case-label">用例 {{ index + 1 }}</span>
              <a-button
                @click="handleDelete(index)"
                :disabled="form.judgeCase.length <= 1"
                type="text"
                status="danger"
                size="small"
              >
                <template #icon>
                  <icon-delete />
                </template>
                删除
              </a-button>
            </div>
            <a-row :gutter="16">
              <a-col :span="12">
                <a-form-item label="输入" class="case-form-item">
                  <a-textarea
                    v-model="post.input"
                    placeholder="请输入测试用例的输入数据"
                    :rows="3"
                    :auto-size="{ minRows: 3, maxRows: 6 }"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="输出" class="case-form-item">
                  <a-textarea
                    v-model="post.output"
                    placeholder="请输入期望的输出结果"
                    :rows="3"
                    :auto-size="{ minRows: 3, maxRows: 6 }"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </div>
        </div>
      </div>

      <!-- 操作按钮区域 -->
      <div class="form-actions">
        <a-space size="large">
          <a-button html-type="submit" type="primary" size="large">
            <template #icon>
              <icon-check />
            </template>
            提交
          </a-button>
          <a-button @click="$refs.formRef.resetFields()" size="large">
            <template #icon>
              <icon-refresh />
            </template>
            重置
          </a-button>
        </a-space>
      </div>
    </a-form>

    <!-- 调试信息（可选显示） -->
    <div class="debug-section" v-if="showDebug">
      <a-card title="调试信息" size="small">
        <pre class="debug-content">{{ JSON.stringify(form, null, 2) }}</pre>
      </a-card>
    </div>
  </div>
  {{ form }}
</template>

<script>
import { reactive, ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import {
  IconPlus,
  IconDelete,
  IconCheck,
  IconRefresh,
} from "@arco-design/web-vue/es/icon";

export default {
  components: {
    MdEditor,
    IconPlus,
    IconDelete,
    IconCheck,
    IconRefresh,
  },
  setup() {
    const status = ref("success");
    const showDebug = ref(false); // 控制调试信息显示

    const form = reactive({
      title: "A+B",
      content: "题目内容",
      judgeCase: [
        {
          input: "1,2",
          output: "3,4",
        },
      ],
      judgeConfig: {
        memoryLimit: "",
        stackLimit: "",
        timeLimit: "",
      },
      tags: ["栈", "简单"],
    });

    const handleAdd = () => {
      form.judgeCase.push({
        input: "",
        output: "",
      });
    };

    const handleDelete = (index) => {
      if (form.judgeCase.length > 1) {
        form.judgeCase.splice(index, 1);
      }
    };

    const handleSubmit = ({ values, errors }) => {
      console.log("values:", values, "\nerrors:", errors);
    };

    return {
      form,
      status,
      showDebug,
      handleAdd,
      handleDelete,
      handleSubmit,
    };
  },
};
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 20px;
}

.main-form {
  max-width: 1200px;
  margin: 0 auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.form-section {
  padding: 24px 32px;
  border-bottom: 1px solid #f0f0f0;
}

.form-section:last-of-type {
  border-bottom: none;
}

.section-title {
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: 600;
  color: #1d2129;
  border-left: 4px solid #165dff;
  padding-left: 12px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.form-item {
  margin-bottom: 20px;
}

/* MD编辑器样式 */
.md-editor-wrapper {
  height: 100%;
  width: 100%;
  border: 1px solid #e5e6eb;
  border-radius: 6px;
  overflow: hidden;
}

.md-editor-wrapper :deep(.md-editor) {
  height: 100%;
}

/* 判题用例样式 */
.judge-cases {
  space-y: 16px;
}

.case-item {
  background: #f7f8fa;
  border: 1px solid #e5e6eb;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  transition: all 0.3s ease;
}

.case-item:hover {
  border-color: #165dff;
  box-shadow: 0 2px 8px rgba(22, 93, 255, 0.1);
}

.case-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.case-label {
  font-weight: 500;
  color: #1d2129;
  font-size: 14px;
}

.case-form-item {
  margin-bottom: 0;
}

.case-form-item :deep(.arco-form-item-label) {
  font-size: 13px;
  color: #4e5969;
}

/* 操作按钮区域 */
.form-actions {
  padding: 24px 32px;
  background: #fafbfc;
  text-align: center;
}

/* 调试信息 */
.debug-section {
  max-width: 1200px;
  margin: 20px auto 0;
}

.debug-content {
  background: #f7f8fa;
  padding: 16px;
  border-radius: 4px;
  font-size: 12px;
  line-height: 1.5;
  max-height: 300px;
  overflow-y: auto;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .page-container {
    padding: 10px;
  }

  .form-section {
    padding: 16px 20px;
  }

  .form-actions {
    padding: 16px 20px;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}

/* 表单元素增强样式 */
:deep(.arco-input-tag) {
  min-height: 40px;
}

:deep(.arco-input) {
  transition: all 0.3s ease;
}

:deep(.arco-input:focus) {
  box-shadow: 0 0 0 2px rgba(22, 93, 255, 0.2);
}

:deep(.arco-textarea) {
  transition: all 0.3s ease;
}

:deep(.arco-textarea:focus) {
  box-shadow: 0 0 0 2px rgba(22, 93, 255, 0.2);
}
:deep(.arco-form-item-label-col) {
  display: none;
}
:deep(.arco-form-item-wrapper-col) {
  flex: 1;
}
</style>
