"use client"

import { useAccount, useConnect, useDisconnect } from "wagmi";
import styles from './walletbtn.module.css'
import { useEffect, useState } from "react";


export function useIsMounted(): boolean {
  const [isMounted, setIsMounted] = useState<boolean>(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return isMounted
}

export default function WalletBtn() {
  const { isConnected } = useAccount();
  const { connect, connectors, error } = useConnect();
  const { disconnect } = useDisconnect();

  const isMounted = useIsMounted()

  if (!isMounted) {
    return null;
  }

  return isConnected 
    ? (
      <button onClick={() => disconnect()}>Disconnect Wallet</button>
    ) : (
    <div>
      {connectors.map((connector) => (
        <button
          className={styles.walletBtn}
          key={connector.id} onClick={() => connect({ connector })}
        >
          Connect with {connector.name}
        </button>
      ))}
      {error && <p>{error.message}</p>}
    </div>
  );
}