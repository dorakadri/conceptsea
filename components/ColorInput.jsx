import React, { useRef} from "react";

const ColorInput = ({ setColors, colors }) => {
  const colorInputRef = useRef([]);


  const handleDivClick = (index) => {
    colorInputRef.current[index].click();

  };

  const handleColorChange = (e, index) => {
    const selectedColor = e.target.value;
    setColors((prev) => {
      const updatedColors = [...prev];
      updatedColors[index] = selectedColor;
      
      return updatedColors;
    });
  };


  return (
    <div className="flex flex-col gap-5 ">
      <label className="subtitle font-semibold">Choose your color palette :</label>
      <div className="flex gap-5 ">
        {Array(6)
          .fill()
          .map((_, i) => (
            <div
              className={`w-24 h-24  relative ${
                colors[i] ? "" : "border-dashed border-4"
              } rounded-2xl flex items-center justify-center`}
              key={i}
              onClick={() => handleDivClick(i)}
              style={{ backgroundColor: colors[i] }}
            >
              <input
                type="color"
                ref={(element) => (colorInputRef.current[i] = element)}
                onChange={(e) => handleColorChange(e, i)}
                name={`inputColor${i}`}
                className="invisible inputclorpicker"
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ColorInput;
