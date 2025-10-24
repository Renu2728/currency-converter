import React, { useState } from "react";
import InputField from "./InputField";
import CurrencyDropdown from "./CurrencyDropdown";
import Timer from "./ResultDisplay";
import { isValidAmount } from "../utils/validation";

const ConvertSwap : React.FC = () => {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState<string>("");
  const [toCurrency, setToCurrency] = useState<string>("");
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [startTimerKey, setStartTimerKey] = useState(0);
  const isAmountValid = isValidAmount(amount);
  const canConvert = isAmountValid && !!fromCurrency && !!toCurrency;
  const handleAmountChange = (value: string) => {
    setAmount(value);
    if (!value) {
      setError("");
      return;
    }
    if (!isValidAmount(value)) {
      setError(`${value} is not a valid number`);
      setConvertedAmount(null);
    } else {
      setError("");
    }
  };

  const handleSetFrom = (code: string) => setFromCurrency(code);
  const handleSetTo = (code: string) => setToCurrency(code);

  const handleConvert = async () => {
    if (!isAmountValid) {
      setError(`${amount || "Value"} is not a valid number`);
      setConvertedAmount(null);
      return;
    }
    if (!fromCurrency || !toCurrency) {
      setError("Please select both currencies");
      return;
    }
    setError("");
    try {
      const res = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
      );
      if (!res.ok) throw new Error("rates fetch failed");
      const data = await res.json();
      const rate = data?.rates?.[toCurrency];
      if (!rate) {
        setError("Rate not available for selected currency");
        setConvertedAmount(null);
        return;
      }
      setConvertedAmount(parseFloat(amount) * rate);
      setStartTimerKey((k) => k + 1);
    } catch {
      setError("Unable to fetch exchange rates");
      setConvertedAmount(null);
    }
  };

  const handleSwap = () => {
    const prevFrom = fromCurrency;
    const prevTo = toCurrency;
    setFromCurrency(prevTo);
    setToCurrency(prevFrom);
    setConvertedAmount(null);
    setError("");
  };

  return (
    <div className="card">
      <InputField value={amount} onChange={handleAmountChange} error={error} />

      <div className="lists-row" style={{ marginTop: 12 }}>
        <div className="currency-col">
          <CurrencyDropdown
            selected={fromCurrency}
            onChange={handleSetFrom}
            disabled={!isAmountValid}
          />
        </div>

        <button aria-label="swap" className="swap-btn" onClick={handleSwap}>
          ⇄
        </button>

        <div className="currency-col">
          <CurrencyDropdown
            selected={toCurrency}
            onChange={handleSetTo}
            disabled={!isAmountValid}
          />
        </div>
      </div>

      <button
        className="convert-btn"
        onClick={handleConvert}
        disabled={!canConvert}
      >
        Convert
      </button>

      {convertedAmount !== null && (
        <div
          className="result-section"
          style={{ textAlign: "center", marginTop: 12 }}
        >
          <p style={{ color: "#1f4b87", fontWeight: 600 }}>
            {amount} {fromCurrency} is equivalent to{" "}
            {convertedAmount.toFixed(2)} {toCurrency}
          </p>
          <div style={{ display: "inline-block", marginTop: 8 }}>
            <Timer
              key={startTimerKey}
              onComplete={() => setConvertedAmount(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ConvertSwap;
