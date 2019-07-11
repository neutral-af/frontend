const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const { request: graphQLRequest } = require('graphql-request')
const { trackEvent } = require('../src/honeycomb')


const RESPONSE_HEADERS = {
  'Access-Control-Allow-Methods': 'POST',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'content-type'
}

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(200, RESPONSE_HEADERS)
    res.end()
    return
  } else if (req.method !== 'POST') {
    res.writeHead(403)
    res.end()
    return
  }

  const { paymentMethod, paymentIntent, amount, currency, customer, saveCard, estimateID } = req.body
  trackEvent('requestReceived', {
    service_name: 'checkout-api',
    estimateID,
    paymentMethod: !!paymentMethod,
    paymentIntent: !!paymentIntent,
    customer: !!customer
  })

  try {
    let intent
    if (paymentMethod) {
      intent = await stripe.paymentIntents.create({
        payment_method: paymentMethod,
        amount,
        currency,
        confirmation_method: 'manual',
        confirm: true,
        idempotency_key: estimateID,
        ...customer && { customer }
      })
    } else if (paymentIntent) {
      intent = await stripe.paymentIntents.confirm(paymentIntent)
    }

    trackEvent('sendingResponse', {
      service_name: 'checkout-api',
      estimateID,
      intentStatus: intent.status
    })

    res.writeHead(200, RESPONSE_HEADERS)
    res.end(JSON.stringify(await generateResponse(intent, { saveCard, estimateID })))
  } catch (err) {
    res.writeHead(500, RESPONSE_HEADERS)
    res.end(JSON.stringify({ error: err.message }))
  }
}

const generateResponse = async (intent, { saveCard, estimateID }) => {
  if (
    intent.status === 'requires_action' &&
    intent.next_action.type === 'use_stripe_sdk'
  ) {
    return {
      requires_action: true,
      payment_intent_client_secret: intent.client_secret
    }
  } else if (intent.status === 'succeeded') {
    // Register the purchase on the server
    const query = `
      mutation {
        purchase {
            fromEstimate(estimateID:"${ estimateID }", provider:Cloverly) {
                id carbon
            }
        }
      }
    `

    try {
      const purchaseConfirm = await graphQLRequest(process.env.GRAPHQL_BACKEND_URL, query)
    } catch (e) {
      return { error: 'Unable to fulfil order: ' + e }
    }

    const response = {
      success: true,
      purchaseID: purchaseConfirm.id,
      purchaseCarbon: purchaseConfirm.carbon
    }

    if (saveCard) {
      // This creates a new Customer and attaches the PaymentMethod in one API call.
      const customer = await stripe.customers.create({
        payment_method: intent.payment_method
      })
      response.customerID = customer.id
    }

    return response
  } else {
    // Invalid status
    return {
      error: 'Invalid PaymentIntent status'
    }
  }
}
