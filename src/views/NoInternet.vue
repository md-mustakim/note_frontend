<template>
  <div
    class="d-flex justify-content-center align-items-center"
    style="min-height: 100vh"
  >
    <div>
      <div class="h4 text-danger font-weight-bold" @click="refresh">
        No Internet
      </div>
      <span>
        Or
      </span>
      <div class="h5 text-danger font-weight-bold">
        Server Not Response
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "NoInternet",
  methods: {
    refresh() {
      this.$router.push("/");
    }
  }
};
</script>
