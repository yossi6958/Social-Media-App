/* eslint-disable react/prop-types */
import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px", onClick }) => {
  return (
    <Box width={size} height={size} onClick={onClick}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={image}
      />
    </Box>
  );
};

export default UserImage;
