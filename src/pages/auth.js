import React, { useState } from 'react';
import Web3 from 'web3';
import styles from '../styles/auth.module.css';
import { useRouter } from "next/router"
import { userAgent } from 'next/server';

const Auth = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [ethBalance, setEthBalance] = useState('');
  const router = useRouter()
  const detectCurrentProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      console.log("Non-ethereum browser detected. You should install Metamask");
    }
    return provider;
  };

  const onConnect = async () => {
    try {
      const currentProvider = detectCurrentProvider();
      if (currentProvider) {
        await currentProvider.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(currentProvider);
        const userAccount = await web3.eth.getAccounts();
        const account = userAccount[0];
        let ethBalance = await web3.eth.getBalance(account);
        setEthBalance(ethBalance);
        setIsConnected(true);
        console.log()
        router.push('/')
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onDisconnect = () => {
    setIsConnected(false);
  };

  return (
    <div className={styles.login}>
      <div className={styles.login_header}>
        <h1>Click Below to Login with Meta mask!</h1>
      </div>
      <div className={styles.login_wrapper}>
        {!isConnected && (
          <div>
            <button className={styles.login_button__login} onClick={onConnect}>
              Login with Metamask
            </button>
          </div>
        )}
      </div>
      {isConnected && (
        <div className={login_wrapper}>
          <div className={login_details}>
            <h2>You are connected to Metamask.</h2>
            <div className="login-balance">
              <span>Balance:</span> {ethBalance}
            </div>
          </div>
          <div>
            <button className={styles.login_buttons__logout} onClick={onDisconnect}>
              Disconnect
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Auth;
