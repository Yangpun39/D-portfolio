//0x1B0b8245f32ef27D9BE26d4fC40E713eb28FE9f3
import { useState } from "react";
import ABI from './ABI.json'
import './Wallet.css'
import Web3 from "web3"

const Wallet=({saveState})=>{
    const [connected,setConnected]=useState(true);
    const isAndroid= /android/i.test(navigator.userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const init = async ()=>{
        try{
            const web3= new Web3(window.ethereum)
            await window.ethereum.request({method:'eth_requestAccounts'});
            const contract= new web3.eth.Contract(
                ABI,
                "0x1B0b8245f32ef27D9BE26d4fC40E713eb28FE9f3"
            );
            setConnected(false)
                console.log(contract);
                saveState({web3:web3,contract:contract})

        }catch(err)
        {
            alert("install metamask")
        }
    }
    return<>
        <div className="header">
        { (isIOS||isAndroid) && <button className="connectBTN">
        <a href="https://metamask.app.link/dapp/yangpunportfolio.netlify.app/">Click For Mobile</a>
        </button>
        }
            <button className="connectBTN" onClick={init} disabled={!connected}>{connected? "Connect Metamask":"Connected"}</button>
        </div>
    </>
}
export default Wallet;