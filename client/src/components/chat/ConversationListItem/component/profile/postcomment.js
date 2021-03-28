import React from "react";
import { Card, CardHeader, Typography, Avatar } from "@material-ui/core";

export default function Postcomment(props) {
  return (
    <Card
      key={props.data1.id}
      style={{ backgroundColor: "transparent", boxShadow: "none" }}
    >
      <CardHeader
        style={{ textAlign: "left" }}
        avatar={
          props.img ? (
            <Avatar aria-label="recipe" src={props.img.image}></Avatar>
          ) : (
            <Avatar aria-label="recipe"></Avatar>
          )
        }
        title={
          <Typography paragraph style={{ textTransform: "capitalize" }}>
            {props.data1.comment_content}
          </Typography>
        }
        subheader={props.data1.comment_timestamp}
      />
    </Card>
  );
}
