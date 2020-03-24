import auction from './auction';
import storage from './storage';
import quests from './quests';

import deposit from './resDeposit';
import withdraw from './resWithdraw';

import market from './market';
import buyMarketItem from './buyMarketItem';

export default {
  auction,
  storage,
  quests,
  resources: {
    deposit,
    withdraw
  },
  market,
  buyMarketItem
};
