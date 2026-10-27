// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract AnchorPQC {
    // Simulación de almacenamiento de firmas Post-Cuánticas
    struct PQCSignature {
        bytes32 hash;
        bytes dilithiumSignature;
        uint256 timestamp;
    }

    mapping(bytes32 => PQCSignature) public signatures;

    event PQCSigned(bytes32 indexed hash, uint256 timestamp);

    function registerSignature(bytes32 _hash, bytes calldata _sig) external {
        require(signatures[_hash].timestamp == 0, "Signature already exists");
        signatures[_hash] = PQCSignature(_hash, _sig, block.timestamp);
        emit PQCSigned(_hash, block.timestamp);
    }
}
