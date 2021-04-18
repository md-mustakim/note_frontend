<template>
  <div>
    <Header />
    <div>
      <div
        v-if="loading"
        class="d-flex justify-content-center align-items-center"
        style="height: 80vh"
      >
        <div class="input-group w-50">
          <input
            type="text"
            class="form-control"
            name="description"
            v-model="note_data"
            @keyup.enter="update()"
            aria-label="note_data"
          />
          <div class="input-group-append">
            <button @click="update" class="btn btn-success">
              Edit <i class="fas fa-edit"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="" v-else>
        loading ...
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import ax from "@/axios";
import Header from "@/views/Layouts/Header";
import Footer from "@/views/Layouts/Footer";

export default {
  name: "Edit",
  components: { Footer, Header },
  data() {
    return {
      noteId: null,
      noteFullData: null,
      note_data: null,
      loading: false
    };
  },
  mounted() {
    this.noteId = this.$route.params.id;
    this.getSingleNote();
  },
  methods: {
    getSingleNote() {
      ax.get("note.php?show&id=" + this.noteId)
        .then(res => {
          console.log(res);
          if (res.data.status) {
            this.note_data = res.data.data.note_data;
            this.noteFullData = res.data.data;
          }
        })
        .catch(e => console.log(e))
        .finally(() => {
          this.loading = true;
        });
    },
    update() {
      ax.post("note.php?update&id=" + this.noteFullData.id, {
        note_data: this.note_data
      }).then(res => {
        console.log(res);
        if (res.data.status) {
          console.log("data Update Success");
          this.$router.push({
            name: "createNote",
            params: {
              category_id: this.noteFullData.category_id
            }
          });
        }
      });
    }
  }
};
</script>
