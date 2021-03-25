<template>
  <div class="d-flex justify-content-center align-items-center" style="min-height: 100vh;">
    <div>
      <h3>Create Category</h3>
      <label for="name">Enter Category Name </label>
      <input type="text" id="name" v-model="categoryName" @keydown.enter="create" class="form-control" />

      <button @click="create" class="btn-success mt-5 btn">Create</button>
    </div>
  </div>
</template>
<script>
import ax from "@/axios";
export default {
  name: "createCategory",
  data() {
    return {
      categoryName: ""
    };
  },
  methods: {
    create() {
      let payload = {
        user_id: 1,
        category_name: this.categoryName
      };
      ax.post("category.php", payload).then(res => {
        console.log(res);
      });
    }
  }
};
</script>
