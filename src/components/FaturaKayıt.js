import React, { useState, useEffect } from "react";
import "../css/fatura.css";
import axios from "axios";
import { Link } from "react-router-dom";
const FaturaKayıt = () => {
  const [visible, setVisible] = useState(false);

  // veri tabanına fatura kayıt işlemi
  const [tur, setTur] = useState("");
  const [cari_id, setCari_id] = useState("");
  const [miktar, setMiktar] = useState("");
  const [fiyat, setFiyat] = useState("");
  const [tutar, setTutar] = useState("");
  const [tarih, setTarih] = useState("");
  const[ara,setAra]=useState("");

  console.log(ara);
  const kayitEkle = (e) => {
    e.preventDefault();
    if (
      tur === "" ||
      cari_id === "" ||
      miktar === "" ||
      fiyat === "" ||
      tutar === "" ||
      tarih === ""
    ) {
      alert("Lütfen tüm alanları doldurunuz.");
    } else {
      axios
        .post("https://imaj-backend.herokuapp.com/api/v1/fatura", {
          tur,
          cari_id,
          miktar,
          fiyat,
          tutar,
          tarih,
        })
        .then((res) => {
          if (tur === "ALIŞ") {
            axios
              .post("https://imaj-backend.herokuapp.com/api/v1/mahsup", {
                cari_id,
                borc: 0,
                alacak: tutar,
                tarih,
              })
              .then((res) => {
                console.log(res);
                console.log("Alış Kaydedildi");
              })
              .catch((err) => {
                console.log(err);
              });
          } else if (tur === "SATIŞ") {
            axios
              .post("https://imaj-backend.herokuapp.com/api/v1/mahsup", {
                cari_id,
                borc: tutar,
                alacak: 0,
                tarih,
              })
              .then((res) => {
                console.log(res);
                console.log("Satış mahsup Kaydedildi");
              })
              .catch((err) => {
                console.log(err);
              });
          }
          console.log(res.data);
          alert("Fatura Kayıt Edildi");
        })
        .catch((err) => {
          console.log(err);
          console.log("Fatura Kayıt Edilemedi");
        });
    }
  };


  const [APIData, setAPIData] = useState([]);
  useEffect(() => {
    axios
      .get(`https://imaj-backend.herokuapp.com/api/v1/cari`)
      .then((response) => {
        setAPIData(response.data);
      })
      .catch((error) => {
        console.log("gelmedi");
      });
  }, []);

  // fatura listesi
  const [faturaData, setFaturaData] = useState([]);

  useEffect(() => {
    axios
      .get(`https://imaj-backend.herokuapp.com/api/v1/fatura_liste`)
      .then((response) => {
        setFaturaData(response.data);
      })
      .catch((error) => {
        console.log("gelmedi");
      });
  }, []);

  const faturaSil = async (id) => {
    if (window.confirm("Fatura Kayıdını Silmek İstediğinizden Eminmisniz ? ")) {
      const response = await axios.delete(
        `https://imaj-backend.herokuapp.com/api/v1/fatura/${id}`
      );
      if (response.status === 200) {
        alert("silme işlemi başarılı");
        window.location.reload();
      }
    }
  };

  const hesapla=()=>{
    setTutar(miktar*fiyat);
    console.log(tutar);
  }
  console.log(tutar);

  return (
    <div className="container-fluid">
      <div className="col">
        <button
          id="bbtn"
          className="btn btn-outline-info"
          onClick={() => setVisible(!visible)}
        >
          {visible ? "Kapat" : "Fatura-Kayıt"}
        </button>
      </div>

      <div className={visible ? "row align-items-start" : "d-none"}>
        <div className="col">
          <label className="form-label">İşlem Türü</label>
          <select
            onChange={(e) => setTur(e.target.value)}
            className="form-select"
            name="tur"
          >
            <option value="1">işlem</option>
            <option value="ALIŞ">ALIŞ</option>
            <option value="SATIŞ">SATIŞ</option>
          </select>
        </div>
        <div className="col">
          <label className="form-label">Cari</label>
          <select
            onChange={(e) => setCari_id(e.target.value)}
            className="form-select"
            name="cari_id"
          >
            {APIData.map((cari) => {
              return (
                
                <option key={cari.id} value={cari.id} >
                  {cari.adi}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col">
          <label className="form-label">Miktar</label>
          <input
            onChange={(e) => setMiktar(e.target.value)}
            type="text"
            pattern={"/d"}
            className="form-control"
            name="miktar"
            required
          />
        </div>
        <div className="col">
          <label className="form-label">Fiyat</label>
          <input
             onChange={(e) => setFiyat(e.target.value)}
            className="form-control"
            name="fiyat"
          />
        </div>
        <div className="col">
          <label className="form-label">Tutar</label>
          <input
            // onChange={(e) => setTutar(e.target.value)}
            onClick={hesapla}
            type="text"
            className="form-control"
            name="tutar"
            value={tutar}
          />
        </div>
        <div className="col">
          <label className="form-label">Tarih</label>
          <input
            onChange={(e) => setTarih(e.target.value)}
            type="date"
            className="form-control"
            name="tarih"
          />
        </div>
        <div className="col">
          <label className="form-label"></label>
          <button
            id="bbtn"
            onClick={kayitEkle}
            type="button"
            className="btn btn-outline-success"
          >
            Kaydet
          </button>
        </div>
      </div>
      <hr></hr>
      
      <div className="row">
        <div className="col">
          <input
            onChange={(e) => setAra(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Fatura Ara"
          ></input>
          </div>
          </div>
      <div className="col" style={{"height":"400px","overflowY":"scroll"}}>
        <table className="table table-light table-striped">
          <thead>
            <tr>
              <th scope="col">Fatura no</th>
              <th scope="col">Tür</th>
              <th scope="col">Cari</th>
              <th scope="col">Miktar</th>
              <th scope="col">Fiyat</th>
              <th scope="col">Tutar</th>
              <th scope="col">Tarih</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {/* {faturaData.map((kayit) => {
               */}
               { faturaData.filter(kayit => 
                kayit.adi.toLowerCase().includes(ara.toLowerCase())
              ).map((kayit) => {
              return (
                <tr>
                  <td>{kayit.id}</td>
                  <td>{kayit.tur}</td>
                  <td>{kayit.adi}</td>
                  <td>{kayit.miktar}</td>
                  <td>{kayit.fiyat}</td>
                  <td>{kayit.tutar}</td>
                  <td>{kayit.tarih}</td>
                  <td><button className="btn btn-outline-danger"onClick={() => faturaSil(kayit.id)}>sil</button> |  <Link to={`/fatura/${kayit.id}`}><button className="btn btn-outline-info" >düzenle</button></Link>
                 
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

export default FaturaKayıt;
