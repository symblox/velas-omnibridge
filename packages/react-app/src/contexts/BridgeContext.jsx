import React, { useCallback, useContext, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';

import { useIntl } from 'react-intl';

import { getMessageCallStatus, getMessageFromReceipt } from '../lib/amb';
import {
  fetchToAmount,
  fetchTokenLimits,
  fetchToToken,
  transferTokens,
} from '../lib/bridge';
import {
  defaultDailyLimit,
  defaultMaxPerTx,
  defaultMinPerTx,
  getDefaultToken,
  isxDaiChain,
  uniqueTokens,
} from '../lib/helpers';
import {
  approveToken,
  fetchAllowance,
  fetchTokenBalanceWithProvider,
} from '../lib/token';
import { fetchTokenList } from '../lib/tokenList';
import { Web3Context } from './Web3Context';
import { networkOptions } from '../lib/constants';

const POLLING_INTERVAL = 2000;

export const BridgeContext = React.createContext({});

export const BridgeProvider = ({ children }) => {
  const {
    ethersProvider,
    account,
    providerNetwork,
    setNetwork,
    connectedWallet,
  } = useContext(Web3Context);
  const [fromToken, setFromToken] = useState();
  const [toToken, setToToken] = useState();
  const [fromAmount, setFromAmount] = useState(0);
  const [toAmount, setToAmount] = useState(0);
  const [allowed, setAllowed] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState();
  const [txHash, setTxHash] = useState();
  const [receipt, setReceipt] = useState();
  const [totalConfirms, setTotalConfirms] = useState(0);
  const [tokenList, setTokenList] = useState([]);
  const [amountInput, setAmountInput] = useState('');
  const [fromBalance, setFromBalance] = useState();
  const [toBalance, setToBalance] = useState();
  const [tokenLimits, setTokenLimits] = useState();
  const [lastChainId, setLastChainId] = useState();
  const intl = useIntl();

  const setAmount = useCallback(
    async amount => {
      setFromAmount(amount);
      const gotToAmount = await fetchToAmount(fromToken, toToken, amount);
      setToAmount(gotToAmount);
      if (isxDaiChain(fromToken.chainId)) {
        setAllowed(true);
      } else {
        const gotAllowance = await fetchAllowance(
          fromToken.chainId,
          account,
          fromToken.address,
          ethersProvider,
        );
        setAllowed(BigNumber.from(gotAllowance).gte(amount));
      }
    },
    [account, fromToken, toToken, ethersProvider],
  );

  const setToken = useCallback(
    async token => {
      setLoading(true);
      setFromToken(token);
      setTokenLimits({
        minPerTx: defaultMinPerTx(isxDaiChain(token.chainId), token.decimals),
        maxPerTx: defaultMaxPerTx(token.decimals),
        dailyLimit: defaultDailyLimit(token.decimals),
      });
      if (providerNetwork && token.chainId === providerNetwork.chainId) {
        fetchTokenLimits(token, ethersProvider).then(limits => {
          setTokenLimits(limits);
        });
      }
      setAmountInput('');
      setFromAmount(0);
      setAllowed(true);
      setToToken();
      const gotToToken = await fetchToToken(token);
      setToToken(gotToToken);
      setToAmount(0);
      setLoading(false);
    },
    [ethersProvider, providerNetwork],
  );

  const setDefaultToken = useCallback(
    chainId => {
      setFromToken();
      setToToken();
      setToken(getDefaultToken(chainId));
    },
    [setToken],
  );

  const approve = useCallback(async () => {
    setLoading(true);
    try {
      await approveToken(ethersProvider, fromToken, fromAmount);
      setAllowed(true);
    } catch (error) {
      // eslint-disable-next-line
      console.log({ approveError: error });
    }
    setLoading(false);
  }, [fromAmount, fromToken, ethersProvider]);

  const transfer = useCallback(async () => {
    setLoading(true);
    try {
      const [tx, numConfirms] = await transferTokens(
        ethersProvider,
        fromToken,
        fromAmount,
      );
      setTotalConfirms(numConfirms);
      setTxHash(tx.hash);
    } catch (error) {
      setTxHash();
      setLoading(false);
      setLoadingText();
      // eslint-disable-next-line
      console.log({ transferError: error });
    }
  }, [fromToken, ethersProvider, fromAmount]);

  const getNetworkOption = networkId => {
    for (let i = 0; i < networkOptions.length; i++) {
      const v = networkOptions[i];
      if (v.value === parseInt(networkId)) {
        return v;
      }
    }

    return networkOptions[0];
  };

  useEffect(() => {
    if (!connectedWallet) {
      // Set to the default chainId when the wallet is not connected
      setDefaultToken(networkOptions[0].value);
      setNetwork(networkOptions[0]);
      setLastChainId(networkOptions[0].value);
    } else if (
      providerNetwork &&
      providerNetwork.chainId &&
      parseInt(providerNetwork.chainId) !== parseInt(lastChainId)
    ) {
      // Set to the selected chainId when wallet is connected
      setDefaultToken(getNetworkOption(providerNetwork.chainId).value);
      setNetwork(getNetworkOption(providerNetwork.chainId));
      setLastChainId(providerNetwork.chainId);
    }

    const subscriptions = [];
    const unsubscribe = () => {
      subscriptions.forEach(s => {
        clearTimeout(s);
      });
    };
    if (!txHash) return unsubscribe;

    const { chainId } = fromToken;
    let message = null;
    let status = false;

    const getReceipt = async () => {
      try {
        const txReceipt = await ethersProvider.getTransactionReceipt(txHash);
        setReceipt(txReceipt);

        if (txReceipt) {
          message = getMessageFromReceipt(chainId, txReceipt);
          if (txReceipt.confirmations > totalConfirms) {
            setLoadingText(intl.formatMessage({ id: 'WAITING_FOR_EXECUTION' }));
          }
        }

        if (message) {
          status = await getMessageCallStatus(chainId, message);
        }

        if (status) {
          setTxHash();
          setReceipt();
          await setToken(fromToken);
          fetchTokenBalanceWithProvider(
            ethersProvider,
            fromToken,
            account,
          ).then(b => setFromBalance(b));
          setLoading(false);
          setLoadingText();
        }

        if (!txReceipt || !message || !status) {
          const timeoutId = setTimeout(() => getReceipt(), POLLING_INTERVAL);
          subscriptions.push(timeoutId);
        }
      } catch (error) {
        setTxHash();
        setReceipt();
        setLoading(false);
        setLoadingText();
        // eslint-disable-next-line
        console.log({ receiptError: error });
      }
    };

    // unsubscribe from previous polls
    unsubscribe();

    getReceipt();
    // unsubscribe when unmount component
    return unsubscribe;
  }, [
    txHash,
    totalConfirms,
    ethersProvider,
    setToken,
    fromToken,
    account,
    setNetwork,
    setDefaultToken,
    providerNetwork,
    lastChainId,
    intl,
    connectedWallet,
  ]);

  const setDefaultTokenList = useCallback(
    async (chainId, customTokens) => {
      if (!account || !ethersProvider) return;

      const networkMismatch =
        chainId !== (await ethersProvider.getNetwork()).chainId;
      if (networkMismatch) return;

      setLoading(true);
      try {
        const baseTokenList = await fetchTokenList(chainId);
        const customTokenList = uniqueTokens(
          baseTokenList.concat(
            customTokens.filter(token => token.chainId === chainId),
          ),
        );
        const tokenListWithBalance = await Promise.all(
          customTokenList.map(async token => {
            return Object.assign(token, {
              balance: await fetchTokenBalanceWithProvider(
                ethersProvider,
                token,
                account,
              ),
            });
          }),
        );
        const sortedTokenList = tokenListWithBalance.sort(function checkBalance(
          { balance: balanceA },
          { balance: balanceB },
        ) {
          return parseInt(
            BigNumber.from(balanceB) - BigNumber.from(balanceA),
            10,
          );
        });
        setTokenList(sortedTokenList);
      } catch (error) {
        // eslint-disable-next-line
        console.log({ fetchTokensError: error });
      }
      setLoading(false);
    },
    [account, ethersProvider],
  );

  return (
    <BridgeContext.Provider
      value={{
        fromAmount,
        toAmount,
        setAmount,
        fromToken,
        toToken,
        setToken,
        setDefaultToken,
        allowed,
        approve,
        transfer,
        loading,
        loadingText,
        txHash,
        receipt,
        totalConfirms,
        tokenList,
        setDefaultTokenList,
        amountInput,
        setAmountInput,
        fromBalance,
        setFromBalance,
        toBalance,
        setToBalance,
        tokenLimits,
      }}
    >
      {children}
    </BridgeContext.Provider>
  );
};
