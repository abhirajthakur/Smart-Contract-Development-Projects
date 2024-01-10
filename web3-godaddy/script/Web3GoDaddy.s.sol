// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/Web3GoDaddy.sol";

contract Web3GoDaddyScript is Script {
    Web3GoDaddy web3GoDaddy;

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        web3GoDaddy = new Web3GoDaddy("Web3 Hostinger", "W3H");
        vm.stopBroadcast();
    }

    // Only run for testing
    function listDomains() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        string[4] memory names = [
            "noname.eth",
            "jhonny.eth",
            "namaste.888",
            "abhirajthakur.nft"
        ];
        uint64[4] memory costs = [
            0.101 ether,
            0.29 ether,
            0.15 ether,
            0.14 ether
        ];

        for (uint i = 0; i < 4; i++) {
            web3GoDaddy.list(names[i], costs[i]);
        }

        for (uint i = 0; i < 4; i++) {
            console.log("Listed Domain", i + 1, ":", names[i]);
        }

        vm.stopBroadcast();
    }
}
