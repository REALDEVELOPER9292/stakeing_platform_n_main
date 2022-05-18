import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Web3 from 'web3';
import {Link} from "react-router-dom";

const GamfiHeader = () => {
    
    const chainId = 97;
    let web3 = new Web3(window.ethereum);

    const [curWallet, setWallet] = useState("connect wallet");
    const dispatch = useDispatch();
    
    const onConnectWalletBtn = async () => {
        try {

            if (window.ethereum.networkVersion != chainId) {
                try {
                    await window.ethereum.request({
                      method: 'wallet_switchEthereumChain',
                      params: [{ chainId: web3.utils.toHex(chainId) }],
                    });
                  } catch (err) {
                      // This error code indicates that the chain has not been added to MetaMask.
                    if (err.code === 4902) {
                      await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                          {
                            chainName: 'BSC Testnet',
                            chainId: web3.utils.toHex(chainId),
                            nativeCurrency: { name: 'BNB', decimals: 18, symbol: 'BNB' },
                            rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
                          },
                        ],
                      });
                    }
                }
            }

            const { ethereum } = window;

            if (!ethereum) {
                alert("Please install MetaMask!");
                return;
            }

            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });

            setWallet(accounts[0]);
            dispatch({type: 'SET_CURWALLET', payload: accounts[0]})

        } catch (error) {
            console.log(error);
        }

        
    }

    return (
        <header id="gamfi-header" className="gamfi-header-section default-header">
            <div className="menu-area menu-sticky">
                <div className="container">
                    <div className="heaader-inner-area d-flex justify-content-between align-items-center">
                        <div className="gamfi-logo-area d-flex justify-content-between align-items-center">
                            <div className="logo">
                                <Link to="/"><img src="assets/images/logo.png" alt="logo" /></Link>
                            </div>
                        </div>
                        <div className="gamfi-btn-area">
                            <ul>
                                <li className="buy-token">
                                    <a className="readon black-shape" href="https://pancakeswap.finance/swap?outputCurrency=0xed3d4e9912505dec13f0abdc017eb85ea3eb9401">
                                        <span className="btn-text">Buy Token </span>
                                    </a>
                                </li> 
                                <li>
                                    <button onClick={onConnectWalletBtn} type="button" className="readon white-btn hover-shape" data-bs-toggle="modal" data-bs-target="#exampleModal"><img src="assets/images/icons/connect.png" alt="Icon" />
                                        <span className="btn-text">{curWallet === "connect wallet" ? curWallet : curWallet.slice(0, 5) + "..." + curWallet.slice(curWallet.length - 8, curWallet.length)} </span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <nav className="right_menu_togle mobile-navbar-menu" id="mobile-navbar-menu">
                <div className="close-btn">
                    <a id="nav-close2" className="nav-close">
                        <div className="line">
                            <span className="line1"></span>
                            <span className="line2"></span>
                        </div>
                    </a>
                </div>
                <div className="sidebar-logo mb-30">
                    <a href="/"><img src="assets/images/logo-dark.png" alt="" /></a>
                </div>
            </nav>
        </header>
    )
}

export default GamfiHeader;
