import * as React from 'react'
import { usePrepareContractWrite } from 'wagmi'
 
export function MintNFT() {
  const { config } = usePrepareContractWrite({
    address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
    abi: [
      {
        name: 'mint',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [],
        outputs: [],
      },
    ],
    functionName: 'mint',
  })
 
  return (
    <div>
      <button>Mint</button>
    </div>
  )
}