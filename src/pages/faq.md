
## Who are you?

We’re Jason and Emanuele, two developers in Berlin. You can learn about us and read the open-source code behind Neutral.af at github.com/neutral-af.

## Carbon offsets aren’t enough - people should fly less!

Not a question - but in any case, yes, people should fly less. Airplane travel is one of the biggest sources of CO2 emissions, and travel by train or other means has a drastically lower carbon footprint. But as young people who live and work abroad in other countries (and for some of us, other continents), we understand that it’s not always possible to stop flying entirely. You should definitely take the train when you can - and offset your flight when you can’t.

## How do you calculate how much carbon is needed to offset my flight?

We calculate the [“great-circle distance”](https://en.wikipedia.org/wiki/Great-circle_distance) of your flight, which is the approximate distance traveled by your plane as it goes around the curvature of the earth. We then apply the [distance in kilometers](https://github.com/neutral-af/backend/blob/4f1396583c0450e9c61d12dda9a6ee63d383fd5d/lib/distance/distance.go) to an equation that calculates the [carbon emissions per-kilometer](https://github.com/neutral-af/backend/blob/4f1396583c0450e9c61d12dda9a6ee63d383fd5d/lib/emissions/emissions.go) of flying, taking into account the increased damage of carbon released at high altitudes (called the “radiative forcing factor”). The data for this equation comes from data provided by the UK government in a XXX report.

## How do you actually offset the carbon emissions?

We work together with providers like [Cloverly](https://www.cloverly.com/) to purchase offsets for your emissions, which fund projects like renewable energy and reforestation. You can view the details of your offset when you’ve retrieved an estimate. We hope to make this even more transparent in the future, giving you more information about where the offset money is going.

## How do you make money?

In short, we don't - we’re in this to help people live a bit greener, not to get rich. We do add a commission of 10% onto your offset charge, to pay for our servers and domains. But if we have any extra money left over after our own expenses, we’ll put that towards even more carbon offsets.

## How much of the cost I pay goes to offsetting?

Each offset charge you pay includes some fees - from the offset provider (like Cloverly), the payment provider (like Stripe), and our commission keep the site running. We make this completely visible and transparent to you when paying for your offset, so you can see exactly how much goes to fees and how much goes directly to offsets. If you want to reduce the relative impact of fees, you can pay for a few offsets together at once - since some of the fees are fixed-price per purchase, this will lessen the overall percentage of money that goes to fees.

## Why are you open-source?

All the code for our site and services is open-source and available on Github. Anyone can read the code, suggest improvements, or “fork” it (making it their own). Some people might say that leaves us open for copycats benefiting from our work - but if it means more people easily offsetting their carbon footprint, that’s fine with us. If you’re a developer, we welcome contributions.

## What are you working on next?

Here are some example features we hope to implement in the future:

- More information on where the offsets go (eg. a map pop-up showing you where a solar farm is being built)
- Allowing you to choose where to send your offsets
- Offsets for transport other than flights
- Reports or a mailing list detailing where our users have contributed to offsets

We also hope to create a public roadmap, so people can see what we’re working on and suggest new ideas.
