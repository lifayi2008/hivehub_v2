import { useContext } from 'react';
import { connectivity } from '@elastosfoundation/elastos-connectivity-sdk-js';
import { EssentialsConnector } from '@elastosfoundation/essentials-connector-client-browser';
import ConnectivityContext from '../contexts/ConnectivityContext';

export const essentialsConnector = new EssentialsConnector();

console.log(essentialsConnector);

let connectivityInitialized = false;

export function useConnectivitySDK() {
  const { setIsLinkedToEssentials } = useContext(ConnectivityContext);

  if (connectivityInitialized) {
    console.log('connectivityInitialized = true.');
    return;
  }
  connectivityInitialized = true;

  console.log('Preparing the Elastos connectivity SDK');

  connectivity.registerConnector(essentialsConnector).then(() => {
    console.log('essentialsConnector', essentialsConnector);
    console.log('Wallet connect provider', essentialsConnector.getWalletConnectProvider());

    const hasLink = isUsingEssentialsConnector() && essentialsConnector.hasWalletConnectSession();
    console.log('Has link to essentials?', hasLink);
    setIsLinkedToEssentials(hasLink);

    // Restore the wallet connect session - TODO: should be done by the connector itself?
    if (hasLink && !essentialsConnector.getWalletConnectProvider().connected)
      essentialsConnector.getWalletConnectProvider().enable();
  });
}

export function isUsingEssentialsConnector() {
  return (
    connectivity.getActiveConnector() &&
    connectivity.getActiveConnector().name === essentialsConnector.name
  );
}
