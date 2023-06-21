import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "./WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";

interface Props {
  userId: string;
}

const FriendListWidget: React.FC<Props> = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state: any) => state.token);
  const friends = useSelector((state: any) => state.user.friends);

  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:5000/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFriends(data));
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography
        color={palette.secondary.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {typeof friends.map === "function" &&
          friends.map((friend: any) => (
            <Friend
              key={friend._id}
              friendId={friend._id}
              name={friend.displayName}
              subtitle={friend.occupation}
              userPicturePath={friend.picturePath}
              isFriendList
            />
          ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
