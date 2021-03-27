<template>
  <div class="d-flex flex-column" style="min-height: 100vh;">
    <div class="">
      <Header />
    </div>
    <div class="mx-2">
      <h5 class="font-weight-bold bg-light py-2">Create Category</h5>
      <label class="sr-only" for="name">Enter Category Name </label>
      <input
        type="text"
        id="name"
        v-model="categoryName"
        @keydown.enter="create"
        class="form-control"
        placeholder="Enter a Category Name"
      />

      <button @click="create" class="btn-success mt-3 btn">Create</button>
    </div>
    <div class="mt-auto"><Footer /></div>
  </div>
</template>
<script>
import ax from "@/axios";
import Header from "@/views/Layouts/Header";
import Footer from "@/views/Layouts/Footer";
export default {
  name: "createCategory",
  components: { Footer, Header },
  data() {
    return {
      categoryName: ""
    };
  },
  mounted() {},
  methods: {
    create() {
      let payload = {
        user_id: 1,
        category_name: this.categoryName
      };
      ax.post("category.php", payload).then(res => {
        if (res.data.status) {
          this.$store.dispatch("ALERT", {
            title: "Success",
            message: "Data Update Success",
            variant: "success"
          });
          this.categoryName = "";
          this.$router.push("/");
        }
      });
    }
  }
};
</script>
