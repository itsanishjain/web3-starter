import Layout from '../components/Layout'
import '../styles/globals.css'

import { Provider, chain, defaultChains } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

const infuraId = process.env.NEXT_PUBLIC_INFURA_ID

const chains = defaultChains

// Set up connectors
const connectors = ({ chainId }) => {
  // const rpcUrl = chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ?? chain.mainnet.rpcUrls[0];
  return [
    new InjectedConnector({
      chains,
      options: { shimDisconnect: true, image: "./metamask.png" },
    }),
    new WalletConnectConnector({
      options: {
        infuraId,
        qrcode: true,
        image: "./walletconnect.svg",
        // jsonRpcUrl: `${rpcUrl}/${infuraId}`,
      },
    }),
  ]
}



function MyApp({ Component, pageProps }) {
  return (
    <Provider connectors={connectors}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>

  )
}

export default MyApp
