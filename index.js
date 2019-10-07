const algorithmia = require("algorithmia");

function isPrimitive(test) {
  return (test !== Object(test))
}

function unwrapSns(event) {
  if ((event || {}).Records) {
    const [first] = event.Records
    return first.Sns.Message
  } else {
    return event
  }
}

function unwrapAndStringify(event) {
  return JSON.stringify(unwrapSns(event)) // Support auto-unwrap SNS
}

module.exports.lambda = async (event, context) => {
  const input = isPrimitive(event) ? event : unwrapAndStringify(event);
  console.log(`Event: ${input}`)
  const response = await algorithmia.client(process.env.apiKey)
    .algo(process.env.algorithm)
    .pipe(input)

  if (response.error) {
    console.error(response.error.message)
    return {error: response.error.message}
  } else {
    const res = response.get()
    console.log(`Result: ${res}`)
    return {result: res}
  }
}
