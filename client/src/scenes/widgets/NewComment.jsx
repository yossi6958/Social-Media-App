import {
    EditOutlined,
    DeleteOutlined,
} from "@mui/icons-material";
import {
    Box,
    Divider,
    Typography,
    InputBase,
    useTheme,
    Button,
    IconButton,
    useMediaQuery,
} from "@mui/material";
import FlexBetween from "src/components/FlexBetween";
import UserImage from "src/components/UserImage";
import WidgetWrapper from "src/components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "src/state/index";


const NewComment = ({ postId }) => {
    const dispatch = useDispatch();
    const [body, setBody] = useState("");
    const { palette } = useTheme();
    const token = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;


    const patchComment = async () => {
        const baseUrl = import.meta.env.VITE_URL;
        const response = await fetch(`${baseUrl}/posts/comments/${postId}`, {
            method: "POST",
            body: JSON.stringify({ body }),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        const updatedPost = await response.json();
        // const updatedPost = await apiPatchWithToken(`posts/comments/${postId}`, token, { body });

        dispatch(setPost({ post: updatedPost }));
        setBody("");
    };

    return (
        <WidgetWrapper padding="1rem 0rem 1rem 0.5rem">
            <FlexBetween gap="1.5rem">
                <UserImage image={user.picturePath} size="40px" />
                <InputBase
                    placeholder="Leave a comment..."
                    onChange={(e) => setBody(e.target.value)}
                    value={body}
                    sx={{
                        fontSize: "12px",
                        width: "100%",
                        height: "40px",
                        backgroundColor: palette.neutral.light,
                        borderRadius: "2rem",
                        padding: "1rem 2rem",
                    }}
                />
                <Button
                    disabled={!body}
                    onClick={patchComment}
                    sx={{
                        color: palette.background.alt,
                        backgroundColor: palette.primary.main,
                        borderRadius: "3rem",
                        "&:hover": {
                            backgroundColor: palette.primary.dark,
                        }
                        
                    }}
                    >
                    POST
                </Button>
            </FlexBetween>
        </WidgetWrapper>
    );
};

export default NewComment;
