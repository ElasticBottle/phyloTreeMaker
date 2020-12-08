import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Formik } from "formik";
import * as yup from "yup";
import { MdAddBox } from "react-icons/md";
import { useHistory } from "react-router-dom";

import * as service from "../../services/treeGen";
import CladeRow from "../../components/cladeRow/cladeRow";
import NameRow from "../../components/nameRow/nameRow";
import FileUpload from "../../components/fileUpload/fileUpload";
import MiscOptions from "../../components/miscOptions/miscOptions";
import UploadPageStyles from "./uploadPage.module.css";

const CLADE = "clade";
const COLOR = "color";
const MIN_DENSITY = "minDensity";
const MAX_DENSITY = "maxDensity";
const MIN_COVERAGE = "minCoverage";
const MAX_COVERAGE = "maxCoverage";
const NAME_FROM = "nameFrom";
const NAME_TO = "nameTo";
const NWK_FILE = "nwkFile";
const QUOTES = "quotes";
const COLOR_DELINEATOR = "colorDelineator";
const COLOR_OFFSET = "colorOffset";
const ROOT_ON = "rootOn";

function UploadPage({ setResults }) {
  const schemaBase = React.useRef({
    [CLADE]: yup
      .string()
      .typeError("Clade must be a filled in")
      .required("Required"),
    [COLOR]: yup
      .string()
      .required()
      .matches(/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/, {
        excludeEmptyString: true,
      }),
    [MIN_DENSITY]: yup
      .number()
      .typeError("Min Density must be a number between 0 and 100")
      .required("Required")
      .positive()
      .min(0, "Number must more than 0%")
      .max(100, "Number must be less than 100%"),
    [MAX_DENSITY]: yup
      .number()
      .typeError("Max Density must be a number between 0 and 100")
      .required("Required")
      .positive()
      .min(0, "Number must more than 0%")
      .max(100, "Number must be less than 100%"),
    [MIN_COVERAGE]: yup
      .number()
      .typeError("Min Coverage must be a number between 0 and 100")
      .required("Required")
      .positive()
      .min(0, "Number must more than 0%")
      .max(100, "Number must be less than 100%"),
    [MAX_COVERAGE]: yup
      .number()
      .typeError("Max Coverage must be a number between 0 and 100")
      .required("Required")
      .positive()
      .min(0, "Number must more than 0%")
      .max(100, "Number must be less than 100%"),
    [NAME_FROM]: yup.string().typeError("Required").required("Required"),
    [NAME_TO]: yup.string().typeError("Required").required("Required"),
    [QUOTES]: yup.boolean(),
    [COLOR_DELINEATOR]: yup.string().required("Required"),
    [COLOR_OFFSET]: yup
      .number()
      .typeError("Color Offset must be a number. Should be between -5,5")
      .required("Required"),
    [ROOT_ON]: yup.string().required("Required"),
    [NWK_FILE]: yup.mixed().required("Required"),
  });
  const history = useHistory();

  const newProperties = React.useRef({
    [CLADE]: "",
    [COLOR]: "#eeaabb",
    [MIN_DENSITY]: "",
    [MAX_DENSITY]: "",
    [MIN_COVERAGE]: "",
    [MAX_COVERAGE]: "",
  });
  const newNameMapping = React.useRef({ [NAME_FROM]: "", [NAME_TO]: "" });
  const [cladeProperties, setCladeProperties] = React.useState({
    0: {
      clade: "G_",
      color: "#fdb3b3",
      minDensity: 0.1,
      maxDensity: 1,
      minCoverage: 0.6,
      maxCoverage: 1,
    },
    1: {
      clade: "GH_",
      color: "#feab8d",
      minDensity: 0.1,
      maxDensity: 1,
      minCoverage: 0.6,
      maxCoverage: 1,
    },
    2: {
      clade: "GV_",
      color: "#f08bb5",
      minDensity: 0.9,
      maxDensity: 1,
      minCoverage: 0.88,
      maxCoverage: 1,
    },
    3: {
      clade: "GR_",
      color: "#fe8d8d",
      minDensity: 0.9,
      maxDensity: 1,
      minCoverage: 0.85,
      maxCoverage: 1,
    },
    4: {
      clade: "S_",
      color: "#b3ffb3",
      minDensity: 0.9,
      maxDensity: 1,
      minCoverage: 0.5,
      maxCoverage: 1,
    },
    5: {
      clade: "V_",
      color: "#ffddff",
      minDensity: 0.9,
      maxDensity: 1,
      minCoverage: 0.5,
      maxCoverage: 1,
    },
  });

  const [nameMapping, setNameMapping] = React.useState({
    0: { nameFrom: "Gn_", nameTo: "G_" },
    1: { nameFrom: "GRn_", nameTo: "GR_" },
    2: { nameFrom: "GHn_", nameTo: "GH_" },
    3: { nameFrom: "GVn_", nameTo: "GV_" },
  });
  const [colorDelineator, setColorDelineator] = React.useState("color=");
  const [offset, setOffset] = React.useState(-1);
  const [rootOn, setRootOn] = React.useState("S_");
  const [quotes, setQuotes] = React.useState(false);
  const [nwkFile, setNwkFile] = React.useState("");
  const [schema, setSchema] = React.useState(yup.object());

  const addField = (setFieldValue) => {
    return () => {
      const currentIndex = Object.keys(cladeProperties).length;
      for (const property of Object.keys(
        cladeProperties[currentIndex - 1] || {}
      )) {
        setFieldValue(
          `${property}${currentIndex}`,
          newProperties.current[property]
        );
      }
      setCladeProperties((prev) => {
        const newValue = {
          ...prev,
          [currentIndex]: newProperties.current,
        };
        return newValue;
      });
    };
  };

  const addNameMapField = (setFieldValue) => {
    return () => {
      const currentIndex = Object.keys(nameMapping).length;
      for (const property of Object.keys(nameMapping[currentIndex - 1] || {})) {
        setFieldValue(
          `${property}${currentIndex}`,
          newNameMapping.current[property]
        );
      }
      setNameMapping((prev) => {
        const newMapping = {
          ...prev,
          [currentIndex]: newNameMapping.current,
        };
        return newMapping;
      });
    };
  };

  React.useEffect(() => {
    setSchema(
      yup.object(
        Object.keys(schemaBase.current).reduce((prevVal, inputType) => {
          if (
            [
              CLADE,
              COLOR,
              MIN_DENSITY,
              MAX_DENSITY,
              MIN_COVERAGE,
              MAX_COVERAGE,
            ].includes(inputType)
          ) {
            for (let i = 0; i < Object.keys(cladeProperties).length; i++) {
              prevVal[`${inputType}${i}`] = schemaBase.current[inputType];
            }
          } else if ([NAME_FROM, NAME_TO].includes(inputType)) {
            for (let i = 0; i < Object.keys(nameMapping).length; i++) {
              prevVal[`${inputType}${i}`] = schemaBase.current[inputType];
            }
          } else {
            prevVal[inputType] = schemaBase.current[inputType];
          }
          return prevVal;
        }, {})
      )
    );
  }, [cladeProperties, nameMapping]);

  const submitForm = (setSubmitting, values) => {
    console.log("values :>> ", values);

    const data = new FormData();
    data.append("file", nwkFile);
    data.append("clade_del", JSON.stringify(cladeProperties));
    data.append("name_mapping", JSON.stringify(nameMapping));
    data.append("color_delineator", values.colorDelineator);
    data.append("root_on", values.rootOn);
    data.append("quoted", values.quotes);
    data.append("offset", values.colorOffset);
    history.push("/loading");
    service.generateTree(data).then((result) => {
      console.log("response :>> ", result);
      history.push("/results");
      setResults(result.data);
    });
    setSubmitting(false);
  };

  return (
    <Formik
      validationSchema={schema}
      initialValues={Object.values(nameMapping).reduce(
        (prevVal, currVal, index) => {
          for (const key of Object.keys(currVal)) {
            prevVal[`${key}${index}`] = currVal[key];
          }
          return prevVal;
        },
        Object.values(cladeProperties).reduce(
          (prevVal, currVal, index) => {
            for (const key of Object.keys(currVal)) {
              prevVal[`${key}${index}`] = currVal[key];
            }
            return prevVal;
          },
          {
            [QUOTES]: quotes,
            [COLOR_DELINEATOR]: colorDelineator,
            [COLOR_OFFSET]: offset,
            [ROOT_ON]: rootOn,
            [NWK_FILE]: "",
          }
        )
      )}
      onSubmit={(values, { setSubmitting }) => {
        submitForm(setSubmitting, values);
      }}
    >
      {({
        handleSubmit,
        setFieldValue,
        setTouched,
        touched,
        values,
        isValid,
        isSubmitting,
        errors,
      }) => {
        return (
          <Container>
            <Form onSubmit={handleSubmit}>
              np
              <Form.Group as={Col} xs={12}>
                <div className="mb-3">
                  <Form.Text className={UploadPageStyles.header}>
                    Getting started:
                  </Form.Text>
                  <Form.Text muted>
                    This tool seeks to find an ancestor that maximizes the total
                    density and coverage given the values
                  </Form.Text>
                  <Form.Text muted>
                    Density refers to the total colored taxon belonging to a
                    clade over the taxon colored. Coloring 80 Taxons as G clade
                    with 60 of them actually belonging to G clades yields a 75%
                    density.
                  </Form.Text>
                  <Form.Text muted>
                    Coverage refers to the number of taxon belonging to a clade
                    that got colored. If there are 50 S clade taxons and 45 are
                    coloured, the coverage is 90%.
                  </Form.Text>
                  <Form.Text muted>
                    For more targeted coloring, increase <em>min density </em>
                    values and reduce the <em>min coverage </em>values.
                  </Form.Text>
                </div>
                <Form.Label className={UploadPageStyles.header}>
                  Clade Colouring Properties
                </Form.Label>
                <Form.Row>
                  <Form.Label as={Col} xs={12} md={2}>
                    Clade
                  </Form.Label>
                  <Form.Label as={Col} xs={12} md={1}>
                    Color
                  </Form.Label>
                  <Form.Label as={Col} xs={12} md={2}>
                    Min Density
                  </Form.Label>
                  <Form.Label as={Col} xs={12} md={2}>
                    Max Density
                  </Form.Label>
                  <Form.Label as={Col} xs={12} md={2}>
                    Min Coverage
                  </Form.Label>
                  <Form.Label as={Col} xs={12} md={2}>
                    Max Coverage
                  </Form.Label>
                </Form.Row>
                {Object.keys(cladeProperties).map((index) => {
                  return (
                    <CladeRow
                      key={index}
                      cladeProperties={cladeProperties}
                      setCladeProperties={setCladeProperties}
                      index={index}
                      clade={CLADE}
                      minDensity={MIN_DENSITY}
                      maxDensity={MAX_DENSITY}
                      minCoverage={MIN_COVERAGE}
                      maxCoverage={MAX_COVERAGE}
                      color={COLOR}
                      setFieldValue={setFieldValue}
                      errors={errors}
                      touched={touched}
                      setTouched={setTouched}
                    />
                  );
                })}
                <Button onClick={addField(setFieldValue)} variant="light">
                  <MdAddBox /> Add Field
                </Button>
              </Form.Group>
              <Form.Row>
                <Form.Group as={Col} xs={12} md={6}>
                  <Form.Label className={UploadPageStyles.header}>
                    Clade Name Remapping
                  </Form.Label>
                  <Form.Row>
                    <Form.Label as={Col} xs={12} md={5}>
                      From:
                    </Form.Label>
                    <Form.Label as={Col} xs={12} md={5}>
                      To:
                    </Form.Label>
                  </Form.Row>
                  {Object.keys(nameMapping).map((index) => {
                    return (
                      <NameRow
                        key={index}
                        index={index}
                        nameFrom={NAME_FROM}
                        nameTo={NAME_TO}
                        nameMapping={nameMapping}
                        setNameMapping={setNameMapping}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        touched={touched}
                        setTouched={setTouched}
                      />
                    );
                  })}
                  <Button
                    onClick={addNameMapField(setFieldValue)}
                    variant="light"
                  >
                    <MdAddBox /> Add Field
                  </Button>
                </Form.Group>
                <MiscOptions
                  colorDelineatorValue={COLOR_DELINEATOR}
                  colorDelineator={colorDelineator}
                  offsetValue={COLOR_OFFSET}
                  offset={offset}
                  rootOnValue={ROOT_ON}
                  rootOn={rootOn}
                  quotesValue={QUOTES}
                  quotes={quotes}
                  setColorDelineator={setColorDelineator}
                  setOffset={setOffset}
                  setRootOn={setRootOn}
                  setQuotes={setQuotes}
                  setFieldValue={setFieldValue}
                  errors={errors}
                  touched={touched}
                />
              </Form.Row>
              <FileUpload
                fieldName={NWK_FILE}
                setNwkFile={setNwkFile}
                setFieldValue={setFieldValue}
                errors={errors}
                touched={touched}
              />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "submit" : `Submit`}
              </Button>
            </Form>
          </Container>
        );
      }}
    </Formik>
  );
}

export default UploadPage;
