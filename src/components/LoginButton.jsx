import { useAuth0 } from "@auth0/auth0-react";
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
 
const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    if (!isAuthenticated) {
        return (
            <div className="center-button">
                <Button sx={{m: 3}} variant="outlined" startIcon={<LoginIcon />} onClick={() => loginWithRedirect()}>
                    Log In
                </Button>
            </div>
        );
    }
};
 
export default LoginButton;