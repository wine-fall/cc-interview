import { getNonce } from "@/app/actions/getNonce";
import { useState, useTransition } from "react";
import { SiweMessage } from "siwe";
import { useAccount, useSignMessage } from "wagmi";
import { verifyNonce } from "@/app/actions/verifyNonce";

export function SignInButton() {
  const [isPending, startTransition] = useTransition();
  const { address, chainId } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [error, setError] = useState<string>();
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const handleSignIn = () => {
    startTransition(async () => {
        if (!address || !chainId) {
            setError('Connect to a wallet first.');
            return;
        }
        const nonce = await getNonce();
        const message = new SiweMessage({
            domain: window.location.host,
            address,
            statement: 'Sign in with Ethereum to the app.',
            uri: window.location.origin,
            version: '1',
            chainId,
            nonce,
        });
        const signature = await signMessageAsync({
            message: message.prepareMessage(),
        });
        const response = await verifyNonce(JSON.stringify(message), signature);
            console.log(response, message);
        if (response.ok) {
            setIsSignedIn(true);
        } else {
            setError(response.error);
        }
    })
  }
  if (isSignedIn) {
    return <div>Successfully signed in!</div>;
  }
  return (
    <div>
      <button onClick={handleSignIn} disabled={isPending}>{isPending ? 'logging in ...' : 'Sign In With SIWE'}</button>
      {error && <div>{error}</div>}
    </div>
  );
}