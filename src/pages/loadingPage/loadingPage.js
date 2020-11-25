import React from "react";
import Spinner from "react-bootstrap/Spinner";
import Col from "react-bootstrap/Col";

import LoadingPageStyles from "./loadingPage.module.css";

const LoadingPage = () => {
  const baseText = "This will take a while! Grab some Coffee";
  const [text, setText] = React.useState(baseText);

  React.useEffect(() => {
    setInterval(() => {
      setText((prev) => {
        if (prev.length > 43) {
          return baseText;
        } else return prev.concat(".");
      });
    }, 2000);
  }, []);
  return (
    <div className={LoadingPageStyles.container}>
      <Col>
        <div className={LoadingPageStyles.spinner}>
          <Spinner as="span" animation="border" role="status" variant="dark" />
        </div>
        <p className={LoadingPageStyles.text}>{text}</p>
      </Col>
    </div>
  );
};

export default LoadingPage;
