import React, { useState } from "react";
import { Github, TextSize } from "../icons";

function Header(): JSX.Element {
  const [largerTextSize, setLargerTextSize] = useState<boolean>(false);

  const toggleLargerTextSize = (): void => {
    document.querySelector("body")?.classList.toggle("larger-text");
    setLargerTextSize(!largerTextSize);
  };

  return (
    <header>
      <div className="container header-content">
        <div className="header-logo">Stock Market Recommender</div>
        <div className="header-actions">
          <div className="header-fontsize" onClick={toggleLargerTextSize}>
            <TextSize />
            <span>
              {largerTextSize ? "Standard text size" : "Enlarge text size"}
            </span>
          </div>
          <div className="header-links">
            <a
              href="https://github.com/TPoilvet/stock-market-recommender"
              target="_blank"
              rel="noreferrer"
            >
              <Github />
              <span>Github</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
