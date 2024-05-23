import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import SignIn from "../../components/Organisms/SignIn";
import { useAuth0 } from "@auth0/auth0-react";

const SignInPage = () => {
  const [open, setOpen] = useState(false);
  const { loginWithRedirect } = useAuth0();

  const handleSignIn = async (login) => {
    try {
      setOpen(true);
    } catch (error) {
      alert("INVALID_CREDENTIAL");
    }
  };

  const handleAuthLogin = () => {
    loginWithRedirect();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <SignIn
        handleSignIn={handleSignIn}
        handleSignInWithGoogle={handleAuthLogin}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Login with Google Auth0</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please log in using Google Auth0 for authorization purposes.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SignInPage;
