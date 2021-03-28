import React, { Component } from "react";
import ErrorImage from "./error.png";
import { Paper, Button } from "@material-ui/core";

export default function ErrorPage() {
  return (
    <Paper
      style={{
        width: "100%",
        marginTop: "62px",
        height: "1180px",
        backgroundImage: `url(${ErrorImage})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div>
        <Button
          href="/dashboard"
          variant="contained"
          color="primary"
          style={{
            position: "fixed",
            right: "54%",
            bottom: "36px",
            zIndex: 1,
            padding: "15px",
            fontSize: "large",
          }}
        >
          Back to Dashboard
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => window.location.reload(false)}
          style={{
            position: "fixed",
            right: "38%",
            bottom: "36px",
            zIndex: 1,
            padding: "15px",
            fontSize: "large",
          }}
          hover
        >
          Retry
        </Button>
      </div>
    </Paper>
  );
}
