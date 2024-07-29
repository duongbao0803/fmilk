import { useMutation, useQuery, useQueryClient } from "react-query";
import { notification } from "antd";
import { AddNewUserProps, CustomError, UserInfo } from "@/interfaces/interface";
import {
  addUser,
  editStatusUser,
  editUserInfo,
  getAllUser,
  getDetailUser,
  removeUser,
} from "@/api/userApi";

const useUserService = () => {
  const queryClient = useQueryClient();

  const fetchUsers = async (page: number) => {
    const res = await getAllUser(page);
    return res.data.users;
  };

  const getInfoUserDetail = async (userId: string) => {
    const res = await getDetailUser(userId);
    return res.data.userInfo;
  };

  const deleteUser = async (userId: string) => {
    await removeUser(userId);
    return userId;
  };

  const addNewUser = async (formValues: AddNewUserProps) => {
    await addUser(formValues);
  };

  const updateUserStatus = async ({
    userId,
    userStatus,
  }: {
    userId: string;
    userStatus: boolean;
  }) => {
    await editStatusUser(userId, userStatus);
  };

  const updateUserInfo = async ({
    userId,
    userInfo,
  }: {
    userId: string;
    userInfo: UserInfo;
  }) => {
    await editUserInfo(userId, userInfo);
  };

  const { data: users = [], isLoading: isFetching } = useQuery(
    "users",
    () => fetchUsers(1),
    {
      retry: 3,
      retryDelay: 5000,
    },
  );

  const deleteUserMutation = useMutation(deleteUser, {
    onSuccess: () => {
      notification.success({
        message: "Xóa thành công",
        description: "Xóa người dùng thành công",
        duration: 2,
      });
      queryClient.invalidateQueries("users");
    },
    onError: (err: CustomError) => {
      notification.error({
        message: "Xóa thất bại",
        description: `${err?.response?.data?.message}`,
        duration: 2,
      });
    },
  });

  const updateStatusMutation = useMutation(updateUserStatus, {
    onSuccess: () => {
      notification.success({
        message: "Cập nhật thành công",
        description: "Cập nhật trạng thái thành công",
        duration: 2,
      });
      queryClient.invalidateQueries("users");
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

  const updateUserInfoMutation = useMutation(updateUserInfo, {
    onSuccess: () => {
      notification.success({
        message: "Cập nhật thành công",
        description: "Cập nhật thông tin người dùng thành công",
        duration: 2,
      });
      queryClient.invalidateQueries("users");
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

  const addNewUserMutation = useMutation(addNewUser, {
    onSuccess: () => {
      notification.success({
        message: "Thêm thành công",
        description: "Thêm người dùng thành công",
        duration: 2,
      });
      queryClient.invalidateQueries("users");
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

  const deleteUserItem = async (userId: string) => {
    await deleteUserMutation.mutateAsync(userId);
  };

  const updateStatus = async (userId: string, userStatus: boolean) => {
    await updateStatusMutation.mutateAsync({ userId, userStatus });
  };

  const updateUserItem = async (userId: string, userInfo: UserInfo) => {
    await updateUserInfoMutation.mutateAsync({ userId, userInfo });
  };

  const addNewUserItem = async (formValues: AddNewUserProps) => {
    await addNewUserMutation.mutateAsync(formValues);
  };

  return {
    users,
    fetchUsers,
    deleteUserItem,
    updateStatus,
    updateUserItem,
    getInfoUserDetail,
    addNewUserItem,
    isFetching,
  };
};

export default useUserService;
