<template>
  <div class="d-flex flex-column" style="max-height: 100vh; min-height: 100vh;">
    <div>
      <Header />
    </div>
    <div class="mx-1" style="max-height: 80vh;">
      <table style="font-size: large;" class="table  table-sm table-bordered table-info text-left">
        <thead>
          <tr>
            <th colspan="2" class="text-center">Note Categories</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in categoryList" :key="i">
            <td>{{ i + 1 }}</td>
            <td>
              <router-link
                :to="{
                  name: 'createNote',
                  params: {
                    category_id: item.id
                  }
                }"
              >
                {{ item.category_name }}
              </router-link>
              <span class="small text-left float-right">
                {{ item.reg_time }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mt-auto">
      <Footer />
    </div>
  </div>
</template>

<script>
import axios from "@/axios";
import Header from "@/views/Layouts/Header";
import Footer from "@/views/Layouts/Footer";
export default {
  name: "Home",
  components: { Footer, Header },
  data() {
    return {
      categoryList: null
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
