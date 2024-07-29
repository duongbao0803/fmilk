import { getInfoUser } from "@/api/authenApi";
import { changePassword, updatePersonal } from "@/api/userApi";
import {
  ChangePasswordForm,
  CustomError,
  UserInfo,
} from "@/interfaces/interface";
// import { editUser } from "@/api/userApi";

import { notification } from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";

const useAuthService = () => {
  const queryClient = useQueryClient();

  const fetchUserInfo = async (): Promise<UserInfo | undefined> => {
    try {
      const res = await getInfoUser();
      if (res && res.status === 200) {
        const infoUser: UserInfo = res?.data?.info;
        if (infoUser) {
          return infoUser;
        }
      }
    } catch (err) {
      console.error("Error fetching userInfo", err);
    }
  };

  const updatePersonalInfo = async (formValues: UserInfo) => {
    await updatePersonal(formValues);
  };

  const changePasswordUser = async (formValues: ChangePasswordForm) => {
    await changePassword(formValues);
  };

  const { data: infoUser, isLoading: isFetching } = useQuery(
    "infoUser",
    fetchUserInfo,
    {
      retry: 3,
      retryDelay: 5000,
    },
  );

  const updatePersonalInfoMutation = useMutation(updatePersonalInfo, {
    onSuccess: () => {
      notification.success({
        message: "Chỉnh sửa thành công",
        description: "Chỉnh sửa thông tin cá thân thành công",
        duration: 2,
      });
      queryClient.invalidateQueries("infoUser");
    },
    onError: (err: CustomError) => {
      notification.error({
        message: "Lỗi khi chỉnh sửa",
        description: `${err?.response?.data?.message}`,
        duration: 2,
      });
    },
  });

  const chagePasswordUserMutation = useMutation(changePasswordUser, {
    onSuccess: () => {
      notification.success({
        message: "Thay đổi thành công",
        description: "Thay đổi mật khẩu thành công",
        duration: 2,
      });
      queryClient.invalidateQueries("infoUser");
    },
    onError: (err: CustomError) => {
      notification.error({
        message: "Lỗi khi chỉnh sửa",
        description: `${err?.response?.data?.message}`,
        duration: 2,
      });
    },
  });

  const updatePersonalItem = async (formValues: UserInfo) => {
    await updatePersonalInfoMutation.mutateAsync(formValues);
  };

  const changePasswordItem = async (formValues: ChangePasswordForm) => {
    await chagePasswordUserMutation.mutateAsync(formValues);
  };

  return {
    isFetching,
    infoUser,
    fetchUserInfo,
    updatePersonalItem,
    changePasswordItem,
  };
};

export default useAuthService;
