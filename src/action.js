export const addToken = (acccessToken, refreshToken) => {
  return {
    type: "ADD_TOKEN",
    payload: {
      accssToken: acccessToken,
      rfrshToken: refreshToken,
    },
  };
};

export default addToken;
