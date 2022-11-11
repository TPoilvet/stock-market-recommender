import React, { useMemo } from "react";
import { Recommendations } from "../../enums";
import { CurrencyHelper } from "../../helpers";
import { ArrowDown, ArrowUp } from "../../icons";
import { HistoryDataType } from "./types";

type HistoryTableProps = {
  history: HistoryDataType[];
  showSocial: boolean;
};

const recVariants = {
  [Recommendations.hold]: { class: "neutral", value: "Hold" },
  [Recommendations.buy]: { class: "positive", value: "Buy" },
  [Recommendations.sell]: { class: "negative", value: "Sell" },
};

function HistoryTable(props: HistoryTableProps): JSX.Element {
  const { history, showSocial } = props;

  const colorClassName = (value: number): string => {
    if (value > 0) return "positive";
    if (value < 0) return "negative";
    return "";
  };

  const sortedHistory = useMemo<HistoryDataType[]>(() => {
    return [...history].sort((b, a) => a.date.localeCompare(b.date));
  }, [history]);

  return (
    <table className="history-table">
      <thead>
        <tr>
          <th></th>
          <th className="left-align">Date</th>
          {showSocial && <th>Social count</th>}
          <th>Close price</th>
          <th>Change</th>
          <th>Rec.</th>
        </tr>
      </thead>
      <tbody>
        {sortedHistory.map((x) => (
          <tr className={x.closed ? "closed" : ""} key={x.date}>
            <td className={colorClassName(x.change)}>
              <div className="history-table-arrow">
                {x.change > 0 && <ArrowUp />}
                {x.change < 0 && <ArrowDown />}
              </div>
            </td>
            <td className="left-align">{x.date}</td>
            {showSocial && <td>{x.social_count}</td>}
            <td>{CurrencyHelper.format(x.value)}</td>
            <td className={colorClassName(x.change)}>{x.change.toFixed(2)}%</td>
            <td className={recVariants[x.recommendation].class}>
              {recVariants[x.recommendation].value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default HistoryTable;
