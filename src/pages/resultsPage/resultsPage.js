import React from "react";
import ReactHtmlParser from "react-html-parser";
import Collapse from "react-bootstrap/Collapse";
import Button from "react-bootstrap/Button";
import ResultPageStyles from "./resultPage.module.css";

function SvgTree({ tree }) {
  return (
    <div>
      <img src={`data:image/svg+xml;base64,${btoa(tree)}`} />
    </div>
  );
}

function Details({ coverageDetails }) {
  const [showCoverage, setShowCoverage] = React.useState(false);
  return (
    <div className={ResultPageStyles.overlay}>
      <Button
        variant="outline-light"
        onClick={() => setShowCoverage(!showCoverage)}
        aria-controls="coverage-collapse"
        aria-expanded={showCoverage}
      >
        Show Details
      </Button>
      <Collapse in={showCoverage}>
        <div className={ResultPageStyles.textContainer}>
          {coverageDetails.map((val, idx) => (
            <p key={idx} className={ResultPageStyles.text}>
              {val}
            </p>
          ))}
        </div>
      </Collapse>
    </div>
  );
}

function ResultsPage({ results }) {
  console.log("results :>> ", results);
  if (!results) {
    return (
      <div className={ResultPageStyles.errorText}>Nothing to see here</div>
    );
  }
  if (results.error) {
    const errorMsg = results.error
      .split("\n")
      .map((val) => <div className={ResultPageStyles.errorText}>{val}</div>);
    return <div className={ResultPageStyles.errorContainer}>{errorMsg}</div>;
  }
  if (typeof results === "string") {
    return <div>{ReactHtmlParser(results)}</div>;
  }

  const coverageDetails = [
    results[0].split("\n")[1],
    ...results[0].split("\n").slice(3),
  ];

  return (
    <>
      <Details coverageDetails={coverageDetails} />
      <SvgTree tree={results[1][0]} />
    </>
  );
}

export default ResultsPage;
