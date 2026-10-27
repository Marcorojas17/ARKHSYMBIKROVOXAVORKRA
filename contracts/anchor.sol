// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Anchor {
    struct Record {
        bytes32 sha256Hash;
        uint256 timestamp;
        address registrant;
        string cid;
    }
    mapping(bytes32 => Record) public records;
    mapping(bytes32 => bool) public registered;
    event Registered(bytes32 indexed sha256Hash, address indexed registrant, uint256 timestamp, string cid);
    function register(bytes32 _hash, string calldata _cid) external {
        require(!registered[_hash], "Hash ya registrado");
        records[_hash] = Record(_hash, block.timestamp, msg.sender, _cid);
        registered[_hash] = true;
        emit Registered(_hash, msg.sender, block.timestamp, _cid);
    }
    function verify(bytes32 _hash) external view returns (bool, uint256, address, string memory) {
        if (!registered[_hash]) return (false, 0, address(0), "");
        Record memory r = records[_hash];
        return (true, r.timestamp, r.registrant, r.cid);
    }
}
