import React, { useState } from 'react';
import BasicSlider from '../components/sharedComponents/BasicSlider';

const SliderDemo = () => {
  const [sliderValue1, setSliderValue1] = useState(50);
  const [sliderValue2, setSliderValue2] = useState(75);
  const [sliderValue3, setSliderValue3] = useState(25);
  const [sliderValue4, setSliderValue4] = useState(60);

  const handleSliderChange1 = newValue => {
    console.log('Slider 1 changed:', newValue);
    setSliderValue1(newValue);
  };

  const handleSliderChange2 = newValue => {
    console.log('Slider 2 changed:', newValue);
    setSliderValue2(newValue);
  };

  const handleSliderChange3 = newValue => {
    console.log('Slider 3 changed:', newValue);
    setSliderValue3(newValue);
  };

  const handleSliderChange4 = newValue => {
    console.log('Slider 4 changed:', newValue);
    setSliderValue4(newValue);
  };

  return (
    <div className="slider-demo">
      <h1>Basic Slider Component Demo</h1>

      {/* Variants */}
      <section className="demo-section">
        <h2>Variants</h2>
        <div className="demo-group">
          <BasicSlider value={50} label="Default Variant" min={0} max={100} step={1} variant="default" size="md" />
          <BasicSlider value={60} label="Primary Variant" min={0} max={100} step={1} variant="primary" size="md" />
          <BasicSlider value={70} label="Success Variant" min={0} max={100} step={1} variant="success" size="md" />
          <BasicSlider value={80} label="Warning Variant" min={0} max={100} step={1} variant="warning" size="md" />
          <BasicSlider value={90} label="Danger Variant" min={0} max={100} step={1} variant="danger" size="md" />
          <BasicSlider value={40} label="Info Variant" min={0} max={100} step={1} variant="info" size="md" />
        </div>
      </section>

      {/* Basic Slider */}
      <section className="demo-section">
        <h2>Basic Slider</h2>
        <div className="demo-group">
          <BasicSlider
            value={sliderValue1}
            onChange={handleSliderChange1}
            label="Volume Control"
            min={0}
            max={100}
            step={1}
            variant="primary"
            size="md"
          />
        </div>
        <p>Current Value: {sliderValue1}</p>
      </section>

      {/* Slider with Thumb Labels */}
      <section className="demo-section">
        <h2>Slider with Thumb Labels</h2>
        <div className="demo-group">
          <BasicSlider
            value={sliderValue2}
            onChange={handleSliderChange2}
            label="Temperature Control"
            min={-50}
            max={150}
            step={5}
            variant="success"
            thumbLabel={true}
            size="lg"
          />
        </div>
        <p>Current Temperature: {sliderValue2}°C</p>
      </section>

      {/* Slider with Always Visible Labels */}
      <section className="demo-section">
        <h2>Slider with Always Visible Labels</h2>
        <div className="demo-group">
          <BasicSlider
            value={sliderValue3}
            onChange={handleSliderChange3}
            label="Percentage Control"
            min={0}
            max={100}
            step={0.1}
            variant="danger"
            thumbLabel="always"
            size="md"
          />
        </div>
        <p>Current Percentage: {sliderValue3.toFixed(1)}%</p>
      </section>

      {/* Different Sizes */}
      <section className="demo-section">
        <h2>Different Sizes</h2>
        <div className="demo-group">
          <BasicSlider value={25} label="Extra Small" min={0} max={100} step={1} variant="info" size="xs" />
          <BasicSlider value={30} label="Small" min={0} max={100} step={1} variant="warning" size="sm" />
          <BasicSlider value={35} label="Medium" min={0} max={100} step={1} variant="success" size="md" />
          <BasicSlider value={40} label="Large" min={0} max={100} step={1} variant="danger" size="lg" />
          <BasicSlider value={45} label="Extra Large" min={0} max={100} step={1} variant="primary" size="xl" />
        </div>
      </section>

      {/* Disabled and Readonly */}
      <section className="demo-section">
        <h2>Disabled and Readonly</h2>
        <div className="demo-group">
          <BasicSlider
            value={50}
            label="Disabled Slider"
            min={0}
            max={100}
            step={1}
            variant="primary"
            disabled={true}
            size="md"
          />
          <BasicSlider
            value={60}
            label="Readonly Slider"
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
          <BasicSlider
            value={sliderValue4}
            onChange={handleSliderChange4}
            label="Decimal Control"
            min={0}
            max={10}
            step={0.25}
            variant="info"
            thumbLabel={true}
            size="md"
          />
        </div>
        <p>Current Value: {sliderValue4.toFixed(2)}</p>
      </section>

      {/* Custom Ranges */}
      <section className="demo-section">
        <h2>Custom Ranges</h2>
        <div className="demo-group">
          <BasicSlider value={5} label="Small Range (0-10)" min={0} max={10} step={1} variant="primary" size="md" />
          <BasicSlider
            value={500}
            label="Large Range (0-1000)"
            min={0}
            max={1000}
            step={10}
            variant="success"
            size="md"
          />
          <BasicSlider
            value={-25}
            label="Negative Range (-100 to 100)"
            min={-100}
            max={100}
            step={5}
            variant="warning"
            size="md"
          />
        </div>
      </section>
    </div>
  );
};

export default SliderDemo;
