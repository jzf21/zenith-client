import { useEffect, useState } from 'react';

const MetamaskLogin = () => {
  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(false);
  const [metamaskAccount, setMetamaskAccount] = useState(null);

  useEffect(() => {
    checkMetamaskInstalled();
    addMetamaskListeners();
  }, []);

  const checkMetamaskInstalled = () => {
    if (typeof window.ethereum !== 'undefined') {
      setIsMetamaskInstalled(true);
    }
  };

  const addMetamaskListeners = () => {
    if (isMetamaskInstalled) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('disconnect', handleDisconnect);
    }
  };

  const handleAccountsChanged = (accounts) => {
    if (accounts.length > 0) {
      setMetamaskAccount(accounts[0]);
    } else {
      setMetamaskAccount(null);
    }
  };

  const handleDisconnect = (error) => {
    // Handle disconnect
    console.log('Metamask disconnected:', error);
    setMetamaskAccount(null);
  };

  const connectMetamask = async () => {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
      console.error('Metamask connection error:', error);
    }
  };

  return (
    <div className="p-4">
      {isMetamaskInstalled ? (
        <>
          {metamaskAccount ? (
            <p className="text-green-500">Connected: {metamaskAccount}</p>
          ) : (
            <button
              onClick={connectMetamask}
              className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none"
            >
              Connect Metamask
            </button>
          )}
        </>
      ) : (
        <p className="text-red-500">Metamask is not installed</p>
      )}
    </div>
  );
};

export default MetamaskLogin;
