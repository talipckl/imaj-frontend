import React, { useState, useEffect } from "react";
import axios from "axios";

const HesapEkstresi = () => {
  // CARİ GETİR
  const [cari, setCari] = useState([]);
  const [cari_id, setCariId] = useState({
    cariId: "",
  });
  const [hesap, setHesap] = useState([]);

  const getirCari = (e) => {
    e.preventDefault();
    setCariId({
      cariId: e.target.value,
    });
  };

  const getirHesap = (e) => {
    e.preventDefault();
    axios
      .get(`https://imaj-backend.herokuapp.com/api/v1/mahsup/cari/${cari_id.cariId}`)
      .then((response) => {
        setHesap(response.data);
      })
      .then(() => {
        console.log(hesap);
        console.log("başarılı");
      })
      .catch((error) => {
        console.log("gelmedi");
      });
  };
  useEffect(() => {
    axios
      .get(`https://imaj-backend.herokuapp.com/api/v1/cari`)
      .then((response) => {
        setCari(response.data);
      })
      .catch((error) => {
        console.log("gelmedi");
      });
  }, []);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-1">
          <label className="form-label">Cari Seç</label>
        </div>
        <div className="col">
          <div>
            <select className="form-control" onChange={getirCari} name="cariId">
              {cari.map((cari) => {
                return (
                  <option key={cari.id} value={cari.id}>
                    {cari.adi}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="col">
          <button
            className="btn btn-primary"
            onClick={getirHesap}
            type="button"
          >
            getir
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-1">
          <label className="form-label">Hesap Ekstresi</label>
        </div>
        <div className="col">
          <table className="table table-bordered">
            <thead>
              <tr>
                
                <th scope="col">Cari Adı</th>
                <th scope="col">Alacak-Bakiye</th>
                <th scope="col">Borç-Bakiye</th>
              </tr>
            </thead>
            <tbody>
              {
              hesap.map((hesap) => {
                return (
                  <tr>
                  
                    <td>{hesap.cariadi}</td>
                    <td>{hesap.borc_bakiye}</td>
                    <td>{hesap.alacak_bakiye}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HesapEkstresi;
