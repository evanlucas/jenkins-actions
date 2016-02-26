'use strict'

module.exports = getActions

function getActions(results) {
  const actions = results.actions
  if (!actions || !Array.isArray(actions))
    return null

  const out = {
    parameters: {}
  , startedBy: null
  , results: {}
  }

  for (let i = 0; i < actions.length; i++) {
    const act = actions[i]
    if (act.parameters) {
      const params = reduceParams(act.parameters)
      if (params) out.parameters = params
    } else if (act.causes) {
      if (act.causes.length) {
        const c = act.causes[0]
        if (c.userName && c.userId) {
          out.startedBy = `${c.userName} (@${c.userId})`
        }
      }
    } else {
      if (act.hasOwnProperty('totalCount')) {
        const keys = Object.keys(act)
        for (let j = 0; j < keys.length; j++) {
          out.results[keys[j]] = act[keys[j]]
        }
      }
    }
  }

  return out
}

function reduceParams(input) {
  if (!Array.isArray(input)) return {}
  return input.reduce((set, item) => {
    set[item.name] = item.value
    return set
  }, {})
}
