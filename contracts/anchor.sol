// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ArkheAnchor {
    // Estructura del anclaje
    struct Anchor {
        bytes32 hash;
        string cid;
        uint256 timestamp;
        address owner;
    }

    mapping(bytes32 => Anchor) public anchors;
    mapping(bytes32 => bool) public exists;

    event Anchored(bytes32 indexed hash, string cid, uint256 timestamp, address owner);

    // Registrar un nuevo hash en la blockchain
    function anchor(bytes32 _hash, string calldata _cid) external {
        require(!exists[_hash], "Hash ya registrado");
        
        anchors[_hash] = Anchor({
            hash: _hash,
            cid: _cid,
            timestamp: block.timestamp,
            owner: msg.sender
        });
        
        exists[_hash] = true;
        emit Anchored(_hash, _cid, block.timestamp, msg.sender);
    }

    // Verificar si un hash existe
    function verify(bytes32 _hash) external view returns (bool) {
        return exists[_hash];
    }
}
