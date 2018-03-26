# Development Guide <br/> Kyrio Online Services SDK for Node.js

This document provides high-level instructions on how to build, test and release the SDK.

* [Environment Setup](#setup)
* [Installing](#install)
* [Building](#build)
* [Testing](#test)
* [Release](#release)

## <a name="setup"></a> Environment Setup

This is a Node.js project and you have to install Node.js tools. 
You can download them from official Node.js website: https://nodejs.org/en/download/ 

After node is installed you can check it by running the following command:
```bash
node --version
```

Then you need to configure node tools:
```bash
# Install typescript compiler
npm install typescript -g
 
# Install typescript definitions utility
npm install tsd -g 

# Install typescript api document generator
npm install typedoc -g

# Install mocha test runner
npm install mocha -g
```

To work with GitHub code repository you need to install Git from: https://git-scm.com/downloads

## <a name="install"></a> Installing

After your environment is ready you can check out source code from the Github repository:
```bash
git clone git@github.com:KyrioServices/kyrio-services-sdk-node.git
```

Then go to the project folder and install dependent modules:

```bash
# Install dependencies
npm install
```

If you worked with the microservice before you can check out latest changes and update the dependencies:
```bash
# Update source code updates from github
git pull

# Update dependencies
npm update
```

## <a name="build"></a> Building

The commons is written in TypeScript language which is transcompiled into JavaScript.
So, if you make changes to the source code you need to compile it before running or committing to github.
The process will output compiled javascript files into /bin folder.

```bash
tsc
```

When you do continuous edit-build-test cycle, you can run typescript compiler with --watch option
to detect and compile changes you make automatically:

```bash
tsc --watch
```

To build sourcecode documentation execute:
```bash
npm run docgen
```

## <a name="test"></a> Testing

To run mocha tests use the folling command:
```bash
npm test
```

## <a name="release"></a> Release

The formal release process consistents of few steps.

### Version the package
- Update the version value in the package.json file
- Update the CHANGELOG.md file to reflect the changes

You are required to tag the guthub repository with the version number in the package:

```bash
git tag vx.y.y
git push origin master --tags
```

Then the release can be pushed to the global NPM repository. 
To be able to make the release contributor must have an account with proper
permissions at npm site.

```bash
npm login
npm publish
```
