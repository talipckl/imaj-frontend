import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const initialState = {
  adi: "",
};

const CariDüzenleme = () => {
  const [cariUp, setCariUp] = useState([]);
  const [cari, setCari] = useState([]);

  const [state, setState] = useState(initialState);
  const { adi } = state;

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://imaj-backend.herokuapp.com/api/v1/carim/${id}`)
      .then((res) => {
        console.log(res);
        setState({ ...res.data[0] });
      })
      .catch((err) => {
        console.log(err);
        console.log("gelmedi");
      });
  }, [id]);

  // const handleChange = (e) => {
  //   setState({
  //     ...state,
  //     [e.target.name]: e.target.value,
  //   })
  // }

  const update = async () => {
    if (window.confirm("firma ismini değiştirmek istediğinzden Eminmisniz ?")) {
      await axios
        .put(`https://imaj-backend.herokuapp.com/api/v1/cari/${id}`, { adi })
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
    <div>
      <div className="container-fluid">
        <div className="col-4">
          <label>Cari Adı</label>
          <input
            onChange={(e) => setState({ ...state, adi: e.target.value })}
            type="text"
            name="adi"
            className="form-control"
            value={adi}
          />
        </div>
        <br></br>
        <div className="col">
          <button onClick={update} className="btn btn-outline-info">
            Güncelle
          </button>
        </div>
      </div>
    </div>
  );
};

export default CariDüzenleme;
