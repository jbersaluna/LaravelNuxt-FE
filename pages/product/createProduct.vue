<template>
  <div class="min-h-screen bg-green-300 items-center justify-center">
    <div class="ml-[500px] flex flex-col m-8">
      <div>
        <label class="label ml-[250px]">
          <span class="label-text">Name</span>
        </label>
        <input
          v-model="name"
          class="input input-bordered input-success w-full max-w-xs ml-[250px]"
          type="text"
          placeholder="name of the product"
        />
      </div>
      <div class="divider w-3/5"></div>
      <label class="label ml-[250px]">
          <span class="label-text">Description</span>
        </label>
        <input
          v-model="description"
          class="input input-bordered input-success w-full max-w-xs ml-[250px]"
          type="text"
          placeholder="description of the product"
        />
      <div class="divider w-3/5"></div>
      <label class="label ml-[250px]">
          <span class="label-text">Price in $</span>
        </label>
        <input
          v-model="price"
          class="input input-bordered input-success w-full max-w-xs ml-[250px]"
          placeholder="price"
        />
      <div class="divider w-3/5"></div>
      <label class="label ml-[250px]">
          <span class="label-text">Quantity</span>
        </label>
        <input
          v-model="quantity"
          class="input input-bordered input-success w-full max-w-xs ml-[250px]"
          type="number"
          placeholder="quantity"
        />
      <div class="divider w-3/5"></div>
        <select class="select w-full max-w-xs ml-[250px]" @change="onSelectCategory">
          <option v-for="category in categories" :key="category.id">
            {{ category.name }}
          </option>
        </select>
      <div class="divider w-3/5"></div>
      <div class="w-1/2 flex justify-end ml-[55px]">
        <button
          class="btn btn-success w-1/2 hover:bg-green-700"
          @click="addProduct"
        >
          Add Product
        </button>
        <button class="btn btn-error w-1/2 hover:bg-red-700" @click="cancel">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data: () => {
    return {
      name: "",
      description: "",
      price: 0,
      quantity: 0,
      categories: [],
      category: null,
    };
  },

  mounted() {
    this.retrieveCategories();
  },
  methods: {
    onSelectCategory(event) {
      const tempCategory = event.target.value;
      var result = this.categories.find((item) => {
        return item.name === tempCategory;
      });
      console.log(result);
      this.category = result;
    },
    async addProduct() {
      await axios
        .post("http://localhost:8000/api/insert-product", {
          name: this.name,
          description: this.description,
          price: this.price,
          quantity: this.quantity,
          category: this.category.id,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      this.$router.push(`/product/products`);
    },
    async retrieveCategories() {
      const data = await axios.get("http://localhost:8000/api/categories");
      this.categories = data.data;
      this.category = data.data[0];
    },
    cancel() {
      this.$router.push(`/product/products`);
    },
  },
};
</script>
