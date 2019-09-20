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
          customerID
        }
      }
    }
  `
  const response = await request(query, { paymentMethod, amount, currency, options })
  return response.payment.checkout
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
          customerID
        }
      }
    }
  `
  const response = await request(query, { paymentIntent, options })
  return response.payment.confirm
}
