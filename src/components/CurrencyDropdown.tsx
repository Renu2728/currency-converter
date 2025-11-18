import React, { useEffect, useState, useMemo } from "react";
import { fetchCurrencyNames } from "../api/currencyApi";
import { isValidSearch } from "../utils";
interface CurrencyDropdownProps {
  selected: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}
const CurrencyDropdown: React.FC<CurrencyDropdownProps> = ({
  selected,
  onChange,
  disabled = false,
}) => {
  const [currencies, setCurrencies] = useState<Record<string, string>>({});
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const loadCurrencies = async () => {
      try {
        const currencyData = await fetchCurrencyNames();
        setCurrencies(currencyData);
      } catch (error) {
        console.error("Failed to load currencies:", error);
        setCurrencies({});
      }
    };
    loadCurrencies();
  }, []);
  const filteredCurrencies = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return Object.entries(currencies);
    return Object.entries(currencies).filter(
      ([code, name]) =>
        code.toLowerCase().includes(query) || name.toLowerCase().includes(query)
    );
  }, [currencies, searchQuery]);
  const handleSelect = (currencyCode: string) => {
    onChange(currencyCode);
    setIsOpen(false);
    setSearchQuery("");
  };
  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      setSearchQuery("");
    }
  };
  const selectedCurrencyName = selected
    ? currencies[selected]
    : "Select currency";
  return (
    <div className="traditional-dropdown-container">
      <button
        className={`dropdown-trigger ${disabled ? "disabled" : ""}`}
        onClick={toggleDropdown}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="selected-display">
          {selected && (
            <img
              src={`https://flagcdn.com/24x18/${selected
                .slice(0, 2)
                .toLowerCase()}.png`}
              alt=""
              className="flag-icon"
              onError={(event) => {
                (event.target as HTMLImageElement).style.display = "none";
              }}
            />
          )}
          <div className="currency-display">
            {selected ? (
              <>
                <span>{selected}</span>
                <span>{selectedCurrencyName}</span>
              </>
            ) : (
              <span>Select currency</span>
            )}
          </div>
        </div>
        <span className="dropdown-arrow">▼</span>
      </button>
      {isOpen && (
        <div className="dropdown-menu" role="listbox">
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search currency code or name..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              onClick={(event) => event.stopPropagation()}
            />
          </div>
          <div className="dropdown-options">
            {filteredCurrencies.length > 0 ? (
              filteredCurrencies.map(([currencyCode, currencyName]) => {
                const countryCode = currencyCode.slice(0, 2).toLowerCase();
                return (
                  <div
                    key={currencyCode}
                    role="option"
                    aria-selected={currencyCode === selected}
                    className={`dropdown-option ${
                      currencyCode === selected ? "selected" : ""
                    }`}
                    onClick={() => handleSelect(currencyCode)}
                  >
                    <img
                      src={`https://flagcdn.com/24x18/${countryCode}.png`}
                      alt=""
                      className="flag-icon"
                      onError={(event) => {
                        (event.target as HTMLImageElement).style.display =
                          "none";
                      }}
                    />
                    <div className="option-text">
                      <span className="currency-code">{currencyCode}</span>
                      <span className="currency-name">{currencyName}</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="dropdown-option no-results">
                {isValidSearch(searchQuery)
                  ? `No currencies found for "${searchQuery}"`
                  : "Please enter a search term"}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default CurrencyDropdown;