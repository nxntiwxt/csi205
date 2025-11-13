import { useState, useEffect } from "react";
import "./Calculator.css";

export default function App() {
  const [screen, setScreen] = useState("0");
  const [lastOperator, setLastOperator] = useState("0");
  // S0 เริ่มต้น, S1 พิมพ์ตัวเลข, S2 กด operator
  const [state, setState] = useState("S0");

  // Update screen (จัดการสีปุ่ม operator)
  useEffect(() => {
    // ... (ส่วนนี้เหมือนเดิม ไม่ต้องแก้ไข) ...
    const plusBtn = document.getElementById("plus");
    const minusBtn = document.getElementById("minus");
    const multiplyBtn = document.getElementById("multiply");
    const divideBtn = document.getElementById("divide");

    // Clear all highlights
    [plusBtn, minusBtn, multiplyBtn, divideBtn].forEach(btn => {
        if (btn) btn.classList.remove("cal_button_orange", "cal_button_Green");
    });

    // Add green to all
    [plusBtn, minusBtn, multiplyBtn, divideBtn].forEach(btn => {
        if (btn) btn.classList.add("cal_button_Green");
    });
    
    // Highlight the last pressed operator
    if (lastOperator === "+") plusBtn?.classList.replace("cal_button_Green", "cal_button_orange");
    else if (lastOperator === "-") minusBtn?.classList.replace("cal_button_Green", "cal_button_orange");
    else if (lastOperator === "*") multiplyBtn?.classList.replace("cal_button_Green", "cal_button_orange");
    else if (lastOperator === "/") divideBtn?.classList.replace("cal_button_Green", "cal_button_orange");

  }, [lastOperator, screen]);

  const ceClicked = () => {
    setScreen("0");
    setState("S0");
    setLastOperator("0");
  };

  const equalClick = () => {
    try {
      // ใช้ eval() ในการคำนวณ
      let result = eval(screen);
      if (!isFinite(result)) { // ตรวจจับการหารด้วย 0 (Infinity)
        setScreen("Error");
      } else {
        setScreen(result.toString());
      }
    } catch {
      setScreen("Error");
    }
    setState("S0"); // กลับไปสถานะเริ่มต้น
    setLastOperator("0");
  };

  // ฟังก์ชันสำหรับ +, -, *, /
  const operatorClick = (operator) => {
    // ห้ามกด operator (ยกเว้น -) เมื่อหน้าจอเป็น 0
    if (state === "S0" && operator !== "-") return;
    
    // ถ้าหน้าจอเป็น 0 แล้วกด - ให้ขึ้น -
    if (state === "S0" && operator === "-") {
        setScreen("-");
        setState("S1");
        return;
    }

    if (state === "S1") { // S1 คือพิมพ์เลขอยู่
      setScreen(screen + operator);
      setLastOperator(operator);
      setState("S2"); // เปลี่ยนเป็นสถานะ "เพิ่งกด operator"
    } else if (state === "S2") { // S2 คือเพิ่งกด operator ไป
      // อนุญาตให้เปลี่ยน operator ตัวสุดท้ายได้ (เช่น 5+ เปลี่ยนเป็น 5-)
      setScreen(screen.slice(0, -1) + operator);
      setLastOperator(operator);
    }
  };

  // ฟังก์ชันสำหรับตัวเลข 0-9 และ . (จุดทศนิยม)
  const numberClick = (number) => {
    const numStr = number.toString();

    if (numStr === ".") {
        handleDecimal();
        return;
    }

    if (state === "S0") { // สถานะเริ่มต้น
      setScreen(numStr);
      setState("S1");
    } else if (state === "S1") { 
      if (screen.length < 15) { 
        setScreen(screen + numStr);
      }
    } else if (state === "S2") { 
      setScreen(screen + numStr);
      setState("S1"); 
    }
  };

  const handleDecimal = () => {
    const parts = screen.split(new RegExp("[+\\-*/]"));
    const lastPart = parts[parts.length - 1]; 

    if (!lastPart.includes(".")) {
        if (state === "S0" || screen === "0") {
            setScreen("0.");
            setState("S1");
        } else if (state === "S2") {
            setScreen(screen + "0.");
            setState("S1");
        } else {
            setScreen(screen + ".");
            setState("S1");
        }
    }
  };

  // (ฟังก์ชันใหม่) จัดการปุ่มคำนวณแบบเดี่ยว (√, %, 1/x, +/-)
  const unaryOperatorClick = (operation) => {
    try {
        let currentValue = eval(screen); // คำนวณค่าปัจจุบันบนจอก่อน
        let result;

        switch(operation) {
            case "√":
                result = Math.sqrt(currentValue);
                break;
            case "%":
                result = currentValue / 100;
                break;
            case "1/x":
                result = 1 / currentValue;
                break;
            case "+/-":
                result = currentValue * -1;
                break;
            default:
                return;
        }

        if (!isFinite(result)) { // ตรวจจับ Error (เช่น √-1, 1/0)
            setScreen("Error");
        } else {
            setScreen(result.toString());
        }
        setState("S1"); // ให้ผลลัพธ์เป็น S1 เพื่อให้พิมพ์ต่อได้
    } catch {
        setScreen("Error");
        setState("S0");
    }
  };


  // (อัปเดต) เพิ่มการรองรับคีย์บอร์ด
  const checkKeyboard = (event) => {
    if (event.key >= "0" && event.key <= "9") {
      numberClick(event.key);
    } else if (["+", "-", "*", "/"].includes(event.key)) {
      operatorClick(event.key);
    } else if (event.key === ".") { // เพิ่ม .
      handleDecimal();
    } else if (event.key === "Enter" || event.key === "=") {
      event.preventDefault(); // ป้องกัน Enter กดปุ่มซ้ำ
      equalClick();
    } else if (event.key === "Backspace") {
      const newScreen = screen.slice(0, -1) || "0";
      setScreen(newScreen);
      if (newScreen === "0") setState("S0");
    } else if (event.key === "Escape") {
      ceClicked();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", checkKeyboard);
    return () => document.removeEventListener("keydown", checkKeyboard);
  }); // เอา array ว่างออก เพื่อให้ re-render ทุกครั้ง (แก้ state-in-closure)

  return (
    <div>
      <div className="cal_container">
        <div id="screen" className="cal_screen">
          {screen}
        </div>
        <div>
          <button className="cal_button cal_button_grey" disabled>MC</button>
          <button className="cal_button cal_button_grey" disabled>MR</button>
          <button className="cal_button cal_button_grey" disabled>M+</button>
          <button className="cal_button cal_button_grey" disabled>M-</button>
          <button className="cal_button cal_button_red" onClick={ceClicked}>CE</button>
        </div>
        <div>
          {[7, 8, 9].map((n) => (
            <button key={n} className="cal_button cal_button_blue" onClick={() => numberClick(n)}>
              {n}
            </button>
          ))}
          {/* อัปเดตปุ่ม ÷ */}
          <button id="divide" className="cal_button cal_button_Green" onClick={() => operatorClick("/")}>÷</button>
          {/* อัปเดตปุ่ม √ */}
          <button className="cal_button cal_button_grey" onClick={() => unaryOperatorClick("√")}>√</button>
        </div>
        <div>
          {[4, 5, 6].map((n) => (
            <button key={n} className="cal_button cal_button_blue" onClick={() => numberClick(n)}>
              {n}
            </button>
          ))}
          {/* อัปเดตปุ่ม x */}
          <button id="multiply" className="cal_button cal_button_Green" onClick={() => operatorClick("*")}>x</button>
          {/* อัปเดตปุ่ม % */}
          <button className="cal_button cal_button_grey" onClick={() => unaryOperatorClick("%")}>%</button>
        </div>
        <div>
          {[1, 2, 3].map((n) => (
            <button key={n} className="cal_button cal_button_blue" onClick={() => numberClick(n)}>
              {n}
            </button>
          ))}
          <button id="minus" className="cal_button cal_button_Green" onClick={() => operatorClick("-")}>-</button>
          {/* อัปเดตปุ่ม 1/x */}
          <button className="cal_button cal_button_grey" onClick={() => unaryOperatorClick("1/x")}>1/x</button>
        </div>
        <div>
          <button className="cal_button cal_button_blue" onClick={() => numberClick(0)}>0</button>
          {/* อัปเดตปุ่ม . */}
          <button className="cal_button cal_button_blue" onClick={handleDecimal}>.</button>
          {/* อัปเดตปุ่ม +/- */}
          <button className="cal_button cal_button_grey" onClick={() => unaryOperatorClick("+/-")}>+/-</button>
          <button id="plus" className="cal_button cal_button_Green" onClick={() => operatorClick("+")}>+</button>
          <button className="cal_button cal_button_Green" onClick={equalClick}>=</button>
        </div>
      </div>
      <div className="dev">
        {/* ชื่อของคุณที่อยู่ตรงกลางล่างครับ */}
        <h1>นนทิวัชร หมื่นสาย 67117362</h1>
      </div>
    </div>
  );
}