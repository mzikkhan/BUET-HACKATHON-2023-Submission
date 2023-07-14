import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { CountBox, CustomButton, Loader } from '../components';
import { useStateContext } from '../context';
const VerifyPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const owner = state?.owner || '';
  const pId = state?.pId || '';
  const [jsonFile, setJsonFile] = useState(null);
  const { issueCertificates } = useStateContext();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setJsonFile(file);
  };

  const handleIssueCertificate = async () => {
    try {
      const uri = 'https://bafybeiej6epn6i2up5bfmjiil7h5glpeapnclgees5zb6hsokdmyjy2s7y.ipfs.dweb.link/artwork%20%281%29.json';
      await issueCertificates(Number(pId))
      navigate('/')
    } catch (error) {
      console.error('Error uploading file to IPFS:', error);
    }
  };
  
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white' }}>
      <h1>Verify</h1>

      <form style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
        <label>
          Owner:
          <input type="text" value={owner} style={{ color: 'black' }} />
        </label>

        <label>
          JSON File:
          <input type="file" onChange={handleFileChange} style={{ color: 'white' }} />
        </label>

        <CustomButton
          btnType="button"
          title="Issue Certificate"
          styles="w-32 bg-[#8c6dfd]"
          handleClick={handleIssueCertificate}
        />
      </form>
    </div>
  );
};

export default VerifyPage;
