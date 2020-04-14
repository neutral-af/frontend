import request from './request'

export const checkout = async ({ estimate, paymentMethod, currency, options }) => {
  const query = `
    mutation newCheckout($estimate: EstimateIn!, $paymentMethod: String!, $currency: Currency!, $options: PaymentOptions) {
      payment {
        checkout(estimate:$estimate, paymentMethod:$paymentMethod, currency:$currency, options:$options) {
          success
          requiresAction
          paymentIntentClientSecret
          customerID
        }
      }
    }
  `
  const response = await request(query, { estimate, paymentMethod, currency, options })
  return response.payment.checkout
}

export const confirm = async ({ estimate, paymentIntent, saveCard }) => {
  const options = {
    saveCard
  }
  const query = `
    mutation confirmCheckout($estimate: EstimateIn!, $paymentIntent: String!, $options: PaymentOptions) {
      payment {
        confirm(estimate:$estimate, paymentIntent:$paymentIntent, options:$options) {
          success
          requiresAction
          paymentIntentClientSecret
          customerID
        }
      }
    }
  `
  const response = await request(query, { estimate, paymentIntent, options })
  return response.payment.confirm
}
