import { toast } from "react-toastify";
import { ProductActions } from "../productsSlice";
import request from "../../Utils/request";






// Create   {done}
export function createProduct(newProd) {
  return async (dispatch, getState) => {
    try {
      dispatch(ProductActions.setLoading());
      await request.post(`/api/prod`, newProd, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch(ProductActions.setIsProductCreated());
      setTimeout(() => dispatch(ProductActions.clearIsProductCreated()), 2000); // 2s
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(ProductActions.clearLoading());
    }
  };
}



// Delete     {Done}  
export function deleteProd(ProdId) {
  return async (dispatch,getState) => {
    try {
      const { data } = await request.delete(`/api/prod/${ProdId}`);
      dispatch(ProductActions.deleteProduct(data.ProdId));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}



// Get All product {Done}
export function getAllProd() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/prod`);
      dispatch(ProductActions.setProducts(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

