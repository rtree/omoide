// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract OmoideStorage {
    struct Data {
        string message;
        string profilePic;
        bytes32 dataHash;
        bytes dataSignature;
    }

    mapping(string => Data) public dataStore;

    function storeData(
        string memory uuid,
        string memory message,
        string memory profilePic,
        bytes32 dataHash,
        bytes memory dataSignature
    ) public {
        Data memory newData = Data({
            message: message,
            profilePic: profilePic,
            dataHash: dataHash,
            dataSignature: dataSignature
        });

        dataStore[uuid] = newData;
    }

    function getData(string memory uuid) public view returns (string memory, string memory, bytes32, bytes memory) {
        Data memory data = dataStore[uuid];
        return (data.message, data.profilePic, data.dataHash, data.dataSignature);
    }
}
