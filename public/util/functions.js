module.exports = {
  isEmail: (email) => {
    if ((!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) && !(email.length === 0)) {
      return false;
    }
    return true;
  },
  hasWhiteSpaceAndValidLength: (s) => {
    return (s.indexOf(" ") >= 0 || s.length < 6) && !(s.length === 0);
  },
  enoughNumCountPass: (s) => {
    return (s.length < 6 && !(s.length === 0) )
  },
  isEmpty: (s) => {
    return s === "" || s.length === 0;
  },
  isLoggedIn: (user) => {
    if(Object.keys(user).length === 0){
      alert("Please Log In to access to this feature!")
      return false//False: chưa đăng nhập / đã đăng xuất
    }
  }
};
