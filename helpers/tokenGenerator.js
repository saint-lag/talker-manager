function tokenGenerator(len) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  const token = new Array(len).fill('');

  token.forEach((_el, i) => {
    token[i] = chars.charAt(Math.floor(Math.random() * chars.length));
  });

  return token.join('');
}

module.exports = { tokenGenerator };