'use client'
import { useState } from 'react';
import copy from 'clipboard-copy';

type Props ={
    code:string,
}
const CopyToClipboardButton = ({ code }:Props) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = async () => {
    try {
      await copy(code);
      setIsCopied(true);
    } catch (error) {
      console.error('Failed to copy text to clipboard', error);
    }
  };

  return (
    <div>
      <button 
      className='bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded'
      onClick={handleCopyClick}>
        {isCopied ? 'Copied!' : 'Copy Code'} 
      </button>
    </div>
  );
};

export default CopyToClipboardButton;