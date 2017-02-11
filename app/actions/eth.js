import Web3 from 'web3';

const web3 = new Web3(new Web3.providers.HttpProvider('http://blockchain.northeurope.cloudapp.azure.com:8545/'));

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
