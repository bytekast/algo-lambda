const algorithmia = require("algorithmia")

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

function handleSuccess(result) {
  try {
    const { onSuccess } = require(process.env.algo || '../../algo')
    onSuccess(result)
  } catch (ex) {
    console.log(result)
    if ((ex instanceof Error && ex.code === 'MODULE_NOT_FOUND') || (ex.message.includes('onSuccess is not a function'))) {
      console.log('No success callback function detected')
    }
    else {
      handleError(ex)
    }
  }
}

function handleError(error) {
  try {
    const { onError } = require(process.env.algo || '../../algo')
    onError(error)
  } catch (ex) {
    console.error(`Error: ${error.message}`)
    if ((ex instanceof Error && ex.code === 'MODULE_NOT_FOUND') || (ex.message.includes('onError is not a function'))) {
      console.log('No error callback function detected')
    }
    else {
      throw ex
    }
  }
}

module.exports.lambda = async (event, context) => {
  const input = isPrimitive(event) ? event : unwrapAndStringify(event)
  console.log(`Event: ${input}`)
  const response = await algorithmia.client(process.env.apiKey)
      .algo(process.env.algorithm)
      .pipe(input)

  if (response.error) {
    handleError(response.error)
    return {error: response.error.message}
  } else {
    const res = response.get()
    handleSuccess(res)
    return {result: res}
  }
}
