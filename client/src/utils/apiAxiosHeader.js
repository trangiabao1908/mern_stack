const configAxios = () => {
  let AccessToken;
  if (localStorage.getItem("AccessToken")) {
    AccessToken = localStorage.getItem("AccessToken");
  }
  const config = {
    headers: {
      Authorization: `Bearer ${AccessToken}`,
    },
  };
  return config;
};

export default configAxios;
