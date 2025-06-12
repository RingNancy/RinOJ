<template>
  <a-space direction="vertical" size="large" fill>
    <a-table
      :columns="columns"
      :data="tableData"
      :pagination="pagination"
      :page-position="bottom"
      @page-change="handlePageChange"
      @row-click="rowClicked"
      :stripe="true"
      :sticky-header="true"
      :hoverable="true"
      :size="medium"
      class="questionTable"
    >
      <template #tags="{ record }">
        <a-space>
          <a-tag
            v-for="tag in record.tags.split(',')"
            :key="tag"
            color="arcoblue"
          >
            {{ tag }}
          </a-tag>
        </a-space>
      </template>
    </a-table>
  </a-space>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { QuestionControllerService } from "../../generated";
import message from "@arco-design/web-vue/es/message";

//表格数据
const tableData = ref([]);

//表格字段
const columns = [
  { title: "标题", dataIndex: "title" },
  { title: "标签", dataIndex: "tags", slotName: "tags" },
  { title: "提交", dataIndex: "submitNum" },
  { title: "通过", dataIndex: "acceptNum" },
];

//分页控制器
const pagination = reactive({
  current: 1,
  pageSize: 15,
  total: 0,
  showTotal: true,
});

//获取分页数据
const fetchData = async () => {
  const res = await QuestionControllerService.listQuestionVoByPageUsingPost({
    current: pagination.current,
    pageSize: pagination.pageSize,
  });

  if (res.code === 0 && res.data) {
    const records = res.data.records || [];
    tableData.value = records.map((item: any) => ({
      title: item.title,
      tags: item.tags?.join(",") || "",
      submitNum: item.submitNum,
      acceptNum: item.acceptNum,
    }));
    pagination.total = Number(res.data.total || 0);
  } else {
    message.error("数据加载失败", res.message);
  }
};
//页码变化
const handlePageChange = (page: number) => {
  pagination.current = page;
  fetchData();
};

//首次加载
onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.questionTable {
  width: 680px;
}
</style>
