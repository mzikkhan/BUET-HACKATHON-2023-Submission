import React, { useState, useEffect } from 'react'

import { useStateContext } from '../context'
import DisplayAuction from '../components/DisplayAuction';

const AuctionPlace = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getAuctionArtworks } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getAuctionArtworks();
    setCampaigns(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <DisplayAuction 
      title="Auction"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  )
}

export default AuctionPlace