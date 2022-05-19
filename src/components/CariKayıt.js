import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/tablo.css";
import {useParams,Link} from 'react-router-dom'
const CariKayit = (props) => {

  const [carikayit, setcariKayit] = useState({
    cariAdi: "",
  });
  const [cariList, setcariList] = useState([]);

  const firmaEkle = (e) => {
    e.preventDefault();
    if (carikayit.cariAdi === "") {
      alert("Lütfen Firma Adını Giriniz");
    } else {
      axios
        .post("https://imaj-backend.herokuapp.com/api/v1/cari", {
          adi: carikayit,
        })
        .then((res) => {
          console.log(res);
          console.log(res.data);
          alert("Kayıt Başarılı");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    axios
      .get("https://imaj-backend.herokuapp.com/api/v1/cari")
      .then((res) => {
        console.log(res);
        setcariList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const cariSil = async (id) =>   {
      if(window.confirm("Silmek istediğinize eminmisniz")){
        const response = await axios.delete(`https://imaj-backend.herokuapp.com/api/v1/cari/${id}`);
        if(response.status===200){
          alert("silme işlemi başarılı")
        }
      }
  }
  
  
  
  return (
    <div className="container-fluid">
      <div class="row">
        <div class="col-1">
          <label class="form-label">Cari Kayıt</label>
        </div>
        <div className="col-4">
          <input
            onChange={(e) => setcariKayit(e.target.value)}
            type="text"
            class="form-control"
            name="adi"
          />
        </div>
        <div className="col">
          <button onClick={firmaEkle} type="submit" class="btn btn-primary">
            Kaydet
          </button>
        </div>
      </div>
      <div className="scrollable">
        <div className="row">
          <div className="col">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">cari kodu</th>
                  <th scope="col">Adı</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {cariList.map((cari) => {
                  return (
                    <tr key={cari.id}>
                      <td value="id">{cari.id}</td>
                      <td>{cari.adi}</td>
                      <td>
                       <button className="btn btn-outline-danger" onClick={()=>cariSil(cari.id)}>sil</button>  <Link to={`/cari/${cari.id}`}><button className="btn btn-outline-info" >düzenle</button></Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CariKayit;
