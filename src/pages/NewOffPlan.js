import React, { useState, useEffect } from "react";

import Footer from "../component/Footer";
import { Helmet } from 'react-helmet';
import "../css/Offplan.css";
import FilterNav from "../component/FilterNav";
import NavToAll from "../component/NavToAll";
const NewOffPlan = () => {
  return (
    <div>
<NavToAll/>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 position-relative d-flex justify-content-center align-items-center">
            <img
              src="https://hjrealestates.com/wp-content/uploads/2023/09/hj-real-estates-sell-hero.jpg"
              className="offp-imgg"
              alt="Sell Hero"
            />
            <h1 className="offp-h position-absolute text-center mb-5">
              Diamondz by Danube
            </h1>
            <p className="position-absolute text-center mt-4">
              Jumeirah Lake Towers
            </p>
            <div className="position-absolute">
              <div className="">
                <div className="div-offplan">
                  <div className="row text-center mt-5">
                    <div className="col-md-4">
                      <i className="fa fa-car" style={{ color: "#006" }}></i>
                      <h4>Studio, 1, 2, 3 & 4 BR | Apartments</h4>
                    </div>
                    <div className="col-md-4">
                      <p>Price (AED)</p>
                      <h4>1.1 M</h4>
                    </div>
                    <div className="col-md-4">
                      <i className="fa fa-car" style={{ color: "#006" }}></i>
                      <h4>Direct Sales & 0% Commission</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div></div>
      <Footer/>
    </div>
  )
}

export default NewOffPlan
