import { useAuth0 } from "@auth0/auth0-react";
import Button from '@mui/material/Button';

 
const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    if (!isAuthenticated) {
        return (
            <div className="center-button">
            <Button className="btn btn-primary loginBtn"
            onClick={() => loginWithRedirect()}>
            Log In</Button>
            </div>
        );
    }
};
 
export default LoginButton;