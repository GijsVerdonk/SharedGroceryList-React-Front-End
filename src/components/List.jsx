import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

const List = () => {
  const { id } = useParams();
  const [list, setList ] = useState(null);

  useEffect(() => {
    const getList = async () => {
      const response = await fetch(`https://localhost:7001/api/List/${id}`);
      if (response.ok) {
        const data = await response.json();
        setList(data);
        console.log(data);
      } else {
        console.log("Error.")
      }
    };

    getList();
  }, []);

  if (list) {
    return (
        <div><h2>{list.name}</h2></div>
    );
  }

  return (
      <div>
        <h1>Lijst niet gevonden.</h1>
      </div>
  );
};

export default List;