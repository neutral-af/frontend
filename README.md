# Neutral (as f**k) - Web

*The Vue.js project that's carbon neutral (as f\*\*k).*

This is the frontend code that powers [https://neutral.af](https://neutral.af) - the easiest way to offset your travel. We're in an early development stage, so contributions are welcome!

## Developing

### Quick Start

First, run `yarn` to pull the dependencies.

Then create a `.env` file from the `.env.template`, like:

```sh
cp .env.template .env
```

Lastly, run `yarn dev` to start the dev server. You'll be able to find the UI on `http://localhost:8080`.

### Stripe keys

If you are developing on any part of the site aside from the payments flow, this step isn't necessary.

However, if you are developing on the payments portion of the interface, you'll need test credentials for Stripe. You can create a Stripe account for free and use the sandbox keys for testing. You'll also need to start the [backend server](https://github.com/neutral-af/backend), giving it the Stripe "private key".

You should already have a `.env` file (as per the [Quick Start](#quick-start) above) and have the [backend server](https://github.com/neutral-af/backend) running. Add your stripe public key to the `.env` file for the key `VUE_APP_STRIPE_PUBLIC_KEY`, and change `VUE_APP_BACKEND_URL` to `http://localhost:8000/graphql`. You should then be able to test the full payments flow using one of the [Stripe test card numbers](https://stripe.com/docs/payments/payment-intents/web-manual#testing).

## Contributing

All contributions are welcome! Please feel free to open issues or PRs, update documentation, or implement features. Look for issues marked as `good-first-issue` for good places to jump in. We're especially looking for contributions in the area of design (eg. a logo).

If you're considering implementing a new feature or modifying an existing one, please open an issue first for discussion (so that we can talk about implementation before you spend your precious time on it).

## Acknowledgements

Airport data is sourced from the [OpenFlights Airports Database](https://openflights.org/data.html)
