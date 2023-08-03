import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// import pages
import MainLayout from "@/pages/MainLayout";
import ExplorePage from "@/pages/Explore";
import CreateAsset from "@/pages/CreateAsset";
import DetailPage from "@/pages/Detail";
import ProfilePage from "@/pages/Profile";
import ProfileOverview from "@/pages/Profile/Overview";
import ProfileSetting from "@/pages/Profile/Setting";
import ConnectWallet from "@/pages/ConnectWallet";
import Logout from "@/pages/Logout";

// import router guards
// import CheckWalletConnection from "@/components/RouterGuard/CheckWalletConnection";

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<MainLayout />}>
          <Route path="/explore" element={<ExplorePage />} />
          <Route
            path="/create-asset"
            element={
              // <CheckWalletConnection>
              <CreateAsset />
              // </CheckWalletConnection>
            }
          />
          <Route path="/detail/:marketItemId" element={<DetailPage />} />
          <Route path="/profile" element={<ProfilePage />}>
            <Route path="" element={<ProfileOverview />} />
            <Route path="setting" element={<ProfileSetting />} />
            <Route path="*" element={<ProfileOverview />} />
          </Route>
          <Route path="connect-wallet" element={<ConnectWallet />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<ExplorePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
