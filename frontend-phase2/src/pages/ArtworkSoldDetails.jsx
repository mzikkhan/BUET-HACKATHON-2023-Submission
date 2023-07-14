import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStateContext } from '../context';
import { CountBox, CustomButton, Loader } from '../components';
import { thirdweb } from '../assets';

const ArtworkSoldDetails = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { startDelivery, donate, getDonations, contract, address, completeDelivery } = useStateContext();
    const [isLoading, setIsLoading] = useState(false);
    const [donators, setDonators] = useState([]);
    const fetchDonators = async () => {
        const data = await getDonations(state.pId);
        setDonators(data);
    };

    useEffect(() => {
        if (contract) fetchDonators();
    }, [contract, address]);

    const handleStartDelivery = async () => {
        setIsLoading(true);
        await startDelivery(Number(state.id));
        navigate('/');
        setIsLoading(false);
    };

    const handleCompleteDelivery = async () => {
        setIsLoading(true);
        await completeDelivery(Number(state.id));
        navigate('/');
        setIsLoading(false);
    };

    const [selectedPhases, setSelectedPhases] = useState([]);

    const handlePhaseChange = (phase) => {
        if (selectedPhases.includes(phase)) {
            setSelectedPhases(selectedPhases.filter((p) => p !== phase));
        } else {
            setSelectedPhases([...selectedPhases, phase]);
        }
    };

    return (
        <div>
    {isLoading && <Loader />}

    <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
            <img
                src={state.image}
                alt="campaign"
                className="w-full h-[410px] object-cover rounded-xl"
            />
        </div>
    </div>

    <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
            <div>
                <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                    {state.description}
                </h4>

                <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
                    <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                        <img
                            src={thirdweb}
                            alt="user"
                            className="w-[60%] h-[60%] object-contain"
                        />
                    </div>
                    <div>
                        <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">
                            Buyer: {state.buyer}
                        </h4>
                        <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">
                            ETH {Number(state.amount)}
                        </p>
                    </div>
                </div>
            </div>

            <div>
                <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                    Delivery Status:
                </h4>
                {/* Conditionally render based on delivery state */}
                {state.delivery_state === 'in warehouse' && (
                    <CustomButton
                        btnType="button"
                        title="Start Delivery"
                        styles="w-32 bg-[#8c6dfd]"
                        handleClick={handleStartDelivery}
                    />
                )}
                {state.delivery_state === 'Dispatched' && (
                    <CustomButton
                        btnType="button"
                        title="Complete Delivery"
                        styles="w-32 bg-[#8c6dfd]"
                        handleClick={handleCompleteDelivery}
                    />
                )}
                {state.delivery_state === 'Delivered' && (
                    <p className="font-epilogue font-semibold text-[18px] text-white">
                        Delivered
                    </p>
                )}
            </div>
        </div>
    </div>
</div>

    );
};

export default ArtworkSoldDetails;