import model from '../../db/models';

interface SaveLog {
  account: string;
  message: string;
  module?: string;
  hidden?: string;
  ip: string;
}

const saveLog = async ({ account, message, module, hidden, ip }: SaveLog) => {
  const log = new model._nyxAccountLogs();
  log.account = account;
  log.message = message;
  log.module = module;
  log.hidden = hidden;
  log.ip = ip;
  log.timestamp = Date.now();

  await log.save();
};

export { saveLog };
