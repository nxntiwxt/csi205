// src/components/Temperatures.js
import { useState } from "react";

function Value({ name, value, setValue, type = "number", step = 1 }) {
  const displayValue = typeof value === 'number' ? value.toFixed(2) : value;
  
  return (
    <div
      className="border border-black border-2 rounded-3 mx-auto p-2 mt-2 bg-secondary-subtle"
      style={{ width: "fit-content" }}
    >
      <h1 className="text-center fw-bold text-primary" style={{ fontSize: "1rem" }}>
        {name}
      </h1>
      <div className="d-flex justify-content-between align-items-center gap-2">
        <button
          className="btn btn-danger px-3"
          onClick={() => setValue(Number(value) - step)}
        >
          &minus;
        </button>
        <span className="fs-5 fw-bold">{displayValue}</span>
        <button
          className="btn btn-success px-3"
          onClick={() => setValue(Number(value) + step)}
        >
          +
        </button>
      </div>
    </div>
  );
}

function Temperatures({ name, codename }) {
  const [celsius, setCelsius] = useState(25);

  const toFahrenheit = (c) => parseFloat((c * 9 / 5 + 32).toFixed(2));
  const toKelvin = (c) => parseFloat((c + 273.15).toFixed(2));

  const setFromCelsius = (c) => setCelsius(parseFloat(c.toFixed(2)));
  const setFromFahrenheit = (f) => setCelsius(parseFloat(((f - 32) * 5 / 9).toFixed(2)));
  const setFromKelvin = (k) => setCelsius(parseFloat((k - 273.15).toFixed(2)));

  return (
    <div
      className="border border-black border-2 rounded-3 mx-auto p-3 mt-3"
      style={{ width: "fit-content" }}
    >
      <h1 className="text-center fw-bold text-primary">
        {name || "TEMPERATURES"} {codename ? `[${codename}]` : ""}
      </h1>

      <div className="d-flex gap-3 justify-content-between mt-2">
        {/* Celsius */}
        <div className="flex-fill text-center">
          <div className="mt-2 mx-auto" style={{ width: "100px" }}>
            <input
              type="text"
              className="form-control text-center fw-bold bg-primary text-white"
              value={`${celsius.toFixed(2)} °C`}
              readOnly
            />
          </div>
          <Value
            name="CELSIUS"
            value={celsius}
            setValue={setFromCelsius}
            type="number"
            step={0.01}
          />
        </div>

        {/* Fahrenheit */}
        <div className="flex-fill text-center">
          <div className="mt-2 mx-auto" style={{ width: "100px" }}>
            <input
              type="text"
              className="form-control text-center fw-bold bg-primary text-white"
              value={`${toFahrenheit(celsius).toFixed(2)} °F`}
              readOnly
            />
          </div>
          <Value
            name="FAHRENHEIT"
            value={toFahrenheit(celsius)}
            setValue={setFromFahrenheit}
            type="number"
            step={0.01}
          />
        </div>

        {/* Kelvin */}
        <div className="flex-fill text-center">
          <div className="mt-2 mx-auto" style={{ width: "100px" }}>
            <input
              type="text"
              className="form-control text-center fw-bold bg-primary text-white"
              value={`${toKelvin(celsius).toFixed(2)} K`}
              readOnly
            />
          </div>
          <Value
            name="KELVIN"
            value={toKelvin(celsius)}
            setValue={setFromKelvin}
            type="number"
            step={0.01}
          />
        </div>
      </div>
    </div>
  );
}

export default Temperatures;