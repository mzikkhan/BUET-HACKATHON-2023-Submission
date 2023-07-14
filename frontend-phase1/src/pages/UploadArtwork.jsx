import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../context';
import { money } from '../assets';
import { CustomButton, FormField, Loader } from '../components';
import { checkIfImage } from '../utils';

const UploadArtwork = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createArt, createAuctionArt } = useStateContext();
  const [form, setForm] = useState({
    artist_name: '',
    artist_username: '',
    title: '',
    description: '',
    price: 0,
    quantity: 0,
    image: '',
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true)
        console.log(form)
        await createArt({ ...form, target: ethers.utils.parseUnits(form.price, 18) })
        setIsLoading(false);
        navigate('/');
      } else {
        alert('Provide valid image URL')
        setForm({ ...form, image: '' });
      }
    })
  }

  const handleSubmit2 = async (e) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true)
        console.log(form)
        await createAuctionArt({ ...form })
        setIsLoading(false);
        navigate('/');
      } else {
        alert('Provide valid image URL')
        setForm({ ...form, image: '' });
      }
    })
  }

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Upload an Artwork</h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Your Name *"
            placeholder="John Doe"
            inputType="text"
            value={form.artist_name}
            handleChange={(e) => handleFormFieldChange('artist_name', e)}
          />
          <FormField
            labelName="Your Username"
            placeholder="best-artist-ever-21"
            inputType="text"
            value={form.artist_username}
            handleChange={(e) => handleFormFieldChange('artist_username', e)}
          />
        </div>
        <FormField
          labelName="Art Title *"
          placeholder="Write a title"
          inputType="text"
          value={form.title}
          handleChange={(e) => handleFormFieldChange('title', e)}
        />

        <FormField
          labelName="Description"
          placeholder="Describe your Artwork"
          isTextArea
          inputType="text"
          value={form.description}
          handleChange={(e) => handleFormFieldChange('description', e)}
        />

        <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
          <img src={money} alt="money" className="w-[40px] h-[40px] object-contain" />
          <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">You will successfully sell your art with guaranteed profit.</h4>
        </div>

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Price *"
            placeholder="ETH 0.50"
            inputType="number"
            value={form.price}
            handleChange={(e) => handleFormFieldChange('price', e)}
          />
          <FormField
            labelName="Quantity *"
            placeholder="4"
            inputType="number"
            value={form.quantity}
            handleChange={(e) => handleFormFieldChange('quantity', e)}
          />
        </div>

        <FormField
          labelName="Artwork image *"
          placeholder="Place image URL of your artwork"
          inputType="text"
          value={form.image}
          handleChange={(e) => handleFormFieldChange('image', e)}
        />

        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title="Submit to Marketplace"
            styles="bg-[#1dc071] mr-2"
            onSubmit={handleSubmit}
          />
          <CustomButton
            btnType="submit"
            title="Submit for Auction"
            styles="bg-[#1dc071] ml-2"
            onSubmit={handleSubmit2}
          />
        </div>
      </form>
    </div>
  )
}

export default UploadArtwork