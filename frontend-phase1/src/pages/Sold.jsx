import React, { useState, useEffect } from 'react'

import { useStateContext } from '../context'
import DisplaySold from '../components/DisplaySold';

const Sold = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getPurchasesSeller } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getPurchasesSeller();
    setCampaigns(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <DisplaySold
      title="Artworks Sold"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  )
}

export default Sold