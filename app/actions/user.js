export const saveProfile = (profile) => {
  return {
    type: 'USER_SAVE_PROFILE',
    profile
  };
};

export const logout = () => {
  return {
    type: 'USER_LOGOUT'
  };
};
