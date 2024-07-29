import { PostPublicView } from "@/sections/post-public/view";
import { Helmet } from "react-helmet";

const PostPublicPage = () => {
  return (
    <>
      <Helmet>
        <title> FMilk | Bài viết </title>
      </Helmet>
      <PostPublicView />
    </>
  );
};

export default PostPublicPage;
