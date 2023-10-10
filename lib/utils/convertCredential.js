const convertCredential = (header) => {
  const { authorization } = header;
  const [, token] = authorization.split(' ');
  const [username, password] = token.split(':');
  return { username, password };
};

module.exports = convertCredential;