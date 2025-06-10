<template>
  <a-space direction="vertical" size="large" fill>
    <a-table
      :columns="columns"
      :data="data"
      @change="handleChange"
      :stripe="true"
      :sticky-header="true"
    />
  </a-space>
</template>

<script>
import { reactive, ref } from "vue";

export default {
  setup() {
    const columns = [
      {
        title: "题目",
        dataIndex: "name",
        sortable: {
          sortDirections: ["ascend", "descend"],
        },
      },
      {
        title: "标签",
        dataIndex: "salary",
        sortable: {
          sortDirections: ["ascend"],
        },
        filterable: {
          filters: [
            {
              text: "> 20000",
              value: "20000",
            },
            {
              text: "> 30000",
              value: "30000",
            },
          ],
          filter: (value, record) => record.salary > value,
          multiple: true,
        },
      },
      {
        title: "难度",
        dataIndex: "address",
        filterable: {
          filters: [
            {
              text: "London",
              value: "London",
            },
            {
              text: "Paris",
              value: "Paris",
            },
          ],
          filter: (value, row) => row.address.includes(value),
        },
      },
      {
        title: "Email",
        dataIndex: "email",
      },
    ];
    const data = reactive([
      {
        key: "1",
        name: "Jane Doe",
        salary: 23000,
        address: "32 Park Road, London",
        email: "jane.doe@example.com",
      },
      {
        key: "2",
        name: "Alisa Ross",
        salary: 25000,
        address: "35 Park Road, London",
        email: "alisa.ross@example.com",
      },
      {
        key: "3",
        name: "Kevin Sandra",
        salary: 22000,
        address: "31 Park Road, London",
        email: "kevin.sandra@example.com",
      },
      {
        key: "4",
        name: "Ed Hellen",
        salary: 17000,
        address: "42 Park Road, London",
        email: "ed.hellen@example.com",
      },
      {
        key: "5",
        name: "William Smith",
        salary: 27000,
        address: "62 Park Road, London",
        email: "william.smith@example.com",
      },
    ]);

    const handleChange = (data, extra, currentDataSource) => {
      console.log("change", data, extra, currentDataSource);
    };

    return {
      columns,
      data,
      handleChange,
    };
  },
};
</script>
