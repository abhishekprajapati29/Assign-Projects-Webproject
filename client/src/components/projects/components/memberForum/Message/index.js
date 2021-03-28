import React from "react";
import moment from "moment";
import "./Message.css";
import Avatar from "@material-ui/core/Avatar";
import ScrollToBottom from "react-scroll-to-bottom";
import DataCheck from "./data";

export default function Message(props) {
  const {
    data,
    isMine,
    startsSequence,
    endsSequence,
    showTimestamp,
    user_id,
    user_image,
  } = props;

  const friendlyTimestamp = moment(data.timestamp).format("LLLL");

  return (
    <ScrollToBottom className="ROOT_CSS">
      <div
        className={[
          "message",
          `${isMine ? "mine" : ""}`,
          `${startsSequence ? "start" : ""}`,
          `${endsSequence ? "end" : ""}`,
        ].join(" ")}
      >
        {showTimestamp && <div className="timestamp">{friendlyTimestamp}</div>}

        <div className="bubble-container">
          {data.requested_by === user_id ? (
            <>
              <div className="bubble" title={friendlyTimestamp}>
                <div>
                  {
                    data.files != null ?(<a href={data.files} target="_blank" > <img src={data.files} alt={data.content[0]} style={{width: '200px', height: '200px'}} /></a>):(<></>)
                  }
                </div>
                {DataCheck(data.content)}
              </div>
            </>
          ) : (
            <>
              <Avatar alt={data.requested_by[0]} src={user_image} />
              <div className="bubble" title={friendlyTimestamp}>
              <div>
                  {
                    data.files != null ?(<a href={data.files} target="_blank" > <img src={data.files} alt={data.content[0]} style={{width: '200px', height: '200px'}} /></a>):(<></>)
                  }
                </div>
                {DataCheck(data.content)}
              </div>
            </>
          )}
        </div>
      </div>
    </ScrollToBottom>
  );
}
