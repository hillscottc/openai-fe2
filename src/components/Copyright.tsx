import { Link, Typography } from "@mui/material";

const Copyright: React.FunctionComponent = () => {
  return (
    <Typography variant="body2" align="center" sx={{ color: "text.secondary" }}>
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Scott Hill
      </Link>
      &nbsp;
      {new Date().getFullYear()}.
    </Typography>
  );
};
export default Copyright;
