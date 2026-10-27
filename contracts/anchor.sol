// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
contract ArkheAnchor {
    bytes32 public constant MASTER_HASH = [STRIPPED 66 bytes];
    string public constant VAULT_SHA256 = "77a473e965d0337224b1a656dedbce103bbd6a5e66096425c5aa56fa82ba9382";
    string public ipfsCID = "QmNXN4oMkWd4yaFCPGjrW5D4DgrDNLjYHyFNpWNC4owxR6";
    address public owner;
    constructor(){owner=msg.sender;}
    function setCID(string calldata _cid) external {require(msg.sender==owner); ipfsCID=_cid;}
}
