import dayjs from "dayjs";
import { HistoryDataType, SymbolDataType } from "../sections/detail/types";
import { MinMaxSocialCountType } from "./types";

const DataHelper = {
  /**
   * Generates a random float number between two values.
   * @param min number
   * @param max number
   * @returns random float number
   */
  getRandomNumber(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  },

  /**
   * Generates a random start value for a stock history between 50 and 300.
   * The returned value is always 4 decimal places.
   * @returns random float number
   */
  getInitialValue(): number {
    return parseFloat(this.getRandomNumber(50, 300).toFixed(4));
  },

  /**
   * Generates a random daily value change between 0.01% and 3%.
   * The returned value is always 2 decimal places.
   * @returns random float number
   */
  getPercentChange(): number {
    const direction = Math.random() < 0.5 ? -1 : 1;
    const change = this.getRandomNumber(0.01, 3);
    return parseFloat((change * direction).toFixed(2));
  },

  /**
   * Calculates the new close value and expected daily value change
   *
   * If this is the first day of the history, both
   * the change and the value are generated.
   *
   * If this is a closed market day, the change is always set to 0
   * and the value is the same as the previous day.
   *
   * Otherwise, if this is any other day, the daily change is generated
   * and the new close value is calculated based on the previous day.
   *
   * @param index number (current day index in the history)
   * @param history array of history days
   * @param isClosed boolean (true if it's a weekend day)
   * @returns The new change and value calculated for the day
   */
  getHistoryDateValues(
    index: number,
    history: HistoryDataType[],
    isClosed: boolean
  ): { change: number; value: number } {
    if (history.length === 0) {
      return {
        change: this.getPercentChange(),
        value: this.getInitialValue(),
      };
    }

    if (isClosed) {
      return {
        change: 0,
        value: history[index - 1].value,
      };
    }

    const change = this.getPercentChange();
    return {
      change,
      value:
        history[index - 1].value + (change / 100) * history[index - 1].value,
    };
  },

  /**
   * Generates history data for the provided number of days,
   * goes back in time based on the current date.
   *
   * @param days number
   * @returns array of history days
   */
  getHistoryDays(days: number): HistoryDataType[] {
    let history = [];
    let originalDate = dayjs().subtract(days, "day");

    for (let i = 0; i <= days; i++) {
      const date = originalDate.add(i, "day");
      const dayOfWeek = date.day();
      const isClosed = dayOfWeek === 0 || dayOfWeek === 6;
      const historyDate: { change: number; value: number } =
        this.getHistoryDateValues(i, history, isClosed);

      history.push({
        change: historyDate.change,
        value: parseFloat(historyDate.value.toFixed(4)),
        date: date.format("YYYY-MM-DD"),
        closed: isClosed,
        social_count: parseInt(this.getRandomNumber(50, 300), 10),
      });
    }

    return history;
  },

  /**
   * Generates data for a given symbol and based on the provided number of days.
   * The generated history days are twice the amount of days since the averages
   * are calculated based on a floating period equal to the amount of days to display.
   *
   * @param symbol string (stock symbol)
   * @param period number of days
   * @returns symbol mock data
   */
  getSymbolData(symbol: string, period: number): SymbolDataType {
    return {
      symbol: symbol.toUpperCase(),
      history: this.getHistoryDays(period * 2),
    };
  },

  /**
   * Calculates the mininimum, maximum and average social media counts
   * for an array of history days.
   *
   * @param history array of history days
   * @returns minimum, maximum, average and total of social media
   * count for the history period
   */
  getMinMaxSocialCount(history: any): MinMaxSocialCountType {
    return history.reduce(
      (
        acc: MinMaxSocialCountType,
        { social_count }: { social_count: number },
        index: number
      ) => {
        const total = (acc.total ?? 0) + social_count;
        if (index === 0) {
          return {
            total,
            min: social_count,
            max: social_count,
          };
        }
        return {
          total,
          min: social_count < acc.min ? social_count : acc.min,
          max: social_count > acc.max ? social_count : acc.max,
          avg: total / (index + 1),
        };
      },
      {}
    );
  },
};

export default DataHelper;
