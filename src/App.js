import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";

import "./styles.css";

const SuggestionCard = (props) => {
  const { voteCount, topic, id, voteHandler } = props;

  return (
    <div className="suggestion">
      <div className="left">
        <button
          className={voteCount === 1 ? "vote-button voted" : "vote-button"}
          onClick={voteHandler.bind(this, id)}
        >
          <FontAwesomeIcon className="icon" icon={faChevronUp} />
        </button>
        <p>
          <span className="votes">{voteCount}</span> votes
        </p>
      </div>
      <div className="right">
        <strong>{topic}</strong>
      </div>
    </div>
  );
};

export default function App() {
  const [suggestionCount, setCount] = useState(2);
  const [enteredText, setText] = useState("");
  const [suggestions, setSuggestion] = useState([
    {
      voteCount: 0,
      topic: "Create a ReactJS Voting App"
    },
    {
      voteCount: 0,
      topic: "CSS Loading Animations"
    }
  ]);

  const changeHandler = (e) => {
    setText(e.target.value);
  };

  const keyHandler = (e) => {
    e.persist();
    if (e.key === "Enter") {
      e.preventDefault();
      setSuggestion((state) => [
        ...state,
        {
          voteCount: 0,
          topic: enteredText.trim()
        }
      ]);

      setCount(suggestionCount + 1);

      setText("");
      console.log({ e });
    }
  };

  const voteHandler = (id) => {
    setSuggestion(
      suggestions.map((el, idx) => {
        if (idx === id) {
          if (el.voteCount === 1) {
            el.voteCount = 0;
          } else {
            el.voteCount = 1;
          }
        }
        return el;
      })
    );
  };

  return (
    <div className="app">
      <div className="header">
        <h1>Youtube Video Suggestions</h1>
        <textarea
          value={enteredText}
          onChange={changeHandler}
          onKeyPress={keyHandler}
          placeholder="Enter your suggestion here..."
        ></textarea>
      </div>

      <div className="container">
        <strong className="count-container">
          <span>{suggestionCount}</span> suggestion
        </strong>

        <div className="suggestions-container">
          {suggestions.map((suggestion, idx) => (
            <SuggestionCard
              key={idx}
              {...suggestion}
              id={idx}
              voteHandler={voteHandler}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
