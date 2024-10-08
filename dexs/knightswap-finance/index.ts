import * as sdk from "@defillama/sdk";
import { SimpleAdapter } from "../../adapters/types";
import { CHAIN } from "../../helpers/chains";
import { getChainVolume2 } from "../../helpers/getUniSubgraphVolume";

const endpoints = {
  [CHAIN.BSC]: sdk.graph.modifyEndpoint(
    "GknVfnDT8h7aFsdS6Y6CeWTx3bHFnUnGxNgAUSSCQPz1",
  ),
  [CHAIN.FANTOM]: sdk.graph.modifyEndpoint(
    "GhBfNocNJJCjS4norsp6Cpiw2vJompiURM9frjgsnVdW",
  ),
};

const v2Graph = getChainVolume2({
  graphUrls: endpoints,
  totalVolume: {
    factory: "pancakeFactories",
    field: "totalVolumeUSD",
  },
});

const adapter: SimpleAdapter = {
  version: 2,
  adapter: {
    [CHAIN.BSC]: {
      fetch: v2Graph(CHAIN.BSC),
      start: 1635379200,
    },
    [CHAIN.FANTOM]: {
      fetch: v2Graph(CHAIN.FANTOM),
      start: 1637798400,
    },
  },
};

export default adapter;
