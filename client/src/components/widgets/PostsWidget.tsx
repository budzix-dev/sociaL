import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

interface Props {
  userId: string;
  isProfile?: boolean;
}

const PostsWidget: React.FC<Props> = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state: any) => state.posts);
  const token = useSelector((state: any) => state.token);

  const getPosts = async () => {
    const response = await fetch("http://localhost:5000/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts(data));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:5000/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts(data));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {typeof posts?.map === "function" &&
        posts.map(
          ({
            _id,
            creatorId,
            creatorDisplayName: displayName,
            description,
            location,
            picturePath,
            creatorPicturePath: userPicturePath,
            likedBy: likes,
            comments,
          }: any) => (
            <PostWidget
              key={_id}
              postId={_id}
              postUserId={creatorId}
              name={displayName}
              description={description}
              location={location}
              picturePath={picturePath}
              userPicturePath={userPicturePath}
              likes={likes}
              comments={comments}
            />
          )
        )}
    </>
  );
};

export default PostsWidget;
