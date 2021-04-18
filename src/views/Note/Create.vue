<template>
  <div class="my-5" style="min-height: 80vh;">
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
            <span @click="clops(item.id.toString())">{{ item.note_data }}</span>
            <br />
            <b-collapse :id="item.id.toString()">
              <span @click="edit(item.id.toString())" class="text-info"
                >Edit</span
              >
              <span @click="remove(item.id.toString())" class="px-2 text-info"
                >Delete</span
              >
              <small class="text-info float-right">{{ item.reg_time }}</small>
            </b-collapse>
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
import ax from "@/axios";

export default {
  name: "createNote",
  data() {
    return {
      note: "",
      message: "",
      noteDataList: null,
      category_name: null,
      displayClassShow: "font-weight-bold",
      displayClassHide: "d-none",
      showClass: true,
      hideClass: false
    };
  },
  mounted() {
    this.noteList();
  },
  methods: {
    clops(i) {
      this.$root.$emit("bv::toggle::collapse", i);
    },
    edit(i) {
      this.$router.push({
        name: "Edit",
        params: {
          id: i
        }
      });
    },
    remove(i) {
      ax.get("note.php?delete&id= " + i)
        .then(res => {

          if (res.data.status) {
            console.log(res);
            this.noteList();
          }
        })
        .catch(e => console.warn(e));
    },
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
        .post("note.php?save", postData)
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
