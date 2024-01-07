/* eslint-disable react/prop-types */
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "src/components/FlexBetween";
import Friend from "src/components/Friend";
import WidgetWrapper from "src/components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "src/state/index";
import NewComment from "./NewComment";
import Comment from "src/components/Comment";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from "../../../node_modules/react-toastify";
import "../../../node_modules/react-toastify/dist/ReactToastify.css";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const mode = useSelector((state) => state.mode);
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const baseUrl = import.meta.env.VITE_URL;
    const response = await fetch(`${baseUrl}/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />

      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>

      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={picturePath}
        />
      )}

      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          {/* Like button */}
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          {/* Comment button */}
          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <CopyToClipboard
            text={`${window.location.href}`}
            onCopy={() => toast("Coppied to clipboard")}
          >
            <ShareOutlined />
          </CopyToClipboard>
        </IconButton>
      </FlexBetween>

      {isComments && (
        <Box mt="0.5rem">
          <Divider />
          <NewComment postId={postId} />
          <Divider />
          {comments.map((comment) => (
            <Comment
              key={comment._id}
              postUserId={postUserId}
              commentId={comment._id}
              commentBody={comment.body}
              likes={comment.likes}
              userName={`${comment.user.firstName} ${comment.user.lastName}`}
              userPicturePath={comment.user.picturePath}
              createdAt={comment.createdAt}
            />
          ))}
        </Box>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme={mode}
      />
    </WidgetWrapper>
  );
};

export default PostWidget;
