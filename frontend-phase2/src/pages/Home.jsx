import React, { useState, useEffect } from 'react'

import { DisplayArtworks } from '../components';
import { useStateContext } from '../context'

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getArtworks } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getArtworks();
    setCampaigns(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <DisplayArtworks 
      title="All Artworks"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  )
}

export default Home