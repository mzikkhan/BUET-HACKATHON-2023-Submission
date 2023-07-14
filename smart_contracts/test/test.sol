// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/CrowdFunding.sol";

contract TestCrowdFunding {
    function testCreateCampaign() public {
        CrowdFunding crowdFunding = CrowdFunding(
            DeployedAddresses.CrowdFunding()
        );

        string memory title = "Test Campaign";
        string memory description = "Test Campaign Description";
        uint256 target = 1000;
        uint256 deadline = block.timestamp + 7 days;
        string memory image = "test-image-hash";

        uint256 campaignId = crowdFunding.createCampaign(
            address(this),
            title,
            description,
            target,
            deadline,
            image
        );

        CrowdFunding.Campaign memory campaign = crowdFunding.campaigns(
            campaignId
        );

        Assert.equal(campaign.title, title, "Campaign title does not match");
        Assert.equal(
            campaign.description,
            description,
            "Campaign description does not match"
        );
        Assert.equal(campaign.target, target, "Campaign target does not match");
        Assert.equal(
            campaign.deadline,
            deadline,
            "Campaign deadline does not match"
        );
        Assert.equal(
            campaign.amountCollected,
            0,
            "Campaign amount collected should be 0"
        );
        Assert.equal(campaign.image, image, "Campaign image does not match");
    }

    function testDonateToCampaign() public {
        CrowdFunding crowdFunding = CrowdFunding(
            DeployedAddresses.CrowdFunding()
        );

        uint256 target = 1000;
        uint256 deadline = block.timestamp + 7 days;

        uint256 campaignId = crowdFunding.createCampaign(
            address(this),
            "Test Campaign",
            "Test Campaign Description",
            target,
            deadline,
            "test-image-hash"
        );

        uint256 donationAmount = 500;

        crowdFunding.donateToCampaign{value: donationAmount}(campaignId);

        CrowdFunding.Campaign memory campaign = crowdFunding.campaigns(
            campaignId
        );

        Assert.equal(
            campaign.amountCollected,
            donationAmount,
            "Campaign amount collected does not match"
        );
        Assert.equal(
            campaign.donators.length,
            1,
            "Number of donators should be 1"
        );
        Assert.equal(
            campaign.donators[0],
            address(this),
            "Donator address does not match"
        );
        Assert.equal(
            campaign.donations.length,
            1,
            "Number of donations should be 1"
        );
        Assert.equal(
            campaign.donations[0],
            donationAmount,
            "Donation amount does not match"
        );
    }

    function testGetDonators() public {
        CrowdFunding crowdFunding = CrowdFunding(
            DeployedAddresses.CrowdFunding()
        );

        uint256 target = 1000;
        uint256 deadline = block.timestamp + 7 days;

        uint256 campaignId = crowdFunding.createCampaign(
            address(this),
            "Test Campaign",
            "Test Campaign Description",
            target,
            deadline,
            "test-image-hash"
        );

        uint256 donationAmount = 500;

        crowdFunding.donateToCampaign{value: donationAmount}(campaignId);

        (address[] memory donators, uint256[] memory donations) = crowdFunding
            .getDonators(campaignId);

        Assert.equal(donators.length, 1, "Number of donators should be 1");
        Assert.equal(
            donators[0],
            address(this),
            "Donator address does not match"
        );
        Assert.equal(donations.length, 1, "Number of donations should be 1");
        Assert.equal(
            donations[0],
            donationAmount,
            "Donation amount does not match"
        );
    }

    function testGetCampaigns() public {
        CrowdFunding crowdFunding = CrowdFunding(
            DeployedAddresses.CrowdFunding()
        );

        string memory title1 = "Test Campaign 1";
        string memory description1 = "Test Campaign Description 1";
        uint256 target1 = 1000;
        uint256 deadline1 = block.timestamp + 7 days;
        string memory image1 = "test-image-hash-1";

        uint256 campaignId1 = crowdFunding.createCampaign(
            address(this),
            title1,
            description1,
            target1,
            deadline1,
            image1
        );

        string memory title2 = "Test Campaign 2";
        string memory description2 = "Test Campaign Description 2";
        uint256 target2 = 2000;
        uint256 deadline2 = block.timestamp + 14 days;
        string memory image2 = "test-image-hash-2";

        uint256 campaignId2 = crowdFunding.createCampaign(
            address(this),
            title2,
            description2,
            target2,
            deadline2,
            image2
        );

        CrowdFunding.Campaign[] memory campaigns = crowdFunding.getCampaigns();

        Assert.equal(campaigns.length, 2, "Number of campaigns should be 2");

        Assert.equal(
            campaigns[0].title,
            title1,
            "Campaign 1 title does not match"
        );
        Assert.equal(
            campaigns[0].description,
            description1,
            "Campaign 1 description does not match"
        );
        Assert.equal(
            campaigns[0].target,
            target1,
            "Campaign 1 target does not match"
        );
        Assert.equal(
            campaigns[0].deadline,
            deadline1,
            "Campaign 1 deadline does not match"
        );
        Assert.equal(
            campaigns[0].amountCollected,
            0,
            "Campaign 1 amount collected should be 0"
        );
        Assert.equal(
            campaigns[0].image,
            image1,
            "Campaign 1 image does not match"
        );

        Assert.equal(
            campaigns[1].title,
            title2,
            "Campaign 2 title does not match"
        );
        Assert.equal(
            campaigns[1].description,
            description2,
            "Campaign 2 description does not match"
        );
        Assert.equal(
            campaigns[1].target,
            target2,
            "Campaign 2 target does not match"
        );
        Assert.equal(
            campaigns[1].deadline,
            deadline2,
            "Campaign 2 deadline does not match"
        );
        Assert.equal(
            campaigns[1].amountCollected,
            0,
            "Campaign 2 amount collected should be 0"
        );
        Assert.equal(
            campaigns[1].image,
            image2,
            "Campaign 2 image does not match"
        );
    }
}
