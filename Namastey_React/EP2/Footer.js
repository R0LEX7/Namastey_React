import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="footer">
      <footer className="new_footer_area bg_color">
        <div className="new_footer_top">
          <div className="container">
            <div className="footer-row">
              <div className="col-lg-3 col-md-6">
                <div className="f_widget company_widget wow fadeInLeft" data-wow-delay="0.2s">
                  <p>We bring delicious food to your doorstep with our Swiggy clone project. Explore a variety of cuisines and enjoy hassle-free delivery!</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="f_widget social-widget pl_70 wow fadeInLeft" data-wow-delay="0.8s">
                  <h3 className="f-title f_600 t_color f_size_18">My Social Handles</h3>
                  <div className="f_social_icon">
                    <a href="https://github.com/R0LEX7"><FaGithub /></a>
                    <a href="https://twitter.com/im_Himanshu77"><FaTwitter /></a>
                    <a href="https://www.linkedin.com/in/himanshu-kumar-gola/"><FaLinkedin /></a>
                    <a href="https://www.youtube.com/channel/UCZ540RczamecMva5xxsz0PQ"><FaYoutube /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer_bg">
            <div className="footer_bg_one"></div>
            <div className="footer_bg_two"></div>
          </div>
        </div>
        <div className="footer_bottom">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 col-sm-7">
                <p className="mb-0 f_400">&copy; {new Date().getFullYear()} Swiggy Clone. All Rights Reserved.</p>
              </div>
              <div className="col-lg-6 col-sm-5 text-right">
                <p>
                  Made By <i className="icon_heart"><AiFillHeart/></i> 
                  
                      Himanshu.dev
                  
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
