<template>
  <div
    class="d-flex justify-content-center align-items-center"
    style="min-height: 100vh"
  >
    <div class="w-md-50 w-25 shadow p-5">
      <div class="danger">
        {{ error }}
      </div>
      <form v-on:submit.prevent="press">
        <b-input-group class="mt-3">
          <template #prepend>
            <b-input-group-text
              ><strong class="text-danger">
                <b-icon icon="person"></b-icon> </strong
            ></b-input-group-text>
          </template>
          <b-form-input v-model="userInfo.userid"></b-form-input>
        </b-input-group>

        <b-input-group class="mt-3">
          <template #prepend>
            <b-input-group-text
              ><strong class="text-danger">
                <b-icon icon="key"></b-icon> </strong
            ></b-input-group-text>
          </template>
          <b-form-input type="password" v-model="userInfo.pass"></b-form-input>
        </b-input-group>
        <div>
          <button @click="press" class="btn btn-success">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import "firebase/auth";
export default {
  name: "Login",
  data() {
    return {
      name: "Register",
      userInfo: {
        userid: null,
        pass: null
      },
      error: ""
    };
  },
  mounted() {},
  methods: {
    press() {
      let payload = {
        login: {
          id: this.userInfo.userid,
          pass: this.userInfo.pass
        }
      };
      this.$store
        .dispatch("LOGIN", payload)
        .then(res => {
          if (res) {
            this.$router
              .push({
                name: "Home"
              })
              .catch(e => {
                // eslint-disable-next-line no-unused-vars
                let ac = e;
              });
          } else {
            this.error = res;
          }
        })
        .catch(e => {
          this.error = e;
        });
    }
  }
};
</script>
