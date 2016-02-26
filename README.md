# jenkins-actions

[![Build Status](https://travis-ci.org/evanlucas/jenkins-actions.svg)](https://travis-ci.org/evanlucas/jenkins-actions)
[![Coverage Status](https://coveralls.io/repos/evanlucas/jenkins-actions/badge.svg?branch=master&service=github)](https://coveralls.io/github/evanlucas/jenkins-actions?branch=master)

Get an object containing all actions from a jenkins api result set

## Install

```bash
$ npm install [--save] jenkins-actions
```

## Test

```bash
$ npm test
```

## Usage

```js
const jenkins = require('jenkins-actions')
const input = {
  actions: [
    { parameters: [
        { name: 'TARGET_GITHUB_ORG', value: 'nodejs' }
      , { name: 'TARGET_REPO_NAME', value: 'node' }
      , { name: 'PR_ID', value: '4793' }
      , { name: 'POST_STATUS_TO_PR', value: true }
      , { name: 'REBASE_ONTO', value: '<pr base branch>' }
      ]
    }
  , { causes: [
        { shortDescription: 'Started by user Evan Lucas'
        , userId: 'evanlucas'
        , userName: 'Evan Lucas'
        }
      ]
    }
  , {}
  , {}
  , { failCount: 0
    , skipCount: 7
    , totalCount: 1079
    , urlName: 'aggregatedTestReport'
    }
  ]
}

console.log(jenkins(input))
```

Will output the following:

```js
{
  parameters: {
    TARGET_GITHUB_ORG: 'nodejs'
  , TARGET_REPO_NAME: 'node'
  , PR_ID: '4793'
  , POST_STATUS_TO_PR: true
  , REBASE_ONTO: '<pr base branch>'
  }
, startedBy: 'Evan Lucas (@evanlucas)'
, results: {
    failCount: 0
  , skipCount: 7
  , totalCount: 1079
  , urlName: 'aggregatedTestReport'
  }
}
```

## Author

Evan Lucas

## License

MIT (See `LICENSE` for more info)
