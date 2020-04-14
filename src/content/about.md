
## Carbon offsets aren’t enough, people should fly less!

Not a question. But yes, people should fly less. Airplane travel is one of the biggest sources of CO2 emissions. Travel by train or other transport have drastically lower carbon footprints. We agree with you.

But it's not always possible to completely stop flying. People have lives and loved ones in different countries or continents. We all need to take the train when we can - and offset our flights when we can't.

## How do you calculate how much carbon is needed to offset my flight?

We first calculate the [“great-circle distance”](https://en.wikipedia.org/wiki/Great-circle_distance) of your flight. That's the approximate distance your plane travels around the curvature of the earth. We then apply the [distance in kilometers](https://github.com/neutral-af/backend/blob/4f1396583c0450e9c61d12dda9a6ee63d383fd5d/lib/distance/distance.go) to an equation that calculates the [carbon emissions per-kilometer](https://github.com/neutral-af/backend/blob/4f1396583c0450e9c61d12dda9a6ee63d383fd5d/lib/emissions/emissions.go) of flying. We take into account the increased damage of carbon released at high altitudes (called the "radiative forcing factor"). The data for this equation comes from data provided by the UK government.

## How do you actually offset the carbon emissions?

We work together with providers like [Cloverly](https://www.cloverly.com/) to purchase offsets for your emissions. These offsets fund projects like renewable energy and reforestation.

We hope to make this even more transparent, and provide more information about the impact of your offset, in the future.

## How do you make money?

We don't.

At the risk of sounding like sanctimonious jerks, we're in this to help people live a bit greener, not to get rich. We do add a commission of 10% onto your offset charge. That pays for our servers and domains. If we have any extra money left over after those expenses, we put that towards even more carbon offsets.

## How much of the cost I pay goes to offsetting?

Each offset charge you pay includes some fees - from the offset provider (like Cloverly), the payment provider (like Stripe), and our commission to keep the site running. We make this completely transparent when you pay, so you can see exactly how much goes to fees and how much goes directly to offsets.

If you want to reduce the relative impact of fees, you can pay for a few offsets together at once (since some of the fees are fixed-price per purchase, this will lessen the overall percentage of money that goes to fees).

## Who are you?

We’re Jason and Emanuele, two developers in Berlin.

You can learn about us and read the open-source code behind Neutral.af [on GitHub](https://www.github.com/neutral-af).

## Why are you open-source?

All the code for our site and services is open-source and available on Github. Anyone can read the code, suggest improvements, or “fork” it (making it their own). Some people might say that leaves us open for copycats benefiting from our work. Oh well. If more people can easily offset their carbon footprint, that’s fine with us.

If you’re a developer, we welcome contributions.

## What are you working on next?

Here are some example features we hope to implement in the future:

- More information on where the offsets go (eg. a map pop-up showing you where a solar farm is being built)
- Allowing you to choose where to send your offsets
- Offsets for other forms of transport, not just flights
- Reports, or a mailing list, detailing where our users have contributed to offsets

We also hope to create a public roadmap, so people can see what we’re working on and suggest new ideas.
