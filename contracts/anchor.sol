// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
contract ArkheAnchor {
    bytes32 public constant MASTER_HASH = [STRIPPED 66 bytes];
    string public constant VAULT_SHA256 = "f8e754032a192a924752652bc19cedf5bd33b85e0e8c04118978f72650667004";
    string public ipfsCID = ""; // pon tu bafy... aquí en CDMX
    address public owner;
    constructor(){owner=msg.sender;}
    function setCID(string calldata _cid) external {require(msg.sender==owner); ipfsCID=_cid;}
    function verify(bytes32 _h) external pure returns(bool){return _h==MASTER_HASH;}
}
