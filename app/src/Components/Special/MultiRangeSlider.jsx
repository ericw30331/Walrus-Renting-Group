import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import "./MultiRangeSlider.css";

const MultiRangeSlider = ({ min, max, onChange }) => {
  const minPossible = 0;
  const maxPossible = 3000;
  const minValRef = useRef(min !== undefined ? min : minPossible);
  const maxValRef = useRef(max !== undefined ? max : maxPossible);
  const [minVal, setMinVal] = useState(min !== undefined ? min : minPossible);
  const [maxVal, setMaxVal] = useState(max !== undefined ? max : maxPossible);
  const range = useRef(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value) =>
      Math.round(((value - minPossible) / (maxPossible - minPossible)) * 100),
    [minPossible, maxPossible]
  );

  // Get min and max values when their state changes
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  return (
    <div className="container">
      <input
        type="range"
        min={minPossible}
        max={maxPossible}
        value={minVal}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxVal - 1);
          setMinVal(value);
          minValRef.current = value;
        }}
        className="thumb thumb--left"
        style={{ zIndex: minVal > maxPossible - 100 && "5" }}
      />
      <input
        type="range"
        min={minPossible}
        max={maxPossible}
        value={maxVal}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minVal + 1);
          setMaxVal(value);
          maxValRef.current = value;
        }}
        className="thumb thumb--right"
      />

      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
      </div>
    </div>
  );
};

MultiRangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default MultiRangeSlider;
