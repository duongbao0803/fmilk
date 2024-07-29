import { BrandData } from "@/interfaces/interface";
import axiosClient from "../config/axiosClient";

const getAllBrand = (page: number) => {
  return axiosClient.get(`/v1/brand`, {
    params: {
      page: page,
      pageSize: 20,
    },
  });
};

const getDetailBrand = (brandId: string) => {
  return axiosClient.put(`/v1/brand/${brandId}`);
};

const editBrand = (brandId: string, formValues: BrandData) => {
  return axiosClient.put(`/v1/brand/${brandId}`, formValues);
};

const addBrand = (formValues: BrandData) => {
  return axiosClient.post("/v1/brand/create", formValues);
};

const removeBrand = (brandId: string) => {
  return axiosClient.delete(`/v1/brand/${brandId}`);
};

export { getAllBrand, removeBrand, addBrand, editBrand, getDetailBrand };
