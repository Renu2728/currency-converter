import React, { useState } from "react";
import CurrencyDropdown from "./CurrencyDropdown";
import Timer from "./Timer";
import { isValidAmount } from "../utils";
import { fetchExchangeRates } from "../api/currencyApi";

const ConvertSwap: React.FC = () => {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [timerKey, setTimerKey] = useState(0);
  const validAmount = isValidAmount(amount);
  const canConvert = validAmount && from && to;
  const handleAmount = (value: string) => {
    setAmount(value);

    setError(
      value && !isValidAmount(value) ? `${value} is not a valid number` : ""
    );
  };

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
    setResult(null);
    setError("");
  };

  const handleConvert = async () => {
    if (!from || !to) {
      setError("Please select both currencies");
      return;
    }

    try {
      const data = await fetchExchangeRates(from);
      const rate = data.rates[to];
      if (!rate) throw new Error("Rate not available");
      setResult(parseFloat(amount) * rate);
      setTimerKey((prev) => prev + 1);

      setError("");
    } catch {
      setError("Unable to fetch exchange rates");
    }
  };

  return (
    <div className="card">
      <div className="input-container">
        <input
          type="text"
          className={`amount-input ${error ? "invalid" : ""}`}
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => handleAmount(e.target.value)}
          aria-label="Amount to convert"
          aria-invalid={!!error}
        />

        {error && (
          <div className="amount-error" role="alert">
            {error}
          </div>
        )}
      </div>
      <div className="lists-row">
        <CurrencyDropdown
          selected={from}
          onChange={setFrom}
          disabled={!validAmount}
        />
        <button
          className="swap-btn"
          onClick={handleSwap}
          aria-label="Swap currencies"
        >
          ⇄
        </button>
        <CurrencyDropdown
          selected={to}
          onChange={setTo}
          disabled={!validAmount}
        />
      </div>
      <button
        className="convert-btn"
        onClick={handleConvert}
        disabled={!canConvert}
      >
        Convert
      </button>

      {result !== null && (
        <div className="result-section">
          <p>
            {amount} {from} = {result.toFixed(2)} {to}
          </p>
          <Timer key={timerKey} onComplete={() => setResult(null)} />
        </div>
      )}
    </div>
  );
};

export default ConvertSwap;
