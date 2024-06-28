module.exports = {
  database: "ntask",
  username: "",
  password: "",
  params: {
    dialect: "sqlite",
    storage: "ntask.sqlite",
    define: {
      underscored: true,
    },
  },
  // jwtSecret: "Nta$K-AP1", // jwtSecret keeps a secret key string that serves as a base to encode and decode tokens
  // jwtSession: { session: false }, // This item is going to be used to inform Passport that the API won’t manage the session
};
