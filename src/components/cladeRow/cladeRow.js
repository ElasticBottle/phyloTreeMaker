import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import ColorPicker from "../../components/colorPicker/colorPicker";
import { MdCancel } from "react-icons/md";
import { removeField, onChange } from "../util";

const CladeRow = ({
  cladeProperties,
  setCladeProperties,
  index,
  clade,
  minDensity,
  maxDensity,
  minCoverage,
  maxCoverage,
  color,
  setFieldValue,
  errors,
  touched,
  setTouched,
}) => {
  return (
    <Form.Row className="mb-2 mt-2">
      <Col xs={12} md={2}>
        <Form.Control
          type="text"
          placeholder="Clade name"
          name={`${clade}${index}`}
          value={cladeProperties[index][clade] || ""}
          onChange={onChange(index, clade, setCladeProperties, setFieldValue)}
          isValid={!errors[`${clade}${index}`] && touched[`${clade}${index}`]}
          isInvalid={
            !!errors[`${clade}${index}`] && touched[`${clade}${index}`]
          }
        />
        <Form.Control.Feedback type="invalid">
          {errors[`${clade}${index}`]}
        </Form.Control.Feedback>
      </Col>
      <Col xs={12} md={1}>
        <ColorPicker
          index={index}
          color={cladeProperties[index][color]}
          setCladeProperties={setCladeProperties}
        />
        <Form.Control.Feedback>{errors.color}</Form.Control.Feedback>
      </Col>
      <Col xs={12} md={2}>
        <Form.Control
          type="text"
          placeholder="Min Density"
          name={`${minDensity}${index}`}
          value={cladeProperties[index][minDensity]}
          onChange={onChange(
            index,
            minDensity,
            setCladeProperties,
            setFieldValue
          )}
          isValid={
            !errors[`${minDensity}${index}`] && touched[`${minDensity}${index}`]
          }
          isInvalid={
            !!errors[`${minDensity}${index}`] &&
            touched[`${minDensity}${index}`]
          }
        />
        <Form.Control.Feedback type="invalid">
          {errors[`${minDensity}${index}`]}
        </Form.Control.Feedback>
      </Col>
      <Col xs={12} md={2}>
        <Form.Control
          type="text"
          placeholder="Max Density"
          name={`${maxDensity}${index}`}
          value={cladeProperties[index][maxDensity]}
          onChange={onChange(
            index,
            maxDensity,
            setCladeProperties,
            setFieldValue
          )}
          isValid={
            !errors[`${maxDensity}${index}`] && touched[`${maxDensity}${index}`]
          }
          isInvalid={
            !!errors[`${maxDensity}${index}`] &&
            touched[`${maxDensity}${index}`]
          }
        />
        <Form.Control.Feedback type="invalid">
          {errors[`${maxDensity}${index}`]}
        </Form.Control.Feedback>
      </Col>

      <Col xs={12} md={2}>
        <Form.Control
          type="text"
          placeholder="Min Coverage"
          name={`${minCoverage}${index}`}
          value={cladeProperties[index][minCoverage]}
          onChange={onChange(
            index,
            minCoverage,
            setCladeProperties,
            setFieldValue
          )}
          isValid={
            !errors[`${minCoverage}${index}`] &&
            touched[`${minCoverage}${index}`]
          }
          isInvalid={
            !!errors[`${minCoverage}${index}`] &&
            touched[`${minCoverage}${index}`]
          }
        />
        <Form.Control.Feedback type="invalid">
          {errors[`${minCoverage}${index}`]}
        </Form.Control.Feedback>
      </Col>

      <Col xs={12} md={2}>
        <Form.Control
          type="text"
          placeholder="Max Coverage"
          name={`${maxCoverage}${index}`}
          value={cladeProperties[index][maxCoverage]}
          onChange={onChange(
            index,
            maxCoverage,
            setCladeProperties,
            setFieldValue
          )}
          isValid={
            !errors[`${maxCoverage}${index}`] &&
            touched[`${maxCoverage}${index}`]
          }
          isInvalid={
            !!errors[`${maxCoverage}${index}`] &&
            touched[`${maxCoverage}${index}`]
          }
        />
        <Form.Control.Feedback type="invalid">
          {errors[`${maxCoverage}${index}`]}
        </Form.Control.Feedback>
      </Col>
      <Col xs={12} md={1}>
        <MdCancel
          onClick={removeField(
            index,
            cladeProperties,
            setCladeProperties,
            setFieldValue,
            setTouched
          )}
        />
      </Col>
    </Form.Row>
  );
};

export default CladeRow;
