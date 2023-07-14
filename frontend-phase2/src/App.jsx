import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Sidebar, Navbar } from './components';
import { Bought, ArtworkDetails, UploadArtwork, Home, Sold, AuctionDetails, ArtworkSoldDetails, UploadedDetails, Verify} from './pages';
import Uploaded from './pages/Uploaded';
import AuctionPlace from './pages/AuctionPlace';
import RegistrationForm from './pages/Register';
import BoughtDetails from './pages/BoughtDetails';

const App = () => {
  return (
    <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>

      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/bought" element={<Bought />} />
          <Route path="/sold" element={<Sold />} />
          <Route path="/uploaded" element={<Uploaded />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/auction" element={<AuctionPlace />} />
          <Route path="/uploadArtwork" element={<UploadArtwork />} />
          <Route path="/artwork-details/:id" element={<ArtworkDetails />} />
          <Route path="/sold-details/:id" element={<ArtworkSoldDetails />} />
          <Route path="/bought-details/:id" element={<BoughtDetails />} />
          <Route path="/auction-details/:id" element={<AuctionDetails />} />
          <Route path="/uploaded-details/:id" element={<UploadedDetails />} />
        </Routes>
      </div>
    </div>
  )
}

export default App