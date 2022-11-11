const CurrencyHelper = {
  /**
   * Formats the provided number to a CAD currency with 2 decimal places.
   * @param value number
   * @returns CAD formatted currency
   */
  format(value: any): string {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  },
};

export default CurrencyHelper;
