import { useMutation, useQuery, useQueryClient } from "react-query";
import { notification } from "antd";
import {
  addBrand,
  editBrand,
  getAllBrand,
  getDetailBrand,
  removeBrand,
} from "@/api/brandApi";
import { BrandData, CustomError } from "../interfaces/interface";

const useBrandService = () => {
  const queryClient = useQueryClient();

  const fetchBrands = async (page: number) => {
    const res = await getAllBrand(page);
    const totalBrands = res.data.totalbrands || 0;
    const brands = res.data.brands;
    return { totalBrands, brands };
  };

  const getInfoBrandDetail = async (brandId: string) => {
    const res = await getDetailBrand(brandId);
    return res.data.brandInfo;
  };

  const deleteBrand = async (brandId: string) => {
    await removeBrand(brandId);
    return brandId;
  };

  const addNewBrand = async (formValues: BrandData) => {
    await addBrand(formValues);
  };

  const updateBrandInfo = async ({
    brandId,
    formValues,
  }: {
    brandId: string;
    formValues: BrandData;
  }) => {
    await editBrand(brandId, formValues);
  };

  const { data: brandData, isLoading: isFetching } = useQuery(
    "brands",
    () => fetchBrands(1),
    {
      retry: 3,
      retryDelay: 5000,
    },
  );

  const deleteBrandMutation = useMutation(deleteBrand, {
    onSuccess: () => {
      notification.success({
        message: "Xóa thành công",
        description: "Xóa thương hiệu thành công",
        duration: 2,
      });
      queryClient.invalidateQueries("brands");
    },
    onError: (err: CustomError) => {
      notification.error({
        message: "Delete Failed",
        description: `${err?.response?.data?.message}`,
        duration: 2,
      });
    },
  });

  const updateBrandInfoMutation = useMutation(updateBrandInfo, {
    onSuccess: () => {
      notification.success({
        message: "Cập nhật thành công",
        description: "Cập nhật thương hiệu thành công",
        duration: 2,
      });
      queryClient.invalidateQueries("brands");
    },
    onError: (err: CustomError) => {
      notification.error({
        message: "Cập nhật thất bại",
        description: `${err?.response?.data?.message}`,
        duration: 2,
      });
    },
  });

  const addNewBrandMutation = useMutation(addNewBrand, {
    onSuccess: () => {
      notification.success({
        message: "Thêm thành công",
        description: "Thêm thương hiệu thành công",
        duration: 2,
      });
      queryClient.invalidateQueries("brands");
    },
    onError: (err: CustomError) => {
      console.error("Error add", err);
      notification.error({
        message: "Thêm thất bại",
        description: `${err?.response?.data?.message}`,
        duration: 2,
      });
    },
  });

  const deleteBrandItem = async (brandId: string) => {
    await deleteBrandMutation.mutateAsync(brandId);
  };

  const updateBrandItem = async (brandId: string, formValues: BrandData) => {
    await updateBrandInfoMutation.mutateAsync({ brandId, formValues });
  };

  const addNewBrandItem = async (formValues: BrandData) => {
    await addNewBrandMutation.mutateAsync(formValues);
  };

  const totalCount = brandData?.totalBrands;
  const brands = brandData?.brands;

  return {
    totalCount,
    brands,
    deleteBrandItem,
    addNewBrandItem,
    updateBrandItem,
    isFetching,
    getInfoBrandDetail,
  };
};

export default useBrandService;
