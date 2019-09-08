import request from './request'

export const checkout = async ({ paymentMethod, amount, currency }) => {
  const query = `
    mutation newCheckout($paymentMethod: String!, $amount: Int!, $currency: Currency!) {
      payment {
        checkout(paymentMethod:$paymentMethod, amount:$amount, currency:$currency) {
          success
          requiresAction
          paymentIntentClientSecret
        }
      }
    }
  `
  const response = await request(query, { paymentMethod, amount, currency })
  const {
    payment: {
      checkout: {
        success,
        requiresAction,
        paymentIntentClientSecret
      }
    }
  } = response
  return { success, requiresAction, paymentIntentClientSecret }
}

export const confirm = async ({ paymentIntent }) => {
  const query = `
    mutation confirmCheckout($paymentIntent: String!) {
      payment {
        confirm(paymentIntent:$paymentIntent) {
          success
          requiresAction
          paymentIntentClientSecret
        }
      }
    }
  `
  const response = await request(query, { paymentIntent })
  const {
    payment: {
      confirm: {
        success,
        requiresAction,
        paymentIntentClientSecret
      }
    }
  } = response
  return { success, requiresAction, paymentIntentClientSecret }
}
