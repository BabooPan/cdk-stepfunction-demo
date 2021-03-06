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
[1/4] ๐  Resolving packages...
[2/4] ๐  Fetching packages...
[3/4] ๐  Linking dependencies...
[4/4] ๐จ  Building fresh packages...
โจ  Done in 4.45s.
# confirm the dependencies again by projen
$ npx projen
๐พ default | node .projenrc.js
```

้้ `cdk deploy` ๅ้จ็ฝฒ๏ผ่ฅๅจ้จ็ฝฒ็ AWS Account ๆๆฏ Region ไธญๆฒๆ้็ฝฎ้ [CDK Toolkit](https://docs.aws.amazon.com/zh_tw/cdk/latest/guide/cli.html)๏ผๆๅ ฑ้ฏๆ็คบ้่ฆๅท่ก `cdk bootstrap aws://012345678901/us-west-2`

CDK Toolkit ็บๅนซๅฉ CDK ไปฅ CloudFormation ้จ็ฝฒ็ธ้่ณๆบ็ๅทฅๅท๏ผๆๅๅฐ CDK ๆ้่ฆ็้ ็ฎ่่ณๆบๆพ็ฝฎๅจ่ชๅ็ๆ็ S3 Bucket ๏ผๆๆฏ็ๆ IAM Role ไพ็ขบไฟ CDK ้จ็ฝฒ Applications ๆ้่ฆ็ๆฌ้๏ผ้ๅไบๅ้จ็ฝฒ็้ๆฎต็จฑ็บ [CDK Bootstrapping](https://docs.aws.amazon.com/zh_tw/cdk/v2/guide/bootstrapping.html)

```bash
# the cdk v2 need to boostrap first
$ cdk bootstrap aws://012345678901/us-west-2 # boostrap CDK toolkit
...
...
 โณ  Bootstrapping environment aws://012345678901/us-west-2...
CDKToolkit: creating CloudFormation changeset...
[โโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโ] (3/3)

 โ  Environment aws://012345678901/us-west-2 bootstrapped.
```

> ๅฏไปฅ้้ [CloudFormation Console](https://console.aws.amazon.com/cloudformation/) ็ขบ่ช CDK Toolkit ็้จ็ฝฒ็ๆณ

ๅ็จ `cdk deploy` ๅ้จ็ฝฒ CloudFormation Stack

```bash
$ cdk deploy
...
Do you wish to deploy these changes (y/n)? y
...
cdk-stepfunction-demo: deploying...
...
cdk-stepfunction-demo: creating CloudFormation changeset...
[โโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโ] (9/9)

 โ  cdk-stepfunction-demo

Outputs:
...
...
```

ๅฆๆไธ็จไบ๏ผ่จๅพ้้ `cdk destory` ๅช้ค CloudFormation Stack

```bash
$ cdk destory
...
Are you sure you want to delete: cdk-stepfunction-demo (y/n)? y
cdk-stepfunction-demo: destroying...
...
7:19:27 PM | DELETE_IN_PROGRESS   | AWS::CloudFormation::Stack     | cdk-stepfunction-demo

 โ  cdk-stepfunction-demo: destroyed
```
