/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "src/state/index";
import PostWidget from "./PostWidget";
import { apiGetWithToken } from "src/utils/apiRequests";

const FeedWidget = ({ userId, isProfile }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const endpoint = isProfile ? `posts/${userId}` : "posts";
    const allPosts = await apiGetWithToken(endpoint, token);
    dispatch(setPosts({ posts: allPosts }));
  };

  useEffect(() => {
    const fetchData = async () => {
      await getPosts();
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {posts &&
        posts.map((post) => {
          const currUser = post.user;
          return (
            <PostWidget
              key={post._id}
              postId={post._id}
              postUserId={currUser._id}
              name={`${currUser.firstName} ${currUser.lastName}`}
              description={post.description}
              location={currUser.location}
              picturePath={post.picturePath}
              userPicturePath={currUser.picturePath}
              likes={post.likes}
              comments={post.comments}
            />
          );
        })}
    </>
  );
};

export default FeedWidget;
