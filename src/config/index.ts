import { http, createConfig } from 'wagmi';
import { base, mainnet, optimism } from 'wagmi/chains';
import { metaMask } from 'wagmi/connectors';


export const config = createConfig({
  chains: [mainnet, optimism, base],
  connectors: [metaMask()],
  transports: {
    [mainnet.id]: http(),
    [optimism.id]: http(),
    [base.id]: http(),
  },
});