// modify these inputs to generate the calldata for the transfer function of an ERC20 token
const erc20Address: string = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'
const recipient: string = '0xEae27d241f9c4C17B8bA0ED702e309dA023755A3'
const amount = '10.5'

function toWei(ether: number | string): BigInt {
    let [integerPart, fractionalPart] = ether.toString().split('.');
    fractionalPart = fractionalPart || '0';
    let weiString = integerPart + fractionalPart.padEnd(18, '0').slice(0, 18);
    return BigInt(weiString);
}

const encodeAddress = (address: string) => address.toLowerCase().replace(/^0x/, '').padStart(64, '0');
const encodeAmount = (amount: BigInt) => Number(amount).toString(16).padStart(64, '0');

const generateFunctionData = (tokenAddress: string, recipient: string, amount: BigInt) => {
    const encodedAddress = encodeAddress(tokenAddress);
    const encodedRecipient = encodeAddress(recipient);
    const encodedAmount = encodeAmount((amount));
    return `${encodedAddress}${encodedRecipient}${encodedAmount}`
}

const amountInWei = toWei(amount);

const calldata = generateFunctionData(erc20Address, recipient, toWei(amount))

console.log(calldata)
