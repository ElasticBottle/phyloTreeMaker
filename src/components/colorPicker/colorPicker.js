import React from "react";
import { ChromePicker } from "react-color";
import colorPickerStyles from "./colorPicker.module.css";

function ColorPicker({ index, color, setCladeProperties }) {
  const onChange = (chosenColor) => {
    setCladeProperties((prev) => {
      return { ...prev, [index]: { ...prev[index], color: chosenColor.hex } };
    });
  };
  const [show, setShow] = React.useState(false);
  const updateShow = () => setShow(!show);
  return (
    <div>
      <div className={colorPickerStyles.swatch} onClick={updateShow}>
        <div
          className={colorPickerStyles.color}
          style={{ background: color }}
        />
      </div>
      {show ? (
        <div className={colorPickerStyles.popover}>
          <div className={colorPickerStyles.cover} onClick={updateShow} />
          <ChromePicker color={color} onChange={onChange} />
        </div>
      ) : null}
    </div>
  );
}

export default ColorPicker;
