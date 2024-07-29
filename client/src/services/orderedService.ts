import { useQuery } from "react-query";

import { getAllOrdered } from "@/api/orderApi";

const useOrderedService = () => {
  const fetchOrdereds = async (page: number) => {
    try {
      const res = await getAllOrdered(page);
      const totalOrders = res.data.totalOrders || 0;
      const orders = res.data.orders || [];
      return { totalOrders, orders };
    } catch (err) {
      console.error("Error fetching products:", err);
      return { totalOrders: 0, products: [] };
    }
  };

  const { data: orderData, isLoading: isFetching } = useQuery(
    ["orders", 1],
    () => fetchOrdereds(1),
    {
      retry: 3,
      retryDelay: 5000,
    },
  );

  const totalCount = orderData?.totalOrders;
  const orders = orderData?.orders;

  return {
    isFetching,
    orders,
    totalCount,
  };
};

export default useOrderedService;
