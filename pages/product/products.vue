<template>
  <div class="body min-h-screen bg-green-300 flex items-center justify-center">
    <div>
      <div class="grid grid-cols-2 gap-2">
        <div>
          <button class="btn btn-accent mb-[20px]" @click="addProduct">
            Add Product
          </button>
        </div>
        <div  class="flex justify-end ml-[55px]">
          <button class="btn btn-xs hover:bg-green-700 mr-1" @click="withStocks">
            with stocks
          </button>
          <button class="btn btn-xs hover:bg-green-700" @click="noStock">
            no stocks
          </button>
        </div>
      </div>
      <div class="mb-[10px]">
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
          >Search</label
        >
        <div class="relative">
          <div
            class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
          >
            <svg
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            v-model="searchedProduct"
            type="search"
            id="default-search"
            class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search product name..."
            required
            v-on:input="reset"
          />
          <button
            @click="searchItem"
            type="submit"
            class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </div>
      <div class="overflow-x-auto min-h-[600px] bg-white rounded-lg">
        <table class="table w-full">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Product Description</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Category</th>
              <th class="flex items-center justify-center">Action</th>
            </tr>
          </thead>
          <tbody v-for="product in products" :key="product.id">
            <tr>
              <td>{{ product.name }}</td>
              <td>{{ product.description }}</td>
              <td>$ {{ product.price }}</td>
              <td>{{ product.quantity }}</td>
              <td>{{ product?.category_name }}</td>
              <td>
                <button
                  class="btn btn-outline btn-warning mr-[2px]"
                  @click="deleteProduct(product.id)"
                >
                  Delete Product
                </button>
                <button
                  class="btn btn-outline btn-success"
                  @click="editProduct(product.id)"
                >
                  Edit Product
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data: () => {
    return {
      dbProducts: [],
      products: [],
      searchedProduct: null,
    };
  },
  mounted() {
    this.retrieveProducts();
  },
  methods: {
    async retrieveProducts() {
      const data = await axios.get("http://localhost:8000/api/products");
      this.products = data.data;
      this.dbProducts = data.data;
    },
    async deleteProduct(id) {
      await axios.delete(`http://localhost:8000/api/delete-product/${id}`);
      const data = await axios.get("http://localhost:8000/api/products");
      this.dbProducts = data.data;
      this.products = data.data;
      this.$router.push(`/product/products`);
    },
    addProduct() {
      this.$router.push(`/product/createproduct`);
    },
    editProduct(id) {
      this.$router.push(`/product/edit/${id}`);
    },
    searchItem() {
      const data = this.dbProducts.filter((product) => {
        return product?.name
          ?.toLowerCase()
          .includes(this.searchedProduct.toLowerCase());
      });
      this.products = data;
    },
    reset(event) {
      if (!event.target.value) this.products = this.dbProducts;
    },
    noStock() {
      const data = this.dbProducts.filter((val) => {
        return val?.quantity < 1;
      });
      this.products = data;
    },
    withStocks() {
      const data = this.dbProducts.filter((val) => {
        return val?.quantity > 0;
      });
      this.products = data;
    },
  },
};
</script>
