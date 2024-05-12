import { http, createConfig } from 'wagmi';
import { base, mainnet, optimism } from 'wagmi/chains';
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors';

const projectId = 'aa89dec3f44cf05ef9119ebd7a91b8d7'

export const config = createConfig({
  chains: [mainnet, optimism, base],
  connectors: [metaMask({
    dappMetadata: {
      name: 'cc-interview'
    }
  })],
  transports: {
    [mainnet.id]: http(),
    [optimism.id]: http(),
    [base.id]: http(),
  },
});