const signup = (req, res, next) => {
    res.render("login", {
      mode: 'signup',
      error: [],
    });
  };

  module.exports = {
    signup,
  }