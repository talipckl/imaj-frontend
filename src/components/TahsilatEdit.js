import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const initialState = {
  cari_id:"",
  tarih: "",
  borc: 0,
  alacak: 0,
};

const TahsilatEdit = () => {
  const [state, setState] = useState(initialState);

  const { cari_id, tarih,borc,alacak } = state;
  const [tutar, setTutar] = useState(0);

  const { id } = useParams();

    const [APIData, setAPIData] = useState([]);

    useEffect(() => {
        axios
          .get(`http://localhost:5000/api/v1/cari`)
          .then((res) => {
            console.log(res);
            setAPIData(res.data);
          })
          .catch((err) => {
            console.log(err);
            console.log("gelmedi");
          });
      }, []);
    
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/muhasebe/${id}`)
      .then((res) => {
        console.log(res);
        setState({ ...res.data[0]});
      })
      .catch((err) => {
        console.log(err);
        console.log("gelmedi");
      });
  }, [id]);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };
  
  const update = async () => {
    if (window.confirm("Fatura  ismini değiştirmek istediğinzden Eminmisniz ?")) {
      await axios
        .put(`http://localhost:5000/api/v1/mahsup/${id}`, { 
         cari_id, borc,alacak, tarih
         })
        .then((res) => {
          console.log(res);
          alert("fiş başarıyla güncellendi");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="container-fluid">
      <h5>{id}</h5>
      <div className="row">
        <div class="col">
          <label class="form-label">İşlem Türü</label>
          <select
            class="form-select"
            onChange={handleChange}
          >
            <option value="FIS_TURU" selected>Fiş Türü</option>
            <option value="ODEME_YAP">ÖDEME YAP</option>
            <option value="ODEME_AL">ÖDEME AL</option>
          </select>
        </div>
        <div class="col">
          <label class="form-label">Cari</label>
          <select
            onChange={handleChange}
            class="form-select"
            name="cari_id"
            value={cari_id}
          >
            {APIData.map((cari) => {
              return (
                <option key={cari.id} id={cari.id} selected value={cari.id}>
                {cari.adi}
              </option>
              );
            })}
          </select>
        </div>
        <div class="col">
          <label class="form-label">Tutar</label>
          <input
            onChange={(e) => {setTutar(e.target.value)}}
            type="text"
            class="form-control"
            name="tutar"
            value={tutar}
            required
          />
        </div>
        <div class="col">
          <label class="form-label">Tarih</label>
          <input
            onChange={handleChange}
            type="date"
            class="form-control"
            name="tarih"
            value={tarih}
          />
        </div>
        <div class="col">
          <label class="form-label"></label>
          <button
            id="bbtn"
            onClick={update}
            type="button"
            class="btn btn-outline-info"
          >
            Güncelle
          </button>
        </div>
      </div>
    </div>
  );
};

export default TahsilatEdit;
