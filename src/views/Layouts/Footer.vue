<template>
  <div
    class="d-flex justify-content-between flex-row bg-secondary text-light font-weight-bold"
  >
    <div v-for="(item, i) in $store.state.footer.items" :key="i">
      <div class="p-3">
        <router-link
          class="text-decoration-none text-light"
          :to="{
            name: item.name
          }"
        >
          {{ item.output }}
        </router-link>
      </div>
    </div>
    <div class="p-3">
      <span class="text-decoration-none text-light" @click="logout">
        Logout
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: "Footer",
  methods: {
    logout() {
      this.$store
        .dispatch("LOGOUT")
        .then(res => {
          if (res) {
            window.location.href = "/login";
          }
        })
        .catch(() => {
          this.$store.dispatch("ALERT",{
            title: "Failed",
            message: "Sorry SomeThing is wrong",
            variant: "danger"
          });
        });
    }
  }
};
</script>
