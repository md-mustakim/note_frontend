<template>
  <div>
    <Header />
    <div
      class="d-flex justify-content-center align-items-center"
      style="height: 75vh;"
    >
      <form v-on:submit.prevent="changePassword">
        <div class="">
          <div class="h4 bg-light py-2 font-weight-bold">
            Change Password
          </div>
          <span>{{ message }}</span>
          <div class="input-group">
            <div class="input-group-append">
              <div class="input-group-text">
                <font-awesome-icon :icon="['fa', 'key']" />
              </div>
            </div>
            <input
              :type="passwordShow.oldPassword ? 'text' : 'password'"
              class="form-control"
              v-model="postData.oldPassword"
              placeholder="Old Password"
            />
            <div class="input-group-prepend">
              <div
                class="input-group-text pointer"
                @click="change('oldPassword')"
              >
                <span v-if="passwordShow.oldPassword">
                  <font-awesome-icon :icon="['fas', 'eye-slash']" />
                </span>
                <span v-else class="text-success">
                  <font-awesome-icon icon="eye" />
                </span>
              </div>
            </div>
          </div>
          <div class="input-group">
            <div class="input-group-append">
              <div class="input-group-text">
                <font-awesome-icon :icon="['fa', 'key']" />
              </div>
            </div>
            <input
              :type="passwordShow.newPassword ? 'text' : 'password'"
              class="form-control"
              v-model="postData.newPassword"
              placeholder="New Password"
            />
            <div class="input-group-prepend">
              <div
                class="input-group-text pointer"
                @click="change('newPassword')"
              >
                <span v-if="passwordShow.newPassword">
                  <font-awesome-icon :icon="['fas', 'eye-slash']" />
                </span>
                <span v-else class="text-success">
                  <font-awesome-icon icon="eye" />
                </span>
              </div>
            </div>
          </div>
          <div class="input-group">
            <div class="input-group-append">
              <div class="input-group-text">
                <font-awesome-icon :icon="['fa', 'key']" />
              </div>
            </div>
            <input
              :type="passwordShow.confirmPassword ? 'text' : 'password'"
              class="form-control"
              v-model="postData.confirmPassword"
              placeholder="ReType Password"
            />
            <div class="input-group-prepend">
              <div
                class="input-group-text pointer"
                @click="change('confirmPassword')"
              >
                <span v-if="passwordShow.confirmPassword">
                  <font-awesome-icon :icon="['fas', 'eye-slash']" />
                </span>
                <span v-else class="text-success">
                  <font-awesome-icon icon="eye" />
                </span>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-center align-items-center mx-2">
            <button class="btn btn-secondary" @click="changePassword">
              Change
            </button>
          </div>
        </div>
      </form>
    </div>
    <Footer />
  </div>
</template>
<script>
import Header from "@/views/Layouts/Header";
import Footer from "@/views/Layouts/Footer";
import ax from "@/axios";
export default {
  name: "ChangePassword",
  components: { Footer, Header },
  data() {
    return {
      message: "",
      postData: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
      },
      passwordShow: {
        oldPassword: false,
        newPassword: false,
        confirmPassword: false
      }
    };
  },
  methods: {
    change(name) {
      switch (name) {
        case "oldPassword": {
          this.passwordShow.oldPassword = !this.passwordShow.oldPassword;
          break;
        }
        case "newPassword": {
          this.passwordShow.newPassword = !this.passwordShow.newPassword;
          break;
        }
        case "confirmPassword": {
          this.passwordShow.confirmPassword = !this.passwordShow
            .confirmPassword;
          break;
        }
      }
    },
    changePassword() {
      let payload = {
        old_password: this.postData.oldPassword,
        new_password: this.postData.newPassword,
        confirm_password: this.postData.confirmPassword
      };
      ax.post("passwordReset.php", payload)
        .then(res => {
          console.log(res.data);
          if (res.data.status) {
            this.message = res.data.message;
          } else {
            this.message = res.data.error;
          }
        })
        .catch(e => console.log(e));
    }
  }
};
</script>
<style>
.pointer {
  cursor: pointer;
  user-select: none;
}
</style>
