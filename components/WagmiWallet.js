import { useAccount, useConnect } from 'wagmi'


export default function WagmiWallet() {
    const [{ data, error }, connect] = useConnect();
    const [{ data: accountData }, disconnect] = useAccount({
        fetchEns: true,
    })

 
    if (accountData) {
        return (
            <div className='bg-white max-w-md mx-auto rounded-md p-8'>
                <div>
                    {accountData.ens?.name
                        ? `${accountData.ens?.name} (${accountData.address})`
                        : accountData.address}
                </div>
                <div>Connected to {accountData.connector.name}</div>
                <button onClick={disconnect}>Disconnect</button>
            </div>
        )
    }

    console.log("ACCOUNT DATA:", accountData)

    return (
        <div className='bg-white max-w-md mx-auto rounded-md'>
            {
                data && data.connectors.map((connector, index) => {
                    return (
                        <div
                            key={index}
                            className='p-4 flex justify-between items-center cursor-pointer border-black'
                            onClick={() => connect(connector, 100)}
                        >
                            <button
                                disabled={!connector.ready}
                                key={connector.id}

                            >
                                {connector.name}
                                {!connector.ready && ' (unsupported)'}
                            </button>

                            <img src={connector.options.image} className='w-12 h-12' />

                        </div>
                    )
                })
            }
            {
                error && <div className='text-red-500 p-4 border-t-2'>{error?.message ?? 'Failed to connect'}</div>
            }
        </div>
    )
}
