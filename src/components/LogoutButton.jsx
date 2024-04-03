import { useAuth0 } from "@auth0/auth0-react";
import Button from '@mui/material/Button';
const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();
  if (isAuthenticated) {
    return (
      <>
        <Button
          className="btn btn-primary logoutBtn"
          onClick={() => {
              logout({ returnTo: window.location.origin });
              sessionStorage.clear();
          }}
        >
          Log Out
        </Button>
        <br />
      </>

    );
  }
};

export default LogoutButton;