<template>
  <div class="">
    <div class="sticky-top">
      <Header />
    </div>
    <div class="" v-if="categoryList.length === 0">
      No Data Found
    </div>
    <div v-else>
      <table class="table table-bordered table-info text-left">
        <tbody>
          <tr v-for="(item, i) in categoryList" :key="i">
            <td>{{ i + 1 }}</td>
            <td class="font-weight-bold">{{ item.category_name }}</td>
            <td @click="deleteItem(item.id)" class="text-primary">Delete</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="" style="position: sticky; bottom: 0;">
      <Footer />
    </div>
  </div>
</template>
<script>
import axios from "@/axios";
import Header from "@/views/Layouts/Header";
import Footer from "@/views/Layouts/Footer";
import ax from "@/axios";
export default {
  name: "viewCategory",
  components: { Footer, Header },
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
    },
    deleteItem(id) {
      let status = confirm(
        "Are You Sure? Every message Of this category will be deleted"
      );
      if (status) {
        ax.get("category.php?delete&id=" + id).then(res => {
          console.log(res.data);
          if (res.data.status) {
            this.$store.dispatch("ALERT", {
              title: "Success",
              message: res.data.message,
              variant: "success"
            });
            this.getCategory();
          } else {
            this.$store.dispatch("ALERT", {
              title: "Success",
              message: "Network Problem",
              variant: "success"
            });
          }
        });
      } else {
        this.$store.dispatch("ALERT", {
          title: "Success",
          message: "Operation Canceled",
          variant: "secondary"
        });
      }
    }
  }
};
</script>
