import React, { useState } from "react";
import { Header } from "./components";
import { SearchSection } from "./sections/search";
import { DetailSection } from "./sections/detail";
import { SearchType } from "./sections/search/types";

function App(): JSX.Element {
  const [search, setSearch] = useState<SearchType>();

  return (
    <>
      <Header />
      <div className="container">
        <SearchSection onSearch={setSearch} defaultSearch="EXPL" />
        {search && <DetailSection search={search} />}
      </div>
    </>
  );
}

export default App;
