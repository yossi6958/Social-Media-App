/* eslint-disable react/prop-types */
import { FavoriteBorderOutlined, FavoriteOutlined } from "@mui/icons-material";
import { Box, Typography, useTheme, IconButton } from "@mui/material";
import FlexBetween from "src/components/FlexBetween";
import UserImage from "src/components/UserImage";
import WidgetWrapper from "src/components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "src/state";
import { formatTimePassed } from "src/utils/utils";
import { useNavigate } from "react-router-dom";

const Comment = ({
  postUserId,
  commentId,
  commentBody,
  likes,
  userName,
  userPicturePath,
  createdAt,
}) => {
  const { palette } = useTheme();
  const primary = palette.primary.main;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  let commentDate = formatTimePassed(createdAt);
  if (commentDate.includes("about"))
    commentDate = commentDate.replace("about", "");

  const patchLike = async () => {
    const baseUrl = import.meta.env.VITE_URL;
    const response = await fetch(
      `${baseUrl}/posts/comments/${commentId}/like`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    <WidgetWrapper padding="1.5rem 0rem 0.75rem 0.5rem">
      <FlexBetween sx={{ alignItems: "flex-start" }}>
        <FlexBetween gap="1.5rem" sx={{ alignItems: "flex-start" }}>
          <UserImage
            image={userPicturePath}
            size="40px"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate(`/profile/${postUserId}`)}
          />

          <Box>
            <FlexBetween gap="0.7rem" sx={{ justifyContent: "left" }}>
              <Typography
                onClick={() => navigate(`/profile/${postUserId}`)}
                variant="h5"
                fontSize="0.8rem"
                fontWeight="500"
                sx={{
                  "&:hover": {
                    color: palette.primary.dark,
                    cursor: "pointer",
                  },
                }}
              >
                {userName}
              </Typography>
              <Typography
                color={medium}
                variant="h5"
                fontSize="0.8rem"
                fontWeight="100"
              >
                {commentDate}
              </Typography>
            </FlexBetween>

            <Typography color={main} pt="5px">
              {commentBody}
            </Typography>
          </Box>
        </FlexBetween>

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
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default Comment;
