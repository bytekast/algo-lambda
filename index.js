const Algorithmia = require("algorithmia");

module.exports.lambda = async (event, context) => {
  const input = event || "";
  const response = await Algorithmia.client(process.env.apiKey)
    .algo(process.env.algorithm)
    .pipe(input)

  if (response.error) {
    return {error: response.error.message}
  } else {
    return {result: response.get()}
  }
}
