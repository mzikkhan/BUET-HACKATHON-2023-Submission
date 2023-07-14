// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserRegistration {
    struct User {
        address wallet;
        string type1;
    }

    mapping(address => User) private users;

    event UserRegistered(
        address indexed userAddress,
        address wallet,
        string type1
    );

    function registerUser(address _wallet, string memory _type1) public {
        require(_wallet != address(0), "Wallet is required");
        require(bytes(_type1).length > 0, "Type is required");
        require(
            users[msg.sender].wallet == address(0),
            "User is already registered"
        );

        User memory newUser = User({wallet: _wallet, type1: _type1});

        users[msg.sender] = newUser;

        emit UserRegistered(msg.sender, _wallet, _type1);
    }

    function getUser(
        address _userAddress
    ) public view returns (address, string memory) {
        return (users[_userAddress].wallet, users[_userAddress].type1);
    }
}
