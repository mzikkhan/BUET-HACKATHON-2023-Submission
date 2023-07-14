// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Auction {
    struct AuctionArt {
        address owner;
        string image;
        string description;
        uint256 bid;
        string credentials;
        uint256 deadline;
    }

    uint256 auction_art_count;
    
    mapping(uint256 => AuctionArt) public auction_arts;

    function createAuctionArt(
        address _owner,
        string memory _image_path,
        string memory _description,
        uint256 _bid,
        string memory _credentials,
        uint256 _deadline
    ) public {
        AuctionArt storage auction_art = auction_arts[auction_art_count];
        auction_art.owner = _owner;
        auction_art.image = _image_path;
        auction_art.description = _description;
        auction_art.bid = _bid;
        auction_art.credentials = _credentials;
        auction_art.deadline = _deadline;
        auction_art_count++;
    }

    // Update Bid
    function updateBid(
        uint256 auction_art_id,
        uint256 _new_bid
    ) public returns (uint256) {
        AuctionArt storage auction_art = auction_arts[auction_art_id];
        auction_art.bid = _new_bid;
        return auction_art.bid;
    }

    // Get All Auction Artworks
    function getAuctionArtworks() public view returns (AuctionArt[] memory) {
        AuctionArt[] memory allAuctionArtworks = new AuctionArt[](
            auction_art_count
        );

        for (uint i = 0; i < auction_art_count; i++) {
            AuctionArt storage item = auction_arts[i];

            allAuctionArtworks[i] = item;
        }

        return allAuctionArtworks;
    }



}