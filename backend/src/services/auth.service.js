const register = async (userData) => {
  return {
    success: true,
    message: "User registered successfully",

    data: {
      name: userData.name,
      email: userData.email,
      role: "user",
    },
  };
};

module.exports = {
  register,
};