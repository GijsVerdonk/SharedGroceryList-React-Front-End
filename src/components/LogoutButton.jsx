import { useAuth0 } from "@auth0/auth0-react";
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();
  if (isAuthenticated) {
    return (
      <>
          <Button variant="outlined" startIcon={<LogoutIcon />} onClick={() => {
              logout({ returnTo: window.location.origin });
              sessionStorage.clear();
          }}>
              Log Uit
          </Button>
        <br />
      </>

    );
  }
};

export default LogoutButton;