<template>
  <a-table
    :columns="columns"
    :data="dataList"
    :pagination="{
      showTotal: true,
      pageSize: searchParams.pageSize,
      current: searchParams.current,
      total: total,
    }"
    :stripe="true"
    :bordered="{ cell: true }"
    @page-change="handlePageChange"
    class="questionTable"
  >
    <template #tags="{ record }">
      <a-space>
        <a-tag
          v-for="(tag, index) in parseTags(record.tags)"
          :key="index"
          color="arcoblue"
          size="large"
        >
          {{ tag }}
        </a-tag>
      </a-space>
    </template>
    <template #answer="{ record }">
      <a-button type="text" @click="() => showModal('答案', record.answer)">
        查看
      </a-button>
    </template>
    <template #content="{ record }">
      <a-button
        type="text"
        @click="() => showModal('题目详情', record.content)"
      >
        详情
      </a-button>
    </template>
    <template #optional="{ record }">
      <a-space>
        <a-button @click="doUpdate(record)" type="primary"> 更新</a-button>
        <a-button @click="doDelete(record)" status="danger"> 删除</a-button>
      </a-space>
    </template>

    <template #createTime="{ record }">
      <a-space>
        {{ moment(record.createTime).format("YYYY-MM-DD HH:mm:ss") }}
      </a-space>
    </template>

    <template #updateTime="{ record }">
      <a-space>
        {{ moment(record.updateTime).format("YYYY-MM-DD HH:mm:ss") }}
      </a-space>
    </template>
  </a-table>
  <a-modal
    v-model:visible="modalVisible"
    :title="modalTitle"
    :footer="true"
    width="480px"
  >
    {{ modalContent }}
  </a-modal>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Question, QuestionControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { Modal } from "@arco-design/web-vue";
import moment from "moment";

const router = useRouter();
//查询结果列表
const dataList = ref([]);

const total = ref(0);

//全局对话框
const modalVisible = ref(false);
const modalTitle = ref("查看详情");
const modalContent = ref<string | undefined>("");

const showModal = (title: string, content: string | undefined) => {
  modalTitle.value = title;
  modalContent.value = content ?? "";
  modalVisible.value = true;
};

//解析标签
const parseTags = (tagsStr: string | undefined): string[] => {
  if (!tagsStr) return [];
  try {
    return JSON.parse(tagsStr);
  } catch {
    return [tagsStr];
  }
};

//查询条件
const searchParams = ref({
  pageSize: 12,
  current: 1,
});

const loadData = async () => {
  const res = await QuestionControllerService.listQuestionByPageUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    //获取成功，传值到数组当中
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("获取失败" + res.message);
  }
};

const handlePageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
  loadData();
};

/**
 * 页面加载时请求数据
 */
onMounted(async () => {
  loadData();
});

//删除，设置对话框提醒
const doDelete = async (question: Question) => {
  Modal.confirm({
    title: "确认删除",
    content: `确定要删除题目 "${question.title}" 吗？此操作不可恢复。`,
    okText: "删除",
    cancelText: "取消",
    okButtonProps: {
      status: "danger",
    },
    onOk: async () => {
      try {
        const res = await QuestionControllerService.deleteQuestionUsingPost({
          id: question.id,
        });
        if (res.code === 0) {
          loadData();
          message.success("删除成功");
        } else {
          message.error("删除失败" + res.message);
        }
      } catch (error) {
        message.error("删除失败，请稍后重试");
      }
    },
  });
};

/**
 * 更新题目方法，根据ID跳转到编辑页面，并且填充旧的值
 * @param question
 */
const doUpdate = (question: Question) => {
  router.push({
    path: "/update/update_questions",
    query: {
      id: question.id,
    },
  });
};

const columns = [
  {
    title: "序号",
    dataIndex: "id",
    width: 120,
    align: "center",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    sortable: {
      sortDirections: ["ascend", "descend"],
    },
    width: "165",
    slotName: "createTime",
    align: "center",
  },
  {
    title: "标题",
    dataIndex: "title",
    width: "160",
    align: "center",
  },
  {
    title: "标签",
    dataIndex: "tags",
    slotName: "tags",
    align: "center",
  },
  {
    title: "内容",
    dataIndex: "content",
    slotName: "content",
    align: "center",
  },
  {
    title: "答案",
    dataIndex: "answer",
    slotName: "answer",
    align: "center",
  },
  {
    title: "提交",
    dataIndex: "submitNum",
    width: "75",
    align: "center",
  },
  {
    title: "判题配置",
    dataIndex: "judgeConfig",
    render: ({ record }: { record: Question }) => {
      try {
        const cfg = JSON.parse(record.judgeConfig ?? "[]");
        return `时限:${cfg.timeLimit}s /内存:${cfg.memoryLimit}KB  /栈:${cfg.stackLimit}KB`;
      } catch {
        return record.judgeConfig;
      }
    },
    align: "center",
  },
  {
    title: "判题用例",
    dataIndex: "judgeCase",
    render: ({ record }: { record: Question }) => {
      try {
        const cases = JSON.parse(record.judgeCase ?? "[]");
        return cases
          .map((c, i) => `用例${i + 1}: 输入=${c.input}, 输出=${c.output}`)
          .join("； ");
      } catch {
        return record.judgeCase;
      }
    },
    align: "center",
  },

  {
    title: "用户ID",
    dataIndex: "userId",
    align: "center",
  },
  {
    title: "更新时间",
    dataIndex: "updateTime",
    width: "165",
    sortable: {
      sortDirections: ["ascend", "descend"],
    },
    slotName: "updateTime",
    align: "center",
  },
  {
    title: "操作",
    slotName: "optional",
    align: "center",
  },
];
</script>

<style scoped>
:deep(.arco-table-th) {
  text-align: center;
  font-family: "Arial", "Microsoft YaHei", sans-serif;
  font-weight: bold;
}
:deep(.arco-table-td) {
  text-align: center;
  font-family: "Arial", "Microsoft YaHei", sans-serif;
  font-weight: normal;
}
</style>
