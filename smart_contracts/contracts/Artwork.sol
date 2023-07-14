// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Artwork {
    // Artwork struct
    struct Art {
        address owner;
        string image;
        string description;
        uint256 price;
        string credentials;
        uint256 quantity;
        bool isVerified;
        string tokenUri;
        address original_artist;
    }

    // Purchase struct
    struct Purchase {
        uint256 id;
        uint256 artId;
        address buyer;
        address seller;
        uint256 amount;
        uint256 total_amount;
        uint256 amounts_paid;
        uint256 amounts_remaining;
        string delivery_state;
        bool delivered_status;

    }
    
    uint256 art_count;
    uint256 purchase_count;

    mapping(uint256 => Art) public artworks;
    mapping(uint256 => Purchase) public purchases;

    // Create Artwork
    function createArt(
        address _owner,
        string memory _image_path,
        string memory _description,
        uint256 _price,
        string memory _credentials,
        uint256 _quantity
    ) public {
        Art storage art = artworks[art_count];
        art.owner = _owner;
        art.image = _image_path;
        art.description = _description;
        art.price = _price;
        art.credentials = _credentials;
        art.quantity = _quantity;
        art.isVerified = false;
        art.tokenUri = "";
        art.original_artist = _owner;
        art_count++;
    }
    
    // Update Product Quantity
    function updateQuantity(
        uint256 art_id,
        uint256 _new_quantity
    ) public returns (uint256) {
        Art storage art = artworks[art_id];
        art.quantity = _new_quantity;
        return art.quantity;
    }

    // Start delivery
    function startDelivery(uint256 purchase_id) public returns (string memory) {
        Purchase storage purchase = purchases[purchase_id];
        purchase.delivery_state = "Dispatched";
        return purchase.delivery_state;
    }

    // Complete delivery
    function completeDelivery(
        uint256 purchase_id
    ) public returns (string memory) {
        Purchase storage purchase = purchases[purchase_id];
        purchase.delivery_state = "Delivered";
        return purchase.delivery_state;
    }

    // To be continued...
    function getArtQuantity(uint256 art_id) public view returns (uint256) {
        Art storage art = artworks[art_id];
        return art.quantity;
    }

    // Not needed
    function issueCertificate(uint256 art_id) public returns (bool) {
        Art storage art = artworks[art_id];
        art.isVerified = true;
        art
            .tokenUri = "https://bafybeiej6epn6i2up5bfmjiil7h5glpeapnclgees5zb6hsokdmyjy2s7y.ipfs.dweb.link/artwork%20%281%29.json";
        return art.isVerified;
    }
    
    // Get All Artworks
    function getArtworks() public view returns (Art[] memory) {
        Art[] memory allArtworks = new Art[](art_count);

        for (uint i = 0; i < art_count; i++) {
            Art storage item = artworks[i];

            allArtworks[i] = item;
        }

        return allArtworks;
    }

    // Purchase Event
    event ArtworkPurchased(
        uint256 artId,
        address buyer,
        address seller,
        uint256 amount
    );

    // Purchase Artwork and add order to purchases
    function buyArtwork(uint256 art_id) public payable {
        Art storage art = artworks[art_id];

        require(art.quantity > 0, "Artwork is out of stock");

        uint256 amount = (10 * art.price)/100;

        require(msg.value == amount, "Incorrect payment amount");

        (bool sent, ) = payable(art.owner).call{value: amount}("");
        require(sent, "Payment failed");

        art.quantity--;

        Purchase storage purchase = purchases[purchase_count];
        purchase.id = purchase_count;
        purchase.artId = art_id;
        purchase.buyer = msg.sender;
        purchase.seller = art.owner;
        purchase.amount = amount;
        purchase.total_amount = art.price;
        purchase.amounts_paid = amount;
        purchase.amounts_remaining = art.price - amount;
        purchase.delivery_state = "in warehouse";
        purchase.delivered_status = false;
        purchase_count++;
        emit ArtworkPurchased(art_id, msg.sender, art.owner, amount);
    }

    function goodsDelivered(uint256 _purchase_id) public payable{
        Purchase storage purchase = purchases[_purchase_id];
        purchase.delivered_status = true;

        Art storage art = artworks[purchase.artId];

        uint256 amount = purchase.amounts_remaining;

        require(msg.value == amount, "Incorrect payment amount");

        (bool sent, ) = payable(art.owner).call{value: amount}("");
        require(sent, "Payment failed");
        emit ArtworkPurchased(purchase.artId, msg.sender, art.owner, amount);
        art.owner = msg.sender;

        purchase.amounts_paid += amount;
        purchase.amounts_remaining -= amount;
    } 

    // Get All Purchases
    function getPurchases() public view returns (Purchase[] memory) {
        Purchase[] memory allPurchases = new Purchase[](purchase_count);
        for (uint i = 0; i < purchase_count; i++) {
            Purchase storage item = purchases[i];
            allPurchases[i] = item;
        }
        return allPurchases;
    }
}
