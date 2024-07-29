import { useMutation, useQuery, useQueryClient } from "react-query";
import { notification } from "antd";
import { CustomError, PostInfo } from "@/interfaces/interface";
import {
  addPost,
  editPostInfo,
  getAllPost,
  getDetailPost,
  removePost,
} from "@/api/postApi";

const usePostService = () => {
  const queryClient = useQueryClient();

  const fetchPosts = async (page: number) => {
    const res = await getAllPost(page);
    return res.data.posts;
  };

  const getInfoPostDetail = async (postId: string) => {
    const res = await getDetailPost(postId);
    return res.data.postInfo;
  };

  const deletePost = async (postId: string) => {
    await removePost(postId);
    return postId;
  };

  const addNewPost = async (formValues: PostInfo) => {
    await addPost(formValues);
  };

  const updatePostInfo = async ({
    postId,
    postInfo,
  }: {
    postId: string;
    postInfo: PostInfo;
  }) => {
    await editPostInfo(postId, postInfo);
  };

  const { data: posts = [], isLoading: isFetching } = useQuery(
    "posts",
    () => fetchPosts(1),
    {
      retry: 3,
      retryDelay: 5000,
    },
  );

  const deletePostMutation = useMutation(deletePost, {
    onSuccess: () => {
      notification.success({
        message: "Xóa thành công",
        description: "Xóa bài viết thành công",
        duration: 2,
      });
      queryClient.invalidateQueries("posts");
    },
    onError: (err: CustomError) => {
      notification.error({
        message: "Xóa thất bại",
        description: `${err?.response?.data?.message}`,
        duration: 2,
      });
    },
  });

  const updatePostInfoMutation = useMutation(updatePostInfo, {
    onSuccess: () => {
      notification.success({
        message: "Cập nhật thành công",
        description: "Cập nhật thông tin bài viết thành công",
        duration: 2,
      });
      queryClient.invalidateQueries("posts");
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

  const addNewPostMutation = useMutation(addNewPost, {
    onSuccess: () => {
      notification.success({
        message: "Thêm thành công",
        description: "Thêm bài viết thành công",
        duration: 2,
      });
      queryClient.invalidateQueries("posts");
    },
    onError: (err: CustomError) => {
      notification.error({
        message: "Thêm thất bại",
        description: `${err?.response?.data?.message}`,
        duration: 2,
      });
    },
  });

  const deletePostItem = async (postId: string) => {
    await deletePostMutation.mutateAsync(postId);
  };

  const updatePostItem = async (postId: string, postInfo: PostInfo) => {
    await updatePostInfoMutation.mutateAsync({ postId, postInfo });
  };

  const addNewPostItem = async (formValues: PostInfo) => {
    await addNewPostMutation.mutateAsync(formValues);
  };

  return {
    isFetching,
    posts,
    fetchPosts,
    updatePostItem,
    addNewPostItem,
    deletePostItem,
    getInfoPostDetail,
  };
};

export default usePostService;
