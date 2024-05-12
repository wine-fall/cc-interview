"use client"
import { useAccount, useConnect, useDisconnect } from "wagmi";
import styles from './walletbtn.module.css'
import { useEffect, useState } from "react";
import { Account } from "../Account/Account";

export default function WalletBtn() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
      setMounted(true)
  }, [])

  const { isConnected } = useAccount();
  const { connect, connectors, error } = useConnect();
  const { disconnect } = useDisconnect();

  return !mounted ? null : isConnected 
    ? (
      <Account />
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