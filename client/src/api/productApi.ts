import axiosClient from "@/config/axiosClient";
import { FeedBack, ProductInfo } from "@/interfaces/interface";

const getAllProduct = (page: number, productName: string, origin: string) => {
  return axiosClient.get(`/v1/product`, {
    params: {
      page: page,
      pageSize: 20,
      productName: productName,
      origin: origin,
    },
  });
};

const getDetailProduct = (productId: string) => {
  return axiosClient.get(`/v1/product/${productId}`);
};

const addProduct = (formValues: ProductInfo) => {
  return axiosClient.post("/v1/product/create", formValues);
};

const editProductInfo = (productId: string, formValues: ProductInfo) => {
  return axiosClient.put(`/v1/product/${productId}`, formValues);
};

const removeProduct = (productId: string) => {
  return axiosClient.delete(`/v1/product/${productId}`);
};

const addComment = (productId: string, formValues: FeedBack) => {
  return axiosClient.post(`/v1/product/${productId}/comment`, formValues);
};

const removeComment = (productId: string, commentId: string) => {
  return axiosClient.delete(`/v1/product/${productId}/comment/${commentId}`);
};

const editComment = (
  productId: string,
  commentId: string,
  formValues: FeedBack,
) => {
  return axiosClient.put(
    `/v1/product/${productId}/comment/${commentId}`,
    formValues,
  );
};

export {
  getAllProduct,
  getDetailProduct,
  removeProduct,
  editProductInfo,
  addProduct,
  addComment,
  removeComment,
  editComment,
};
