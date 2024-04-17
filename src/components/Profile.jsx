import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Cookies from 'js-cookie';

const Profile = () => {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [userMetadata, setUserMetadata] = useState(null);
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        const getUserMetadata = async () => {
            const domain = import.meta.env.VITE_REACT_APP_DOMAIN;

            try {
                const accessToken = await getAccessTokenSilently({
                    authorizationParams: {
                        audience: `https://${domain}/api/v2/`,
                        scope: "read:current_user update:current_user_metadata",
                    },
                });

                setAccessToken(accessToken);

                document.cookie = `accessToken=${accessToken}; Secure; SameSite=None;`; //If HttpOnly is added, doesn't work.

                const response = await fetch('https://localhost:7001/api/User/GetAuth0Id');

                const metadataResponse = await fetch(userDetailsByIdUrl, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                const { user_metadata } = await metadataResponse.json();

                setUserMetadata(user_metadata);
                console.log("SUCCES.")
            } catch (e) {
                console.log("ERROR COMING.")
                console.log(e.message);
            }
        };

        getUserMetadata();
    }, [getAccessTokenSilently, user?.sub,]);

    handleLogin();
    function handleLogin() {
                axios.get('http://localhost:5226/api/User', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                })
            .then()
            .catch(err=> {
                console.log(err)
                if (err.response.status == 404) {
                    console.log("First time login, user will be created.")
                    axios.post('http://localhost:5226/api/User', { user }, {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`
                        }
                    })
                        .then(response => console.log(response))
                        .catch(err=> console.log(err))
                }
                });

    }

    return (
        isAuthenticated && (

            <div>
                {/*<img src={user.picture} alt={user.name} />*/}
                {/*<h2>{user.name}</h2>*/}
                {/*<p>{user.email}</p>*/}
                {/*<p>{user.sub}</p>*/}
                {/*<h3>User Metadata</h3>*/}
                {/*{userMetadata ? (*/}
                {/*    <pre>{JSON.stringify(userMetadata, null, 2)}</pre>*/}
                {/*) : (*/}
                {/*    "No user metadata defined"*/}
                {/*)}*/}
                {/*<p>Access token</p>*/}
                {/*<p>{accessToken}</p>*/}

            </div>
        )
    );
};

export default Profile;