module.exports = {
  isEmail: (email) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return false;
    }
    return true;
  },
  hasWhiteSpace: (s) => {
    return s.indexOf(" ") >= 0;
  },
};
