<template>
  <div
    class="d-flex justify-content-center align-items-center"
    style="min-height: 100vh"
  >
    <div class="w-md-50 w-25 shadow p-5">
      <b-alert variant="danger" v-if="error.length > 0"> {{error.message}} </b-alert>
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
import * as firebase from "firebase/app";
import "firebase/auth";
export default {
  name: "register",
  data() {
    return {
      name: "Register",
      userInfo: {
        userid: null,
        pass: null
      },
      error: ''
    };
  },
  mounted() {
    let cUser = firebase.default.auth().currentUser;
    console.warn(cUser);
  },
  methods: {
    press: async function() {
      try {
        let user = await firebase.default
          .auth()
          .createUserWithEmailAndPassword(
            this.userInfo.userid,
            this.userInfo.pass
          );
        console.warn(user);
      } catch (e) {
        this.error = e;
        console.log(e);
      }
    }
  }
};
</script>
