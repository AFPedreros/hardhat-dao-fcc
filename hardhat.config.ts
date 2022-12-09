import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "hardhat-deploy";
import { HardhatUserConfig } from "hardhat/config";
/** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//     solidity: "0.8.8",
// };

const config: HardhatUserConfig = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: { chainId: 31337, allowUnlimitedContractSize: true },
        localhost: { chainId: 31337, allowUnlimitedContractSize: true },
    },
    solidity: "0.8.9",
    namedAccounts: {
        deployer: {
            default: 0,
        },
    },
};

export default config;
