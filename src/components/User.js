import React, { useState } from "react";
import axios from "axios";
import "../css/user.css";
import { useNavigate } from "react-router-dom";

const User = () => {
  const [body, setBody] = useState({
    username: "",
    password: "",
  });

  let navigate = useNavigate();

  const handleChange = ({ target }) => {
    let { name, value } = target;
    setBody({
      ...body,
      [name]: value,
    });
  };

  const login = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/v1/login", body)
    .then((data) => {
        console.log(data);
        localStorage.setItem("token", data.data.token);
        navigate("/");
    }).catch((error) => {
        console.log("gelmedi");
        alert("Kullanıcı adi veya şifre hatalı")
    })
  };
  console.log(body);
  // navigate("../", { replace: true });

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-5">
          <div className="wrap">
            <div className="img"></div>
            <div className="login-wrap p-4 p-md-5">
              <div className="d-flex">
                <div className="w-100">
                  <h3 className="mb-4">Admin Dashboard</h3>
                </div>
              </div>
              <form className="signin-form">
                <div className="form-group mt-3">
                  <input
                  
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    required
                    name="username"
                    value={body.username}
                    placeholder="Kullanıcı Adı"
                  />
                </div>
                <br></br>
                <div className="form-group">
                  <input
                    //  onChange={(e)=>setPassword(e.target.value)}
                    onChange={handleChange}
                    type="password"
                    className="form-control"
                    placeholder="Şifre"
                    name="password"
                    value={body.password}
                    required
                  />
                </div>
                <br></br>
                <br></br>
                <div className="col-3 ">
                  <button
                    className="form-control btn btn-outline-secondary "
                    onClick={login}
                  >
                    Giriş Yap
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default User;
