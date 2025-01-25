import { Box, Link, Typography } from "@mui/material";

const Footer: React.FunctionComponent = () => {
  return (
    <Box sx={{ width: "100%", position: "fixed", bottom: 0 }}>
      <Typography
        variant="body2"
        align="center"
        sx={{ color: "text.secondary" }}
      >
        {"Copyright © "}
        <Link color="inherit" href="https://github.com/hillscottc">
          Scott Hill
        </Link>
        &nbsp;
        {new Date().getFullYear()}.
      </Typography>
    </Box>
  );
};
export default Footer;
