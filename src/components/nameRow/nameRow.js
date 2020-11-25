import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { MdCancel } from "react-icons/md";
import { removeField, onChange } from "../util";

const NameRow = ({
  index,
  nameFrom,
  nameTo,
  nameMapping,
  setNameMapping,
  setFieldValue,
  errors,
  touched,
  setTouched,
}) => {
  return (
    <Form.Row key={index} className="mb-2 mt-2">
      <Col xs={12} md={5}>
        <Form.Control
          type="text"
          name={`${nameFrom}${index}`}
          isValid={
            touched[`${nameFrom}${index}`] && !errors[`${nameFrom}${index}`]
          }
          isInvalid={
            !!errors[`${nameFrom}${index}`] && touched[`${nameFrom}${index}`]
          }
          placeholder="Actual Clade Name"
          onChange={onChange(index, nameFrom, setNameMapping, setFieldValue)}
          value={nameMapping[index][nameFrom] || ""}
        />
        <Form.Control.Feedback type="invalid">
          {errors[`${nameFrom}${index}`]}
        </Form.Control.Feedback>
      </Col>
      <Col xs={12} md={5}>
        <Form.Control
          type="text"
          name={`${nameTo}${index}`}
          isValid={touched[`${nameTo}${index}`] && !errors[`${nameTo}${index}`]}
          isInvalid={
            !!errors[`${nameTo}${index}`] && touched[`${nameTo}${index}`]
          }
          placeholder="Desired Clade Name"
          onChange={onChange(index, nameTo, setNameMapping, setFieldValue)}
          value={nameMapping[index][nameTo] || ""}
        />
        <Form.Control.Feedback type="invalid">
          {errors[`${nameTo}${index}`]}
        </Form.Control.Feedback>
      </Col>
      <Col xs={12} md={1}>
        <MdCancel
          onClick={removeField(
            index,
            nameMapping,
            setNameMapping,
            setFieldValue,
            setTouched
          )}
        />
      </Col>
    </Form.Row>
  );
};

export default NameRow;
