import { createSlice } from "@reduxjs/toolkit";

const ProductSlice = createSlice({
  name: "product",
  initialState: {
    Products: [],
    loading: false,
    isProductCreated: false,
    product:null,
  },
  reducers: {
    setProducts(state, action) {
      state.Products = action.payload;
    },
    setProductCate(state, action) {
      state.MealsCate = action.payload;
    },
    setLoading(state) {
      state.loading = true;
    },
    clearLoading(state) {
      state.loading = false;
    },
    setIsProductCreated(state) {
      state.isMealCreated = true;
      state.loading = false;
    },
    clearIsProductCreated(state) {
      state.isMealCreated = false;
    },
    setProduct(state,action) {
      state.Meal = action.payload;
    },
    deleteProduct(state,action) {
      state.products = state.products.filter((p)=> p._id === action.payload);
    },

  },
});

const ProductReducer = ProductSlice.reducer;
const ProductActions = ProductSlice.actions;

export { ProductActions, ProductReducer };
