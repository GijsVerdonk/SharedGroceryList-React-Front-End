import React, {useState, useEffect} from 'react';

const GroceryList = () => {
    const [listNames, setListNames] = useState([]);
    const accessToken = sessionStorage.getItem('access_token');

    useEffect(() => {
        const getUserListNames = async () => {
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

        getUserListNames();
    }, []);

    return (
        <div>
            <h2>Alle boodschappenlijsten</h2>
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

export default GroceryList;
