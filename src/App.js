import React, { useEffect } from "react";
import { BrowserRouter as Router, Link, Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Anasayfa from "./components/Anasayfa";
import CariKayıt from "./components/CariKayıt";
import FaturaKayıt from "./components/FaturaKayıt";
import HesapEkstresi from "./components/HesapEkstresi";
import Muhasebe from "./components/Muhasebe";
import Tahsilat from "./components/Tahsilat";
import Mizan from "./components/Mizan";
import CariDüzenleme from "./components/CariDüzenleme";
import FaturaEdit from "./components/FaturaEdit";
import TahsilatEdit from "./components/TahsilatEdit";
import User from "./components/User";

// import Stok from "./components/Stok";
const App = () => {
  let navigate = useNavigate();
   useEffect(() => {
        const token = localStorage.getItem("token");
        fetch("https://imaj-backend.herokuapp.com/api/v1/authen", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " +token,
            },
        }).then(response=>response.json())
         .then(data => {
                if (data.status === "ok") {
                } else {
                    console.log(data.status);
                    navigate("/login");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Anasayfa />} />
        <Route path="/fatura" element={<FaturaKayıt />} />
        <Route path="/cari" element={<CariKayıt />} />
        <Route path="/tahsilat" element={<Tahsilat />} />
        <Route path="/muhasebe_fis" element={<Muhasebe />} />
        <Route path="/hesap_ekstre" element={<HesapEkstresi />} />
        <Route path="/mizan" element={<Mizan />} />
        <Route path="/cari/:id" element={<CariDüzenleme />} />
        <Route path="/fatura/:id" element={<FaturaEdit />} />
        <Route path="/mahsup/:id" element={<TahsilatEdit />} />
        <Route path="/login" element={<User />} />
      </Routes>
    </>
  )
   
};

export default App;
