import upperFirst from 'lodash/upperFirst'

export const createSetMutation = property => (state, value) => {
  state[property] = value
}

export const createSetMutations = properties => properties.reduce((mutations, property) => {
  const name = `set${upperFirst(property)}`
  mutations[name] = createSetMutation(property)
  return mutations
}, {})
