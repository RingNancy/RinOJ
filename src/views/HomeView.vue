<template>
  <div class="questionTable">
    <a-form :model="record" layout="inline">
      <a-form-item field="title" label="题目">
        <a-input
          v-model="record.title"
          placeholder="请输入题目…………"
          style="width: 280px"
        />
      </a-form-item>
      <a-form-item field="tags" label="标签">
        <a-input-tag
          v-model="record.tags"
          placeholder="请输入标签…………"
          style="width: 280px"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="outline" @click="doSubmit" size="medium">
          <template #icon>
            <icon-search />
          </template>
          <template #default>查找</template>
        </a-button>
      </a-form-item>
    </a-form>
    <a-divider type="double" />

    <a-space direction="vertical" size="large" fill>
      <a-table
        :columns="columns"
        :data="tableData"
        :pagination="pagination"
        @page-change="handlePageChange"
        @row-click="rowClicked"
        :stripe="true"
        :size="large"
        class="questionTable"
        :bordered="{ cell: true }"
      >
        <template #tags="{ record }">
          <a-space>
            <a-tag
              v-for="tag in record.tags.split(',')"
              :key="tag"
              color="arcoblue"
              size="large"
            >
              {{ tag }}
            </a-tag>
          </a-space>
        </template>
        <template #acceptedNum="{ record }">
          <a-space>
            <a-rate :default-value="getStarValue(record)" readonly allow-half />
          </a-space>
        </template>
        <template #createTime="{ record }">
          <a-space>
            {{ moment(record.createTime).format("YYYY-MM-DD") }}
          </a-space>
        </template>
        <template #View="{ record }">
          <a-space>
            <a-button type="outline" @click="doQuestions(record)">
              <template #icon>
                <icon-pen-fill />
              </template>
              <template #default>做题</template>
            </a-button>
          </a-space>
        </template>
      </a-table>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { Question, QuestionControllerService } from "../../generated";
import message from "@arco-design/web-vue/es/message";
import moment from "moment";
import { useRouter } from "vue-router";

//表格数据
const tableData = ref([]);
const router = useRouter();

//表格字段
const columns = [
  { title: "题号", dataIndex: "id" },
  { title: "标题", dataIndex: "title" },
  { title: "标签", dataIndex: "tags", slotName: "tags" },
  { title: "提交", dataIndex: "submitNum" },
  { title: "通过率", dataIndex: "acceptedNum", slotName: "acceptedNum" },
  { title: "创建日期", dataIndex: "createTime", slotName: "createTime" },
  { slotName: "View" },
];

//分页控制器
const pagination = reactive({
  current: 1,
  pageSize: 12,
  total: 0,
  showTotal: true,
});

//获取星级
const getStarValue = (record: any) => {
  if (!record.submitNum) return 0;
  const ratio = record.acceptedNum / record.submitNum;
  return Math.round(ratio * 5 * 10) / 10;
};

const record = reactive({
  title: "",
  tags: [] as string[], // 标签是一个数组
});

//获取分页数据
const fetchData = async () => {
  const res = await QuestionControllerService.listQuestionVoByPageUsingPost({
    current: pagination.current,
    pageSize: pagination.pageSize,
    title: record.title || undefined,
    tags: record.tags?.length ? record.tags : undefined,
  });

  if (res.code === 0 && res.data) {
    const records = res.data.records || [];
    tableData.value = records.map((item: any) => ({
      id: item.id,
      title: item.title,
      tags: item.tags?.join(",") || "",
      submitNum: item.submitNum,
      acceptedNum: item.acceptedNum,
      createTime: item.createTime,
    }));
    pagination.total = Number(res.data.total || 0);
  } else {
    message.error("数据加载失败", res.message);
  }
};
/**
 * 获取当前页码，并且重新加载数据
 * @param page
 */
const handlePageChange = (page: number) => {
  pagination.current = page;
  fetchData();
};
/**
 * 跳转到做题页面
 * @param record
 */
const doQuestions = (record: Question) => {
  router.push({
    path: `/view/question/${record.id}`,
  });
};
/**
 * 搜索提交
 */
const doSubmit = () => {
  pagination.current = 1;
  fetchData();
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.questionTable {
  max-width: 1280px;
  margin: 0 auto;
}

:deep(.arco-table-th) {
  font-family: "Arial", "Microsoft YaHei", sans-serif;
  font-weight: bold;
}
:deep(.arco-table-td) {
  font-family: "Arial", "Microsoft YaHei", sans-serif;
  font-weight: normal;
}
</style>
