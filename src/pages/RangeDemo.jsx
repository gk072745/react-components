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
            color="#007bff"
            thumbColor="#007bff"
            trackColor="#e9ecef"
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
            color="#28a745"
            thumbColor="#28a745"
            trackColor="#e9ecef"
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
            color="#dc3545"
            thumbColor="#dc3545"
            trackColor="#e9ecef"
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
          <BasicRange
            value={[25, 75]}
            label="Extra Small"
            min={0}
            max={100}
            step={1}
            color="#6f42c1"
            thumbColor="#6f42c1"
            trackColor="#e9ecef"
            size="xs"
          />
          <BasicRange
            value={[30, 70]}
            label="Small"
            min={0}
            max={100}
            step={1}
            color="#fd7e14"
            thumbColor="#fd7e14"
            trackColor="#e9ecef"
            size="sm"
          />
          <BasicRange
            value={[35, 65]}
            label="Medium"
            min={0}
            max={100}
            step={1}
            color="#20c997"
            thumbColor="#20c997"
            trackColor="#e9ecef"
            size="md"
          />
          <BasicRange
            value={[40, 60]}
            label="Large"
            min={0}
            max={100}
            step={1}
            color="#e83e8c"
            thumbColor="#e83e8c"
            trackColor="#e9ecef"
            size="lg"
          />
          <BasicRange
            value={[45, 55]}
            label="Extra Large"
            min={0}
            max={100}
            step={1}
            color="#6c757d"
            thumbColor="#6c757d"
            trackColor="#e9ecef"
            size="xl"
          />
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
            color="#007bff"
            thumbColor="#007bff"
            trackColor="#e9ecef"
            disabled={true}
            size="md"
          />
          <BasicRange
            value={[30, 70]}
            label="Readonly Range"
            min={0}
            max={100}
            step={1}
            color="#28a745"
            thumbColor="#28a745"
            trackColor="#e9ecef"
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
            color="#17a2b8"
            thumbColor="#17a2b8"
            trackColor="#e9ecef"
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
