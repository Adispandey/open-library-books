import React from "react";
import { Stack, Typography } from "@mui/material";
import BookTable from "../../components/Organisms/DataTable";
import { useAuth0 } from "@auth0/auth0-react";

export const HomePage = () => {
  const { logout } = useAuth0();
  return (
    <Stack sx={{ backgroundColor: "#DEDEDE" }}>
      <Typography
        variant="h4"
        sx={{
          display: "flex",
          justifyContent: "center",
          color: "#46453E",
          margin: 1,
        }}
      >
        Admin Dashboard
      </Typography>
      <BookTable onLogout={() => logout({ logoutParams: { returnTo: window.location.origin } })} />
    </Stack>
  );
};
