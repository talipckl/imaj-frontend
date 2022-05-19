import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Muhasebe = () => {
  // CARİ GETİR
  const [cari, setCari] = useState([]);
  const [cari_id, setCariId] = useState({
    cariId: "",
  });
  const [mahsup, setMahsup] = useState([]);

  const getirCari = (e) => {
    e.preventDefault();
    setCariId({
      cariId: e.target.value,
    });
  };
  const getirMahsup = (e) => {
    e.preventDefault();
    axios
      .get(`http://localhost:5000/api/v1/mahsup/${cari_id.cariId}`)
      .then((response) => {
        setMahsup(response.data);
      })
      .then(() => {
        console.log(mahsup);
        console.log("başarılı");
      })
      .catch((error) => {
        console.log("gelmedi");
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/cari`)
      .then((response) => {
        setCari(response.data);
      })
      .catch((error) => {
        console.log("gelmedi");
      });
  }, []);

  console.log(mahsup);
  //   console.log(cari_id.cariId);

  const TahsilatSil = async (id) => {
    if (window.confirm("Tahsilatı Silmek istediğinize eminmisniz")) {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/mahsup/${id}`
      );
      if (response.status === 200) {
        alert("silme işlemi başarılı");
      }
    }
  };

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
            onClick={getirMahsup}
            type="button"
          >
            getir
          </button>
        </div>
      </div>
      <br></br>
      <div className="col">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Tahsilat no</th>
              <th scope="col">Cari Adı</th>
              <th scope="col">Borç</th>
              <th scope="col">Alacak</th>
              <th scope="col">Tarih</th>
              <th scope="col">Alacak-Bakiye</th>
              <th scope="col">Borç-Bakiye</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {mahsup.map((mahsup) => {
              return (
                <tr key={mahsup.id}>
                  <th scope="row">{mahsup.id}</th>
                  <td>{mahsup.cariadi}</td>
                  <td>{mahsup.borc}</td>
                  <td>{mahsup.alacak}</td>
                  <td>{mahsup.tarih}</td>
                  <td>{mahsup.borc_bakiye}</td>
                  <td>{mahsup.alacak_bakiye}</td>
                  <td>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => TahsilatSil(mahsup.id)}
                    >
                      Sil
                    </button>{" "}
                    {/* |{" "}
                    <Link to={`/mahsup/${mahsup.id}`}>
                      <button className="btn btn-outline-info">Düzenle</button>
                    </Link> */}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Muhasebe;
