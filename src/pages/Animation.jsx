import { useState, useEffect, useRef } from "react";
import Anime from "/img/Anime.png";
import Basketball from "/img/basketball.png";
import Football from "/img/football.png";
import Volleyball from "/img/Volleyball.png";
import Human from "/img/Human.png";
import Wood from "/img/wood.png"; // ← พื้นหลัง

import "./Animation.css";

const Animation = () => {
  const [running, setRunning] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [selected, setSelected] = useState("none");

  const fieldWidth = 650;
  const fieldHeight = 400;
  const ballDiameter = 100;
  const maxX = fieldWidth - ballDiameter - 2;
  const maxY = fieldHeight - ballDiameter - 2;

  const vx = 5;
  const vy = 5;

  const goRight = useRef(true);
  const goDown = useRef(true);
  const intervalRef = useRef(null);

  const handleRun = () => setRunning(!running);
  const handleSelect = (name) => setSelected(name);

  // Mapping รูปตามชื่อที่เลือก
  const images = {
    anime: Anime,
    basketball: Basketball,
    football: Football,
    volleyball: Volleyball,
    human: Human,
  };

  const calculate = () => {
    let newX = x;
    let newY = y;

    if (goRight.current) {
      newX += vx;
      if (newX >= maxX) goRight.current = false;
    } else {
      newX -= vx;
      if (newX <= 0) goRight.current = true;
    }

    if (goDown.current) {
      newY += vy;
      if (newY >= maxY) goDown.current = false;
    } else {
      newY -= vy;
      if (newY <= 0) goDown.current = true;
    }

    setX(newX);
    setY(newY);
  };

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(calculate, 25);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, x, y]);

  const ballStyle = {
    left: `${x}px`,
    top: `${y}px`,
    width: `${ballDiameter}px`,
    height: `${ballDiameter}px`,
    position: "relative",
    borderRadius: "50%",
    backgroundColor: selected === "none" ? "lightblue" : "transparent",
    backgroundImage:
      selected !== "none" ? `url(${images[selected]})` : "none",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className="anim-container">
      <div
        id="field"
        className="anim-field"
        style={{
          width: fieldWidth,
          height: fieldHeight,
          backgroundImage: `url(${Wood})`, // 👉 พื้นหลังไม้
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div id="ball" className="anim-ball" style={ballStyle}></div>
      </div>

      <div className="anim-control d-flex justify-content-between">
        <button
          id="run"
          type="button"
          className={`btn ${running ? "btn-warning" : "btn-success"}`}
          onClick={handleRun}
        >
          <i className={`bi ${running ? "bi-pause" : "bi-play"}`}></i>{" "}
          {running ? "PAUSE" : "RUN"}
        </button>

        <div>
          <button
            className={`btn ${
              selected === "none" ? "btn-secondary" : "btn-outline-secondary"
            }`}
            onClick={() => handleSelect("none")}
          >
            None
          </button>

          {["Basketball", "Football", "Volleyball", "Human", "Anime"].map(
            (item) => (
              <button
                key={item}
                className={`btn ${
                  selected === item.toLowerCase()
                    ? "btn-primary"
                    : "btn-outline-primary"
                } ms-1`}
                onClick={() => handleSelect(item.toLowerCase())}
              >
                {item}
              </button>
            )
          )}
        </div>
      </div>

      <h1>นนทิวัชร หมื่นสาย 67117362</h1>
    </div>
  );
};

export default Animation;
