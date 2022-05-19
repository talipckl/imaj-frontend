import React from "react";
import { Link } from "react-router-dom";
import "../css/navbar.css"
const Navbar = () => {


  const Logut = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }
  return (
    <nav id="nav-container" className="navbar navbar-icon-top navbar-expand-lg navbar-dark " style={{ "backgroundColor": "#2A3F54"}}>
      <div className="container-fluid">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item" id="nav-home">
            <Link to="/" className="nav-link" >
              <i className="fa fa-home "></i>
              Home
            </Link>
          </li>
        </ul>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"  data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link to="/cari" className="nav-link" >
                <i className="fa fa-user-plus "></i>
                Cari
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/fatura" className="nav-link" href="#">
                <i className="fa fa-envelope-o"></i>
                Fatura
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link " to="/tahsilat">
                <i className="fa fa-calculator"></i>
                Tahsilat
              </Link>
            </li>

          </ul>
          <ul className="navbar-nav ">
            <li className="nav-item">
              <Link className="nav-link" to="/muhasebe_fis">
                <i className="fa fa-folder-open"></i>
                Muhasebe
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/hesap_ekstre">
                <i className="fa fa-file-text-o"></i>
                hesap-ekstre
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/mizan">
                <i className="fa fa-line-chart"></i>
                Mizan
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/stok">
                <i className="fa fa-globe"></i>
                Stok
              </Link>
            </li>
            <li className="nav-item" style={{ "position": "absolute", "right": "0px" }} >
              <Link className="nav-link" to="/stok" onClick={Logut} >
                <i className="fa fa-sign-out"></i>
                Çıkış
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <script>

      </script>
    </nav>


  );
};

export default Navbar;