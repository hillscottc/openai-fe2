import { Box, Link, Typography } from "@mui/material";

const Footer: React.FunctionComponent = () => {
  return (
    <Box sx={{ width: "100%", position: "fixed", bottom: 0 }}>
      <Typography
        variant="body2"
        align="center"
        sx={{ color: "text.secondary" }}
      >
        A demo project by&nbsp; Scott C Hill, source code available&nbsp;
        <Link color="inherit" href="https://github.com/hillscottc/openai-fe2">
          on GitHub
        </Link>
        ,{" Copyright © "}
        {new Date().getFullYear()}
      </Typography>
    </Box>
  );
};
export default Footer;
