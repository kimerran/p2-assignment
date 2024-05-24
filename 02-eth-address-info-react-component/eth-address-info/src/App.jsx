import { useState } from "react"
import { ethers } from "ethers"
import "./App.css"

const provider = new ethers.JsonRpcProvider(
  "https://ethereum-rpc.publicnode.com"
)

function App() {
  const [address, setAddress] = useState("")
  const [balance, setBalance] = useState("")
  const [checksumAddress, setChecksumAddress] = useState("")
  const [ensAddress, setEnsAddress] = useState("")

  const getBalance = () => {
    setBalance("Loading...")
    setEnsAddress("Resolving...")
    const checkSumAddress = ethers.getAddress(address)

    provider.lookupAddress(checkSumAddress).then((ens) => {
      setEnsAddress(ens)
    })
    setChecksumAddress(checkSumAddress)

    try {
      provider.getBalance(checkSumAddress).then((balance) => {
        console.log("Balance:", balance)

        setBalance(ethers.formatEther(balance))
      })
    } catch (error) {
      console.log("error", error)
    }
  }

  const handleAddressChange = (event) => {
    setAddress(event.target.value)
  }

  const copyChecksumAddressToClipboard = () => {
    console.log('checkSumAddress', checksumAddress)
    navigator.clipboard.writeText(checksumAddress);
    alert('Checksum Address copied to clipboard!')
  }

  return (
    <>
    <div>
    <p>
      Enter an Ethereum address to get the balance and ENS name
    </p>
    <p>Example: 0xdfa34343D3D6aFF264B176D75252065a182D7852</p>
    <p>Or 0x83fe64bc14b124f65eb5249b9ba45b66e3effe4c</p>
    </div>
      <input value={address} onChange={handleAddressChange} type="text"></input>
      <input
        type="button"
        onClick={() => getBalance()}
        value="Get Balance"
      ></input>

      <div>
        <h3>Output</h3>
        {balance && <p>Balance (ETH): <strong>{balance}</strong></p>}
        {checksumAddress && <p>Checksum Address: <strong>{checksumAddress}</strong></p>}
        {checksumAddress && <input type='button' onClick={copyChecksumAddressToClipboard} value='Copy Checksum Address'></input>}
        {ensAddress && <p>ENS Address: <strong>{ensAddress}</strong></p>}
      </div>
    </>
  )
}

export default App
