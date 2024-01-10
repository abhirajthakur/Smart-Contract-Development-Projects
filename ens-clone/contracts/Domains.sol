// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {ERC721URIStorage, ERC721} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";
import {Base64} from "@openzeppelin/contracts/utils/Base64.sol";
import {StringUtils} from "./libraries/StringUtils.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Domains
 * @author Abhiraj Thakur
 * @dev Domains is a contract that allows users to register domain names.
 * Each registered domain is represented as an ERC721 non-fungible token.
 */
contract Domains is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    string public topLevelDomain;

    // SVG templates for token metadata
    string svgPartOne =
        '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="1000" height="1000" viewBox="0 0 1000 1000" xml:space="preserve"> <desc>Created with Fabric.js 3.5.0</desc> <defs> </defs> <rect x="0" y="0" width="100%" height="100%" fill="#ffffff"> </rect> <g transform="matrix(3.3867 0 0 3.3867 638.127 638.127)" id="756877"  > <g style="" vector-effect="non-scaling-stroke"   > <g transform="matrix(1 0 0 1 -40 -40)"  > <linearGradient id="SVGID_2" gradientUnits="userSpaceOnUse" gradientTransform="matrix(1 0 0 1 0 0)"  x1="0" y1="0" x2="350" y2="350"> <stop offset="0%" style="stop-color:rgb(203,94,238);stop-opacity: 1"/> <stop offset="100%" style="stop-color:rgb(12,215,228);stop-opacity: 0.99"/> </linearGradient> <path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; is-custom-font: none; font-file-url: none; fill: url(#SVGID_2); fill-rule: nonzero; opacity: 1;"  transform=" translate(-135, -135)" d="M 0 0 h 270 v 270 H 0 z" stroke-linecap="round" /> </g> <g transform="matrix(1 0 0 1 -119.9725 -119.986)"  > <path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; is-custom-font: none; font-file-url: none; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;"  transform=" translate(-55.0275, -55.014)" d="M 72.863 42.949 c -0.668 -0.387 -1.426 -0.59 -2.197 -0.59 s -1.529 0.204 -2.197 0.59 l -10.081 6.032 l -6.85 3.934 l -10.081 6.032 c -0.668 0.387 -1.426 0.59 -2.197 0.59 s -1.529 -0.204 -2.197 -0.59 l -8.013 -4.721 a 4.52 4.52 0 0 1 -1.589 -1.616 c -0.384 -0.665 -0.594 -1.418 -0.608 -2.187 v -9.31 c -0.013 -0.775 0.185 -1.538 0.572 -2.208 a 4.25 4.25 0 0 1 1.625 -1.595 l 7.884 -4.59 c 0.668 -0.387 1.426 -0.59 2.197 -0.59 s 1.529 0.204 2.197 0.59 l 7.884 4.59 a 4.52 4.52 0 0 1 1.589 1.616 c 0.384 0.665 0.594 1.418 0.608 2.187 v 6.032 l 6.85 -4.065 v -6.032 c 0.013 -0.775 -0.185 -1.538 -0.572 -2.208 a 4.25 4.25 0 0 0 -1.625 -1.595 L 41.456 24.59 c -0.668 -0.387 -1.426 -0.59 -2.197 -0.59 s -1.529 0.204 -2.197 0.59 l -14.864 8.655 a 4.25 4.25 0 0 0 -1.625 1.595 c -0.387 0.67 -0.585 1.434 -0.572 2.208 v 17.441 c -0.013 0.775 0.185 1.538 0.572 2.208 a 4.25 4.25 0 0 0 1.625 1.595 l 14.864 8.655 c 0.668 0.387 1.426 0.59 2.197 0.59 s 1.529 -0.204 2.197 -0.59 l 10.081 -5.901 l 6.85 -4.065 l 10.081 -5.901 c 0.668 -0.387 1.426 -0.59 2.197 -0.59 s 1.529 0.204 2.197 0.59 l 7.884 4.59 a 4.52 4.52 0 0 1 1.589 1.616 c 0.384 0.665 0.594 1.418 0.608 2.187 v 9.311 c 0.013 0.775 -0.185 1.538 -0.572 2.208 a 4.25 4.25 0 0 1 -1.625 1.595 l -7.884 4.721 c -0.668 0.387 -1.426 0.59 -2.197 0.59 s -1.529 -0.204 -2.197 -0.59 l -7.884 -4.59 a 4.52 4.52 0 0 1 -1.589 -1.616 c -0.385 -0.665 -0.594 -1.418 -0.608 -2.187 v -6.032 l -6.85 4.065 v 6.032 c -0.013 0.775 0.185 1.538 0.572 2.208 a 4.25 4.25 0 0 0 1.625 1.595 l 14.864 8.655 c 0.668 0.387 1.426 0.59 2.197 0.59 s 1.529 -0.204 2.197 -0.59 l 14.864 -8.655 c 0.657 -0.394 1.204 -0.95 1.589 -1.616 s 0.594 -1.418 0.609 -2.187 V 55.538 c 0.013 -0.775 -0.185 -1.538 -0.572 -2.208 a 4.25 4.25 0 0 0 -1.625 -1.595 l -14.993 -8.786 z" stroke-linecap="round" /> </g> <g transform="matrix(1 0 0 1 -73.7622 48.1681)" style=""  > <text xml:space="preserve" font-family="Plus Jakarta Sans,DejaVu Sans,Noto Color Emoji,Apple Color Emoji,sans-serif" font-size="25" font-style="normal" font-weight="bold" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; is-custom-font: none; font-file-url: none; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1; white-space: pre;" > <tspan x="-95.9999" y="7.8535" >';
    string svgPartTwo = "</tspan></text></g></g></g></svg>";

    // Mapping of domain names to owner addresses
    mapping(string domainName => address domainOwner) public domains;

    // Error codes
    error Domains__DomainNotAvailable();
    error Domains__StringCannotBeEmpty();
    error Domains__NotEnoughMoney();
    error Domains__TranserFailed();
    error Domains__InvalidName();

    /**
     * @dev Constructor function.
     * @param tld Top-level domain for this contract.
     */
    constructor(string memory tld) ERC721("Buddy Name Service", "BNS") {
        topLevelDomain = tld;
    }

    /**
     * @dev Register a domain name.
     * @param name The name to register.
     */
    function register(string calldata name) public payable {
        if (domains[name] != address(0)) {
            revert Domains__DomainNotAvailable();
        }
        if (!_isValid(name)) {
            revert Domains__InvalidName();
        }

        uint _price = price(name);
        if (msg.value < _price) {
            revert Domains__NotEnoughMoney();
        }
        string memory _name = string.concat(name, ".", topLevelDomain);
        string memory finalSvg = string.concat(svgPartOne, _name, svgPartTwo);
        uint256 tokenId = _tokenIds.current();

        bytes memory metadataURI = abi.encodePacked(
            "{",
                '"name": "', _name, '", ',
                '"description" : ', '"A domain on the Buddy Name Service", ',
                '"image": "', _svgImageToURI(finalSvg), '"',
            "}"
        );
        string memory json = Base64.encode(metadataURI);

        string memory finalTokenUri = string.concat(
            "data:application/json;base64,",
            json
        );

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, finalTokenUri);
        domains[name] = msg.sender;

        _tokenIds.increment();
    }

    /**
     * @notice Allows only the owner to withdraw all of the contract balance.
     * @dev Sends the contract balance to the owner's address.
     */
    function withdraw() public onlyOwner {
        uint256 amount = address(this).balance;

        (bool success, ) = payable(owner()).call{value: amount}("");
        if (!success) {
            revert Domains__TranserFailed();
        }
    }

    /**
     * @notice Returns the URI of a specific token.
     * @dev Overrides ERC721URIStorage's tokenURI function.
     * @param tokenId The ID of the token to get its URI.
     * @return The URI of the token.
     */
    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    /**
     * @notice Gets the address associated with a domain name.
     * @param name The name of the domain.
     * @return The address associated with the domain name.
     */
    function getDomainAddress(
        string calldata name
    ) public view returns (address) {
        return domains[name];
    }

    /**
     * @notice Calculates the price of a domain name.
     * @param name name The name of the domain.
     * @return The price of the domain name.
     */
    function price(string calldata name) public pure returns (uint) {
        uint256 length = StringUtils.strlen(name);
        if (length == 0) {
            revert Domains__StringCannotBeEmpty();
        }
        if (length < 6) {
            return 1 * 10 ** 17; // 0.1 MATiC
        } else if (length < 10) {
            return 3 * 10 ** 17; // 0.3 MATIC
        } else {
            return 5 * 10 ** 17; // 0.5 MATIC
        }
    }

    /**
     * @notice Converts an SVG image into a base64 URI.
     * @dev Encodes the SVG image into base64 and concatenates it with the base URI.
     * @param svg The SVG image to be converted.
     * @return The base64 URI of the SVG image.
     */
    function _svgImageToURI(
        string memory svg
    ) internal pure returns (string memory) {
        string memory baseURI = "data:image/svg+xml;base64,";
        string memory encodedUri = Base64.encode(bytes(svg));

        return string.concat(baseURI, encodedUri);
    }

    /**
     * @notice Checks if a domain name is valid.
     * @dev A valid domain name has a length between 3 and 25 characters.
     * @param name The name of the domain.
     * @return True if the domain name is valid, false otherwise
     */
    function _isValid(string calldata name) private pure returns (bool) {
        return StringUtils.strlen(name) >= 3 && StringUtils.strlen(name) <= 15;
    }
}
