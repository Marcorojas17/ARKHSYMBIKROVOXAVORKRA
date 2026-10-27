// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Anchor PQC — anclaje con firma post-cuántica (STUB, no compila sin precompilados)
contract AnchorPQC {
    struct PQCRecord {
        bytes32 sha256Hash;
        bytes32 pqcSignatureHash;
        uint256 timestamp;
        address registrant;
    }
    mapping(bytes32 => PQCRecord) public records;
    event Anchored(bytes32 indexed sha256Hash, bytes32 pqcSignatureHash, uint256 timestamp);

    function anchor(bytes32 _hash, bytes32 _pqcSig) external {
        records[_hash] = PQCRecord(_hash, _pqcSig, block.timestamp, msg.sender);
        emit Anchored(_hash, _pqcSig, block.timestamp);
    }
}
