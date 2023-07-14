import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStateContext } from '../context';
import { CustomButton } from './';
import { logo, menu, search, thirdweb } from '../assets';
import { navlinks } from '../constants';

const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard');
  const [userType, setUserType] = useState(localStorage.getItem('userType') || ''); // Retrieve userType from localStorage or set an initial empty string
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { connect, address, getType } = useStateContext();

  const pageTitle = "Artbay"; // Set the title of the webpage

  const handleConnect = async () => {
    connect
    const res = await getType();
    setUserType(res[1]);
    localStorage.setItem('userType', res[1]); // Store the userType in localStorage
  };

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div className="lg:flex-1 flex flex-row items-center">
      <h1 className="font-epilogue font-semibold text-[24px] text-white">{pageTitle}</h1>
      </div>

      <div className="sm:flex hidden flex-row justify-end gap-4">
      {userType!="Artist" && userType!="Verifier" && <CustomButton 
            btnType="button"
            title="Register"
            styles="bg-[#1dc071]"
            handleClick={() => {
              navigate('register');
            }}
          />}
        {address && (
          <CustomButton 
            btnType="button"
            title="Wallet Connected"
            styles="bg-[#1dc071]"
            // handleClick={handleConnect}
          />
        )}
        
        {!address && (
          <CustomButton 
            btnType="button"
            title="Connect"
            styles="bg-[#8c6dfd]"
            handleClick={connect}
          />
        )}
      </div>

      {/* Small screen navigation */}
      <div className="sm:hidden flex justify-between items-center relative">
        <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
          <img src={logo} alt="user" className="w-[60%] h-[60%] object-contain" />
        </div>

        <img 
          src={menu}
          alt="menu"
          className="w-[34px] h-[34px] object-contain cursor-pointer"
          onClick={() => setToggleDrawer((prev) => !prev)}
        />

        <div className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${!toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0'} transition-all duration-700`}>
          <ul className="mb-4">
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`flex p-4 ${isActive === link.name && 'bg-[#3a3a43]'}`}
                onClick={() => {
                  setIsActive(link.name);
                  setToggleDrawer(false);
                  navigate(link.link);
                }}
              >
                <img 
                  src={link.imgUrl}
                  alt={link.name}
                  className={`w-[24px] h-[24px] object-contain ${isActive === link.name ? 'grayscale-0' : 'grayscale'}`}
                />
                <p className={`ml-[20px] font-epilogue font-semibold text-[14px] ${isActive === link.name ? 'text-[#1dc071]' : 'text-[#808191]'}`}>
                  {link.name}
                </p>
              </li>
            ))}
          </ul>

          <div className="flex mx-4">
            <CustomButton 
              btnType="button"
              title={address ? 'Create a campaign' : 'Connect'}
              styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
              handleClick={() => {
                if(address) navigate('create-campaign')
                else connect();
              }}
            />
          </div>
        </div>
      </div>
    </div> 
  );
};

export default Navbar;
