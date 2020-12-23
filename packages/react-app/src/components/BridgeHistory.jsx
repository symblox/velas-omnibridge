import { Flex, Grid, Text } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { Web3Context } from '../contexts/Web3Context';
import { fetchHistory, fetchNumHistory } from '../lib/history';
import { HistoryItem } from './HistoryItem';
import { HistoryPagination } from './HistoryPagination';
import { LoadingModal } from './LoadingModal';
import {getNetworkName} from '../lib/helpers';

export const BridgeHistory = ({ page }) => {
  const [history, setHistory] = useState();
  const [loading, setLoading] = useState(true);
  const { network, account } = useContext(Web3Context);
  const [numPages, setNumPages] = useState(0);

  useEffect(() => {
    async function getHistory() {
      setLoading(true);
      const [gotHistory, totalItems] = await Promise.all([
        fetchHistory(network.value, account, page),
        fetchNumHistory(network.value, account),
      ]);
      setHistory(gotHistory);
      setNumPages(Math.ceil(totalItems / 10));
      setLoading(false);
    }
    getHistory();
  }, [network, account, setHistory, page]);
  return (
    <Flex w="100%" maxW="75rem" direction="column" mt={8} px={8}>
      <LoadingModal loadingProps={loading} />
      <Text fontSize="xl" fontWeight="bold" mb={4}>
      {getNetworkName(network.value)} <FormattedMessage id="HISTORY" />
      </Text>
      <Grid
        templateColumns={{ base: '2fr 2fr', md: '2fr 3fr' }}
        color="grey"
        fontSize="sm"
        px={{ base: 4, sm: 8 }}
        mb={4}
      >
        <Text><FormattedMessage id="TX_DATE" /></Text>
        <Text><FormattedMessage id="TX_HASH" /></Text>
      </Grid>
      {history && history.length > 0 ? (
        <>
          {history.map(item => (
            <HistoryItem
              key={item.txHash}
              chainId={network.value}
              date={item.timestamp}
              hash={item.txHash}
            />
          ))}
          {numPages && (
            <HistoryPagination numPages={numPages} currentPage={page} />
          )}
        </>
      ) : (
        <Grid templateColumns="5fr" w="100%">
          <Text align="center"><FormattedMessage id="TX_NOT_FOUND" /></Text>
        </Grid>
      )}
    </Flex>
  );
};
