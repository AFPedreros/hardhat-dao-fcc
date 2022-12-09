// @ts-ignore
import { ethers, network } from "hardhat";
import * as fs from "fs";
import { moveBlocks } from "../utils/move-blocks";
import {
    proposalsFile,
    developmentChains,
    VOTING_PERIOD,
} from "../helper-hardhat-config";

const index = 0;

async function main(proposalIndex: number) {
    const governor = await ethers.getContract("GovernorContract");

    const proposals = JSON.parse(fs.readFileSync(proposalsFile, "utf8"));
    const proposalId = proposals[network.config.chainId!][proposalIndex];
    // 0 = Against, 1 = For, 2 = Abstain
    const voteWay = 1;
    const reason = "I like that";
    const voteTxResponse = await governor.castVoteWithReason(
        proposalId,
        voteWay,
        reason
    );
    await voteTxResponse.wait(1);

    if (developmentChains.includes(network.name)) {
        await moveBlocks(VOTING_PERIOD + 1);
    }

    console.log("Voted, ready to go!");
}

main(index)
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });
