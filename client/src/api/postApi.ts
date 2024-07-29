import axiosClient from "@/config/axiosClient";
import { PostInfo } from "@/interfaces/interface";

const getAllPost = (page: number) => {
  return axiosClient.get(`/v1/post`, {
    params: {
      page: page,
      pageSize: 20,
    },
  });
};

const getDetailPost = (postId: string) => {
  return axiosClient.get(`/v1/post/${postId}`);
};

const addPost = (formValues: PostInfo) => {
  return axiosClient.post("/v1/post/create", formValues);
};

const editPostInfo = (postId: string, formValues: PostInfo) => {
  return axiosClient.put(`/v1/post/${postId}`, formValues);
};

const removePost = (postId: string) => {
  return axiosClient.delete(`/v1/post/${postId}`);
};

export { getAllPost, getDetailPost, addPost, editPostInfo, removePost };
