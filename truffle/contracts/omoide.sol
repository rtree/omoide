// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract OmoideStorage {
    struct Data {
        string message;
    }

    mapping(string => Data) public dataStore;

    function storeData(
        string memory uuid,
        string memory message
    ) public {
        Data memory newData = Data({
            message: message
        });

        dataStore[uuid] = newData;
    }

    function getData(string memory uuid) public view returns (string memory) {
        Data memory data = dataStore[uuid];
        return data.message;
    }
}
