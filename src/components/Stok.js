import React, { useEffect, useState } from "react";
import axios from "axios";

const Stok = () => {
  const [stok, setStok] = useState([]);

  useEffect(() => {
    axios
      .get("https://imaj-backend.herokuapp.com/api/v1/stok")
      .then((res) => {
        setStok(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
        {
            stok.map(stok => (
                <h2>{stok.miktar}</h2>
            ))
        }

    </div>
  )
};

export default Stok;

