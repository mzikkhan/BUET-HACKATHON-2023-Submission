import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStateContext } from '../context';
import { CountBox, CustomButton, Loader } from '../components';
import { thirdweb } from '../assets';

const ArtworkDetails = () => {
  const { state } = useLocation();
  console.log(state.isVerified)
  const navigate = useNavigate();
  const { buy, getDonations, contract, address } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState(localStorage.getItem('userType') || '');
  const isVerified = true;
  
  const fetchDonators = async () => {
    const data = await getDonations(state.pId);

    setDonators(data);
  }

  useEffect(() => {
    if (contract) fetchDonators();
  }, [contract, address])

  const buyArt = async () => {
    setIsLoading(true);
    console.log(state.pId)
    console.log(state.price)
    await buy(state.pId, state.price);
    navigate('/')
    setIsLoading(false);
  }

  const handleVerify = () => {
    const jsonContent = JSON.stringify(state, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'artwork.json';
    link.click();
    URL.revokeObjectURL(url);
    navigate('/verify', { state: { owner: state.owner, pId: state.pId } });
  };

  const handleJson = () => {
    const url = state.tokenUri
    window.open(url, '_blank');
  };

  return (
    <div>
      {isLoading && <Loader />}

      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <img src={state.image} alt="campaign" className="w-full h-[410px] object-cover rounded-xl" />
        </div>

        {/* THIS PARTHAS BEEN HARD CODED - MUST CHANGE */}
        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          <CountBox title="Quantity Left" value={state.quantity} />
          <CountBox title={"Price"} value={state.price*1e3} />
          {/* <CountBox title="Quantity Sold" value={5} /> */}
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
          {userType=="Verifier" && !state.isVerified && <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Verify Artwork</h4>
            <br />
            <CustomButton
              btnType="button"
              title="Verify"
              styles="w-32 bg-[#8c6dfd]"
              handleClick={handleVerify}
            />
          </div>}
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Authenticity Certificate:</h4>
            <br />
            {state.isVerified && <CustomButton
              btnType="button"
              title="Check Certificate"
              styles="w-32 bg-[#8c6dfd]"
              handleClick={handleJson}
            />}
            {!state.isVerified && <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">No authenticity certificate.</h4>}
          </div>
        </div>

        <div className="flex-1">
          <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Buy Now</h4>

          <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
            <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]">
              Buy the ArtWork
            </p>
            <div className="mt-[30px]">
              <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">ETH {state.price}</h4>
              </div>


              <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">Love the artwork?</h4>
                <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">Buy it, now! Before it runs out!!.</p>
              </div>

              <CustomButton
                btnType="button"
                title="Buy"
                styles="w-full bg-[#8c6dfd]"
                handleClick={buyArt}
              />
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default ArtworkDetails