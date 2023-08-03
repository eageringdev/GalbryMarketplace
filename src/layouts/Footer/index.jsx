import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";

// import components
import { PrimaryButton } from "@/components/Buttons";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="footer">
      <div className="d-flex flex-wrap">
        <div className="col-12 col-lg-6">
          <img
            className="d-block mb-5 footer_logo"
            alt="footer_logo"
            src={window.origin + "/header/logo.png"}
            onClick={() => {
              navigate("/explore");
            }}
          />
          <div className="text-white mt-4" style={{ width: 200 }}>
            Reitio is a middleware protocol built for the 3D NFT creation,
            offering a codeless, templates-based dApp that empowers users with
            self-expression across worlds.
          </div>
          <img
            className="d-block footer_ethereum mt-4"
            alt="footer_eth"
            src={window.origin + "/footer/ethereum.png"}
            onClick={() => {
              navigate("/explore");
            }}
          />
        </div>
        <div className="d-flex flex-row flex-wrap col-12 col-lg-6 mt-5 mt-lg-0">
          <div className="col-12 col-lg-6 footer_links_container text-lg-left">
            <div className="footer_link_header">Resources</div>
            <div className="footer_link">Blog</div>
            <div className="footer_link">Announcements</div>
            <div className="footer_link">Roadmap</div>
            <div className="footer_link">Documentation</div>
            <div className="footer_link">Brand Assets</div>
            <div className="footer_link">Feature Suggestion</div>
          </div>
          <div className="col-12 col-lg-6 footer_links_container text-lg-left">
            <div className="footer_link_header">Community</div>
            <div className="footer_link">About Reitio</div>
            <div className="footer_link">Partners & Backers</div>
            <div className="footer_link">Become a Partner</div>
            <div className="footer_link">CoinMarketCap</div>
            <div className="footer_link">Terms of Services</div>
            <div className="footer_link">Privacy Policy</div>
          </div>
          <div className="col-12 col-lg-6 footer_links_container text-lg-left">
            <div className="footer_link_header">Careers</div>
            <div className="footer_link not_link">
              Looking for a job opportunity?
            </div>
            <div className="footer_link fw-bold">See open positions</div>
          </div>
        </div>
      </div>
      <div className="divider"></div>
      <div className="d-flex align-items-center justify-content-between mt-2 ms-2 me-2">
        <div className="footer_link not_link">
          &copy;2022 Reitio by{" "}
          <span className="footer_link_hover_underline">Metalism Studio</span>
        </div>
        <div className="footer_link not_link">All right reserved.</div>
      </div>
    </div>
  );
};

export default Footer;
