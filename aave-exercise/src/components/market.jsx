import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const Market = () => {
  // State to hold fetched market data

  // {
  //   totalSupplied: null,
  //   supplyAPY: null,
  //   totalBorrowed: null,
  //   borrowAPY: null,
  // }
  const [marketData, setMarketData] = useState([]);

  useEffect(() => {
    async function fetchMarketData() {
      try {
        // TODO: Hide the api url
        const provider = new ethers.JsonRpcProvider("https://mainnet.infura.io/v3/5cf1c814b16c499fa255745c00bd80c7");
        console.log(provider);
        //AaveDataProvider contract address
        const contractAddress = "0xE206AEbca7B28e3E8d6787df00B010D4a77c32F3";
        const abi = [
          {
            "inputs": [
              {
                "internalType": "contract IPoolAddressesProvider",
                "name": "addressesProvider",
                "type": "address"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
          },
          {
            "inputs": [],
            "name": "ADDRESSES_PROVIDER",
            "outputs": [
              {
                "internalType": "contract IPoolAddressesProvider",
                "name": "",
                "type": "address"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "asset",
                "type": "address"
              }
            ],
            "name": "getATokenTotalSupply",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "getAllATokens",
            "outputs": [
              {
                "components": [
                  {
                    "internalType": "string",
                    "name": "symbol",
                    "type": "string"
                  },
                  {
                    "internalType": "address",
                    "name": "tokenAddress",
                    "type": "address"
                  }
                ],
                "internalType": "struct IPoolDataProvider.TokenData[]",
                "name": "",
                "type": "tuple[]"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "getAllReservesTokens",
            "outputs": [
              {
                "components": [
                  {
                    "internalType": "string",
                    "name": "symbol",
                    "type": "string"
                  },
                  {
                    "internalType": "address",
                    "name": "tokenAddress",
                    "type": "address"
                  }
                ],
                "internalType": "struct IPoolDataProvider.TokenData[]",
                "name": "",
                "type": "tuple[]"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "asset",
                "type": "address"
              }
            ],
            "name": "getDebtCeiling",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "getDebtCeilingDecimals",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "pure",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "asset",
                "type": "address"
              }
            ],
            "name": "getFlashLoanEnabled",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "asset",
                "type": "address"
              }
            ],
            "name": "getInterestRateStrategyAddress",
            "outputs": [
              {
                "internalType": "address",
                "name": "irStrategyAddress",
                "type": "address"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "asset",
                "type": "address"
              }
            ],
            "name": "getLiquidationProtocolFee",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "asset",
                "type": "address"
              }
            ],
            "name": "getPaused",
            "outputs": [
              {
                "internalType": "bool",
                "name": "isPaused",
                "type": "bool"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "asset",
                "type": "address"
              }
            ],
            "name": "getReserveCaps",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "borrowCap",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "supplyCap",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "asset",
                "type": "address"
              }
            ],
            "name": "getReserveConfigurationData",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "decimals",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "ltv",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "liquidationThreshold",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "liquidationBonus",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "reserveFactor",
                "type": "uint256"
              },
              {
                "internalType": "bool",
                "name": "usageAsCollateralEnabled",
                "type": "bool"
              },
              {
                "internalType": "bool",
                "name": "borrowingEnabled",
                "type": "bool"
              },
              {
                "internalType": "bool",
                "name": "stableBorrowRateEnabled",
                "type": "bool"
              },
              {
                "internalType": "bool",
                "name": "isActive",
                "type": "bool"
              },
              {
                "internalType": "bool",
                "name": "isFrozen",
                "type": "bool"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "asset",
                "type": "address"
              }
            ],
            "name": "getReserveData",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "unbacked",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "accruedToTreasuryScaled",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "totalAToken",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "totalStableDebt",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "totalVariableDebt",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "liquidityRate",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "variableBorrowRate",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "stableBorrowRate",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "averageStableBorrowRate",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "liquidityIndex",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "variableBorrowIndex",
                "type": "uint256"
              },
              {
                "internalType": "uint40",
                "name": "lastUpdateTimestamp",
                "type": "uint40"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "asset",
                "type": "address"
              }
            ],
            "name": "getReserveEModeCategory",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "asset",
                "type": "address"
              }
            ],
            "name": "getReserveTokensAddresses",
            "outputs": [
              {
                "internalType": "address",
                "name": "aTokenAddress",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "stableDebtTokenAddress",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "variableDebtTokenAddress",
                "type": "address"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "asset",
                "type": "address"
              }
            ],
            "name": "getSiloedBorrowing",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "asset",
                "type": "address"
              }
            ],
            "name": "getTotalDebt",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "asset",
                "type": "address"
              }
            ],
            "name": "getUnbackedMintCap",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "asset",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "user",
                "type": "address"
              }
            ],
            "name": "getUserReserveData",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "currentATokenBalance",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "currentStableDebt",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "currentVariableDebt",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "principalStableDebt",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "scaledVariableDebt",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "stableBorrowRate",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "liquidityRate",
                "type": "uint256"
              },
              {
                "internalType": "uint40",
                "name": "stableRateLastUpdated",
                "type": "uint40"
              },
              {
                "internalType": "bool",
                "name": "usageAsCollateralEnabled",
                "type": "bool"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          }
        ];
        
        // Playing with different contracts to get reserve data
        // UiPoolDataProvider
        // const dataContractAddress = "0x7BE637cA0e8B5623345C365A9a8248E5f3550A29";
        // const dataAbi = [
        //   {
        //     "inputs": [
        //       {
        //         "internalType": "contract ISturdyIncentivesController",
        //         "name": "_incentivesController",
        //         "type": "address"
        //       },
        //       {
        //         "internalType": "contract IPriceOracleGetter",
        //         "name": "_oracle",
        //         "type": "address"
        //       }
        //     ],
        //     "stateMutability": "nonpayable",
        //     "type": "constructor"
        //   },
        //   {
        //     "inputs": [
        //       {
        //         "internalType": "contract ILendingPoolAddressesProvider",
        //         "name": "provider",
        //         "type": "address"
        //       },
        //       {
        //         "internalType": "address",
        //         "name": "user",
        //         "type": "address"
        //       }
        //     ],
        //     "name": "getReservesData",
        //     "outputs": [
        //       {
        //         "components": [
        //           {
        //             "internalType": "address",
        //             "name": "underlyingAsset",
        //             "type": "address"
        //           },
        //           {
        //             "internalType": "string",
        //             "name": "name",
        //             "type": "string"
        //           },
        //           {
        //             "internalType": "string",
        //             "name": "symbol",
        //             "type": "string"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "decimals",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "baseLTVasCollateral",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "reserveLiquidationThreshold",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "reserveLiquidationBonus",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "reserveFactor",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "bool",
        //             "name": "usageAsCollateralEnabled",
        //             "type": "bool"
        //           },
        //           {
        //             "internalType": "bool",
        //             "name": "borrowingEnabled",
        //             "type": "bool"
        //           },
        //           {
        //             "internalType": "bool",
        //             "name": "stableBorrowRateEnabled",
        //             "type": "bool"
        //           },
        //           {
        //             "internalType": "bool",
        //             "name": "isActive",
        //             "type": "bool"
        //           },
        //           {
        //             "internalType": "bool",
        //             "name": "isFrozen",
        //             "type": "bool"
        //           },
        //           {
        //             "internalType": "uint128",
        //             "name": "liquidityIndex",
        //             "type": "uint128"
        //           },
        //           {
        //             "internalType": "uint128",
        //             "name": "variableBorrowIndex",
        //             "type": "uint128"
        //           },
        //           {
        //             "internalType": "uint128",
        //             "name": "liquidityRate",
        //             "type": "uint128"
        //           },
        //           {
        //             "internalType": "uint128",
        //             "name": "variableBorrowRate",
        //             "type": "uint128"
        //           },
        //           {
        //             "internalType": "uint128",
        //             "name": "stableBorrowRate",
        //             "type": "uint128"
        //           },
        //           {
        //             "internalType": "uint40",
        //             "name": "lastUpdateTimestamp",
        //             "type": "uint40"
        //           },
        //           {
        //             "internalType": "address",
        //             "name": "aTokenAddress",
        //             "type": "address"
        //           },
        //           {
        //             "internalType": "address",
        //             "name": "stableDebtTokenAddress",
        //             "type": "address"
        //           },
        //           {
        //             "internalType": "address",
        //             "name": "variableDebtTokenAddress",
        //             "type": "address"
        //           },
        //           {
        //             "internalType": "address",
        //             "name": "interestRateStrategyAddress",
        //             "type": "address"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "availableLiquidity",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "totalPrincipalStableDebt",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "averageStableRate",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "stableDebtLastUpdateTimestamp",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "totalScaledVariableDebt",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "priceInEth",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "variableRateSlope1",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "variableRateSlope2",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "stableRateSlope1",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "stableRateSlope2",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "capacity",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "aEmissionPerSecond",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "vEmissionPerSecond",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "sEmissionPerSecond",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "aIncentivesLastUpdateTimestamp",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "vIncentivesLastUpdateTimestamp",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "sIncentivesLastUpdateTimestamp",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "aTokenIncentivesIndex",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "vTokenIncentivesIndex",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "sTokenIncentivesIndex",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "bool",
        //             "name": "leverageEnabled",
        //             "type": "bool"
        //           }
        //         ],
        //         "internalType": "struct IUiPoolDataProvider.AggregatedReserveData[]",
        //         "name": "",
        //         "type": "tuple[]"
        //       },
        //       {
        //         "components": [
        //           {
        //             "internalType": "address",
        //             "name": "underlyingAsset",
        //             "type": "address"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "scaledATokenBalance",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "bool",
        //             "name": "usageAsCollateralEnabledOnUser",
        //             "type": "bool"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "stableBorrowRate",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "scaledVariableDebt",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "principalStableDebt",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "stableBorrowLastUpdateTimestamp",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "aTokenincentivesUserIndex",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "vTokenincentivesUserIndex",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "sTokenincentivesUserIndex",
        //             "type": "uint256"
        //           }
        //         ],
        //         "internalType": "struct IUiPoolDataProvider.UserReserveData[]",
        //         "name": "",
        //         "type": "tuple[]"
        //       },
        //       {
        //         "internalType": "uint256",
        //         "name": "",
        //         "type": "uint256"
        //       },
        //       {
        //         "components": [
        //           {
        //             "internalType": "uint256",
        //             "name": "userUnclaimedRewards",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "emissionEndTimestamp",
        //             "type": "uint256"
        //           }
        //         ],
        //         "internalType": "struct IUiPoolDataProvider.IncentivesControllerData",
        //         "name": "",
        //         "type": "tuple"
        //       }
        //     ],
        //     "stateMutability": "view",
        //     "type": "function"
        //   },
        //   {
        //     "inputs": [
        //       {
        //         "internalType": "contract ILendingPoolAddressesProvider",
        //         "name": "provider",
        //         "type": "address"
        //       }
        //     ],
        //     "name": "getReservesList",
        //     "outputs": [
        //       {
        //         "internalType": "address[]",
        //         "name": "",
        //         "type": "address[]"
        //       }
        //     ],
        //     "stateMutability": "view",
        //     "type": "function"
        //   },
        //   {
        //     "inputs": [
        //       {
        //         "internalType": "contract ILendingPoolAddressesProvider",
        //         "name": "provider",
        //         "type": "address"
        //       }
        //     ],
        //     "name": "getSimpleReservesData",
        //     "outputs": [
        //       {
        //         "components": [
        //           {
        //             "internalType": "address",
        //             "name": "underlyingAsset",
        //             "type": "address"
        //           },
        //           {
        //             "internalType": "string",
        //             "name": "name",
        //             "type": "string"
        //           },
        //           {
        //             "internalType": "string",
        //             "name": "symbol",
        //             "type": "string"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "decimals",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "baseLTVasCollateral",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "reserveLiquidationThreshold",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "reserveLiquidationBonus",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "reserveFactor",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "bool",
        //             "name": "usageAsCollateralEnabled",
        //             "type": "bool"
        //           },
        //           {
        //             "internalType": "bool",
        //             "name": "borrowingEnabled",
        //             "type": "bool"
        //           },
        //           {
        //             "internalType": "bool",
        //             "name": "stableBorrowRateEnabled",
        //             "type": "bool"
        //           },
        //           {
        //             "internalType": "bool",
        //             "name": "isActive",
        //             "type": "bool"
        //           },
        //           {
        //             "internalType": "bool",
        //             "name": "isFrozen",
        //             "type": "bool"
        //           },
        //           {
        //             "internalType": "uint128",
        //             "name": "liquidityIndex",
        //             "type": "uint128"
        //           },
        //           {
        //             "internalType": "uint128",
        //             "name": "variableBorrowIndex",
        //             "type": "uint128"
        //           },
        //           {
        //             "internalType": "uint128",
        //             "name": "liquidityRate",
        //             "type": "uint128"
        //           },
        //           {
        //             "internalType": "uint128",
        //             "name": "variableBorrowRate",
        //             "type": "uint128"
        //           },
        //           {
        //             "internalType": "uint128",
        //             "name": "stableBorrowRate",
        //             "type": "uint128"
        //           },
        //           {
        //             "internalType": "uint40",
        //             "name": "lastUpdateTimestamp",
        //             "type": "uint40"
        //           },
        //           {
        //             "internalType": "address",
        //             "name": "aTokenAddress",
        //             "type": "address"
        //           },
        //           {
        //             "internalType": "address",
        //             "name": "stableDebtTokenAddress",
        //             "type": "address"
        //           },
        //           {
        //             "internalType": "address",
        //             "name": "variableDebtTokenAddress",
        //             "type": "address"
        //           },
        //           {
        //             "internalType": "address",
        //             "name": "interestRateStrategyAddress",
        //             "type": "address"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "availableLiquidity",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "totalPrincipalStableDebt",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "averageStableRate",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "stableDebtLastUpdateTimestamp",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "totalScaledVariableDebt",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "priceInEth",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "variableRateSlope1",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "variableRateSlope2",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "stableRateSlope1",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "stableRateSlope2",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "capacity",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "aEmissionPerSecond",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "vEmissionPerSecond",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "sEmissionPerSecond",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "aIncentivesLastUpdateTimestamp",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "vIncentivesLastUpdateTimestamp",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "sIncentivesLastUpdateTimestamp",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "aTokenIncentivesIndex",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "vTokenIncentivesIndex",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "sTokenIncentivesIndex",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "bool",
        //             "name": "leverageEnabled",
        //             "type": "bool"
        //           }
        //         ],
        //         "internalType": "struct IUiPoolDataProvider.AggregatedReserveData[]",
        //         "name": "",
        //         "type": "tuple[]"
        //       },
        //       {
        //         "internalType": "uint256",
        //         "name": "",
        //         "type": "uint256"
        //       },
        //       {
        //         "internalType": "uint256",
        //         "name": "",
        //         "type": "uint256"
        //       }
        //     ],
        //     "stateMutability": "view",
        //     "type": "function"
        //   },
        //   {
        //     "inputs": [
        //       {
        //         "internalType": "contract ILendingPoolAddressesProvider",
        //         "name": "provider",
        //         "type": "address"
        //       },
        //       {
        //         "internalType": "address",
        //         "name": "user",
        //         "type": "address"
        //       }
        //     ],
        //     "name": "getUserReservesData",
        //     "outputs": [
        //       {
        //         "components": [
        //           {
        //             "internalType": "address",
        //             "name": "underlyingAsset",
        //             "type": "address"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "scaledATokenBalance",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "bool",
        //             "name": "usageAsCollateralEnabledOnUser",
        //             "type": "bool"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "stableBorrowRate",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "scaledVariableDebt",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "principalStableDebt",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "stableBorrowLastUpdateTimestamp",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "aTokenincentivesUserIndex",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "vTokenincentivesUserIndex",
        //             "type": "uint256"
        //           },
        //           {
        //             "internalType": "uint256",
        //             "name": "sTokenincentivesUserIndex",
        //             "type": "uint256"
        //           }
        //         ],
        //         "internalType": "struct IUiPoolDataProvider.UserReserveData[]",
        //         "name": "",
        //         "type": "tuple[]"
        //       },
        //       {
        //         "internalType": "uint256",
        //         "name": "",
        //         "type": "uint256"
        //       }
        //     ],
        //     "stateMutability": "view",
        //     "type": "function"
        //   },
        //   {
        //     "inputs": [],
        //     "name": "incentivesController",
        //     "outputs": [
        //       {
        //         "internalType": "contract ISturdyIncentivesController",
        //         "name": "",
        //         "type": "address"
        //       }
        //     ],
        //     "stateMutability": "view",
        //     "type": "function"
        //   },
        //   {
        //     "inputs": [],
        //     "name": "oracle",
        //     "outputs": [
        //       {
        //         "internalType": "contract IPriceOracleGetter",
        //         "name": "",
        //         "type": "address"
        //       }
        //     ],
        //     "stateMutability": "view",
        //     "type": "function"
        //   }
        // ];

        // const poolContractAddress = "0x4BDED7F20e0C808954b1A98d9cd93825dEdec9A6";
        // const poolAbi = [
        //   "function getPool() external view returns (address)",
        //   "function getAddress(uint256 id) external view returns (address)"
        // ];

        // const protocolDataProvider = new ethers.Contract(dataContractAddress, dataAbi, provider);
        // const pool = new ethers.Contract(poolContractAddress, poolAbi, provider);

        // const lendingPoolAddress = await pool.getPool();
        // const assets = await protocolDataProvider.getReservesData(lendingPoolAddress);

        const protocolDataProvider = new ethers.Contract(contractAddress, abi, provider);
        const assets = await protocolDataProvider.getAllReservesTokens();

        const newMarketData = [];
        for (const asset of assets) {
          // Fetch data (gives 0 values for important values???)
          const reserveData = await protocolDataProvider.getReserveData(asset.tokenAddress);
          
          newMarketData.push({
            assetName: asset.symbol,
            totalSupplied: reserveData.totalAToken > 0 ? ethers.utils.formatUnits(reserveData.totalAToken, 6) : 0,
            supplyAPY: reserveData.liquidityRate > 0 ? ethers.utils.formatUnits(reserveData.liquidityRate, 18) : 0,
            totalBorrowed: reserveData.totalVariableDebt > 0 ? ethers.utils.formatUnits(reserveData.totalVariableDebt, 6) : 0,
            borrowAPY: reserveData.variableBorrowRate > 0 ? ethers.utils.formatUnits(reserveData.variableBorrowRate, 18) : 0,
          });
        }
        setMarketData(newMarketData);
      } catch (error) {
        console.error("Error fetching market data:", error);
      }
    }

    fetchMarketData();
  }, []);

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Asset</th>
            <th>Total Supplied</th>
            <th>Supply APY</th>
            <th>Total Borrowed</th>
            <th>Borrow APY</th>
          </tr>
        </thead>
        <tbody>
          {marketData.map((data, _) => (
            <tr>
              <td>{ data.assetName }</td>
              <td>{ data.totalSupplied }</td>
              <td>{ data.supplyAPY }</td>
              <td>{ data.totalBorrowed }</td>
              <td>{ data.borrowAPY }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Market;
