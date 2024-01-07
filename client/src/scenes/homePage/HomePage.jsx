import { Box, useMediaQuery } from '@mui/material'
import { useSelector } from "react-redux";
import NavBar from 'src/scenes/navBar/NavBar'
import UserWidget from 'src/scenes/widgets/UserWidget';
import MyPostWidget from 'src/scenes/widgets/MyPostWidget';
import FeedWidget from 'src/scenes/widgets/FeedWidget';
import FriendListWidget from 'src/scenes/widgets/FriendListWidget';


const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);


  return (
    <Box>
      <NavBar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>

          <UserWidget userId={_id} picturePath={picturePath} />

        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />

          <FeedWidget />

        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">

            <FriendListWidget userId={_id} />

          </Box>
        )}
      </Box>
    </Box>
  );
}

export default HomePage;
