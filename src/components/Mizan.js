import React, { useEffect, useState } from "react";
import axios from "axios";
const Mizan = () => {
  const [mizan, setMizan] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/mizan`)
      .then((response) => {
        setMizan(response.data);
      })
      .catch((error) => {
        console.log("gelmedi");
      });
  }, []);

 

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col" style={{"height":"400px","overflowY":"scroll"}}>
          <table className="table table-bordered" >
            <thead>
              <tr>
                <th scope="col-4">Cari Adı</th>
                <th scope="col-4">Alacak-Bakiye</th>
                <th scope="col-4">Borç-Bakiye</th>
              </tr>
            </thead>
            <tbody>
              {mizan.map((mizan) => {
                return (
                  <tr>
                    <td>{mizan.cariadi}</td>
                    <td>{mizan.borc_bakiye}</td>
                    <td>{mizan.alacak_bakiye}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Mizan;
