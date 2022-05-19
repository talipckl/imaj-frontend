import React, { useState, useEffect } from "react";
import axios from "axios";
const Tahsilat = () => {
  const [cariData, setCariData] = useState([]);

  const [id, setID] = useState({ cariId: "" });
  const [tutar, setTutar] = useState("");
  const [tarih, setTarih] = useState("");
  const [fis, setFis] = useState("");


  const kayıtEt = (e) => {
    e.preventDefault();
    if (tutar === "" || tarih === "" || fis === "FIS_TURU") {
      alert("Lütfen tüm alanları doldurunuz.");
    } else {
      if (fis === "ODEME_YAP") {
        axios
          .post("http://localhost:5000/api/v1/mahsup", {
            cari_id: id.cariId,
            borc: tutar,
            alacak: 0,
            tarih,
          })
          .then((res) => {
            console.log(res);
            console.log("Ödeme Kaydedildi");
            alert("Ödeme Kaydedildi");
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (fis === "ODEME_AL") {
        axios
          .post("http://localhost:5000/api/v1/mahsup", {
            cari_id: id.cariId,
            borc: 0,
            alacak: tutar,
            tarih,
          })
          .then((res) => {
            console.log(res);
            console.log("Ödeme Kaydedildi");
            alert("Ödeme Kaydedildi");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };
  console.log(id.cariId);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/cari`)
      .then((response) => {
        setCariData(response.data);
      })
      .catch((error) => {
        console.log("gelmedi");
      });
  }, []);

  const [cari, setCari] = useState([]);

  const getirCari = (e) => {
    e.preventDefault();
    setID({
      cariId: e.target.value,
    });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/carim/${id.cariId}`)
      .then((response) => {
        setCari(response.data);
      })
      .catch((error) => {
        console.log("gelmedi");
      });
  }, [id.cariId]);

  


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3">
          <h5>Cari Seçiniz</h5>
          <select onChange={getirCari} name="cariId" className="form-control">
            {cariData.map((cari) => {
              return (
                <option key={cari.id} value={cari.id}>
                  {cari.adi}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <hr></hr>
      {cari.map((index) => {
        return (
          <div className="row">
            <div className="col">
              <h5>Cari Kodu:</h5>
              <h5>{index.id}</h5>
            </div>
            <div className="col">
              <h5>Adı:</h5>
              <h5>{index.adi}</h5>
            </div>
            <div className="col">
              <h5>Telefon:</h5>
            </div>
            <div className="col">
              <h5>????</h5>
            </div>
          </div>
        );
      })}
      <hr></hr>
      <div className="row">
        <div className="col">
          <select
            class="form-select"
            onChange={(e) => {
              setFis(e.target.value);
            }}
          >
            <option value="FIS_TURU" selected>Fiş Türü</option>
            <option value="ODEME_YAP">ÖDEME YAP</option>
            <option value="ODEME_AL">ÖDEME AL</option>
          </select>
        </div>
        <div className="col-2">
          <input
            onChange={(e) => setTutar(e.target.value)}
            name="tutar"
            className="col-form-label"
            placeholder="Tutar"
          ></input>
        </div>
        <div className="col">
          <input
            onChange={(e) => setTarih(e.target.value)}
            type="date"
            class="form-control"
            name="tarih"
          />
        </div>
        <div className="col">
          <button onClick={kayıtEt} className="btn btn-outline-primary">
            Tahsilat Yap
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tahsilat;


