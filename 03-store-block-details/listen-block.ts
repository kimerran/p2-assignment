import fs from 'fs'
import { ethers } from 'ethers'

const provider = new ethers.JsonRpcProvider('https://ethereum-rpc.publicnode.com');
const FILENAME = 'blocks.json';

const appendToFile = (block: any) => {
    const fileResponse = fs.readFileSync(FILENAME, 'utf8')
    let contentArray = []
    if (fileResponse) {
        contentArray = JSON.parse(fileResponse)
    }
    contentArray.push(block)

    fs.writeFileSync(FILENAME, JSON.stringify(contentArray, null, 2))
}

provider.on('block', (blockNumber) => {
    console.log(`New block mined: ${blockNumber}`);
    provider.getBlock(blockNumber).then((block) => {
        appendToFile(block)
    }).catch((error) => {
        console.error(`Error fetching block details: ${error}`);
    });
});