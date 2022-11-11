import dayjs from "dayjs";
import { Algorithms, Recommendations } from "../enums";
import { HistoryDataType } from "../sections/detail/types";
import DataHelper from "./data-helper";

const AlgorithmHelper = {
  /**
   * Sets the recommendation attribute for each day
   * based on the provided algorithm
   * @param history array of history days
   * @param period number
   * @param algorithm number (algorithm ID)
   * @returns history with recommendations
   */
  setRecommendations({
    history,
    period,
    algorithm,
  }: {
    history: HistoryDataType[];
    period: number;
    algorithm: number;
  }): HistoryDataType[] {
    switch (algorithm) {
      case Algorithms.reversedHype:
        return this.getReversedHypeAlgorithm(history, period);
      case Algorithms.ohGodItsFriday:
        return this.getOhGodItsFridayAlgorithm(history, period);
      default:
        return this.getStandardAlgorithm(history, period);
    }
  },

  /**
   * Standard algorithm function called by the setRecommandations method.
   *
   * If the social media count goes up in a significant way (+25% of the 10 floating days average)
   * and the daily value change is positive, the recommendation is to buy.
   *
   * If the social media count goes up in a significant way (+25% of the 10 floating days average)
   * and the daily value change is negative, the recommendation is to sell.
   *
   * The recommendation is to hold if not matching the aforementioned conditions.
   *
   * @param history array of history days
   * @param period number
   * @returns history with recommendations
   */
  getStandardAlgorithm(
    history: HistoryDataType[],
    period: number
  ): HistoryDataType[] {
    let previousRecommendation: number;
    const visibleDates = history.slice(-period);

    return visibleDates.map((day, i) => {
      const dateHistory =
        i === 0 ? visibleDates : history.slice(-i - period, -i);
      const socialHistory = DataHelper.getMinMaxSocialCount(dateHistory);
      const isUnusualSocialCount =
        day.social_count > socialHistory.avg + socialHistory.avg * 0.25;

      let recommendation = Recommendations.hold;
      if (day.closed && previousRecommendation) {
        recommendation = previousRecommendation;
      } else if (isUnusualSocialCount && day.change > 0) {
        recommendation = Recommendations.buy;
      } else if (isUnusualSocialCount && day.change < 0) {
        recommendation = Recommendations.sell;
      }

      previousRecommendation = recommendation;
      return { ...day, recommendation };
    });
  },

  /**
   * "Reversed Hype" algorithm function called by the setRecommandations method.
   *
   * If the social media count goes up in a very unusual way (+60% of the 10 floating days average)
   * the recommendation is to sell. Otherwise, the recommendation is to buy.
   *
   * @param history array of history days
   * @param period number
   * @returns history with recommendations
   */
  getReversedHypeAlgorithm(
    history: HistoryDataType[],
    period: number
  ): HistoryDataType[] {
    const visibleDates = history.slice(-period);
    return visibleDates.map((day, i) => {
      const dateHistory =
        i === 0 ? visibleDates : history.slice(-i - period, -i);
      const socialHistory = DataHelper.getMinMaxSocialCount(dateHistory);
      const isUnusualSocialCount =
        day.social_count > socialHistory.avg + socialHistory.avg * 0.6;

      let recommendation = Recommendations.buy;
      if (isUnusualSocialCount) {
        recommendation = Recommendations.sell;
      }

      return { ...day, recommendation };
    });
  },

  /**
   * "Oh God It's Friday" algorithm function called by the setRecommandations method.
   *
   * Slight modification of the Standard algorithm, the recommendation is to always sell
   * right before the closing of the stock market on Friday.
   *
   * @param history array of history days
   * @param period number
   * @returns history with recommendations
   */
  getOhGodItsFridayAlgorithm(
    history: HistoryDataType[],
    period: number
  ): HistoryDataType[] {
    const visibleDates = history.slice(-period);

    return visibleDates.map((day, i) => {
      const dateHistory =
        i === 0 ? visibleDates : history.slice(-i - period, -i);
      const socialHistory = DataHelper.getMinMaxSocialCount(dateHistory);
      const isUnusualSocialCount =
        day.social_count > socialHistory.avg + socialHistory.avg * 0.25;

      const isFriday = dayjs(day.date).day() === 5;
      let recommendation = Recommendations.hold;
      if (isFriday) {
        recommendation = Recommendations.sell;
      } else if (isUnusualSocialCount && day.change > 0) {
        recommendation = Recommendations.buy;
      } else if (isUnusualSocialCount && day.change < 0) {
        recommendation = Recommendations.sell;
      }

      return { ...day, recommendation };
    });
  },
};

export default AlgorithmHelper;
