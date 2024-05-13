import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ListItemDataGrid from "./ListItemDataGrid.jsx";
import AddListItemForm from "./AddListItemForm.jsx";
import Typography from "@mui/material/Typography";
import DeleteListButton from "./DeleteListButton.jsx";

const List = () => {
  const { id } = useParams();
  const [item, setItem ] = useState(null);

  useEffect(() => {
    const getItem = async () => {
      const response = await fetch(`https://localhost:7001/api/Item/${id}`);
      if (response.ok) {
        const data = await response.json();
        setItem(data);
        console.log(data);
      } else {
        console.log("Error.")
      }
    };

    getItem();
  }, []);

  if (item) {
    return (
        <div>

            <h1>{item.name}</h1>
            <h1>{item.quantity}</h1>

        </div>
    );
  }

    return (
        <div>
        <h1>Item niet gevonden.</h1>
      </div>
  );
};

export default List;