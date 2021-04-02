<template>
  <div
    class="d-flex justify-content-center align-items-center"
    style="min-height: 100vh"
  >
    <div class="w-md-50 shadow p-5">
      <b-alert variant="danger" v-if="error.length > 0">
        {{ error.message }}
      </b-alert>
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
                <b-icon icon="mailbox"></b-icon> </strong
            ></b-input-group-text>
          </template>
          <b-form-input v-model="userInfo.email"></b-form-input>
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
import ax from "@/axios";

export default {
  name: "register",
  data() {
    return {
      name: "Register",
      userInfo: {
        userid: null,
        pass: null,
        email: null
      },
      error: ""
    };
  },
  mounted() {},
  methods: {
    press() {
      ax.post("userRegister.php", {
        login: {
          data: {
            user: this.userInfo.userid,
            pass: this.userInfo.pass,
            email: this.userInfo.email
          }
        }
      })
        .then(res => {
          console.log(res);
        })
        .catch(e => console.warn(e));
    }
  }
};
</script>
