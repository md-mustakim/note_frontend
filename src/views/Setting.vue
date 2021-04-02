<template>
  <div class="d-flex flex-column" style="min-height: 100vh;">
    <div>
      <Header />
    </div>
    <div class="">
      <div
        v-for="(item, i) in settings"
        class="row m-0 bg-light border-bottom"
        :key="i"
      >
        <div class="col-2 py-2 border-right">C</div>
        <div class="col-7 py-2 text-left font-weight-bold">{{ item.name }}</div>
        <div class="col-2 py-2 border-left"></div>
      </div>
    </div>
    <div class="mt-auto">
      <Footer />
    </div>
  </div>
</template>
<script>
import Header from "@/views/Layouts/Header";
import Footer from "@/views/Layouts/Footer";
export default {
  name: "Setting",
  components: { Footer, Header },
  data() {
    return {
      settings: [
        {
          name: "Category Setting",
          icon: "faSave",
          route: "Setting"
        },
        {
          name: "Note Setting",
          icon: "faSave",
          route: "Setting"
        },
        {
          name: "Change Password",
          icon: "faSave",
          route: "Setting"
        },
        {
          name: "Activity Log",
          icon: "faSave",
          route: "Setting"
        },
        {
          name: "About App",
          icon: "faSave",
          route: "Setting"
        }
      ]
    };
  }
};
</script>
