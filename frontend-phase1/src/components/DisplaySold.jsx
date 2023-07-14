import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import FundCard from './FundCard';
import { loader } from '../assets';
import FundCard2 from './FundCard2';

const DisplaySold = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleNavigate = (campaign) => {
    navigate(`/sold-details/${campaign.title}`, { state: campaign })
  }

// Filter campaigns based on search term
const filteredCampaigns = campaigns;

  
  return (
    <div>
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
            <FundCard2 key={uuidv4()} {...campaign} handleClick={() => handleNavigate(campaign)} />
          ))}
      </div>
    </div>
  )
}

export default DisplaySold