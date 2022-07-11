<template>
  <div id="create-category">
    <input
      v-model="name"
      class="input"
      type="text"
      placeholder="name of the category"
    />
    <button class="btn btn-sucess lg" @click="addCategory">Add Category</button>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data: () => {
    return {
      name: "",
    };
  },

  methods: {
    async addCategory() {
      await axios
        .post("http://localhost:8000/api/insert-category", {
          name: this.name,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      this.$router.push(`/product/products`);
    },
  },
};
</script>
