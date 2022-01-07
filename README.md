# cdk-stepfunction-demo

## Deploy with CDK

```bash
# clone the project, and initial the project directory first
$ git clone https://github.com/BabooPan/cdk-stepfunction-demo.git
$ cd cdk-stepfunction-demo
# init the packages needed for this demo
$ yarn install
yarn install v1.22.17
warning ../../../package.json: No license field
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 🔨  Building fresh packages...
✨  Done in 4.45s.
# confirm the dependencies again by projen
$ npx projen
👾 default | node .projenrc.js
```

透過 `cdk deploy` 做部署，若在部署的 AWS Account 或是 Region 中沒有配置過 [CDK Toolkit](https://docs.aws.amazon.com/zh_tw/cdk/latest/guide/cli.html)，會報錯提示需要執行 `cdk bootstrap aws://012345678901/us-west-2`

CDK Toolkit 為幫助 CDK 以 CloudFormation 部署相關資源的工具，會視 CDK 專案內容決定需不需要部署

```bash
# the cdk v2 need to boostrap first
$ cdk bootstrap aws://012345678901/us-west-2 # boostrap CDK toolkit
...
...
 ⏳  Bootstrapping environment aws://012345678901/us-west-2...
CDKToolkit: creating CloudFormation changeset...
[██████████████████████████████████████████████████████████] (3/3)

 ✅  Environment aws://012345678901/us-west-2 bootstrapped.
```

> 可以透過 [CloudFormation Console](https://console.aws.amazon.com/cloudformation/) 確認 CDK Toolkit 的部署狀況

再用 `cdk deploy` 做部署 CloudFormation Stack

```bash
$ cdk deploy
...
Do you wish to deploy these changes (y/n)? y
...
cdk-stepfunction-demo: deploying...
...
cdk-stepfunction-demo: creating CloudFormation changeset...
[██████████████████████████████████████████████████████████] (9/9)

 ✅  cdk-stepfunction-demo

Outputs:
...
...
```

如果不用了，記得透過 `cdk destory` 刪除 CloudFormation Stack

```bash
$ cdk destory
...
Are you sure you want to delete: cdk-stepfunction-demo (y/n)? y
cdk-stepfunction-demo: destroying...
...
7:19:27 PM | DELETE_IN_PROGRESS   | AWS::CloudFormation::Stack     | cdk-stepfunction-demo

 ✅  cdk-stepfunction-demo: destroyed
```
