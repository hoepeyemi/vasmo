// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@pythnetwork/pyth-sdk-solidity/PythStructs.sol";

contract MockPyth {
    int64 public ethPrice = 200000000000;
    bool public shouldRevert = false;

    function setEthPrice(int64 _price) external {
        ethPrice = _price;
    }

    function setShouldRevert(bool _shouldRevert) external {
        shouldRevert = _shouldRevert;
    }

    function getUpdateFee(bytes[] calldata) external pure returns (uint256) {
        return 0;
    }

    function updatePriceFeeds(bytes[] calldata) external payable {}

    function getPriceNoOlderThan(bytes32 id, uint256) external view returns (PythStructs.Price memory) {
        require(!shouldRevert, "Mock revert");

        bytes32 ethUsdFeed = 0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace;
        if (id == ethUsdFeed) {
            return PythStructs.Price({price: ethPrice, conf: 1000000, expo: -8, publishTime: block.timestamp});
        }

        revert("Unknown price feed");
    }

    function getValidTimePeriod() external pure returns (uint256) {
        return 3600;
    }
}
