import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import FundCard from './FundCard';
import { loader } from '../assets';

const DisplayAuction = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleNavigate = (campaign) => {
    navigate(`/auction-details/${campaign.title}`, { state: campaign })
  }

// Filter campaigns based on search term
const filteredCampaigns = campaigns.filter((campaign) =>
  campaign.credentials.toLowerCase().includes(searchTerm.toLowerCase()) ||
  campaign.description.toLowerCase().includes(searchTerm.toLowerCase())
);

  
  return (
    <div>
      <div className="flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]">
        <input
          type="text"
          placeholder="Search for artworks"
          className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <br/>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        {title} ({filteredCampaigns.length})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />}

        {!isLoading && filteredCampaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            No campaigns found.
          </p>
        )}

        {!isLoading &&
          filteredCampaigns.length > 0 &&
          filteredCampaigns.map((campaign) => (
            <FundCard key={uuidv4()} {...campaign} handleClick={() => handleNavigate(campaign)} />
          ))}
      </div>
    </div>
  )
}

export default DisplayAuction