import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import MiscOptionsStyle from "./miscOptions.module.css";

const MiscOptions = ({
  colorDelineator,
  colorDelineatorValue,
  offset,
  offsetValue,
  rootOn,
  rootOnValue,
  quotes,
  quotesValue,
  setColorDelineator,
  setOffset,
  setRootOn,
  setQuotes,
  setFieldValue,
  errors,
  touched,
}) => {
  const handleChange = (value, setter, setFieldValue) => {
    return (e) => {
      if (e.target.className === "form-check-input") {
        setter(e.target.checked);
        setFieldValue(value, e.target.checked);
      } else {
        setter(e.target.value);
        setFieldValue(value, e.target.value);
      }
    };
  };
  return (
    <Form.Group as={Col} xs={12} md={6}>
      <Form.Label className={MiscOptionsStyle.header}>
        Color Delineator
      </Form.Label>
      <Form.Control
        aria-describedby="colorDelineator"
        type="text"
        placeholder="Color Delineator"
        value={colorDelineator}
        onChange={handleChange(
          colorDelineatorValue,
          setColorDelineator,
          setFieldValue
        )}
        isValid={!errors[colorDelineatorValue] && touched[colorDelineatorValue]}
        isInvalid={
          !!errors[colorDelineatorValue] && touched[colorDelineatorValue]
        }
      />
      <Form.Text id="colorDelineator" muted>
        Use "color=" for rapidNj and fastTree files, "____color__" for iqTree
      </Form.Text>
      <Form.Control.Feedback type="invalid">
        {errors[colorDelineatorValue]}
      </Form.Control.Feedback>

      <Form.Label className={MiscOptionsStyle.header}>Color Offset</Form.Label>
      <Form.Control
        aria-describedby="colorOffset"
        type="text"
        placeholder="Offset"
        value={offset}
        onChange={handleChange(offsetValue, setOffset, setFieldValue)}
        isValid={!errors[offsetValue] && touched[offsetValue]}
        isInvalid={!!errors[offsetValue] && touched[offsetValue]}
      />
      <Form.Text id="colorOffset" muted>
        Number of characters to skip from the back when extracting color code.
        If the end of the sequence name is "color=#FFFFFF]]", then color offset
        should be "-2"
      </Form.Text>
      <Form.Control.Feedback type="invalid">
        {errors[offsetValue]}
      </Form.Control.Feedback>
      <Form.Label className={MiscOptionsStyle.header}>Root On</Form.Label>
      <Form.Control
        type="text"
        placeholder="Clade to Root On"
        value={rootOn}
        onChange={handleChange(rootOnValue, setRootOn, setFieldValue)}
        isValid={!errors[rootOnValue] && touched[rootOnValue]}
        isInvalid={!!errors[rootOnValue] && touched[rootOnValue]}
      />
      <Form.Control.Feedback type="invalid">
        {errors[rootOnValue]}
      </Form.Control.Feedback>
      <Form.Check
        type="checkbox"
        name={quotesValue}
        className="mt-3"
        label="Is Sequence Name Quoted?"
        checked={quotes}
        onChange={handleChange(quotesValue, setQuotes, setFieldValue)}
        isInvalid={!!errors[quotesValue]}
        feedback={errors[quotesValue]}
      />
    </Form.Group>
  );
};

export default MiscOptions;
