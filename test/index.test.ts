import * as assertions from 'aws-cdk-lib/assertions';
import { App, Stack } from 'aws-cdk-lib/core';
import { CdkStepFunctionDemo } from '../src/index';

test('test create stepfuntion state machine', () => {
  const app = new App();
  const stack = new Stack(app, 'test-stack');

  new CdkStepFunctionDemo(stack, 'sfn-stateMachine');
  assertions.Template.fromStack(stack).findResources(
    'AWS::StepFunctions::StateMachine',
  );
});

test('test create lambda function', () => {
  const app = new App();
  const stack = new Stack(app, 'test-stack');

  new CdkStepFunctionDemo(stack, 'lambda-function');
  assertions.Template.fromStack(stack).findResources('AWS::Lambda::Function');
});
