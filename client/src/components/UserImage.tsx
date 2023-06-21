import { Box } from "@mui/material";

interface Props {
  image: string;
  size?: string;
}

const UserImage: React.FC<Props> = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`http://localhost:5000/assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;
