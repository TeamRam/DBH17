import Web3 from 'web3';

const ABI = [{ 'constant': true, 'inputs': [], 'name': 'getBalancesPerRisk', 'outputs': [{ 'name': '', 'type': 'uint256' }, { 'name': '', 'type': 'uint256' }, { 'name': '', 'type': 'uint256' }], 'payable': false, 'type': 'function' }, { 'constant': true, 'inputs': [{ 'name': '', 'type': 'address' }], 'name': 'participants', 'outputs': [{ 'name': 'participantAddress', 'type': 'address' }, { 'name': 'vote', 'type': 'uint8' }, { 'name': 'balance', 'type': 'uint256' }], 'payable': false, 'type': 'function' }, { 'constant': true, 'inputs': [{ 'name': 'participant', 'type': 'address' }], 'name': 'getParticipantVote', 'outputs': [{ 'name': '', 'type': 'uint8' }], 'payable': false, 'type': 'function' }, { 'constant': true, 'inputs': [{ 'name': 'votedRisk', 'type': 'uint8' }], 'name': 'invest', 'outputs': [], 'payable': true, 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'getCombinedBalance', 'outputs': [{ 'name': '', 'type': 'uint256' }], 'payable': false, 'type': 'function' }, { 'constant': true, 'inputs': [{ 'name': 'risk', 'type': 'uint8' }], 'name': 'getInvestment', 'outputs': [{ 'name': '', 'type': 'uint256' }], 'payable': false, 'type': 'function' }, { 'constant': true, 'inputs': [{ 'name': 'participant', 'type': 'address' }], 'name': 'getParticipantBalance', 'outputs': [{ 'name': '', 'type': 'uint256' }], 'payable': false, 'type': 'function' }, { 'inputs': [], 'payable': false, 'type': 'constructor' }, { 'anonymous': false, 'inputs': [{ 'indexed': false, 'name': 'participant', 'type': 'address' }, { 'indexed': false, 'name': 'vote', 'type': 'uint8' }, { 'indexed': false, 'name': 'amount', 'type': 'uint256' }], 'name': 'Invested', 'type': 'event' }];

const CONTRACT_ADDR = '0xc860Cba772f62e739bDF12DbF2eba2c3d51345f5';

export const web3 = new Web3(new Web3.providers.HttpProvider('http://blockchain.northeurope.cloudapp.azure.com:8545/'));
export const contract = web3.eth.contract(ABI).at(CONTRACT_ADDR);

export const getBalancesPerRisk = () => {
  return (dispatch) => {
    const balances = contract.getBalancesPerRisk();
    dispatch({
      type: 'ETH_BALANCES',
      balances
    });
  };
};

export const getBalance = (address) => {
  return (dispatch) => {
    dispatch({
      type: 'ETH_BALANCE_LOADING',
      address
    });

    try {
      return web3.eth.getBalance(address, (err, res) => {
        if (err) {
          dispatch({
            type: 'ETH_BALANCE_ERROR',
            address,
            error: err
          });
        } else {
          dispatch({
            type: 'ETH_BALANCE_SUCCESS',
            address,
            response: res
          });
        }
      });
    } catch (e) {
      dispatch({
        type: 'ETH_BALANCE_ERROR',
        address,
        error: e
      });
    }
  };
};
