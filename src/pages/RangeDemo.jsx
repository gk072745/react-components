import React, { useState } from 'react';
import BasicRange from '../components/sharedComponents/BasicRange';

const RangeDemo = () => {
  const [rangeValue1, setRangeValue1] = useState([20, 80]);
  const [rangeValue2, setRangeValue2] = useState([10, 90]);
  const [rangeValue3, setRangeValue3] = useState([30, 70]);
  const [rangeValue4, setRangeValue4] = useState([0, 100]);

  const handleRangeChange1 = newValue => {
    console.log('Range 1 changed:', newValue);
    setRangeValue1(newValue);
  };

  const handleRangeChange2 = newValue => {
    console.log('Range 2 changed:', newValue);
    setRangeValue2(newValue);
  };

  const handleRangeChange3 = newValue => {
    console.log('Range 3 changed:', newValue);
    setRangeValue3(newValue);
  };

  const handleRangeChange4 = newValue => {
    console.log('Range 4 changed:', newValue);
    setRangeValue4(newValue);
  };

  return (
    <div className="range-demo">
      <h1>Basic Range Component Demo</h1>

      {/* Basic Range */}
      <section className="demo-section">
        <h2>Basic Range</h2>
        <div className="demo-group">
          <BasicRange
            value={rangeValue1}
            onChange={handleRangeChange1}
            label="Price Range"
            min={0}
            max={100}
            step={1}
            variant="primary"
            size="md"
          />
        </div>
        <p>
          Selected: {rangeValue1[0]} - {rangeValue1[1]}
        </p>
      </section>

      {/* Range with Thumb Labels */}
      <section className="demo-section">
        <h2>Range with Thumb Labels</h2>
        <div className="demo-group">
          <BasicRange
            value={rangeValue2}
            onChange={handleRangeChange2}
            label="Temperature Range"
            min={-50}
            max={150}
            step={5}
            variant="success"
            thumbLabel={true}
            size="lg"
          />
        </div>
        <p>
          Selected: {rangeValue2[0]}°C - {rangeValue2[1]}°C
        </p>
      </section>

      {/* Range with Always Visible Labels */}
      <section className="demo-section">
        <h2>Range with Always Visible Labels</h2>
        <div className="demo-group">
          <BasicRange
            value={rangeValue3}
            onChange={handleRangeChange3}
            label="Percentage Range"
            min={0}
            max={100}
            step={0.1}
            variant="danger"
            thumbLabel="always"
            size="md"
          />
        </div>
        <p>
          Selected: {rangeValue3[0].toFixed(1)}% - {rangeValue3[1].toFixed(1)}%
        </p>
      </section>

      {/* Different Sizes */}
      <section className="demo-section">
        <h2>Different Sizes</h2>
        <div className="demo-group">
          <BasicRange value={[25, 75]} label="Extra Small" min={0} max={100} step={1} variant="primary" size="xs" />
          <BasicRange value={[30, 70]} label="Small" min={0} max={100} step={1} variant="warning" size="sm" />
          <BasicRange value={[35, 65]} label="Medium" min={0} max={100} step={1} variant="success" size="md" />
          <BasicRange value={[40, 60]} label="Large" min={0} max={100} step={1} variant="danger" size="lg" />
          <BasicRange value={[45, 55]} label="Extra Large" min={0} max={100} step={1} variant="info" size="xl" />
        </div>
      </section>

      {/* Disabled and Readonly */}
      <section className="demo-section">
        <h2>Disabled and Readonly</h2>
        <div className="demo-group">
          <BasicRange
            value={[20, 80]}
            label="Disabled Range"
            min={0}
            max={100}
            step={1}
            variant="primary"
            disabled={true}
            size="md"
          />
          <BasicRange
            value={[30, 70]}
            label="Readonly Range"
            min={0}
            max={100}
            step={1}
            variant="success"
            readonly={true}
            size="md"
          />
        </div>
      </section>

      {/* Custom Step Values */}
      <section className="demo-section">
        <h2>Custom Step Values</h2>
        <div className="demo-group">
          <BasicRange
            value={rangeValue4}
            onChange={handleRangeChange4}
            label="Decimal Range"
            min={0}
            max={10}
            step={0.25}
            variant="info"
            thumbLabel={true}
            size="md"
          />
        </div>
        <p>
          Selected: {rangeValue4[0].toFixed(2)} - {rangeValue4[1].toFixed(2)}
        </p>
      </section>
    </div>
  );
};

export default RangeDemo;
