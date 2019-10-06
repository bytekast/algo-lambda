const {Component, utils} = require('@serverless/core')

class AlgoLambda extends Component {

  async default(inputs = {}) {

    inputs.name = this.state.name || inputs.name || this.context.resourceId()
    inputs.region = inputs.region || 'us-east-1'

    this.context.status('Deploying AWS Lambda Wrapper')
    const lambdaInputs = {}
    lambdaInputs.name = inputs.name
    lambdaInputs.handler = './node_modules/algo-lambda/index.lambda'
    lambdaInputs.runtime = 'nodejs10.x'
    lambdaInputs.region = inputs.region
    lambdaInputs.timeout = inputs.timeout || 7
    lambdaInputs.memory = inputs.memory || 128
    lambdaInputs.code = process.cwd()
    lambdaInputs.env = inputs.env || {}
    lambdaInputs.description = 'A lambda wrapper for Algorithmia functions'
    const awsLambda = await this.load('@serverless/aws-lambda')
    const lambdaOutputs = await awsLambda(lambdaInputs)

    this.state.name = inputs.name
    this.state.region = inputs.region
    await this.save()

    return lambdaOutputs
  }

  async remove(inputs = {}) {
    this.context.status('Removing')
    const awsLambda = await this.load('@serverless/aws-lambda')
    await awsLambda.remove()
    this.state = {}
    await this.save()
    return {}
  }
}

// export your component
module.exports = AlgoLambda
