import React, { useEffect, useState } from "react";
import { PeriodField, SymbolField, SocialField, AlgorithmField } from ".";
import { Button } from "../../components";
import { SearchType } from "./types";

type SearchSectionProps = {
  defaultSearch?: string;
  onSearch: (param: SearchType) => void;
};

function SearchSection(props: SearchSectionProps): JSX.Element {
  const { onSearch, defaultSearch } = props;

  const [symbol, setSymbol] = useState<string>(defaultSearch ?? "");
  const [period, setPeriod] = useState<number>(10);
  const [algorithm, setAlgorithm] = useState<number>(1);
  const [isSocial, setIsSocial] = useState<boolean>(true);

  const isFormValid: boolean = !!symbol && !!period;

  const submitSearch = (): void => {
    onSearch({ symbol, period, algorithm, isSocial });
  };

  useEffect(() => {
    if (defaultSearch) {
      submitSearch();
    }
  }, []);

  return (
    <section>
      <div className="section-title">Looking for a specific stock symbol?</div>
      <div className="search-options">
        <SymbolField value={symbol} onChange={setSymbol} />
        <PeriodField value={period} onChange={setPeriod} />
        <AlgorithmField value={algorithm} onChange={setAlgorithm} />
        <SocialField value={isSocial} onChange={setIsSocial} />
      </div>
      <div className="search-confirm">
        <Button disabled={!isFormValid} onClick={submitSearch}>
          Confirm
        </Button>
      </div>
    </section>
  );
}

export default SearchSection;
