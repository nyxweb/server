import market from './market';
import auction from './auction';
import storage from './storage';
import quests from './quests';

import deposit from './resDeposit';
import withdraw from './resWithdraw';

export default {
  market,
  auction,
  storage,
  quests,
  resources: {
    deposit,
    withdraw
  }
};
