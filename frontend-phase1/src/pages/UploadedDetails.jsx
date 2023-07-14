import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStateContext } from '../context';
import { CountBox, CustomButton, Loader } from '../components';
import { thirdweb } from '../assets';

const UploadedDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { updateQuantity, getDonations, contract, address } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(Number(state.quantity));

  const fetchDonators = async () => {
    const data = await getDonations(state.pId);

    setDonators(data);
  };

  useEffect(() => {
    if (contract) fetchDonators();
  }, [contract, address]);

  const updateQ = async () => {
    setIsLoading(true);
    console.log(state.pId)
    console.log(quantity)
    await updateQuantity(state.pId+1, quantity);
    navigate('/');
    setIsLoading(false);
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div>
      {isLoading && <Loader />}

      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <img src={state.image} alt="campaign" className="w-full h-[410px] object-cover rounded-xl" />
          {/* <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
            <div className="absolute h-full bg-[#4acd8d]" style={{ width: `${calculateBarPercentage(state.target, state.amountCollected)}%`, maxWidth: '100%' }}>
            </div>
          </div> */}
        </div>

        {/* THIS PARTHAS BEEN HARD CODED - MUST CHANGE */}
        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          <CountBox title="Quantity Left" value={Number(state.quantity)} />
          <CountBox title={"Price"} value={Number(state.price)} />
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
                <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">{Number(state.price)}</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Description</h4>

            <div className="mt-[20px]">
              <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">{state.description}</p>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Change Quantity</h4>
            <div className="mt-[20px] flex items-center">
  <button
    className="quantity-btn"
    onClick={handleDecreaseQuantity}
    style={{ color: 'white' }}
  >
    -
  </button>
  <div className="quantity-value" style={{ color: 'white' }}>
    {quantity}
  </div>
  <button
    className="quantity-btn"
    onClick={handleIncreaseQuantity}
    style={{ color: 'white' }}
  >
    +
  </button>
</div>
            <br/> 
            <CustomButton
              btnType="button"
              title="Save"
              styles="w-32 bg-[#8c6dfd]"
              handleClick={updateQ}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadedDetails;
