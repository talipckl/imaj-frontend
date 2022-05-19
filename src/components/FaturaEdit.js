import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const initialState = {
  tur: "",
  cari_id: "",
  miktar: "",
  fiyat: "",
  tutar: "",
  tarih: "",
};

const FaturaEdit = () => {
  const [state, setState] = useState(initialState);
  const { tur, cari_id, miktar, tutar, fiyat, tarih } = state;
  const { id } = useParams();
    const [APIData, setAPIData] = useState([]);

    useEffect(() => {
        axios
          .get(`https://imaj-backend.herokuapp.com/api/v1/cari`)
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
      .get(`https://imaj-backend.herokuapp.com/api/v1/fatura/${id}`)
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
        .put(`https://imaj-backend.herokuapp.com/api/v1/cari/${id}`, { 
            tur,
            cari_id,
            miktar,
            tutar,
            fiyat,
            tarih
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
      <div className="row">
        <div class="col">
          <label class="form-label">İşlem Türü</label>
          <select
            onChange={handleChange}
            class="form-select"
            name="tur"
            value={tur}
          >
            <option value="1">işlem</option>
            <option value="ALIŞ">ALIŞ</option>
            <option value="SATIŞ">SATIŞ</option>
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
                <option key={cari.id} selected value={cari.id}>
                  {cari.adi}
                </option>
              );
            })}
          </select>
        </div>
        <div class="col">
          <label class="form-label">Miktar</label>
          <input
            onChange={handleChange}
            type="text"
            class="form-control"
            name="miktar"
            value={miktar}
            required
          />
        </div>
        <div class="col">
          <label class="form-label">Fiyat</label>
          <input
            onChange={handleChange}
            type="text"
            class="form-control"
            name="fiyat"
            value={fiyat}
          />
        </div>
        <div class="col">
          <label class="form-label">Tutar</label>
          <input
            onChange={handleChange}
            type="text"
            class="form-control"
            name="tutar"
            value={tutar}
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

export default FaturaEdit;
