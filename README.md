# Stock Market Recommender

Application that provides a buy, hold or sell recommendation when given a stock symbol. The recommendation adjusts itself based on data.
The complete requirements can be found here: [/main/doc/specifications.pdf](https://github.com/TPoilvet/stock-market-recommender/blob/main/doc/specifications.pdf).

## Installation

1. Clone the repository on your computer
2. Move the command line into the resulting directory: `cd stock-market-recommender`
3. Install the dependencies: `npm install`
4. Execute the application: `npm start`
5. You can now view the application in the browser at [http://localhost:3000](http://localhost:3000)

## Assumptions

- The social media count is a concept introduced in the requirements for the needs of this application. It represents the likes/hashtags/posts people make on various social media regarding a stock symbol. This kind of social interaction is valuable when it comes to stocks and we want to include it in the recommendation algorithm.

- The recommendation algorithms can be completely imaginary, they don't have to be based on existing stock recommendation algorithms.

- All data must be generated on the fly with random values, it shouldn't be provided by an existing API.

## Personnal note

I am unfamiliar with most of the stock market ins and outs and created the application based on my existing knowledge and some research.

## Algorithms

Three algorithms have been implemented in the application, with the possibility for the user to change the active one on the fly.

### Standard algorithm

The following is assuming the user selected a period of 10 days.

- If the social media count goes up in a significant way (+25% of the 10 floating days average) and the daily value change is positive, the recommendation is to buy.
- If the social media count goes up in a significant way (+25% of the 10 floating days average) and the daily value change is negative, the recommendation is to sell.
- The recommendation is to hold if not matching the aforementioned conditions.

### "Reversed Hype" algorithm

The following is assuming the user selected a period of 10 days.

- If the social media count goes up in a very unusual way (+60% of the 10 floating days average) the recommendation is to sell.
- Otherwise, the recommendation is to buy.

### "Oh God It's Friday" algorithm

- Light modification of the Standard algorithm, the recommendation is to always sell right before the closing of the stock market on Friday.

---

PS: Clicking again on the `Confirm` button refreshes the chart and history table with a new set of data.
