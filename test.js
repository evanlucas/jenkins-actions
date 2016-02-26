'use strict'

const test = require('tap').test
const jenkins = require('./')

test('jenkins-actions', (t) => {
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

  const out = {
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

  let o = jenkins(input)
  t.deepEqual(o, out)

  t.equal(jenkins({}), null)

  o = jenkins({
    actions: [
      { parameters: {}}
    ]
  })
  t.deepEqual(o, {
    parameters: {}
  , startedBy: null
  , results: {}
  })
  t.end()
})
