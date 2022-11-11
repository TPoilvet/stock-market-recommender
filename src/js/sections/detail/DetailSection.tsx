import React, { useEffect, useState } from "react";
import { AlgorithmHelper, DataHelper } from "../../helpers";
import { HistoryChart, HistoryTable } from ".";
import { SearchType } from "../search/types";
import { SymbolDataType } from "../detail/types";

type DetailSectionProps = {
  search: SearchType;
};

function DetailSection(props: DetailSectionProps): JSX.Element {
  const { search } = props;
  const { symbol, period, algorithm, isSocial } = search;

  const [data, setData] = useState<SymbolDataType>();

  const fetchData = (): void => {
    // Generating data on the fly
    // Could be getting data from an API endpoint instead
    const symbolData = DataHelper.getSymbolData(symbol, period);

    // Applying recommendation algorythm
    symbolData.history = AlgorithmHelper.setRecommendations({
      period,
      algorithm,
      history: symbolData.history,
    });

    setData(symbolData);
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  return (
    <section>
      <div className="section-title">
        {search.symbol.toUpperCase()} stock history
      </div>
      <div className="detail-container">
        {data && (
          <>
            <HistoryChart history={data.history} />
            <HistoryTable history={data.history} showSocial={isSocial} />
          </>
        )}
      </div>
    </section>
  );
}

export default DetailSection;
