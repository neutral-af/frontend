import { request as graphqlRequest } from 'graphql-request'

export default graphqlRequest.bind(graphqlRequest, process.env.VUE_APP_BACKEND_URL)
