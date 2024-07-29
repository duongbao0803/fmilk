import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addComment,
  addProduct,
  editComment,
  editProductInfo,
  getAllProduct,
  getDetailProduct,
  removeComment,
  removeProduct,
} from "@/api/productApi";
import { notification } from "antd";
import { CustomError, FeedBack, ProductInfo } from "@/interfaces/interface";

const useProductService = (
  productName: string,
  origin: string,
  productId: string,
) => {
  const queryClient = useQueryClient();

  const fetchProducts = async (
    page: number,
    productName: string,
    origin: string,
  ) => {
    try {
      const res = await getAllProduct(page, productName, origin);
      const totalProducts = res.data.totalProducts || 0;
      const products = res.data.products || [];
      return { totalProducts, products };
    } catch (err) {
      console.error("Error fetching products:", err);
      return { totalProducts: 0, products: [] };
    }
  };

  const getInfoProductDetail = async (productId: string) => {
    const res = await getDetailProduct(productId);
    return res.data.productInfo;
  };

  const deleteProduct = async (productId: string) => {
    await removeProduct(productId);
    return productId;
  };

  const addNewProduct = async (formValues: ProductInfo) => {
    await addProduct(formValues);
  };

  const updateProductInfo = async ({
    productId,
    productInfo,
  }: {
    productId: string;
    productInfo: ProductInfo;
  }) => {
    await editProductInfo(productId, productInfo);
  };

  const addNewComment = async ({
    productId,
    formValues,
  }: {
    productId: string;
    formValues: FeedBack;
  }) => {
    await addComment(productId, formValues);
  };

  const deleteComment = async ({
    productId,
    commentId,
  }: {
    productId: string;
    commentId: string;
  }) => {
    await removeComment(productId, commentId);
  };

  const updateComment = async ({
    productId,
    commentId,
    formValues,
  }: {
    productId: string;
    commentId: string;
    formValues: FeedBack;
  }) => {
    await editComment(productId, commentId, formValues);
  };

  const { data: productData, isLoading: isFetching } = useQuery(
    ["products", productName, origin],
    () => fetchProducts(1, productName, origin),
    {
      retry: 2,
      retryDelay: 5000,
    },
  );

  const { data: productDetailData } = useQuery(
    ["products", productId],
    () => getInfoProductDetail(productId),
    {
      enabled: !!productId,
      retry: 2,
      retryDelay: 5000,
    },
  );

  const deleteProductMutation = useMutation(deleteProduct, {
    onSuccess: () => {
      notification.success({
        message: "Xóa thành công",
        description: "Xóa sản phẩm thành công",
        duration: 2,
      });
      queryClient.invalidateQueries("products");
    },
    onError: (err: CustomError) => {
      notification.error({
        message: "Xóa thất bại",
        description: `${err?.response?.data?.message}`,
        duration: 2,
      });
    },
  });

  const updateProductInfoMutation = useMutation(updateProductInfo, {
    onSuccess: () => {
      notification.success({
        message: "Cập nhật thành công",
        description: "Cập nhật thông tin sản phẩm thành công",
        duration: 2,
      });
      queryClient.invalidateQueries("products");
    },
    onError: (err: CustomError) => {
      console.error("Error update", err);
      notification.error({
        message: "Cập nhật thất bại",
        description: `${err?.response?.data?.message}`,
        duration: 2,
      });
    },
  });

  const addNewProductMutation = useMutation(addNewProduct, {
    onSuccess: () => {
      notification.success({
        message: "Thêm thành công",
        description: "Thêm sản phẩm thành công",
        duration: 2,
      });
      queryClient.invalidateQueries("products");
    },
    onError: (err: CustomError) => {
      notification.error({
        message: "Thêm thất bại",
        description: `${err?.response?.data?.message}`,
        duration: 2,
      });
    },
  });

  const addNewCommentMutation = useMutation(addNewComment, {
    onSuccess: () => {
      notification.success({
        message: "Thêm thành công",
        description: "Thêm nhận xét thành công",
        duration: 2,
      });
      queryClient.invalidateQueries("products");
    },
    onError: (err: CustomError) => {
      notification.error({
        message: "Thêm thất bại",
        description: `${err?.response?.data?.message}`,
        duration: 2,
      });
    },
  });

  const deleteCommentMutation = useMutation(deleteComment, {
    onSuccess: () => {
      notification.success({
        message: "Xóa thành công",
        description: "Xóa nhận xét thành công",
        duration: 2,
      });
      queryClient.invalidateQueries("products");
    },
    onError: (err: CustomError) => {
      notification.error({
        message: "Xóa thất bại",
        description: `${err?.response?.data?.message}`,
        duration: 2,
      });
    },
  });

  const updateCommentMutation = useMutation(updateComment, {
    onSuccess: () => {
      notification.success({
        message: "Cập nhật thành công",
        description: "Cập nhật nhận xét thành công",
        duration: 2,
      });
      queryClient.invalidateQueries("products");
    },
    onError: (err: CustomError) => {
      notification.error({
        message: "Cập nhật thất bại",
        description: `${err?.response?.data?.message}`,
        duration: 2,
      });
    },
  });

  const deleteProductItem = async (userId: string) => {
    await deleteProductMutation.mutateAsync(userId);
  };

  const updateProductItem = async (
    productId: string,
    productInfo: ProductInfo,
  ) => {
    await updateProductInfoMutation.mutateAsync({ productId, productInfo });
  };

  const addNewProductItem = async (formValues: ProductInfo) => {
    await addNewProductMutation.mutateAsync(formValues);
  };

  const addNewCommentItem = async (productId: string, formValues: FeedBack) => {
    await addNewCommentMutation.mutateAsync({ productId, formValues });
  };

  const deleteCommentItem = async (productId: string, commentId: string) => {
    await deleteCommentMutation.mutateAsync({ productId, commentId });
  };

  const updateCommentItem = async (
    productId: string,
    commentId: string,
    formValues: FeedBack,
  ) => {
    await updateCommentMutation.mutateAsync({
      productId,
      commentId,
      formValues,
    });
  };

  const totalCount = productData?.totalProducts;
  const products = productData?.products;

  return {
    products,
    fetchProducts: (page: number) => fetchProducts(page, productName, origin),
    isFetching,
    getInfoProductDetail,
    deleteProductItem,
    updateProductItem,
    addNewProductItem,
    totalCount,
    productDetailData,
    addNewCommentItem,
    deleteCommentItem,
    updateCommentItem,
  };
};

export default useProductService;
