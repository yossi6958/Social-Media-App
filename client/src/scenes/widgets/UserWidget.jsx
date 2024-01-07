/* eslint-disable react/prop-types */
import {
  ManageAccountsOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  CalendarTodayOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "src/components/UserImage";
import FlexBetween from "src/components/FlexBetween";
import WidgetWrapper from "src/components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiGetWithToken } from "src/utils/apiRequests";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const loggedInUserId = useSelector((state) => state.user._id);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const fullDate = new Date(user?.createdAt);
  const months = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };
  const date = `${months[fullDate.getMonth() + 1]} ${fullDate.getFullYear()}`;

  const getUser = async () => {
    const data = await apiGetWithToken(`users/${userId}`, token);
    setUser(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getUser();
    };
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  const { firstName, lastName, location, occupation, friends } = user;

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween gap="0.5rem" pb="1.1rem">
        <FlexBetween gap="1rem" onClick={() => navigate(`/profile/${userId}`)}>
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.dark,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} friends</Typography>
          </Box>
        </FlexBetween>

        {userId == loggedInUserId && (
          <Typography
            onClick={() => {
              console.log("need to add this page");
            }}
            color={medium}
            sx={{ "&:hover": { cursor: "pointer", color: main } }}
          >
            <ManageAccountsOutlined />
          </Typography>
        )}
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem" mt="0.5rem">
          <CalendarTodayOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>Joined: {date}</Typography>
        </Box>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
