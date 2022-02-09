import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
// import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as sfn from 'aws-cdk-lib/aws-stepfunctions';
import * as sfnTasks from 'aws-cdk-lib/aws-stepfunctions-tasks';
import { Construct } from 'constructs';

export class CdkStepFunctionDemo extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const jobFailed = new sfn.Fail(this, 'jobFailed', {
      cause: 'The random number is smaller than 25',
      error: 'The random result returned FAILED',
    });

    const jobSuccessed = new sfn.Succeed(this, 'jobSuccessed', {
      comment: 'The random number is greater than or equal to 25',
    });

    const lambdaPath = `${__dirname}/lambda-assets`;

    const randomFunction = new lambda.Function(this, 'randomFunction', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(path.join(lambdaPath, 'random-numbers')),
    });

    // const randomFunction = new NodejsFunction(this, 'randomFunction', {
    //   entry: `${lambdaPath}/random-numbers/index.ts`,
    //   handler: 'handler',
    //   // runtime: lambda.Runtime.NODEJS_14_X,
    // });

    const randonTask = new sfnTasks.LambdaInvoke(this, 'randomTask', {
      lambdaFunction: randomFunction,
      outputPath: '$.Payload',
      retryOnServiceExceptions: false,
    });

    randonTask.addRetry({
      errors: ['KnownError'],
      interval: cdk.Duration.seconds(1),
      maxAttempts: 3,
      backoffRate: 2,
    });
    randonTask.addCatch(jobFailed, { errors: ['States.ALL'] });

    const resultChoice = new sfn.Choice(this, 'resultChoice');

    const sfnDefinition = sfn.Chain.start(randonTask).next(
      resultChoice
        .when(
          sfn.Condition.numberGreaterThanEquals('$.body.result', 25),
          jobSuccessed,
        )
        .otherwise(jobFailed),
    );

    const sfnStateMachine = new sfn.StateMachine(this, 'stateMachine', {
      definition: sfnDefinition,
    });

    new cdk.CfnOutput(this, 'lambda-randomFuncName', {
      value: randomFunction.functionArn,
    });
    new cdk.CfnOutput(this, 'sfn-stateMachine', {
      value: sfnStateMachine.stateMachineName,
    });
  }
}

// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new cdk.App();

new CdkStepFunctionDemo(app, 'cdk-step-function-demo', { env: devEnv });

app.synth();
