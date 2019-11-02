module.exports.onSuccess = async (result) => {
    console.log(result) // do something with the result
}

module.exports.onError = async (error) => {
    console.error(error) // do something with the error
}