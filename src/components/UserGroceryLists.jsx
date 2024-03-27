import React, {useState, useEffect} from 'react';

const UserGroceryLists = () => {
    const [listNames, setListNames] = useState([]);



    // useEffect(() => {
        const getUserListNames = async () => {
            var accessToken = sessionStorage.getItem('access_token');
            console.log(`Bearer ${accessToken}`)
            const response = await fetch('http://localhost:5226/api/User/Lists', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setListNames(data);
                console.log(data);
            } else {
                console.log("Error.")
            }
        };

    useEffect(() => {
        getUserListNames();
    }, []);


    return (
        <div>
            <h2>Alle boodschappenlijsten</h2>
            <button onClick={getUserListNames}>Verversen</button>
            <ul>
                <table>
                    <tr>
                        <th>Naam</th>
                    </tr>

                    {listNames.map(listName => (
                        <tr>
                            <td key={listName}>{listName}</td>
                        </tr>
                    ))}

                </table>
            </ul>
        </div>
    );
};

export default UserGroceryLists;
