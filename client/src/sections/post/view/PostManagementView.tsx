import React from "react";
import PostList from "../PostList";

const PostManagementView: React.FC = React.memo(() => {
  return (
    <>
      <div className="rounded-t-xl bg-[#e8e8e8] p-5">
        <p className="text-2xl font-bold text-[#000000]">Quản lý bài viết</p>
      </div>
      <div className="p-5">
        <PostList />
      </div>
    </>
  );
});

export default PostManagementView;
