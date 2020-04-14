import upperFirst from 'lodash/upperFirst'

export const createSetMutation = property => (state, value) => {
  state[property] = value
}

export const createSetMutations = properties => properties.reduce((mutations, property) => {
  const name = `set${upperFirst(property)}`
  mutations[name] = createSetMutation(property)
  return mutations
}, {})

export const createId = (list) => {
  const ids = Object.keys(list)
  return ids.length > 0 ? Math.max(...ids) + 1 : 1
}
