import React, { useEffect, useRef, useState } from "react";

interface Props {
  selected: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const CurrencyDropdown: React.FC<Props> = ({
  selected,
  onChange,
  placeholder = "Search currency",
  disabled = false,
}) => {
  const [currencies, setCurrencies] = useState<Record<string, string>>({});
  const [search, setSearch] = useState("");
  const mountedRef = useRef(true);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    mountedRef.current = true;
    (async () => {
      try {
        const res = await fetch(
          "https://openexchangerates.org/api/currencies.json"
        );
        if (!res.ok) throw new Error("Failed to load currencies");
        const data: Record<string, string> = await res.json();
        if (mountedRef.current) setCurrencies(data);
      } catch {
        if (mountedRef.current) setCurrencies({});
      }
    })();
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!selected || !listRef.current) return;
    const el = listRef.current.querySelector<HTMLElement>(`#${selected}`);
    if (el) setTimeout(() => el.scrollIntoView({ block: "nearest" }), 0);
  }, [selected, search, currencies]);

  const q = search.trim().toLowerCase();
  const entries = Object.entries(currencies);
  const filtered = entries.filter(
    ([code, name]) =>
      !q || code.toLowerCase().includes(q) || name.toLowerCase().includes(q)
  );

  return (
    <div
      className={`dropdown-container ${disabled ? "dropdown-disabled" : ""}`}
      aria-label="currency-dropdown"
      aria-disabled={disabled}
      tabIndex={0}
    >
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeholder}
        className="search-input"
        aria-label="search-currency"
        disabled={
          false
        } 
      />
      <div
        ref={listRef}
        className="dropdown-list"
        role="listbox"
        tabIndex={-1}
        aria-activedescendant={selected || undefined}
      >
        {filtered.length === 0 ? (
          <div className="dropdown-item" aria-live="polite">
            No records found
          </div>
        ) : (
          filtered.map(([code, name]) => {
            const cc = code.slice(0, 2).toLowerCase();
            const flagUrl = `https://flagcdn.com/24x18/${cc}.png`;
            return (
              <div
                key={code}
                id={code}
                role="option"
                aria-selected={code === selected}
                tabIndex={0}
                className={`dropdown-item ${code === selected ? "active" : ""}`}
                onClick={() => {
                  if (!disabled) {
                    onChange(code);
                    setSearch("");
                  }
                }}
                onKeyDown={(e) => {
                  if ((e.key === "Enter" || e.key === " ") && !disabled) {
                    e.preventDefault();
                    onChange(code);
                    setSearch("");
                  }
                }}
                title={
                  disabled
                    ? "Fix amount to enable changing currency"
                    : undefined
                }
              >
                <img
                  src={flagUrl}
                  alt={`${code} flag`}
                  className="flag-icon"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="currency-text">
                  <span className="currency-code">{code}</span>
                  <span className="currency-name">{name}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CurrencyDropdown;
