const { awscdk } = require('projen');

const PROJECT_NAME = 'cdk-stepfunction-demo';
const PROJECT_DESCRIPTION = 'CDK Demo for Step Functions.';

const project = new awscdk.AwsCdkConstructLibrary({
  name: PROJECT_NAME,
  description: PROJECT_DESCRIPTION,
  repository: 'https://github.com/baboopan/cdk-stepfunction-demo.git',
  authorName: 'Baboo Pan',
  authorEmail: 'lpig0818@gmail.com',
  keywords: ['aws', 'stepfunction'],
  release: false,
  stability: 'experimental',
  autoDetectBin: false,
  dependabot: false,
  cdkVersion: '2.12.0',
  // Default release the main branch with major version 2.
  majorVersion: 2,
  defaultReleaseBranch: 'main',
  depsUpgradeOptions: {
    ignoreProjen: false,
    workflowOptions: {
      labels: ['auto-approve', 'auto-merge'],
      // deepcode ignore HardcodedNonCryptoSecret: Allow to preform GitHub Actions
      secret: 'AUTOMATION_GITHUB_TOKEN',
    },
  },
  autoApproveOptions: {
    // deepcode ignore HardcodedNonCryptoSecret: Allow to preform GitHub Actions
    secret: 'GITHUB_TOKEN',
    allowedUsernames: ['baboopan'],
  },
  gitignore: [
    '.vscode',
    '.dccache',
    'cdk.out',
    'cdk.context.json',
    'yarn-error.log',
    'coverage',
    'venv',
  ],
});

project.synth();
