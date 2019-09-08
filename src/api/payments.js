import request from './request'

export const checkout = async ({ paymentMethod, amount, currency, saveCard }) => {
  const options = {
    saveCard
  }
  const query = `
    mutation newCheckout($paymentMethod: String!, $amount: Int!, $currency: Currency!, $options: PaymentOptions) {
      payment {
        checkout(paymentMethod:$paymentMethod, amount:$amount, currency:$currency, options:$options) {
          success
          requiresAction
          paymentIntentClientSecret
        }
      }
    }
  `
  const response = await request(query, { paymentMethod, amount, currency, options })
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

export const confirm = async ({ paymentIntent, saveCard }) => {
  const options = {
    saveCard
  }
  const query = `
    mutation confirmCheckout($paymentIntent: String!, $options: PaymentOptions) {
      payment {
        confirm(paymentIntent:$paymentIntent, options:$options) {
          success
          requiresAction
          paymentIntentClientSecret
        }
      }
    }
  `
  const response = await request(query, { paymentIntent, options })
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
