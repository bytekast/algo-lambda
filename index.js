const algorithmia = require("algorithmia");

function isPrimitive(test) {
  return (test !== Object(test));
}

module.exports.lambda = async (event, context) => {
  const input = isPrimitive(event) ? event : JSON.stringify(event);
  const response = await algorithmia.client(process.env.apiKey)
    .algo(process.env.algorithm)
    .pipe(input)

  if (response.error) {
    return {error: response.error.message}
  } else {
    return {result: response.get()}
  }
}
