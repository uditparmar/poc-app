module.exports = {
  env: {
    test: {
      presets: ["@babel/preset-env", "@babel/react", "next/babel", "@babel/preset-react"],
    },
    development: {
      presets: ["next/babel", "@babel/preset-react"],
    },
  },
};
