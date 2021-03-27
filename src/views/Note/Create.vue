<template>
  <div
    class="my-5"
    style="min-height: 80vh;"
  >
    <div
      class="fixed-top bg-secondary text-light py-2 font-weight-bold text-capitalize"
    >
      <router-link class="float-left text-light px-3" to="/">
        Home
      </router-link>
      {{ category_name }}
    </div>
    <div class="mx-2" id="tableId">
      <table class="table w-100 table-sm table-bordered text-left mb-5">
        <tr v-for="(item, i) in noteDataList" :key="i">
          <td>
            <span class="font-weight-bold">{{ item.note_data }}</span> &nbsp;
            <small class="text-info float-right">{{ item.reg_time }}</small>
          </td>
        </tr>
      </table>

      <div class="input-group fixed-bottom">
        <label for="note" class="sr-only"></label>
        <input
          type="text"
          class="form-control"
          id="note"
          placeholder="Write a note"
          @keyup.enter="create"
          v-model="note"
          autocomplete="off"
          autofocus
        />

        <div class="input-group-append">
          <button class="btn btn-success" @click="create">
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "@/axios";

export default {
  name: "createNote",
  data() {
    return {
      note: "",
      message: "",
      noteDataList: null,
      category_name: null
    };
  },
  mounted() {
    this.noteList();
  },
  methods: {
    noteList() {
      axios
        .get(
          "note.php?showByCategory&categoryId=" + this.$route.params.category_id
        )
        .then(response => {
          this.noteDataList = response.data.note_data.data;
          this.category_name = response.data.category_name.category_name;
        })
        .catch(e => console.warn(e))
        .finally(() => {
          this.scrollToEnd();
        });
    },
    create() {
      let postData = {
        category_id: this.$route.params.category_id,
        note_data: this.note
      };
      axios
        .post("note.php", postData)
        .then(res => {
          if (res.data.status) {
            this.message = res.data.message;
            this.note = "";
            this.$store.dispatch("ALERT", {
              title: "Success",
              message: "Data Update Success",
              variant: "success"
            });
          } else {
            this.message = res.data.message;
          }
        })
        .catch(e => {
          this.message = e;
        })
        .finally(() => {
          this.noteList();
        });
    },
    scrollToEnd() {
      let container = this.$el.querySelector("#tableId");
      //container.scrollTop = container.scrollHeight;
      window.scrollTo(0, container.scrollHeight);
    }
  }
};
</script>
