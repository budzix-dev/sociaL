import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import LoginRegisterForm from "components/LoginRegisterForm";

const Login = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        width="100%"
        bgcolor={theme.palette.background.paper}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          sociaL
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        bgcolor={theme.palette.background.paper}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to sociaL, the Social Media for the social type!
        </Typography>
        <LoginRegisterForm />
      </Box>
    </Box>
  );
};

export default Login;
