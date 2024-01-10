// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

error Web3GoDaddy__AlreadyMinted();
error Web3GoDaddy__ExceededMaxSupply();
error Web3GoDaddy__InsufficientAmount();

contract Web3GoDaddy is ERC721, Ownable {
    struct Domain {
        string name;
        uint256 cost;
        bool isOwned;
    }

    using Counters for Counters.Counter;

    // Number of domains that can be created
    Counters.Counter public maxSupply;

    // Actual number of domains that have been created
    Counters.Counter public totalSupply;

    // Domains corresponding to an id
    mapping(uint256 => Domain) domains;

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {}

    /**
     * @dev List a domain for sale
     * @param _name name of the domain to be listed
     * @param _cost cost of the domain to be listed
     */
    function list(string memory _name, uint256 _cost) public onlyOwner {
        uint256 currentSupply = maxSupply.current();
        maxSupply.increment();
        domains[currentSupply] = Domain(_name, _cost, false);
    }

    /**
     * @dev Mints a domain to an address with a particular id
     * @param _id id of the domain to be minted
     */
    function mint(uint256 _id) public payable {
        if (_id > maxSupply.current()) {
            revert Web3GoDaddy__ExceededMaxSupply();
        }
        if (domains[_id].isOwned) {
            revert Web3GoDaddy__AlreadyMinted();
        }
        if (msg.value < domains[_id].cost) {
            revert Web3GoDaddy__InsufficientAmount();
        }

        domains[_id].isOwned = true;
        totalSupply.increment();

        _safeMint(msg.sender, _id);
    }

    /**
     * @dev Provides information related to domain of a particular user id
     * @param _id id of the domain to be returned
     */
    function getDomain(uint256 _id) public view returns (Domain memory) {
        return domains[_id];
    }

    /**
     * @dev Returns the balance of the smart contract
     */
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    /**
     * @dev Owner can withdraw the balance from the smart contract
     */
    function withdraw() public onlyOwner {
        (bool success, ) = payable(owner()).call{value: address(this).balance}(
            ""
        );
        require(success);
    }
}
