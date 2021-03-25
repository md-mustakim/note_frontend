<template>
  <div class="w-25">
    <table class="table table-bordered table-info text-left">
      <tbody>
        <tr v-for="(item, i) in categoryList" :key="i">
          <td>{{ i + 1 }}</td>
          <td>{{ item.category_name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from "@/axios";
export default {
  name: "viewCategory",
  data() {
    return {
      categoryList: ""
    };
  },
  mounted() {
    this.getCategory();
  },
  methods: {
    getCategory() {
      axios
        .get("category.php?view")
        .then(res => {
          this.categoryList = res.data.data;
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>
