<template>
  <div class="min-h-screen bg-green-300 items-center justify-center">
    <div id="create-products" class="ml-[500px] flex flex-col m-8">
      <div v-if="product">
        <label class="label ml-[250px]">
          <span class="label-text">Name</span>
        </label>
        <input
          v-model="product.name"
          class="input input-bordered input-success w-full max-w-xs ml-[250px]"
          type="text"
        />
      </div>
      <div class="divider w-3/5"></div>
      <div>
        <label class="label ml-[250px]">
          <span class="label-text">Description</span>
        </label>
        <input
          class="input input-bordered input-success w-full max-w-xs ml-[250px]"
          type="text"
          v-model="product.description"
        />
      </div>
      <div class="divider w-3/5"></div>
      <div>
        <label class="label ml-[250px]">
          <span class="label-text">Price in $</span>
        </label>
        <input
          v-model="product.price"
          class="input input-bordered input-success w-full max-w-xs ml-[250px]"
        />
      </div>
      <div class="divider w-3/5"></div>
      <div>
        <label class="label ml-[250px]">
          <span class="label-text">Quantity</span>
        </label>
        <input
          v-model="product.quantity"
          class="input input-bordered input-success w-full max-w-xs ml-[250px]"
          type="number"
        />
      </div>
      <div class="divider w-3/5"></div>
      <div class="w-1/2 flex justify-end ml-[55px]">
        <button
          class="btn btn-success w-1/2 hover:bg-green-700"
          @click="submitProduct"
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
      product: [],
    };
  },
  mounted() {
    this.retrieveProductById();
  },
  methods: {
    async retrieveProductById() {
      const data = await axios.get(
        `http://localhost:8000/api/product-details/${this.$route.params.id}`
      );
      this.product = data.data[0];
    },
    async submitProduct(){
        await axios.post('http://localhost:8000/api/edit-product', this.product)
        this.$router.push(`/product/products`);
    },
    cancel() {
      this.$router.push(`/product/products`);
    },
  },
};
</script>
