import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../context';
import { CountBox, CustomButton, Loader } from '../components';
import { calculateBarPercentage, daysLeft } from '../utils';
import { thirdweb } from '../assets';

const AuctionDetails = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { bid, getDonations, contract, address } = useStateContext();

    const [isLoading, setIsLoading] = useState(false);
    const [amount, setAmount] = useState('');
    const [auctioneers, setAuctioneers] = useState([]);

    const remainingDays = daysLeft(state.deadline);

    //Check function - GO TO UTILS
    const fetchAuctioneers = async () => {
        const data = await getDonations(state.pId);

        setAuctioneers(data);
    }

    useEffect(() => {
        if (contract) fetchAuctioneers();
    }, [contract, address])

    const handleBid = async () => {
        setIsLoading(true);
        await bid(state.pId, state.bid*2);
        navigate('/auction')
        setIsLoading(false);
    }

    return (
        <div>
            {isLoading && <Loader />}

            <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
                <div className="flex-1 flex-col">
                    <img src={state.image} alt="campaign" className="w-full h-[410px] object-cover rounded-xl" />

                </div>


                <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
                    <CountBox title="Highest Bid" value={state.bid} />
                    <CountBox title="Quantity" value={1} />
                    <CountBox title="Days Left" value={remainingDays} />
                </div>
            </div>

            <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
                <div className="flex-[2] flex flex-col gap-[40px]">
                    <div>
                        <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Title: {state.description}</h4>

                        <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
                            <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                                <img src={thirdweb} alt="user" className="w-[60%] h-[60%] object-contain" />
                            </div>
                            <div>
                                <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">Artist: {state.credentials}</h4>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1">
                    <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
                        <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]">
                            Make Bid
                        </p>
                        <div className="mt-[30px]">
                            <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                                <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">ETH {state.bid*2}</h4>
                            </div>
                            <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                                <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">Love the artwork?</h4>
                                <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">Make a bid, now! Before it runs out!!.</p>
                            </div>

                            <CustomButton
                                btnType="button"
                                title="Bid"
                                styles="w-full bg-[#8c6dfd]"
                                handleClick={handleBid}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default AuctionDetails