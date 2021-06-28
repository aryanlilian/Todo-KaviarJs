module.exports = {
    trailingComma: "es5",
    tabWidth: 4,
    singleQuote: false,
    overrides: [
      {
        files: ["*.ts"],
        options: {
          parser: "babel-ts",
        },
      },
    ],
  };