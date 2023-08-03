import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./index.scss";

// import redux
import { connect } from "react-redux";
import { setShowConnectWalletModalAction } from "@/store/actions/WalletActions";

// import components
import { PrimaryButton } from "../../components/Buttons";
import UserAvatar from "./UserAvatar";

// import icons
import { AiOutlineWallet } from "react-icons/ai";
import CustomImage from "../../components/CustomImage";

// import utils
import shortenAddress from "../../utils/common/shortenAddress";

const Header = ({ currentWallet, setShowConnectWalletModalAction }) => {
  const navigate = useNavigate();

  const [isSmallWindow, setIsSmallWindow] = useState(false);

  useEffect(() => {
    const media = matchMedia("(max-width: 405px)");
    if (media.matches && !isSmallWindow) {
      setIsSmallWindow(true);
    }
    media.onchange = ({ matches }) => {
      matches ? setIsSmallWindow(true) : setIsSmallWindow(false);
    };
  }, []);

  return (
    <header className="header">
      <div className="header_logo">
        <CustomImage
          alt="header_logo"
          style={{ width: 180, height: 45 }}
          src={window.origin + "/header/logo.png"}
        />
      </div>
      <div className="header_right_panel">
        <div>
          {currentWallet?.address ? (
            <div className="dropdown show">
              <h4
                className="m-0 text-white dropdown-toggle"
                href="#"
                role="button"
                id="header_address_dropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {shortenAddress(currentWallet.address)}
              </h4>

              <div
                className="dropdown-menu address_dropdown_menu"
                aria-labelledby="header_address_dropdown"
              >
                <div
                  className="address_dropdown_item"
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  Profile
                </div>
                <div
                  className="address_dropdown_item"
                  onClick={() => {
                    navigate("/logout");
                  }}
                >
                  Log Out
                </div>
              </div>
            </div>
          ) : (
            <>
              {isSmallWindow ? (
                <PrimaryButton
                  onClick={() => {
                    // navigate("/connect-wallet");
                    setShowConnectWalletModalAction(true);
                  }}
                  icon={<AiOutlineWallet size={24} className="ms-2 me-2" />}
                />
              ) : (
                <PrimaryButton
                  onClick={() => {
                    // navigate("/connect-wallet");
                    setShowConnectWalletModalAction(true);
                  }}
                  text="Connect Wallet"
                  icon={<AiOutlineWallet size={24} className="ms-2 me-2" />}
                />
              )}
            </>
          )}
        </div>
        <UserAvatar
          className="ms-2"
          onClick={() => {
            navigate("/profile");
          }}
        />
      </div>
    </header>
  );
};

const mapStateToProps = (state) => ({
  currentWallet: state.wallets.currentWallet,
});
const mapDispatchToProps = (dispatch) => ({
  setShowConnectWalletModalAction: (data) =>
    setShowConnectWalletModalAction(dispatch, data),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
