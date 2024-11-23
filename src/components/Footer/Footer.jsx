import React from "react";
import "./Footer.css";
import { FaFacebook } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import {  useNavigate } from "react-router-dom";


const Footer = () => {
  const navigate = useNavigate()
  return (
    <div className="footer-container">
      <div className="footer-top">
        <div className="footer-left">
          <h1 onClick={()=>navigate('/')}>Blossoms.</h1>
          <p>
            we have been running our business since 2018.we are providing
            wonderful food & services for customers.customers are our main
            priority.
          </p>
          <div>
            <FaFacebook className="icon"/>
            <FaXTwitter className="icon"/>
            <FaLinkedin className="icon"/>
          </div>
        </div>
        <div className="footer-center">
            <h1>COMPANY</h1>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div className="footer-right">
            <h1>GET IN TOUCH</h1>
            <ul>
                <li>+91 6303300378</li>
                <li>srirangamlokeswararao@gmail.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p>Copyright 2024 © Blossoms.com All Rights Reserved</p>
    </div>
  );
};

export default Footer;
