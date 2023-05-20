import React, { useState } from 'react';
import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer';

const IPFSUpload = () => {
  const [file, setFile] = useState(null);
  const [ipfsHash, setIpfsHash] = useState(null);
  global.Buffer = Buffer;

  const projectId = '290HopORGfYauU5yHY9Ow8I62u5';
  const projectSecret = 'df2d23c1e80f28675fe815a84196f82b';
  const auth =
      'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
  
  const ipfs = create({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
      headers: {
          authorization: auth,
      },
  });
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadFile = async () => {
    try {
      const result = await ipfs.add(file);
      setIpfsHash(result.path);
    } catch (error) {
      console.error('Error uploading file to IPFS:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadFile}>Upload to IPFS</button>
      {ipfsHash && (
        <p>
          IPFS Hash: <a href={`https://ipfs.io/ipfs/${ipfsHash}`}>{ipfsHash}</a>
        </p>
      )}
    </div>
  );
};

export default IPFSUpload;
