import { useEffect, useState } from "react";
import LoginButton from "../components/LoginButton"
import HomeBackgroundVector from "./HomeBackgroundVector";
import Application from "@tria-sdk/authenticate-staging"
import "@tria-sdk/authenticate-staging/dist/index.css";
import { useSignMessage, useSendTransaction, useContractWrite ,useContractRead} from "@tria-sdk/authenticate-staging";


const Home = () => {

  const [showWallet, setShowWallet] = useState(false);
  const [message, setMessage] = useState('');
  const [amount, setAmount] = useState(0.00001);
  const [senderAddress, setSenderAddress] = useState('');
  const [recepientAddress, setrecepientAddress] = useState('');
  const [contractDetails, setContractDetails] = useState();
  const [chainName, setChainName] = useState('POLYGON');
  const [tokenAddress, setTokenAddress] = useState('');
  useEffect(() => {
    const item = localStorage.getItem("tria.wallet.store");
    console.log(item);
  }, []);

  console.log("data------------------>",{message,amount,senderAddress,recepientAddress,contractDetails,chainName,tokenAddress});
  console.log("contractDetails",contractDetails);

  const { data: sign, isError, isLoading, isSuccess, signMessage } = useSignMessage({
    message,
    chainName
  });

  const { data, sendTransaction } = useSendTransaction({
    amount,
    senderAddress,
    recepientAddress,
    chainName,
    tokenAddress
  });

  const { data: contractwrite, write } = useContractWrite({
    chainName,
    tokenAddress,
    contractDetails
  });

  const { data: contractread, read } = useContractRead({
    contractDetails
  });

  console.log("send data----------------->", data);
  console.log("sign data----------------->", sign);
  console.log("contract write---------------->", contractwrite);
  console.log("contract read---------------->", contractread);

  const handleButtonClick = () => {
    const data = { triaName: 'testName', evmAddress: 'sample' };
    localStorage.setItem("tria.wallet.store", JSON.stringify(data));
  }

  return (
    <div className="">


      {/* <button className="absolute top-[50px] left-[50px] w-[80px] bg-pink-500" onClick={handleButtonClick}>click here</button> */}
      <Application dappName={"Empire"} logo={"https://www.empireofsight.com/assets/images/logo-icon.svg"} dappDomain={window.parent.origin} primaryColor="#70CA00" />
      <div className="flex flex-col w-[20%]">
        {/* Common for all buttons */}
        <input
          type="text"
          placeholder="Enter chain name"
          value={chainName}
          onChange={(e) => setChainName(e.target.value)}
          className="border rounded-md px-2 py-1 mr-2"
        />
        <input
          type="text"
          placeholder="Enter token address"
          value={tokenAddress}
          onChange={(e) => setTokenAddress(e.target.value)}
          className=" mb-16 border rounded-md px-2 py-1 mr-2"
        />
      <input
        type="text"
        placeholder="Enter message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border rounded-md px-2 py-1 mr-2"
      />
      <button className=" mb-16 text-white bg-blue-500  px-4 py-2 rounded-md mr-2" onClick={() => signMessage()}>Sign Message</button>
      
      <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border rounded-md px-2 py-1 mr-2"
        />
        <input
          type="text"
          placeholder="Enter sender address"
          value={senderAddress}
          onChange={(e) => setSenderAddress(e.target.value)}
          className="border rounded-md px-2 py-1 mr-2"
        />
        <input
          type="text"
          placeholder="Enter recipient address"
          value={recepientAddress}
          onChange={(e) => setrecepientAddress(e.target.value)}
          className="border rounded-md px-2 py-1 mr-2"
        />
      <button className=" mb-16 text-white bg-green-500  px-4 py-2 rounded-md" onClick={() => sendTransaction()}>send Transaction</button>

      <textarea
          type="text"
          placeholder="Enter contract details"
          value={contractDetails}
          onChange={(e) => setContractDetails(e.target.value)}
          className="border rounded-md px-2 py-1 mr-2 h-[200px] w-[300px]"
        />
      <button className="text-white bg-pink-500  px-4 py-2 rounded-md" onClick={() => write()}>call contract</button>
       <button className="text-white bg-gray-500  px-4 py-2 rounded-md" onClick={() => read()}>read</button> 
      </div>
    </div>
  )
}

export default Home