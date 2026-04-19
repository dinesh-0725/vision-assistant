

// // // // // // // // import React, { useState, useEffect, useCallback } from 'react';
// // // // // // // // import { useNavigate } from 'react-router-dom';
// // // // // // // // import './TalkingCalculator.css';

// // // // // // // // const TalkingCalculator = () => {
// // // // // // // //   const navigate = useNavigate();
  
// // // // // // // //   // Calculator state with meaningful names for voice integration
// // // // // // // //   const [currentDisplay, setCurrentDisplay] = useState('0');
// // // // // // // //   const [previousValue, setPreviousValue] = useState(null);
// // // // // // // //   const [currentOperation, setCurrentOperation] = useState(null);
// // // // // // // //   const [waitingForNewValue, setWaitingForNewValue] = useState(false);
// // // // // // // //   const [calculationHistory, setCalculationHistory] = useState([]);
// // // // // // // //   const [isSpeaking, setIsSpeaking] = useState(false);
// // // // // // // //   const [status, setStatus] = useState("Talking Calculator is ready");
  
// // // // // // // //   // Mathematical operations (voice-friendly names)
// // // // // // // //   const mathOperations = {
// // // // // // // //     add: (a, b) => a + b,
// // // // // // // //     subtract: (a, b) => a - b,
// // // // // // // //     multiply: (a, b) => a * b,
// // // // // // // //     divide: (a, b) => {
// // // // // // // //       if (b === 0) throw new Error("Cannot divide by zero");
// // // // // // // //       return a / b;
// // // // // // // //     },
// // // // // // // //     power: (a, b) => Math.pow(a, b),
// // // // // // // //     percentage: (a, b) => (a * b) / 100,
// // // // // // // //     squareRoot: (a) => Math.sqrt(a)
// // // // // // // //   };

// // // // // // // //   // Operation symbols for display
// // // // // // // //   const operationSymbols = {
// // // // // // // //     add: '+',
// // // // // // // //     subtract: '−',
// // // // // // // //     multiply: '×',
// // // // // // // //     divide: '÷',
// // // // // // // //     power: '^',
// // // // // // // //     percentage: '%',
// // // // // // // //     squareRoot: '√'
// // // // // // // //   };

// // // // // // // //   // Speak function
// // // // // // // //   const speak = (text) => {
// // // // // // // //     const synth = window.speechSynthesis;
// // // // // // // //     if (!synth) return;
// // // // // // // //     synth.cancel();
// // // // // // // //     const utter = new SpeechSynthesisUtterance(text);
// // // // // // // //     utter.rate = 0.9;
// // // // // // // //     synth.speak(utter);
// // // // // // // //   };

// // // // // // // //   // Format number for display
// // // // // // // //   const formatNumber = useCallback((num) => {
// // // // // // // //     if (num === null || num === undefined) return '0';
// // // // // // // //     if (typeof num !== 'number') return num;
    
// // // // // // // //     const numStr = num.toString();
// // // // // // // //     if (numStr.length > 10) {
// // // // // // // //       if (Math.abs(num) > 1e10) {
// // // // // // // //         return num.toExponential(5);
// // // // // // // //       }
// // // // // // // //       return parseFloat(num.toFixed(8)).toString();
// // // // // // // //     }
// // // // // // // //     return numStr;
// // // // // // // //   }, []);

// // // // // // // //   // Handle number input
// // // // // // // //   const handleNumberInput = useCallback((number) => {
// // // // // // // //     if (waitingForNewValue) {
// // // // // // // //       setCurrentDisplay(number);
// // // // // // // //       setWaitingForNewValue(false);
// // // // // // // //     } else {
// // // // // // // //       setCurrentDisplay(prev => 
// // // // // // // //         prev === '0' || prev === 'Error' ? number : prev + number
// // // // // // // //       );
// // // // // // // //     }
// // // // // // // //   }, [waitingForNewValue]);

// // // // // // // //   // Handle decimal point
// // // // // // // //   const handleDecimal = useCallback(() => {
// // // // // // // //     if (waitingForNewValue) {
// // // // // // // //       setCurrentDisplay('0.');
// // // // // // // //       setWaitingForNewValue(false);
// // // // // // // //     } else if (!currentDisplay.includes('.')) {
// // // // // // // //       setCurrentDisplay(prev => prev + '.');
// // // // // // // //     }
// // // // // // // //   }, [currentDisplay, waitingForNewValue]);

// // // // // // // //   // Handle operation selection
// // // // // // // //   const handleOperation = useCallback((operation) => {
// // // // // // // //     const inputValue = parseFloat(currentDisplay);
    
// // // // // // // //     if (currentOperation !== null && !waitingForNewValue) {
// // // // // // // //       handleCalculate();
// // // // // // // //     }
    
// // // // // // // //     setPreviousValue(inputValue);
// // // // // // // //     setCurrentOperation(operation);
// // // // // // // //     setWaitingForNewValue(true);
// // // // // // // //     setStatus(`Operation selected: ${operation}`);
// // // // // // // //   }, [currentDisplay, currentOperation, waitingForNewValue]);

// // // // // // // //   // Handle calculation
// // // // // // // //   const handleCalculate = useCallback(() => {
// // // // // // // //     if (currentOperation === null || waitingForNewValue) {
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     const prevVal = previousValue;
// // // // // // // //     const currVal = parseFloat(currentDisplay);
    
// // // // // // // //     try {
// // // // // // // //       const operationFunction = mathOperations[currentOperation];
// // // // // // // //       if (!operationFunction) {
// // // // // // // //         throw new Error("Unknown operation");
// // // // // // // //       }
      
// // // // // // // //       let result;
// // // // // // // //       if (currentOperation === 'squareRoot') {
// // // // // // // //         result = operationFunction(currVal);
// // // // // // // //       } else {
// // // // // // // //         result = operationFunction(prevVal, currVal);
// // // // // // // //       }
      
// // // // // // // //       // Add to history
// // // // // // // //       const historyEntry = {
// // // // // // // //         expression: currentOperation === 'squareRoot' 
// // // // // // // //           ? `√(${currVal})`
// // // // // // // //           : `${prevVal} ${operationSymbols[currentOperation]} ${currVal}`,
// // // // // // // //         result: result,
// // // // // // // //         timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
// // // // // // // //       };
      
// // // // // // // //       setCalculationHistory(prev => [historyEntry, ...prev.slice(0, 9)]);
// // // // // // // //       setCurrentDisplay(formatNumber(result));
// // // // // // // //       setPreviousValue(null);
// // // // // // // //       setCurrentOperation(null);
// // // // // // // //       setWaitingForNewValue(true);
// // // // // // // //       setStatus(`Calculation completed: ${formatNumber(result)}`);
      
// // // // // // // //       // Speak result if enabled
// // // // // // // //       if (isSpeaking) {
// // // // // // // //         speak(`Result is ${formatNumber(result)}`);
// // // // // // // //       }
      
// // // // // // // //     } catch (error) {
// // // // // // // //       setCurrentDisplay('Error');
// // // // // // // //       setStatus("Calculation error: " + error.message);
// // // // // // // //       if (isSpeaking) {
// // // // // // // //         speak("Error in calculation");
// // // // // // // //       }
// // // // // // // //     }
// // // // // // // //   }, [currentOperation, currentDisplay, previousValue, waitingForNewValue, isSpeaking, formatNumber]);

// // // // // // // //   // Clear calculator
// // // // // // // //   const handleClear = useCallback(() => {
// // // // // // // //     setCurrentDisplay('0');
// // // // // // // //     setPreviousValue(null);
// // // // // // // //     setCurrentOperation(null);
// // // // // // // //     setWaitingForNewValue(false);
// // // // // // // //     setStatus("Calculator cleared");
// // // // // // // //     if (isSpeaking) speak("Calculator cleared");
// // // // // // // //   }, [isSpeaking]);

// // // // // // // //   // Clear entry only
// // // // // // // //   const handleClearEntry = useCallback(() => {
// // // // // // // //     setCurrentDisplay('0');
// // // // // // // //     setStatus("Entry cleared");
// // // // // // // //     if (isSpeaking) speak("Entry cleared");
// // // // // // // //   }, [isSpeaking]);

// // // // // // // //   // Toggle sign
// // // // // // // //   const handleToggleSign = useCallback(() => {
// // // // // // // //     setCurrentDisplay(prev => formatNumber(-parseFloat(prev)));
// // // // // // // //     setStatus("Sign toggled");
// // // // // // // //     if (isSpeaking) speak("Sign changed");
// // // // // // // //   }, [formatNumber, isSpeaking]);

// // // // // // // //   // Percentage
// // // // // // // //   const handlePercentage = useCallback(() => {
// // // // // // // //     const value = parseFloat(currentDisplay);
// // // // // // // //     if (previousValue !== null && currentOperation) {
// // // // // // // //       // If we have a previous value and operation, calculate percentage of that
// // // // // // // //       const result = (previousValue * value) / 100;
// // // // // // // //       const historyEntry = {
// // // // // // // //         expression: `${previousValue} × ${value}%`,
// // // // // // // //         result: result,
// // // // // // // //         timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
// // // // // // // //       };
// // // // // // // //       setCalculationHistory(prev => [historyEntry, ...prev.slice(0, 9)]);
// // // // // // // //       setCurrentDisplay(formatNumber(result));
// // // // // // // //       setWaitingForNewValue(true);
// // // // // // // //       setStatus(`Percentage calculated: ${formatNumber(result)}`);
// // // // // // // //       if (isSpeaking) speak(`Result is ${formatNumber(result)}`);
// // // // // // // //     } else {
// // // // // // // //       // Just convert to percentage
// // // // // // // //       setCurrentDisplay(formatNumber(value / 100));
// // // // // // // //       setStatus(`Converted to percentage: ${formatNumber(value / 100)}`);
// // // // // // // //       if (isSpeaking) speak(`Converted to percentage`);
// // // // // // // //     }
// // // // // // // //   }, [currentDisplay, previousValue, currentOperation, formatNumber, isSpeaking]);

// // // // // // // //   // Square root
// // // // // // // //   const handleSquareRoot = useCallback(() => {
// // // // // // // //     const value = parseFloat(currentDisplay);
// // // // // // // //     if (value < 0) {
// // // // // // // //       setCurrentDisplay('Error');
// // // // // // // //       setStatus("Error: Cannot calculate square root of negative number");
// // // // // // // //       if (isSpeaking) speak("Cannot calculate square root of negative number");
// // // // // // // //       return;
// // // // // // // //     }
// // // // // // // //     const result = Math.sqrt(value);
// // // // // // // //     const historyEntry = {
// // // // // // // //       expression: `√(${value})`,
// // // // // // // //       result: result,
// // // // // // // //       timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
// // // // // // // //     };
// // // // // // // //     setCalculationHistory(prev => [historyEntry, ...prev.slice(0, 9)]);
// // // // // // // //     setCurrentDisplay(formatNumber(result));
// // // // // // // //     setStatus(`Square root calculated: ${formatNumber(result)}`);
// // // // // // // //     if (isSpeaking) speak(`Square root is ${formatNumber(result)}`);
// // // // // // // //   }, [currentDisplay, isSpeaking, formatNumber]);

// // // // // // // //   // Toggle speech
// // // // // // // //   const toggleSpeech = useCallback(() => {
// // // // // // // //     setIsSpeaking(prev => {
// // // // // // // //       const newState = !prev;
// // // // // // // //       setStatus(newState ? "Voice feedback enabled" : "Voice feedback disabled");
// // // // // // // //       if (newState) {
// // // // // // // //         speak("Voice feedback enabled");
// // // // // // // //       }
// // // // // // // //       return newState;
// // // // // // // //     });
// // // // // // // //   }, []);

// // // // // // // //   // Handle keyboard input
// // // // // // // //   useEffect(() => {
// // // // // // // //     const handleKeyDown = (e) => {
// // // // // // // //       const key = e.key;
      
// // // // // // // //       if (key >= '0' && key <= '9') {
// // // // // // // //         handleNumberInput(key);
// // // // // // // //       } else if (key === '.') {
// // // // // // // //         handleDecimal();
// // // // // // // //       } else if (key === '+') {
// // // // // // // //         handleOperation('add');
// // // // // // // //       } else if (key === '-') {
// // // // // // // //         handleOperation('subtract');
// // // // // // // //       } else if (key === '*') {
// // // // // // // //         handleOperation('multiply');
// // // // // // // //       } else if (key === '/') {
// // // // // // // //         e.preventDefault();
// // // // // // // //         handleOperation('divide');
// // // // // // // //       } else if (key === 'Enter' || key === '=') {
// // // // // // // //         handleCalculate();
// // // // // // // //       } else if (key === 'Escape' || key === 'Delete') {
// // // // // // // //         handleClear();
// // // // // // // //       } else if (key === 'Backspace') {
// // // // // // // //         handleClearEntry();
// // // // // // // //       } else if (key === '%') {
// // // // // // // //         handlePercentage();
// // // // // // // //       } else if (key === '^') {
// // // // // // // //         handleOperation('power');
// // // // // // // //       } else if (key === 'r' || key === 'R') {
// // // // // // // //         handleSquareRoot();
// // // // // // // //       }
// // // // // // // //     };

// // // // // // // //     window.addEventListener('keydown', handleKeyDown);
// // // // // // // //     return () => window.removeEventListener('keydown', handleKeyDown);
// // // // // // // //   }, [handleNumberInput, handleDecimal, handleOperation, handleCalculate, handleClear, handleClearEntry, handlePercentage, handleSquareRoot]);

// // // // // // // //   // Handle logout (similar to other features)
// // // // // // // //   const handleLogout = async () => {
// // // // // // // //     setStatus("Logging out...");
// // // // // // // //     speak("Logging out...");
// // // // // // // //     // Add your logout logic here
// // // // // // // //     localStorage.clear();
// // // // // // // //     setTimeout(() => navigate("/"), 1500);
// // // // // // // //   };

// // // // // // // //   const handleBackToDashboard = () => {
// // // // // // // //     navigate("/dashboard");
// // // // // // // //   };

// // // // // // // //   // Current expression for display
// // // // // // // //   const currentExpression = currentOperation && previousValue !== null
// // // // // // // //     ? `${previousValue} ${operationSymbols[currentOperation] || currentOperation} ${waitingForNewValue ? '' : currentDisplay}`
// // // // // // // //     : '';

// // // // // // // //   return (
// // // // // // // //     <div className="talking-calculator-container">
// // // // // // // //       {/* Fixed Header */}
// // // // // // // //       <header className="dashboard-header fixed-header">
// // // // // // // //         <div className="header-content">
// // // // // // // //           <div className="header-left">
// // // // // // // //             <button className="back-btn" onClick={handleBackToDashboard}>
// // // // // // // //               ← Back to Dashboard
// // // // // // // //             </button>
// // // // // // // //             <h1 className="logo">Vision Assist</h1>
// // // // // // // //           </div>
// // // // // // // //           <div className="user-menu">
// // // // // // // //             <button className="logout-btn" onClick={handleLogout}>
// // // // // // // //               Logout
// // // // // // // //             </button>
// // // // // // // //           </div>
// // // // // // // //         </div>
// // // // // // // //       </header>

// // // // // // // //       <div className="calculator-content">
// // // // // // // //         <div className="calculator-header">
// // // // // // // //           <h2>🧮 Talking Calculator</h2>
// // // // // // // //           <p>Voice-ready calculator with keyboard support</p>
// // // // // // // //         </div>

// // // // // // // //         {/* Status Message */}
// // // // // // // //         {status && (
// // // // // // // //           <div className="status-message">
// // // // // // // //             {status}
// // // // // // // //           </div>
// // // // // // // //         )}

// // // // // // // //         <div className="calculator-main-section">
// // // // // // // //           {/* Calculator Display */}
// // // // // // // //           <div className="calculator-display-section">
// // // // // // // //             <div className="expression-display">
// // // // // // // //               {currentExpression || 'Ready for calculation'}
// // // // // // // //             </div>
// // // // // // // //             <div className="result-display" id="calculatorResult">
// // // // // // // //               {currentDisplay}
// // // // // // // //             </div>
// // // // // // // //           </div>

// // // // // // // //           {/* Voice Controls */}
// // // // // // // //           <div className="voice-controls-section">
// // // // // // // //             <h3>Voice Controls</h3>
// // // // // // // //             <div className="voice-buttons">
// // // // // // // //               <button 
// // // // // // // //                 className={`voice-toggle-btn ${isSpeaking ? 'active' : ''}`}
// // // // // // // //                 onClick={toggleSpeech}
// // // // // // // //               >
// // // // // // // //                 {isSpeaking ? '🔊 Voice ON' : '🔈 Voice OFF'}
// // // // // // // //               </button>
// // // // // // // //               <button 
// // // // // // // //                 className="speak-current-btn"
// // // // // // // //                 onClick={() => {
// // // // // // // //                   speak(`Current display shows ${currentDisplay}`);
// // // // // // // //                   setStatus(`Spoke current value: ${currentDisplay}`);
// // // // // // // //                 }}
// // // // // // // //               >
// // // // // // // //                 Speak Current Value
// // // // // // // //               </button>
// // // // // // // //             </div>
// // // // // // // //           </div>

// // // // // // // //           {/* Calculator Buttons */}
// // // // // // // //           <div className="calculator-buttons-section">
// // // // // // // //             <h3>Calculator</h3>
            
// // // // // // // //             <div className="calculator-buttons-grid">
// // // // // // // //               {/* First Row */}
// // // // // // // //               <div className="button-row">
// // // // // // // //                 <button className="btn-clear" onClick={handleClear}>C</button>
// // // // // // // //                 <button className="btn-clear-entry" onClick={handleClearEntry}>CE</button>
// // // // // // // //                 <button className="btn-operation" onClick={handlePercentage}>%</button>
// // // // // // // //                 <button className="btn-operation" onClick={handleSquareRoot}>√</button>
// // // // // // // //                 <button className="btn-operation" onClick={() => handleOperation('power')}>x^y</button>
// // // // // // // //                 <button className="btn-operation" onClick={() => handleOperation('divide')}>÷</button>
// // // // // // // //               </div>

// // // // // // // //               {/* Number Rows */}
// // // // // // // //               <div className="button-row">
// // // // // // // //                 <button className="btn-number" onClick={() => handleNumberInput('7')}>7</button>
// // // // // // // //                 <button className="btn-number" onClick={() => handleNumberInput('8')}>8</button>
// // // // // // // //                 <button className="btn-number" onClick={() => handleNumberInput('9')}>9</button>
// // // // // // // //                 <button className="btn-operation" onClick={() => handleOperation('multiply')}>×</button>
// // // // // // // //               </div>

// // // // // // // //               <div className="button-row">
// // // // // // // //                 <button className="btn-number" onClick={() => handleNumberInput('4')}>4</button>
// // // // // // // //                 <button className="btn-number" onClick={() => handleNumberInput('5')}>5</button>
// // // // // // // //                 <button className="btn-number" onClick={() => handleNumberInput('6')}>6</button>
// // // // // // // //                 <button className="btn-operation" onClick={() => handleOperation('subtract')}>−</button>
// // // // // // // //               </div>

// // // // // // // //               <div className="button-row">
// // // // // // // //                 <button className="btn-number" onClick={() => handleNumberInput('1')}>1</button>
// // // // // // // //                 <button className="btn-number" onClick={() => handleNumberInput('2')}>2</button>
// // // // // // // //                 <button className="btn-number" onClick={() => handleNumberInput('3')}>3</button>
// // // // // // // //                 <button className="btn-operation" onClick={() => handleOperation('add')}>+</button>
// // // // // // // //               </div>

// // // // // // // //               {/* Last Row */}
// // // // // // // //               <div className="button-row">
// // // // // // // //                 <button className="btn-number" onClick={handleToggleSign}>±</button>
// // // // // // // //                 <button className="btn-number" onClick={() => handleNumberInput('0')}>0</button>
// // // // // // // //                 <button className="btn-number" onClick={handleDecimal}>.</button>
// // // // // // // //                 <button className="btn-equals" onClick={handleCalculate}>=</button>
// // // // // // // //               </div>
// // // // // // // //             </div>
// // // // // // // //           </div>

// // // // // // // //           {/* Calculation History */}
// // // // // // // //           <div className="calculator-history-section">
// // // // // // // //             <h3>Calculation History ({calculationHistory.length})</h3>
            
// // // // // // // //             {calculationHistory.length === 0 ? (
// // // // // // // //               <div className="empty-state">
// // // // // // // //                 <p>No calculations yet. Perform some calculations to see history.</p>
// // // // // // // //               </div>
// // // // // // // //             ) : (
// // // // // // // //               <div className="history-list">
// // // // // // // //                 {calculationHistory.map((item, index) => (
// // // // // // // //                   <div key={index} className="history-item">
// // // // // // // //                     <div className="history-expression">{item.expression}</div>
// // // // // // // //                     <div className="history-result">= {formatNumber(item.result)}</div>
// // // // // // // //                     <div className="history-time">{item.timestamp}</div>
// // // // // // // //                   </div>
// // // // // // // //                 ))}
// // // // // // // //               </div>
// // // // // // // //             )}
// // // // // // // //           </div>

// // // // // // // //           {/* Keyboard Shortcuts */}
// // // // // // // //           <div className="keyboard-shortcuts-section">
// // // // // // // //             <h3>Keyboard Shortcuts</h3>
// // // // // // // //             <div className="shortcuts-grid">
// // // // // // // //               <div className="shortcut-item">
// // // // // // // //                 <span className="shortcut-key">0-9</span>
// // // // // // // //                 <span className="shortcut-description">Numbers</span>
// // // // // // // //               </div>
// // // // // // // //               <div className="shortcut-item">
// // // // // // // //                 <span className="shortcut-key">+ - * /</span>
// // // // // // // //                 <span className="shortcut-description">Operations</span>
// // // // // // // //               </div>
// // // // // // // //               <div className="shortcut-item">
// // // // // // // //                 <span className="shortcut-key">Enter / =</span>
// // // // // // // //                 <span className="shortcut-description">Calculate</span>
// // // // // // // //               </div>
// // // // // // // //               <div className="shortcut-item">
// // // // // // // //                 <span className="shortcut-key">Esc / Del</span>
// // // // // // // //                 <span className="shortcut-description">Clear</span>
// // // // // // // //               </div>
// // // // // // // //               <div className="shortcut-item">
// // // // // // // //                 <span className="shortcut-key">%</span>
// // // // // // // //                 <span className="shortcut-description">Percentage</span>
// // // // // // // //               </div>
// // // // // // // //               <div className="shortcut-item">
// // // // // // // //                 <span className="shortcut-key">^</span>
// // // // // // // //                 <span className="shortcut-description">Power</span>
// // // // // // // //               </div>
// // // // // // // //               <div className="shortcut-item">
// // // // // // // //                 <span className="shortcut-key">R</span>
// // // // // // // //                 <span className="shortcut-description">Square Root</span>
// // // // // // // //               </div>
// // // // // // // //             </div>
// // // // // // // //           </div>
// // // // // // // //         </div>
// // // // // // // //       </div>

// // // // // // // //       {/* Status Bar */}
// // // // // // // //       <div className="status-bar">
// // // // // // // //         <p>{status}</p>
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default TalkingCalculator;





// // // // // // // import React, { useState, useEffect, useCallback, useRef } from 'react';
// // // // // // // import { useNavigate } from 'react-router-dom';
// // // // // // // import { voiceService } from '../../services/voiceService';
// // // // // // // import './TalkingCalculator.css';

// // // // // // // const TalkingCalculator = () => {
// // // // // // //   const navigate = useNavigate();
  
// // // // // // //   // Calculator state
// // // // // // //   const [currentDisplay, setCurrentDisplay] = useState('0');
// // // // // // //   const [previousValue, setPreviousValue] = useState(null);
// // // // // // //   const [currentOperation, setCurrentOperation] = useState(null);
// // // // // // //   const [waitingForNewValue, setWaitingForNewValue] = useState(false);
// // // // // // //   const [calculationHistory, setCalculationHistory] = useState([]);
// // // // // // //   const [isSpeaking, setIsSpeaking] = useState(false);
// // // // // // //   const [status, setStatus] = useState("Talking Calculator is ready");
  
// // // // // // //   // Voice commands registered ref
// // // // // // //   const commandsRegisteredRef = useRef(false);

// // // // // // //   // Mathematical operations
// // // // // // //   const mathOperations = {
// // // // // // //     add: (a, b) => a + b,
// // // // // // //     subtract: (a, b) => a - b,
// // // // // // //     multiply: (a, b) => a * b,
// // // // // // //     divide: (a, b) => {
// // // // // // //       if (b === 0) throw new Error("Cannot divide by zero");
// // // // // // //       return a / b;
// // // // // // //     },
// // // // // // //     power: (a, b) => Math.pow(a, b),
// // // // // // //     percentage: (a, b) => (a * b) / 100,
// // // // // // //     squareRoot: (a) => Math.sqrt(a)
// // // // // // //   };

// // // // // // //   // Operation symbols for display
// // // // // // //   const operationSymbols = {
// // // // // // //     add: '+',
// // // // // // //     subtract: '−',
// // // // // // //     multiply: '×',
// // // // // // //     divide: '÷',
// // // // // // //     power: '^',
// // // // // // //     percentage: '%',
// // // // // // //     squareRoot: '√'
// // // // // // //   };

// // // // // // //   // Speak function
// // // // // // //   const speak = (text) => {
// // // // // // //     const synth = window.speechSynthesis;
// // // // // // //     if (!synth) return;
// // // // // // //     synth.cancel();
// // // // // // //     const utter = new SpeechSynthesisUtterance(text);
// // // // // // //     utter.rate = 0.9;
// // // // // // //     synth.speak(utter);
// // // // // // //   };

// // // // // // //   // Format number for display
// // // // // // //   const formatNumber = useCallback((num) => {
// // // // // // //     if (num === null || num === undefined) return '0';
// // // // // // //     if (typeof num !== 'number') return num;
    
// // // // // // //     const numStr = num.toString();
// // // // // // //     if (numStr.length > 10) {
// // // // // // //       if (Math.abs(num) > 1e10) {
// // // // // // //         return num.toExponential(5);
// // // // // // //       }
// // // // // // //       return parseFloat(num.toFixed(8)).toString();
// // // // // // //     }
// // // // // // //     return numStr;
// // // // // // //   }, []);

// // // // // // //   // Handle number input
// // // // // // //   const handleNumberInput = useCallback((number) => {
// // // // // // //     if (waitingForNewValue) {
// // // // // // //       setCurrentDisplay(number);
// // // // // // //       setWaitingForNewValue(false);
// // // // // // //     } else {
// // // // // // //       setCurrentDisplay(prev => 
// // // // // // //         prev === '0' || prev === 'Error' ? number : prev + number
// // // // // // //       );
// // // // // // //     }
// // // // // // //     speak(number);
// // // // // // //   }, [waitingForNewValue]);

// // // // // // //   // Handle decimal point
// // // // // // //   const handleDecimal = useCallback(() => {
// // // // // // //     if (waitingForNewValue) {
// // // // // // //       setCurrentDisplay('0.');
// // // // // // //       setWaitingForNewValue(false);
// // // // // // //     } else if (!currentDisplay.includes('.')) {
// // // // // // //       setCurrentDisplay(prev => prev + '.');
// // // // // // //     }
// // // // // // //     speak("point");
// // // // // // //   }, [currentDisplay, waitingForNewValue]);

// // // // // // //   // Handle operation selection
// // // // // // //   const handleOperation = useCallback((operation) => {
// // // // // // //     const inputValue = parseFloat(currentDisplay);
    
// // // // // // //     if (currentOperation !== null && !waitingForNewValue) {
// // // // // // //       handleCalculate();
// // // // // // //     }
    
// // // // // // //     setPreviousValue(inputValue);
// // // // // // //     setCurrentOperation(operation);
// // // // // // //     setWaitingForNewValue(true);
    
// // // // // // //     const operationNames = {
// // // // // // //       add: "plus",
// // // // // // //       subtract: "minus",
// // // // // // //       multiply: "multiply",
// // // // // // //       divide: "divide",
// // // // // // //       power: "power",
// // // // // // //       percentage: "percent",
// // // // // // //       squareRoot: "square root"
// // // // // // //     };
    
// // // // // // //     setStatus(`Operation selected: ${operationNames[operation] || operation}`);
// // // // // // //     speak(operationNames[operation] || operation);
// // // // // // //   }, [currentDisplay, currentOperation, waitingForNewValue]);

// // // // // // //   // Handle calculation
// // // // // // //   const handleCalculate = useCallback(() => {
// // // // // // //     if (currentOperation === null || waitingForNewValue) {
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     const prevVal = previousValue;
// // // // // // //     const currVal = parseFloat(currentDisplay);
    
// // // // // // //     try {
// // // // // // //       const operationFunction = mathOperations[currentOperation];
// // // // // // //       if (!operationFunction) {
// // // // // // //         throw new Error("Unknown operation");
// // // // // // //       }
      
// // // // // // //       let result;
// // // // // // //       if (currentOperation === 'squareRoot') {
// // // // // // //         result = operationFunction(currVal);
// // // // // // //       } else {
// // // // // // //         result = operationFunction(prevVal, currVal);
// // // // // // //       }
      
// // // // // // //       // Add to history
// // // // // // //       const historyEntry = {
// // // // // // //         expression: currentOperation === 'squareRoot' 
// // // // // // //           ? `√(${currVal})`
// // // // // // //           : `${prevVal} ${operationSymbols[currentOperation]} ${currVal}`,
// // // // // // //         result: result,
// // // // // // //         timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
// // // // // // //       };
      
// // // // // // //       setCalculationHistory(prev => [historyEntry, ...prev.slice(0, 9)]);
// // // // // // //       setCurrentDisplay(formatNumber(result));
// // // // // // //       setPreviousValue(null);
// // // // // // //       setCurrentOperation(null);
// // // // // // //       setWaitingForNewValue(true);
// // // // // // //       setStatus(`Calculation completed: ${formatNumber(result)}`);
      
// // // // // // //       // Speak result
// // // // // // //       speak(`Result is ${formatNumber(result)}`);
      
// // // // // // //     } catch (error) {
// // // // // // //       setCurrentDisplay('Error');
// // // // // // //       setStatus("Calculation error: " + error.message);
// // // // // // //       speak("Error in calculation");
// // // // // // //     }
// // // // // // //   }, [currentOperation, currentDisplay, previousValue, waitingForNewValue, formatNumber]);

// // // // // // //   // Clear calculator
// // // // // // //   const handleClear = useCallback(() => {
// // // // // // //     setCurrentDisplay('0');
// // // // // // //     setPreviousValue(null);
// // // // // // //     setCurrentOperation(null);
// // // // // // //     setWaitingForNewValue(false);
// // // // // // //     setStatus("Calculator cleared");
// // // // // // //     speak("Calculator cleared");
// // // // // // //   }, []);

// // // // // // //   // Clear entry only
// // // // // // //   const handleClearEntry = useCallback(() => {
// // // // // // //     setCurrentDisplay('0');
// // // // // // //     setStatus("Entry cleared");
// // // // // // //     speak("Entry cleared");
// // // // // // //   }, []);

// // // // // // //   // Toggle sign
// // // // // // //   const handleToggleSign = useCallback(() => {
// // // // // // //     setCurrentDisplay(prev => formatNumber(-parseFloat(prev)));
// // // // // // //     setStatus("Sign toggled");
// // // // // // //     speak("Sign changed");
// // // // // // //   }, [formatNumber]);

// // // // // // //   // Percentage
// // // // // // //   const handlePercentage = useCallback(() => {
// // // // // // //     const value = parseFloat(currentDisplay);
// // // // // // //     if (previousValue !== null && currentOperation) {
// // // // // // //       const result = (previousValue * value) / 100;
// // // // // // //       const historyEntry = {
// // // // // // //         expression: `${previousValue} × ${value}%`,
// // // // // // //         result: result,
// // // // // // //         timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
// // // // // // //       };
// // // // // // //       setCalculationHistory(prev => [historyEntry, ...prev.slice(0, 9)]);
// // // // // // //       setCurrentDisplay(formatNumber(result));
// // // // // // //       setWaitingForNewValue(true);
// // // // // // //       setStatus(`Percentage calculated: ${formatNumber(result)}`);
// // // // // // //       speak(`Result is ${formatNumber(result)}`);
// // // // // // //     } else {
// // // // // // //       setCurrentDisplay(formatNumber(value / 100));
// // // // // // //       setStatus(`Converted to percentage: ${formatNumber(value / 100)}`);
// // // // // // //       speak(`Converted to percentage`);
// // // // // // //     }
// // // // // // //   }, [currentDisplay, previousValue, currentOperation, formatNumber]);

// // // // // // //   // Square root
// // // // // // //   const handleSquareRoot = useCallback(() => {
// // // // // // //     const value = parseFloat(currentDisplay);
// // // // // // //     if (value < 0) {
// // // // // // //       setCurrentDisplay('Error');
// // // // // // //       setStatus("Error: Cannot calculate square root of negative number");
// // // // // // //       speak("Cannot calculate square root of negative number");
// // // // // // //       return;
// // // // // // //     }
// // // // // // //     const result = Math.sqrt(value);
// // // // // // //     const historyEntry = {
// // // // // // //       expression: `√(${value})`,
// // // // // // //       result: result,
// // // // // // //       timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
// // // // // // //     };
// // // // // // //     setCalculationHistory(prev => [historyEntry, ...prev.slice(0, 9)]);
// // // // // // //     setCurrentDisplay(formatNumber(result));
// // // // // // //     setStatus(`Square root calculated: ${formatNumber(result)}`);
// // // // // // //     speak(`Square root is ${formatNumber(result)}`);
// // // // // // //   }, [currentDisplay, formatNumber]);

// // // // // // //   // Toggle speech
// // // // // // //   const toggleSpeech = useCallback(() => {
// // // // // // //     setIsSpeaking(prev => {
// // // // // // //       const newState = !prev;
// // // // // // //       setStatus(newState ? "Voice feedback enabled" : "Voice feedback disabled");
// // // // // // //       speak(newState ? "Voice feedback enabled" : "Voice feedback disabled");
// // // // // // //       return newState;
// // // // // // //     });
// // // // // // //   }, []);

// // // // // // //   // Initialize voice commands
// // // // // // //   useEffect(() => {
// // // // // // //     if (!voiceService.isAvailable()) {
// // // // // // //       console.log("Voice service not available");
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     // Register voice commands once
// // // // // // //     if (!commandsRegisteredRef.current) {
// // // // // // //       registerVoiceCommands();
// // // // // // //       commandsRegisteredRef.current = true;
// // // // // // //       voiceService.startListening();
// // // // // // //     }

// // // // // // //     return () => {
// // // // // // //       voiceService.clearCommands();
// // // // // // //     };
// // // // // // //   }, []);

// // // // // // //   // Register voice commands
// // // // // // //   const registerVoiceCommands = () => {
// // // // // // //     console.log("Registering calculator voice commands");
    
// // // // // // //     voiceService.clearCommands();
    
// // // // // // //     // Navigation commands
// // // // // // //     voiceService.registerCommand("dashboard", async () => {
// // // // // // //       console.log("Dashboard command received");
// // // // // // //       speak("Going to dashboard");
// // // // // // //       navigate("/dashboard");
// // // // // // //     });
    
// // // // // // //     voiceService.registerCommand("home", async () => {
// // // // // // //       console.log("Home command received");
// // // // // // //       speak("Going to dashboard");
// // // // // // //       navigate("/dashboard");
// // // // // // //     });
    
// // // // // // //     voiceService.registerCommand("back", async () => {
// // // // // // //       console.log("Back command received");
// // // // // // //       speak("Going back to dashboard");
// // // // // // //       navigate("/dashboard");
// // // // // // //     });
    
// // // // // // //     voiceService.registerCommand("go back", async () => {
// // // // // // //       console.log("Go back command received");
// // // // // // //       speak("Going back to dashboard");
// // // // // // //       navigate("/dashboard");
// // // // // // //     });
    
// // // // // // //     // Calculator commands
// // // // // // //     voiceService.registerCommand("calculate", async () => {
// // // // // // //       console.log("Calculate command received");
// // // // // // //       speak("Calculating");
// // // // // // //       handleCalculate();
// // // // // // //     });
    
// // // // // // //     voiceService.registerCommand("equals", async () => {
// // // // // // //       console.log("Equals command received");
// // // // // // //       speak("Calculating");
// // // // // // //       handleCalculate();
// // // // // // //     });
    
// // // // // // //     voiceService.registerCommand("clear", async () => {
// // // // // // //       console.log("Clear command received");
// // // // // // //       speak("Clearing calculator");
// // // // // // //       handleClear();
// // // // // // //     });
    
// // // // // // //     voiceService.registerCommand("clear all", async () => {
// // // // // // //       console.log("Clear all command received");
// // // // // // //       speak("Clearing all");
// // // // // // //       handleClear();
// // // // // // //     });
    
// // // // // // //     voiceService.registerCommand("reset", async () => {
// // // // // // //       console.log("Reset command received");
// // // // // // //       speak("Resetting calculator");
// // // // // // //       handleClear();
// // // // // // //     });
    
// // // // // // //     voiceService.registerCommand("clear entry", async () => {
// // // // // // //       console.log("Clear entry command received");
// // // // // // //       speak("Clearing entry");
// // // // // // //       handleClearEntry();
// // // // // // //     });
    
// // // // // // //     // Number commands (0-9)
// // // // // // //     for (let i = 0; i <= 9; i++) {
// // // // // // //       voiceService.registerCommand(i.toString(), async () => {
// // // // // // //         console.log(`${i} command received`);
// // // // // // //         handleNumberInput(i.toString());
// // // // // // //       });
      
// // // // // // //       // Also register word versions
// // // // // // //       const numberWords = [
// // // // // // //         "zero", "one", "two", "three", "four", 
// // // // // // //         "five", "six", "seven", "eight", "nine"
// // // // // // //       ];
// // // // // // //       voiceService.registerCommand(numberWords[i], async () => {
// // // // // // //         console.log(`${numberWords[i]} command received`);
// // // // // // //         handleNumberInput(i.toString());
// // // // // // //       });
// // // // // // //     }
    
// // // // // // //     // Decimal point
// // // // // // //     voiceService.registerCommand("point", async () => {
// // // // // // //       console.log("Point command received");
// // // // // // //       handleDecimal();
// // // // // // //     });
    
// // // // // // //     voiceService.registerCommand("decimal", async () => {
// // // // // // //       console.log("Decimal command received");
// // // // // // //       handleDecimal();
// // // // // // //     });
    
// // // // // // //     // Operation commands
// // // // // // //     voiceService.registerCommand("plus", async () => {
// // // // // // //       console.log("Plus command received");
// // // // // // //       handleOperation('add');
// // // // // // //     });
    
// // // // // // //     voiceService.registerCommand("add", async () => {
// // // // // // //       console.log("Add command received");
// // // // // // //       handleOperation('add');
// // // // // // //     });
    
// // // // // // //     voiceService.registerCommand("minus", async () => {
// // // // // // //       console.log("Minus command received");
// // // // // // //       handleOperation('subtract');
// // // // // // //     });
    
// // // // // // //     voiceService.registerCommand("subtract", async () => {
// // // // // // //       console.log("Subtract command received");
// // // // // // //       handleOperation('subtract');
// // // // // // //     });
    
// // // // // // //     voiceService.registerCommand("multiply", async () => {
// // // // // // //       console.log("Multiply command received");
// // // // // // //       handleOperation('multiply');
// // // // // // //     });
    
// // // // // // //     voiceService.registerCommand("times", async () => {
// // // // // // //       console.log("Times command received");
// // // // // // //       handleOperation('multiply');
// // // // // // //     });
    
// // // // // // //     voiceService.registerCommand("divide", async () => {
// // // // // // //       console.log("Divide command received");
// // // // // // //       handleOperation('divide');
// // // // // // //     });
    
// // // // // // //     voiceService.registerCommand("over", async () => {
// // // // // // //       console.log("Over command received");
// // // // // // //       handleOperation('divide');
// // // // // // //     });
    
// // // // // // //     voiceService.registerCommand("power", async () => {
// // // // // // //       console.log("Power command received");
// // // // // // //       handleOperation('power');
// // // // // // //     });
    
// // // // // // //     voiceService.registerCommand("percent", async () => {
// // // // // // //       console.log("Percent command received");
// // // // // // //       handlePercentage();
// // // // // // //     });
    
// // // // // // //     voiceService.registerCommand("percentage", async () => {
// // // // // // //       console.log("Percentage command received");
// // // // // // //       handlePercentage();
// // // // // // //     });
    
// // // // // // //     voiceService.registerCommand("square root", async () => {
// // // // // // //       console.log("Square root command received");
// // // // // // //       handleSquareRoot();
// // // // // // //     });
    
// // // // // // //     voiceService.registerCommand("squareroot", async () => {
// // // // // // //       console.log("Squareroot command received");
// // // // // // //       handleSquareRoot();
// // // // // // //     });
    
// // // // // // //     voiceService.registerCommand("root", async () => {
// // // // // // //       console.log("Root command received");
// // // // // // //       handleSquareRoot();
// // // // // // //     });
    
// // // // // // //     voiceService.registerCommand("sqrt", async () => {
// // // // // // //       console.log("Sqrt command received");
// // // // // // //       handleSquareRoot();
// // // // // // //     });
    
// // // // // // //     // Toggle sign
// // // // // // //     voiceService.registerCommand("negative", async () => {
// // // // // // //       console.log("Negative command received");
// // // // // // //       speak("Making negative");
// // // // // // //       handleToggleSign();
// // // // // // //     });
    
// // // // // // //     voiceService.registerCommand("change sign", async () => {
// // // // // // //       console.log("Change sign command received");
// // // // // // //       speak("Changing sign");
// // // // // // //       handleToggleSign();
// // // // // // //     });
    
// // // // // // //     voiceService.registerCommand("toggle sign", async () => {
// // // // // // //       console.log("Toggle sign command received");
// // // // // // //       speak("Toggling sign");
// // // // // // //       handleToggleSign();
// // // // // // //     });
    
// // // // // // //     // Voice control
// // // // // // //     voiceService.registerCommand("voice on", async () => {
// // // // // // //       console.log("Voice on command received");
// // // // // // //       if (!isSpeaking) {
// // // // // // //         toggleSpeech();
// // // // // // //       }
// // // // // // //     });
    
// // // // // // //     voiceService.registerCommand("voice off", async () => {
// // // // // // //       console.log("Voice off command received");
// // // // // // //       if (isSpeaking) {
// // // // // // //         toggleSpeech();
// // // // // // //       }
// // // // // // //     });
    
// // // // // // //     voiceService.registerCommand("toggle voice", async () => {
// // // // // // //       console.log("Toggle voice command received");
// // // // // // //       toggleSpeech();
// // // // // // //     });
    
// // // // // // //     voiceService.registerCommand("speak", async () => {
// // // // // // //       console.log("Speak command received");
// // // // // // //       speak(`Current value is ${currentDisplay}`);
// // // // // // //     });
    
// // // // // // //     voiceService.registerCommand("speak result", async () => {
// // // // // // //       console.log("Speak result command received");
// // // // // // //       speak(`Current display shows ${currentDisplay}`);
// // // // // // //     });
    
// // // // // // //     // Help command
// // // // // // //     voiceService.registerCommand("help", async () => {
// // // // // // //       console.log("Help command received");
// // // // // // //       const helpText = "I can help with calculator operations. Say numbers like 'one', 'two', 'three'. " +
// // // // // // //         "Say operations like 'plus', 'minus', 'multiply', 'divide'. " +
// // // // // // //         "Say 'equals' or 'calculate' to get the result. " +
// // // // // // //         "Say 'clear' to reset. Say 'percent' for percentage. " +
// // // // // // //         "Say 'square root' for square root. Say 'voice on' or 'voice off' to control voice feedback. " +
// // // // // // //         "Say 'dashboard' to go back to main menu.";
// // // // // // //       speak(helpText);
// // // // // // //     });
    
// // // // // // //     voiceService.registerCommand("calculator help", async () => {
// // // // // // //       console.log("Calculator help command received");
// // // // // // //       speak("You can say numbers, operations like plus, minus, multiply, divide, and commands like equals, clear, percent, square root, and dashboard to go back.");
// // // // // // //     });
    
// // // // // // //     // Logout command
// // // // // // //     voiceService.registerCommand("logout", async () => {
// // // // // // //       console.log("Logout command received");
// // // // // // //       await handleLogout();
// // // // // // //     });
// // // // // // //   };

// // // // // // //   // Handle keyboard input
// // // // // // //   useEffect(() => {
// // // // // // //     const handleKeyDown = (e) => {
// // // // // // //       const key = e.key;
      
// // // // // // //       if (key >= '0' && key <= '9') {
// // // // // // //         handleNumberInput(key);
// // // // // // //       } else if (key === '.') {
// // // // // // //         handleDecimal();
// // // // // // //       } else if (key === '+') {
// // // // // // //         handleOperation('add');
// // // // // // //       } else if (key === '-') {
// // // // // // //         handleOperation('subtract');
// // // // // // //       } else if (key === '*') {
// // // // // // //         handleOperation('multiply');
// // // // // // //       } else if (key === '/') {
// // // // // // //         e.preventDefault();
// // // // // // //         handleOperation('divide');
// // // // // // //       } else if (key === 'Enter' || key === '=') {
// // // // // // //         handleCalculate();
// // // // // // //       } else if (key === 'Escape' || key === 'Delete') {
// // // // // // //         handleClear();
// // // // // // //       } else if (key === 'Backspace') {
// // // // // // //         handleClearEntry();
// // // // // // //       } else if (key === '%') {
// // // // // // //         handlePercentage();
// // // // // // //       } else if (key === '^') {
// // // // // // //         handleOperation('power');
// // // // // // //       } else if (key === 'r' || key === 'R') {
// // // // // // //         handleSquareRoot();
// // // // // // //       }
// // // // // // //     };

// // // // // // //     window.addEventListener('keydown', handleKeyDown);
// // // // // // //     return () => window.removeEventListener('keydown', handleKeyDown);
// // // // // // //   }, [handleNumberInput, handleDecimal, handleOperation, handleCalculate, handleClear, handleClearEntry, handlePercentage, handleSquareRoot]);

// // // // // // //   // Handle logout
// // // // // // //   const handleLogout = async () => {
// // // // // // //     setStatus("Logging out...");
// // // // // // //     speak("Logging out...");
// // // // // // //     voiceService.stopListening();
// // // // // // //     localStorage.clear();
// // // // // // //     setTimeout(() => navigate("/"), 1500);
// // // // // // //   };

// // // // // // //   const handleBackToDashboard = () => {
// // // // // // //     navigate("/dashboard");
// // // // // // //   };

// // // // // // //   // Current expression for display
// // // // // // //   const currentExpression = currentOperation && previousValue !== null
// // // // // // //     ? `${previousValue} ${operationSymbols[currentOperation] || currentOperation} ${waitingForNewValue ? '' : currentDisplay}`
// // // // // // //     : '';

// // // // // // //   return (
// // // // // // //     <div className="talking-calculator-container">
// // // // // // //       {/* Fixed Header */}
// // // // // // //       <header className="dashboard-header fixed-header">
// // // // // // //         <div className="header-content">
// // // // // // //           <div className="header-left">
// // // // // // //             <button className="back-btn" onClick={handleBackToDashboard}>
// // // // // // //               ← Dashboard
// // // // // // //             </button>
// // // // // // //             <h1 className="logo">Vision Assist</h1>
// // // // // // //           </div>
// // // // // // //           <div className="user-menu">
// // // // // // //             <button className="logout-btn" onClick={handleLogout}>
// // // // // // //               Logout
// // // // // // //             </button>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       </header>

// // // // // // //       <div className="calculator-content">
// // // // // // //         <div className="calculator-header">
// // // // // // //           <h2>🧮 Talking Calculator</h2>
// // // // // // //           <p>Voice and keyboard supported calculator</p>
// // // // // // //         </div>

// // // // // // //         {/* Status Message */}
// // // // // // //         {status && (
// // // // // // //           <div className="status-message">
// // // // // // //             {status}
// // // // // // //           </div>
// // // // // // //         )}

// // // // // // //         {/* Main Layout - More Compact */}
// // // // // // //         <div className="calculator-main-layout">
// // // // // // //           {/* Left Column: Calculator and Controls */}
// // // // // // //           <div className="calculator-left-column">
// // // // // // //             {/* Display Section */}
// // // // // // //             <div className="calculator-display-section compact">
// // // // // // //               <div className="expression-display">
// // // // // // //                 {currentExpression || 'Ready for calculation'}
// // // // // // //               </div>
// // // // // // //               <div className="result-display">
// // // // // // //                 {currentDisplay}
// // // // // // //               </div>
// // // // // // //             </div>

// // // // // // //             {/* Voice Controls */}
// // // // // // //             <div className="voice-controls-section compact">
// // // // // // //               <div className="voice-controls-header">
// // // // // // //                 <span>Voice Controls</span>
// // // // // // //                 <button 
// // // // // // //                   className={`voice-toggle-btn ${isSpeaking ? 'active' : ''}`}
// // // // // // //                   onClick={toggleSpeech}
// // // // // // //                 >
// // // // // // //                   {isSpeaking ? '🔊 ON' : '🔈 OFF'}
// // // // // // //                 </button>
// // // // // // //               </div>
// // // // // // //               <div className="voice-buttons">
// // // // // // //                 <button 
// // // // // // //                   className="voice-command-btn"
// // // // // // //                   onClick={() => speak(`Current value is ${currentDisplay}`)}
// // // // // // //                 >
// // // // // // //                   Speak Value
// // // // // // //                 </button>
// // // // // // //                 <button 
// // // // // // //                   className="voice-command-btn"
// // // // // // //                   onClick={() => speak("Say numbers, operations, or 'help' for commands")}
// // // // // // //                 >
// // // // // // //                   Voice Help
// // // // // // //                 </button>
// // // // // // //               </div>
// // // // // // //             </div>

// // // // // // //             {/* Calculator Buttons */}
// // // // // // //             <div className="calculator-buttons-section compact">
// // // // // // //               <div className="calculator-buttons-grid">
// // // // // // //                 {/* First Row */}
// // // // // // //                 <div className="button-row compact">
// // // // // // //                   <button className="btn-clear compact" onClick={handleClear}>C</button>
// // // // // // //                   <button className="btn-clear-entry compact" onClick={handleClearEntry}>CE</button>
// // // // // // //                   <button className="btn-operation compact" onClick={handlePercentage}>%</button>
// // // // // // //                   <button className="btn-operation compact" onClick={handleSquareRoot}>√</button>
// // // // // // //                   <button className="btn-operation compact" onClick={() => handleOperation('power')}>x^y</button>
// // // // // // //                   <button className="btn-operation compact" onClick={() => handleOperation('divide')}>÷</button>
// // // // // // //                 </div>

// // // // // // //                 {/* Number Rows */}
// // // // // // //                 <div className="button-row compact">
// // // // // // //                   <button className="btn-number compact" onClick={() => handleNumberInput('7')}>7</button>
// // // // // // //                   <button className="btn-number compact" onClick={() => handleNumberInput('8')}>8</button>
// // // // // // //                   <button className="btn-number compact" onClick={() => handleNumberInput('9')}>9</button>
// // // // // // //                   <button className="btn-operation compact" onClick={() => handleOperation('multiply')}>×</button>
// // // // // // //                 </div>

// // // // // // //                 <div className="button-row compact">
// // // // // // //                   <button className="btn-number compact" onClick={() => handleNumberInput('4')}>4</button>
// // // // // // //                   <button className="btn-number compact" onClick={() => handleNumberInput('5')}>5</button>
// // // // // // //                   <button className="btn-number compact" onClick={() => handleNumberInput('6')}>6</button>
// // // // // // //                   <button className="btn-operation compact" onClick={() => handleOperation('subtract')}>−</button>
// // // // // // //                 </div>

// // // // // // //                 <div className="button-row compact">
// // // // // // //                   <button className="btn-number compact" onClick={() => handleNumberInput('1')}>1</button>
// // // // // // //                   <button className="btn-number compact" onClick={() => handleNumberInput('2')}>2</button>
// // // // // // //                   <button className="btn-number compact" onClick={() => handleNumberInput('3')}>3</button>
// // // // // // //                   <button className="btn-operation compact" onClick={() => handleOperation('add')}>+</button>
// // // // // // //                 </div>

// // // // // // //                 {/* Last Row */}
// // // // // // //                 <div className="button-row compact">
// // // // // // //                   <button className="btn-number compact" onClick={handleToggleSign}>±</button>
// // // // // // //                   <button className="btn-number compact" onClick={() => handleNumberInput('0')}>0</button>
// // // // // // //                   <button className="btn-number compact" onClick={handleDecimal}>.</button>
// // // // // // //                   <button className="btn-equals compact" onClick={handleCalculate}>=</button>
// // // // // // //                 </div>
// // // // // // //               </div>
// // // // // // //             </div>
// // // // // // //           </div>

// // // // // // //           {/* Right Column: History and Shortcuts */}
// // // // // // //           <div className="calculator-right-column">
// // // // // // //             {/* Calculation History */}
// // // // // // //             <div className="calculator-history-section compact">
// // // // // // //               <div className="section-header">
// // // // // // //                 <h3>History ({calculationHistory.length})</h3>
// // // // // // //                 {calculationHistory.length > 0 && (
// // // // // // //                   <button className="clear-history-btn" onClick={() => setCalculationHistory([])}>
// // // // // // //                     Clear
// // // // // // //                   </button>
// // // // // // //                 )}
// // // // // // //               </div>
              
// // // // // // //               {calculationHistory.length === 0 ? (
// // // // // // //                 <div className="empty-state compact">
// // // // // // //                   <p>No calculations yet</p>
// // // // // // //                 </div>
// // // // // // //               ) : (
// // // // // // //                 <div className="history-list compact">
// // // // // // //                   {calculationHistory.map((item, index) => (
// // // // // // //                     <div key={index} className="history-item compact">
// // // // // // //                       <div className="history-expression">{item.expression}</div>
// // // // // // //                       <div className="history-result">= {formatNumber(item.result)}</div>
// // // // // // //                       <div className="history-time">{item.timestamp}</div>
// // // // // // //                     </div>
// // // // // // //                   ))}
// // // // // // //                 </div>
// // // // // // //               )}
// // // // // // //             </div>

// // // // // // //             {/* Keyboard Shortcuts */}
// // // // // // //             <div className="keyboard-shortcuts-section compact">
// // // // // // //               <h3>Voice Commands</h3>
// // // // // // //               <div className="shortcuts-grid compact">
// // // // // // //                 <div className="shortcut-item compact">
// // // // // // //                   <span className="shortcut-key">Numbers</span>
// // // // // // //                   <span className="shortcut-description">"one", "two", "three"</span>
// // // // // // //                 </div>
// // // // // // //                 <div className="shortcut-item compact">
// // // // // // //                   <span className="shortcut-key">+ - × ÷</span>
// // // // // // //                   <span className="shortcut-description">"plus", "minus"</span>
// // // // // // //                 </div>
// // // // // // //                 <div className="shortcut-item compact">
// // // // // // //                   <span className="shortcut-key">Calculate</span>
// // // // // // //                   <span className="shortcut-description">"equals", "calculate"</span>
// // // // // // //                 </div>
// // // // // // //                 <div className="shortcut-item compact">
// // // // // // //                   <span className="shortcut-key">Clear</span>
// // // // // // //                   <span className="shortcut-description">"clear", "reset"</span>
// // // // // // //                 </div>
// // // // // // //                 <div className="shortcut-item compact">
// // // // // // //                   <span className="shortcut-key">% √</span>
// // // // // // //                   <span className="shortcut-description">"percent", "root"</span>
// // // // // // //                 </div>
// // // // // // //                 <div className="shortcut-item compact">
// // // // // // //                   <span className="shortcut-key">Voice</span>
// // // // // // //                   <span className="shortcut-description">"voice on/off"</span>
// // // // // // //                 </div>
// // // // // // //                 <div className="shortcut-item compact">
// // // // // // //                   <span className="shortcut-key">Help</span>
// // // // // // //                   <span className="shortcut-description">"help", "calculator help"</span>
// // // // // // //                 </div>
// // // // // // //                 <div className="shortcut-item compact">
// // // // // // //                   <span className="shortcut-key">Back</span>
// // // // // // //                   <span className="shortcut-description">"dashboard", "back"</span>
// // // // // // //                 </div>
// // // // // // //               </div>
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       </div>

// // // // // // //       {/* Status Bar */}
// // // // // // //       <div className="status-bar">
// // // // // // //         <p>{status}</p>
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default TalkingCalculator;


// // // // // // import React, { useState, useEffect, useCallback, useRef } from 'react';
// // // // // // import { useNavigate } from 'react-router-dom';
// // // // // // import { voiceService } from '../../services/voiceService';
// // // // // // import './TalkingCalculator.css';

// // // // // // const TalkingCalculator = () => {
// // // // // //   const navigate = useNavigate();
  
// // // // // //   // Calculator state
// // // // // //   const [currentDisplay, setCurrentDisplay] = useState('0');
// // // // // //   const [previousValue, setPreviousValue] = useState(null);
// // // // // //   const [currentOperation, setCurrentOperation] = useState(null);
// // // // // //   const [waitingForNewValue, setWaitingForNewValue] = useState(false);
// // // // // //   const [calculationHistory, setCalculationHistory] = useState([]);
// // // // // //   const [isSpeaking, setIsSpeaking] = useState(true); // Start with voice ON by default
// // // // // //   const [status, setStatus] = useState("Talking Calculator is ready");
// // // // // //   const [spokenText, setSpokenText] = useState(""); // Track what was heard
  
// // // // // //   // Refs
// // // // // //   const commandsRegisteredRef = useRef(false);

// // // // // //   // Mathematical operations
// // // // // //   const mathOperations = {
// // // // // //     add: (a, b) => a + b,
// // // // // //     subtract: (a, b) => a - b,
// // // // // //     multiply: (a, b) => a * b,
// // // // // //     divide: (a, b) => {
// // // // // //       if (b === 0) throw new Error("Cannot divide by zero");
// // // // // //       return a / b;
// // // // // //     },
// // // // // //     power: (a, b) => Math.pow(a, b),
// // // // // //     percentage: (a, b) => (a * b) / 100,
// // // // // //     squareRoot: (a) => Math.sqrt(a)
// // // // // //   };

// // // // // //   // Operation symbols for display
// // // // // //   const operationSymbols = {
// // // // // //     add: '+',
// // // // // //     subtract: '−',
// // // // // //     multiply: '×',
// // // // // //     divide: '÷',
// // // // // //     power: '^',
// // // // // //     percentage: '%',
// // // // // //     squareRoot: '√'
// // // // // //   };

// // // // // //   // Speak function
// // // // // //   const speak = useCallback((text) => {
// // // // // //     if (!isSpeaking) return; // Don't speak if voice is off
    
// // // // // //     const synth = window.speechSynthesis;
// // // // // //     if (!synth) return;
    
// // // // // //     // Cancel any ongoing speech
// // // // // //     synth.cancel();
    
// // // // // //     const utter = new SpeechSynthesisUtterance(text);
// // // // // //     utter.rate = 0.9;
// // // // // //     utter.pitch = 1;
// // // // // //     utter.volume = 1;
    
// // // // // //     // Stop listening while speaking
// // // // // //     if (voiceService.isListening) {
// // // // // //       voiceService.stopListening();
// // // // // //     }
    
// // // // // //     utter.onstart = () => {
// // // // // //       console.log("Started speaking:", text);
// // // // // //     };
    
// // // // // //     utter.onend = () => {
// // // // // //       console.log("Finished speaking");
// // // // // //       // Resume listening after speaking
// // // // // //       setTimeout(() => {
// // // // // //         if (isSpeaking) {
// // // // // //           voiceService.startListening();
// // // // // //         }
// // // // // //       }, 300);
// // // // // //     };
    
// // // // // //     utter.onerror = (err) => {
// // // // // //       console.error("Speech error:", err);
// // // // // //       // Resume listening even on error
// // // // // //       setTimeout(() => {
// // // // // //         if (isSpeaking) {
// // // // // //           voiceService.startListening();
// // // // // //         }
// // // // // //       }, 300);
// // // // // //     };
    
// // // // // //     synth.speak(utter);
// // // // // //   }, [isSpeaking]);

// // // // // //   // Format number for display
// // // // // //   const formatNumber = useCallback((num) => {
// // // // // //     if (num === null || num === undefined) return '0';
// // // // // //     if (typeof num !== 'number') return num;
    
// // // // // //     const numStr = num.toString();
// // // // // //     if (numStr.length > 10) {
// // // // // //       if (Math.abs(num) > 1e10) {
// // // // // //         return num.toExponential(5);
// // // // // //       }
// // // // // //       return parseFloat(num.toFixed(8)).toString();
// // // // // //     }
// // // // // //     return numStr;
// // // // // //   }, []);

// // // // // //   // Handle number input
// // // // // //   const handleNumberInput = useCallback((number) => {
// // // // // //     console.log("Handling number input:", number);
    
// // // // // //     if (waitingForNewValue) {
// // // // // //       setCurrentDisplay(number);
// // // // // //       setWaitingForNewValue(false);
// // // // // //     } else {
// // // // // //       setCurrentDisplay(prev => 
// // // // // //         prev === '0' || prev === 'Error' ? number : prev + number
// // // // // //       );
// // // // // //     }
    
// // // // // //     speak(number);
// // // // // //     setStatus(`Entered: ${number}`);
// // // // // //   }, [waitingForNewValue, speak]);

// // // // // //   // Handle decimal point
// // // // // //   const handleDecimal = useCallback(() => {
// // // // // //     console.log("Handling decimal");
    
// // // // // //     if (waitingForNewValue) {
// // // // // //       setCurrentDisplay('0.');
// // // // // //       setWaitingForNewValue(false);
// // // // // //     } else if (!currentDisplay.includes('.')) {
// // // // // //       setCurrentDisplay(prev => prev + '.');
// // // // // //     }
    
// // // // // //     speak("point");
// // // // // //     setStatus("Decimal point added");
// // // // // //   }, [currentDisplay, waitingForNewValue, speak]);

// // // // // //   // Handle operation selection
// // // // // //   const handleOperation = useCallback((operation) => {
// // // // // //     console.log("Handling operation:", operation);
    
// // // // // //     const inputValue = parseFloat(currentDisplay);
    
// // // // // //     if (currentOperation !== null && !waitingForNewValue) {
// // // // // //       handleCalculate();
// // // // // //     }
    
// // // // // //     setPreviousValue(inputValue);
// // // // // //     setCurrentOperation(operation);
// // // // // //     setWaitingForNewValue(true);
    
// // // // // //     const operationNames = {
// // // // // //       add: "plus",
// // // // // //       subtract: "minus",
// // // // // //       multiply: "multiply",
// // // // // //       divide: "divide",
// // // // // //       power: "power",
// // // // // //       percentage: "percent",
// // // // // //       squareRoot: "square root"
// // // // // //     };
    
// // // // // //     const operationText = operationNames[operation] || operation;
// // // // // //     setStatus(`Operation: ${operationText}`);
// // // // // //     speak(operationText);
// // // // // //   }, [currentDisplay, currentOperation, waitingForNewValue, handleCalculate, speak]);

// // // // // //   // Handle calculation
// // // // // //   const handleCalculate = useCallback(() => {
// // // // // //     console.log("Handling calculate");
    
// // // // // //     if (currentOperation === null || waitingForNewValue) {
// // // // // //       setStatus("Nothing to calculate");
// // // // // //       speak("Nothing to calculate");
// // // // // //       return;
// // // // // //     }

// // // // // //     const prevVal = previousValue;
// // // // // //     const currVal = parseFloat(currentDisplay);
    
// // // // // //     try {
// // // // // //       const operationFunction = mathOperations[currentOperation];
// // // // // //       if (!operationFunction) {
// // // // // //         throw new Error("Unknown operation");
// // // // // //       }
      
// // // // // //       let result;
// // // // // //       if (currentOperation === 'squareRoot') {
// // // // // //         result = operationFunction(currVal);
// // // // // //       } else {
// // // // // //         result = operationFunction(prevVal, currVal);
// // // // // //       }
      
// // // // // //       // Add to history
// // // // // //       const historyEntry = {
// // // // // //         expression: currentOperation === 'squareRoot' 
// // // // // //           ? `√(${currVal})`
// // // // // //           : `${prevVal} ${operationSymbols[currentOperation]} ${currVal}`,
// // // // // //         result: result,
// // // // // //         timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
// // // // // //       };
      
// // // // // //       setCalculationHistory(prev => [historyEntry, ...prev.slice(0, 9)]);
// // // // // //       setCurrentDisplay(formatNumber(result));
// // // // // //       setPreviousValue(null);
// // // // // //       setCurrentOperation(null);
// // // // // //       setWaitingForNewValue(true);
      
// // // // // //       const resultText = formatNumber(result);
// // // // // //       setStatus(`Result: ${resultText}`);
      
// // // // // //       // Speak result
// // // // // //       speak(`Result is ${resultText}`);
      
// // // // // //     } catch (error) {
// // // // // //       console.error("Calculation error:", error);
// // // // // //       setCurrentDisplay('Error');
// // // // // //       setStatus("Calculation error");
// // // // // //       speak("Error in calculation");
// // // // // //     }
// // // // // //   }, [currentOperation, currentDisplay, previousValue, waitingForNewValue, formatNumber, speak]);

// // // // // //   // Clear calculator
// // // // // //   const handleClear = useCallback(() => {
// // // // // //     console.log("Handling clear");
    
// // // // // //     setCurrentDisplay('0');
// // // // // //     setPreviousValue(null);
// // // // // //     setCurrentOperation(null);
// // // // // //     setWaitingForNewValue(false);
// // // // // //     setStatus("Calculator cleared");
// // // // // //     speak("Calculator cleared");
// // // // // //   }, [speak]);

// // // // // //   // Clear entry only
// // // // // //   const handleClearEntry = useCallback(() => {
// // // // // //     console.log("Handling clear entry");
    
// // // // // //     setCurrentDisplay('0');
// // // // // //     setStatus("Entry cleared");
// // // // // //     speak("Entry cleared");
// // // // // //   }, [speak]);

// // // // // //   // Toggle sign
// // // // // //   const handleToggleSign = useCallback(() => {
// // // // // //     console.log("Handling toggle sign");
    
// // // // // //     setCurrentDisplay(prev => formatNumber(-parseFloat(prev)));
// // // // // //     setStatus("Sign toggled");
// // // // // //     speak("Sign changed");
// // // // // //   }, [formatNumber, speak]);

// // // // // //   // Percentage
// // // // // //   const handlePercentage = useCallback(() => {
// // // // // //     console.log("Handling percentage");
    
// // // // // //     const value = parseFloat(currentDisplay);
// // // // // //     if (previousValue !== null && currentOperation) {
// // // // // //       const result = (previousValue * value) / 100;
// // // // // //       const historyEntry = {
// // // // // //         expression: `${previousValue} × ${value}%`,
// // // // // //         result: result,
// // // // // //         timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
// // // // // //       };
// // // // // //       setCalculationHistory(prev => [historyEntry, ...prev.slice(0, 9)]);
// // // // // //       setCurrentDisplay(formatNumber(result));
// // // // // //       setWaitingForNewValue(true);
// // // // // //       const resultText = formatNumber(result);
// // // // // //       setStatus(`Percentage: ${resultText}`);
// // // // // //       speak(`Result is ${resultText}`);
// // // // // //     } else {
// // // // // //       setCurrentDisplay(formatNumber(value / 100));
// // // // // //       const resultText = formatNumber(value / 100);
// // // // // //       setStatus(`Percentage: ${resultText}`);
// // // // // //       speak(`Converted to percentage`);
// // // // // //     }
// // // // // //   }, [currentDisplay, previousValue, currentOperation, formatNumber, speak]);

// // // // // //   // Square root
// // // // // //   const handleSquareRoot = useCallback(() => {
// // // // // //     console.log("Handling square root");
    
// // // // // //     const value = parseFloat(currentDisplay);
// // // // // //     if (value < 0) {
// // // // // //       setCurrentDisplay('Error');
// // // // // //       setStatus("Error: Cannot calculate square root of negative number");
// // // // // //       speak("Cannot calculate square root of negative number");
// // // // // //       return;
// // // // // //     }
// // // // // //     const result = Math.sqrt(value);
// // // // // //     const historyEntry = {
// // // // // //       expression: `√(${value})`,
// // // // // //       result: result,
// // // // // //       timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
// // // // // //     };
// // // // // //     setCalculationHistory(prev => [historyEntry, ...prev.slice(0, 9)]);
// // // // // //     const resultText = formatNumber(result);
// // // // // //     setCurrentDisplay(resultText);
// // // // // //     setStatus(`Square root: ${resultText}`);
// // // // // //     speak(`Square root is ${resultText}`);
// // // // // //   }, [currentDisplay, formatNumber, speak]);

// // // // // //   // Toggle speech
// // // // // //   const toggleSpeech = useCallback(() => {
// // // // // //     console.log("Toggling speech");
    
// // // // // //     setIsSpeaking(prev => {
// // // // // //       const newState = !prev;
// // // // // //       setStatus(newState ? "Voice feedback enabled" : "Voice feedback disabled");
      
// // // // // //       if (newState) {
// // // // // //         // Start voice service
// // // // // //         if (voiceService.isAvailable()) {
// // // // // //           voiceService.startListening();
// // // // // //         }
// // // // // //         speak("Voice feedback enabled");
// // // // // //       } else {
// // // // // //         // Stop voice service
// // // // // //         if (voiceService.isListening) {
// // // // // //           voiceService.stopListening();
// // // // // //         }
// // // // // //         speak("Voice feedback disabled");
// // // // // //       }
      
// // // // // //       return newState;
// // // // // //     });
// // // // // //   }, [speak]);

// // // // // //   // Initialize voice commands
// // // // // //   useEffect(() => {
// // // // // //     const initializeVoiceCommands = async () => {
// // // // // //       if (!voiceService.isAvailable()) {
// // // // // //         console.log("Voice service not available");
// // // // // //         setStatus("Voice service not available");
// // // // // //         return;
// // // // // //       }

// // // // // //       try {
// // // // // //         // Clear any existing commands
// // // // // //         voiceService.clearCommands();
        
// // // // // //         console.log("Registering calculator voice commands");
        
// // // // // //         // Navigation commands
// // // // // //         voiceService.registerCommand("dashboard", () => {
// // // // // //           console.log("Dashboard command received");
// // // // // //           setSpokenText("dashboard");
// // // // // //           speak("Going to dashboard");
// // // // // //           setTimeout(() => navigate("/dashboard"), 500);
// // // // // //         });
        
// // // // // //         voiceService.registerCommand("home", () => {
// // // // // //           console.log("Home command received");
// // // // // //           setSpokenText("home");
// // // // // //           speak("Going to dashboard");
// // // // // //           setTimeout(() => navigate("/dashboard"), 500);
// // // // // //         });
        
// // // // // //         voiceService.registerCommand("back", () => {
// // // // // //           console.log("Back command received");
// // // // // //           setSpokenText("back");
// // // // // //           speak("Going back to dashboard");
// // // // // //           setTimeout(() => navigate("/dashboard"), 500);
// // // // // //         });
        
// // // // // //         voiceService.registerCommand("go back", () => {
// // // // // //           console.log("Go back command received");
// // // // // //           setSpokenText("go back");
// // // // // //           speak("Going back to dashboard");
// // // // // //           setTimeout(() => navigate("/dashboard"), 500);
// // // // // //         });
        
// // // // // //         // Calculator commands
// // // // // //         voiceService.registerCommand("calculate", () => {
// // // // // //           console.log("Calculate command received");
// // // // // //           setSpokenText("calculate");
// // // // // //           handleCalculate();
// // // // // //         });
        
// // // // // //         voiceService.registerCommand("equals", () => {
// // // // // //           console.log("Equals command received");
// // // // // //           setSpokenText("equals");
// // // // // //           handleCalculate();
// // // // // //         });
        
// // // // // //         voiceService.registerCommand("equal", () => {
// // // // // //           console.log("Equal command received");
// // // // // //           setSpokenText("equal");
// // // // // //           handleCalculate();
// // // // // //         });
        
// // // // // //         voiceService.registerCommand("clear", () => {
// // // // // //           console.log("Clear command received");
// // // // // //           setSpokenText("clear");
// // // // // //           handleClear();
// // // // // //         });
        
// // // // // //         voiceService.registerCommand("clear all", () => {
// // // // // //           console.log("Clear all command received");
// // // // // //           setSpokenText("clear all");
// // // // // //           handleClear();
// // // // // //         });
        
// // // // // //         voiceService.registerCommand("reset", () => {
// // // // // //           console.log("Reset command received");
// // // // // //           setSpokenText("reset");
// // // // // //           handleClear();
// // // // // //         });
        
// // // // // //         voiceService.registerCommand("clear entry", () => {
// // // // // //           console.log("Clear entry command received");
// // // // // //           setSpokenText("clear entry");
// // // // // //           handleClearEntry();
// // // // // //         });
        
// // // // // //         // Number commands (0-9)
// // // // // //         for (let i = 0; i <= 9; i++) {
// // // // // //           voiceService.registerCommand(i.toString(), () => {
// // // // // //             console.log(`${i} command received`);
// // // // // //             setSpokenText(i.toString());
// // // // // //             handleNumberInput(i.toString());
// // // // // //           });
          
// // // // // //           // Also register word versions
// // // // // //           const numberWords = [
// // // // // //             "zero", "one", "two", "three", "four", 
// // // // // //             "five", "six", "seven", "eight", "nine"
// // // // // //           ];
// // // // // //           voiceService.registerCommand(numberWords[i], () => {
// // // // // //             console.log(`${numberWords[i]} command received`);
// // // // // //             setSpokenText(numberWords[i]);
// // // // // //             handleNumberInput(i.toString());
// // // // // //           });
// // // // // //         }
        
// // // // // //         // Decimal point
// // // // // //         voiceService.registerCommand("point", () => {
// // // // // //           console.log("Point command received");
// // // // // //           setSpokenText("point");
// // // // // //           handleDecimal();
// // // // // //         });
        
// // // // // //         voiceService.registerCommand("decimal", () => {
// // // // // //           console.log("Decimal command received");
// // // // // //           setSpokenText("decimal");
// // // // // //           handleDecimal();
// // // // // //         });
        
// // // // // //         voiceService.registerCommand("dot", () => {
// // // // // //           console.log("Dot command received");
// // // // // //           setSpokenText("dot");
// // // // // //           handleDecimal();
// // // // // //         });
        
// // // // // //         // Operation commands
// // // // // //         voiceService.registerCommand("plus", () => {
// // // // // //           console.log("Plus command received");
// // // // // //           setSpokenText("plus");
// // // // // //           handleOperation('add');
// // // // // //         });
        
// // // // // //         voiceService.registerCommand("add", () => {
// // // // // //           console.log("Add command received");
// // // // // //           setSpokenText("add");
// // // // // //           handleOperation('add');
// // // // // //         });
        
// // // // // //         voiceService.registerCommand("minus", () => {
// // // // // //           console.log("Minus command received");
// // // // // //           setSpokenText("minus");
// // // // // //           handleOperation('subtract');
// // // // // //         });
        
// // // // // //         voiceService.registerCommand("subtract", () => {
// // // // // //           console.log("Subtract command received");
// // // // // //           setSpokenText("subtract");
// // // // // //           handleOperation('subtract');
// // // // // //         });
        
// // // // // //         voiceService.registerCommand("multiply", () => {
// // // // // //           console.log("Multiply command received");
// // // // // //           setSpokenText("multiply");
// // // // // //           handleOperation('multiply');
// // // // // //         });
        
// // // // // //         voiceService.registerCommand("times", () => {
// // // // // //           console.log("Times command received");
// // // // // //           setSpokenText("times");
// // // // // //           handleOperation('multiply');
// // // // // //         });
        
// // // // // //         voiceService.registerCommand("divide", () => {
// // // // // //           console.log("Divide command received");
// // // // // //           setSpokenText("divide");
// // // // // //           handleOperation('divide');
// // // // // //         });
        
// // // // // //         voiceService.registerCommand("over", () => {
// // // // // //           console.log("Over command received");
// // // // // //           setSpokenText("over");
// // // // // //           handleOperation('divide');
// // // // // //         });
        
// // // // // //         voiceService.registerCommand("power", () => {
// // // // // //           console.log("Power command received");
// // // // // //           setSpokenText("power");
// // // // // //           handleOperation('power');
// // // // // //         });
        
// // // // // //         voiceService.registerCommand("to the power", () => {
// // // // // //           console.log("To the power command received");
// // // // // //           setSpokenText("to the power");
// // // // // //           handleOperation('power');
// // // // // //         });
        
// // // // // //         voiceService.registerCommand("percent", () => {
// // // // // //           console.log("Percent command received");
// // // // // //           setSpokenText("percent");
// // // // // //           handlePercentage();
// // // // // //         });
        
// // // // // //         voiceService.registerCommand("percentage", () => {
// // // // // //           console.log("Percentage command received");
// // // // // //           setSpokenText("percentage");
// // // // // //           handlePercentage();
// // // // // //         });
        
// // // // // //         voiceService.registerCommand("square root", () => {
// // // // // //           console.log("Square root command received");
// // // // // //           setSpokenText("square root");
// // // // // //           handleSquareRoot();
// // // // // //         });
        
// // // // // //         voiceService.registerCommand("squareroot", () => {
// // // // // //           console.log("Squareroot command received");
// // // // // //           setSpokenText("squareroot");
// // // // // //           handleSquareRoot();
// // // // // //         });
        
// // // // // //         voiceService.registerCommand("root", () => {
// // // // // //           console.log("Root command received");
// // // // // //           setSpokenText("root");
// // // // // //           handleSquareRoot();
// // // // // //         });
        
// // // // // //         voiceService.registerCommand("sqrt", () => {
// // // // // //           console.log("Sqrt command received");
// // // // // //           setSpokenText("sqrt");
// // // // // //           handleSquareRoot();
// // // // // //         });
        
// // // // // //         // Toggle sign
// // // // // //         voiceService.registerCommand("negative", () => {
// // // // // //           console.log("Negative command received");
// // // // // //           setSpokenText("negative");
// // // // // //           handleToggleSign();
// // // // // //         });
        
// // // // // //         voiceService.registerCommand("change sign", () => {
// // // // // //           console.log("Change sign command received");
// // // // // //           setSpokenText("change sign");
// // // // // //           handleToggleSign();
// // // // // //         });
        
// // // // // //         voiceService.registerCommand("toggle sign", () => {
// // // // // //           console.log("Toggle sign command received");
// // // // // //           setSpokenText("toggle sign");
// // // // // //           handleToggleSign();
// // // // // //         });
        
// // // // // //         // Voice control
// // // // // //         voiceService.registerCommand("voice on", () => {
// // // // // //           console.log("Voice on command received");
// // // // // //           setSpokenText("voice on");
// // // // // //           if (!isSpeaking) {
// // // // // //             toggleSpeech();
// // // // // //           }
// // // // // //         });
        
// // // // // //         voiceService.registerCommand("voice off", () => {
// // // // // //           console.log("Voice off command received");
// // // // // //           setSpokenText("voice off");
// // // // // //           if (isSpeaking) {
// // // // // //             toggleSpeech();
// // // // // //           }
// // // // // //         });
        
// // // // // //         voiceService.registerCommand("toggle voice", () => {
// // // // // //           console.log("Toggle voice command received");
// // // // // //           setSpokenText("toggle voice");
// // // // // //           toggleSpeech();
// // // // // //         });
        
// // // // // //         voiceService.registerCommand("speak", () => {
// // // // // //           console.log("Speak command received");
// // // // // //           setSpokenText("speak");
// // // // // //           speak(`Current value is ${currentDisplay}`);
// // // // // //         });
        
// // // // // //         voiceService.registerCommand("speak result", () => {
// // // // // //           console.log("Speak result command received");
// // // // // //           setSpokenText("speak result");
// // // // // //           speak(`Current display shows ${currentDisplay}`);
// // // // // //         });
        
// // // // // //         // Help command
// // // // // //         voiceService.registerCommand("help", () => {
// // // // // //           console.log("Help command received");
// // // // // //           setSpokenText("help");
// // // // // //           const helpText = "I can help with calculator operations. Say numbers like 'one', 'two', 'three'. " +
// // // // // //             "Say operations like 'plus', 'minus', 'multiply', 'divide'. " +
// // // // // //             "Say 'equals' or 'calculate' to get the result. " +
// // // // // //             "Say 'clear' to reset. Say 'percent' for percentage. " +
// // // // // //             "Say 'square root' for square root. Say 'voice on' or 'voice off' to control voice feedback. " +
// // // // // //             "Say 'dashboard' to go back to main menu.";
// // // // // //           speak(helpText);
// // // // // //         });
        
// // // // // //         voiceService.registerCommand("calculator help", () => {
// // // // // //           console.log("Calculator help command received");
// // // // // //           setSpokenText("calculator help");
// // // // // //           speak("You can say numbers, operations like plus, minus, multiply, divide, and commands like equals, clear, percent, square root, and dashboard to go back.");
// // // // // //         });
        
// // // // // //         // What can you do command
// // // // // //         voiceService.registerCommand("what can you do", () => {
// // // // // //           console.log("What can you do command received");
// // // // // //           setSpokenText("what can you do");
// // // // // //           speak("I am a talking calculator. I can perform basic math operations like addition, subtraction, multiplication, division, percentages, and square roots. You can control me with your voice or use the buttons on screen.");
// // // // // //         });
        
// // // // // //         // Logout command
// // // // // //         voiceService.registerCommand("logout", () => {
// // // // // //           console.log("Logout command received");
// // // // // //           setSpokenText("logout");
// // // // // //           handleLogout();
// // // // // //         });
        
// // // // // //         // Handle unmatched commands
// // // // // //         voiceService.onResultCallback = (transcript) => {
// // // // // //           console.log("Calculator voice input:", transcript);
// // // // // //           setSpokenText(transcript);
          
// // // // // //           const cleanTranscript = transcript.toLowerCase().trim();
          
// // // // // //           // Try to process unmatched commands
// // // // // //           if (cleanTranscript.includes("help")) {
// // // // // //             voiceService.commands.help();
// // // // // //           } else if (cleanTranscript.includes("dashboard") || cleanTranscript.includes("home")) {
// // // // // //             voiceService.commands.dashboard();
// // // // // //           } else if (cleanTranscript.includes("clear")) {
// // // // // //             voiceService.commands.clear();
// // // // // //           } else if (cleanTranscript.includes("equals") || cleanTranscript.includes("calculate")) {
// // // // // //             voiceService.commands.calculate();
// // // // // //           }
// // // // // //         };
        
// // // // // //         // Start listening
// // // // // //         if (isSpeaking) {
// // // // // //           voiceService.startListening();
// // // // // //           setStatus("Voice commands ready");
// // // // // //           speak("Calculator voice commands activated. Say 'help' for commands.");
// // // // // //         }
        
// // // // // //         commandsRegisteredRef.current = true;
// // // // // //         console.log("Voice commands registered successfully");
        
// // // // // //       } catch (error) {
// // // // // //         console.error("Error registering voice commands:", error);
// // // // // //         setStatus("Error setting up voice commands");
// // // // // //       }
// // // // // //     };

// // // // // //     initializeVoiceCommands();

// // // // // //     // Clean up on unmount
// // // // // //     return () => {
// // // // // //       if (voiceService.isListening) {
// // // // // //         voiceService.stopListening();
// // // // // //       }
// // // // // //       voiceService.clearCommands();
// // // // // //     };
// // // // // //   }, [navigate, isSpeaking, handleCalculate, handleClear, handleClearEntry, handleNumberInput, handleDecimal, handleOperation, handlePercentage, handleSquareRoot, handleToggleSign, toggleSpeech, speak, currentDisplay]);

// // // // // //   // Handle keyboard input
// // // // // //   useEffect(() => {
// // // // // //     const handleKeyDown = (e) => {
// // // // // //       const key = e.key;
      
// // // // // //       if (key >= '0' && key <= '9') {
// // // // // //         handleNumberInput(key);
// // // // // //       } else if (key === '.') {
// // // // // //         handleDecimal();
// // // // // //       } else if (key === '+') {
// // // // // //         handleOperation('add');
// // // // // //       } else if (key === '-') {
// // // // // //         handleOperation('subtract');
// // // // // //       } else if (key === '*') {
// // // // // //         handleOperation('multiply');
// // // // // //       } else if (key === '/') {
// // // // // //         e.preventDefault();
// // // // // //         handleOperation('divide');
// // // // // //       } else if (key === 'Enter' || key === '=') {
// // // // // //         handleCalculate();
// // // // // //       } else if (key === 'Escape' || key === 'Delete') {
// // // // // //         handleClear();
// // // // // //       } else if (key === 'Backspace') {
// // // // // //         handleClearEntry();
// // // // // //       } else if (key === '%') {
// // // // // //         handlePercentage();
// // // // // //       } else if (key === '^') {
// // // // // //         handleOperation('power');
// // // // // //       } else if (key === 'r' || key === 'R') {
// // // // // //         handleSquareRoot();
// // // // // //       }
// // // // // //     };

// // // // // //     window.addEventListener('keydown', handleKeyDown);
// // // // // //     return () => window.removeEventListener('keydown', handleKeyDown);
// // // // // //   }, [handleNumberInput, handleDecimal, handleOperation, handleCalculate, handleClear, handleClearEntry, handlePercentage, handleSquareRoot]);

// // // // // //   // Handle logout
// // // // // //   const handleLogout = async () => {
// // // // // //     setStatus("Logging out...");
// // // // // //     speak("Logging out...");
    
// // // // // //     // Stop voice service
// // // // // //     if (voiceService.isListening) {
// // // // // //       voiceService.stopListening();
// // // // // //     }
    
// // // // // //     // Clear local storage
// // // // // //     localStorage.clear();
    
// // // // // //     // Navigate to login
// // // // // //     setTimeout(() => navigate("/"), 1500);
// // // // // //   };

// // // // // //   const handleBackToDashboard = () => {
// // // // // //     navigate("/dashboard");
// // // // // //   };

// // // // // //   // Current expression for display
// // // // // //   const currentExpression = currentOperation && previousValue !== null
// // // // // //     ? `${previousValue} ${operationSymbols[currentOperation] || currentOperation} ${waitingForNewValue ? '' : currentDisplay}`
// // // // // //     : '';

// // // // // //   return (
// // // // // //     <div className="talking-calculator-container">
// // // // // //       {/* Fixed Header */}
// // // // // //       <header className="dashboard-header fixed-header">
// // // // // //         <div className="header-content">
// // // // // //           <div className="header-left">
// // // // // //             <button className="back-btn" onClick={handleBackToDashboard}>
// // // // // //               ← Dashboard
// // // // // //             </button>
// // // // // //             <h1 className="logo">Vision Assist</h1>
// // // // // //           </div>
          
// // // // // //           {/* Spoken Text Display */}
// // // // // //           <div className="header-center">
// // // // // //             {spokenText && (
// // // // // //               <div className="spoken-text-display">
// // // // // //                 <span className="spoken-label">🎤 Heard:</span> <strong>{spokenText}</strong>
// // // // // //               </div>
// // // // // //             )}
// // // // // //           </div>
          
// // // // // //           <div className="user-menu">
// // // // // //             <button className="logout-btn" onClick={handleLogout}>
// // // // // //               Logout
// // // // // //             </button>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </header>

// // // // // //       <div className="calculator-content">
// // // // // //         <div className="calculator-header">
// // // // // //           <h2>🧮 Talking Calculator</h2>
// // // // // //           <p>Voice and keyboard supported calculator</p>
// // // // // //         </div>

// // // // // //         {/* Status Message */}
// // // // // //         {status && (
// // // // // //           <div className="status-message">
// // // // // //             {status}
// // // // // //           </div>
// // // // // //         )}

// // // // // //         {/* Main Layout */}
// // // // // //         <div className="calculator-main-layout">
// // // // // //           {/* Left Column: Calculator and Controls */}
// // // // // //           <div className="calculator-left-column">
// // // // // //             {/* Display Section */}
// // // // // //             <div className="calculator-display-section compact">
// // // // // //               <div className="expression-display">
// // // // // //                 {currentExpression || 'Ready for calculation'}
// // // // // //               </div>
// // // // // //               <div className="result-display">
// // // // // //                 {currentDisplay}
// // // // // //               </div>
// // // // // //             </div>

// // // // // //             {/* Voice Controls */}
// // // // // //             <div className="voice-controls-section compact">
// // // // // //               <div className="voice-controls-header">
// // // // // //                 <span>Voice Controls</span>
// // // // // //                 <button 
// // // // // //                   className={`voice-toggle-btn ${isSpeaking ? 'active' : ''}`}
// // // // // //                   onClick={toggleSpeech}
// // // // // //                 >
// // // // // //                   {isSpeaking ? '🔊 Voice ON' : '🔈 Voice OFF'}
// // // // // //                 </button>
// // // // // //               </div>
// // // // // //               <div className="voice-buttons">
// // // // // //                 <button 
// // // // // //                   className="voice-command-btn"
// // // // // //                   onClick={() => speak(`Current value is ${currentDisplay}`)}
// // // // // //                 >
// // // // // //                   Speak Current Value
// // // // // //                 </button>
// // // // // //                 <button 
// // // // // //                   className="voice-command-btn"
// // // // // //                   onClick={() => speak("Say numbers like 'one', operations like 'plus', or 'help' for commands")}
// // // // // //                 >
// // // // // //                   Voice Help
// // // // // //                 </button>
// // // // // //               </div>
// // // // // //             </div>

// // // // // //             {/* Calculator Buttons */}
// // // // // //             <div className="calculator-buttons-section compact">
// // // // // //               <div className="calculator-buttons-grid">
// // // // // //                 {/* First Row */}
// // // // // //                 <div className="button-row compact">
// // // // // //                   <button className="btn-clear compact" onClick={handleClear}>C</button>
// // // // // //                   <button className="btn-clear-entry compact" onClick={handleClearEntry}>CE</button>
// // // // // //                   <button className="btn-operation compact" onClick={handlePercentage}>%</button>
// // // // // //                   <button className="btn-operation compact" onClick={handleSquareRoot}>√</button>
// // // // // //                   <button className="btn-operation compact" onClick={() => handleOperation('power')}>x^y</button>
// // // // // //                   <button className="btn-operation compact" onClick={() => handleOperation('divide')}>÷</button>
// // // // // //                 </div>

// // // // // //                 {/* Number Rows */}
// // // // // //                 <div className="button-row compact">
// // // // // //                   <button className="btn-number compact" onClick={() => handleNumberInput('7')}>7</button>
// // // // // //                   <button className="btn-number compact" onClick={() => handleNumberInput('8')}>8</button>
// // // // // //                   <button className="btn-number compact" onClick={() => handleNumberInput('9')}>9</button>
// // // // // //                   <button className="btn-operation compact" onClick={() => handleOperation('multiply')}>×</button>
// // // // // //                 </div>

// // // // // //                 <div className="button-row compact">
// // // // // //                   <button className="btn-number compact" onClick={() => handleNumberInput('4')}>4</button>
// // // // // //                   <button className="btn-number compact" onClick={() => handleNumberInput('5')}>5</button>
// // // // // //                   <button className="btn-number compact" onClick={() => handleNumberInput('6')}>6</button>
// // // // // //                   <button className="btn-operation compact" onClick={() => handleOperation('subtract')}>−</button>
// // // // // //                 </div>

// // // // // //                 <div className="button-row compact">
// // // // // //                   <button className="btn-number compact" onClick={() => handleNumberInput('1')}>1</button>
// // // // // //                   <button className="btn-number compact" onClick={() => handleNumberInput('2')}>2</button>
// // // // // //                   <button className="btn-number compact" onClick={() => handleNumberInput('3')}>3</button>
// // // // // //                   <button className="btn-operation compact" onClick={() => handleOperation('add')}>+</button>
// // // // // //                 </div>

// // // // // //                 {/* Last Row */}
// // // // // //                 <div className="button-row compact">
// // // // // //                   <button className="btn-number compact" onClick={handleToggleSign}>±</button>
// // // // // //                   <button className="btn-number compact" onClick={() => handleNumberInput('0')}>0</button>
// // // // // //                   <button className="btn-number compact" onClick={handleDecimal}>.</button>
// // // // // //                   <button className="btn-equals compact" onClick={handleCalculate}>=</button>
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           </div>

// // // // // //           {/* Right Column: History and Shortcuts */}
// // // // // //           <div className="calculator-right-column">
// // // // // //             {/* Calculation History */}
// // // // // //             <div className="calculator-history-section compact">
// // // // // //               <div className="section-header">
// // // // // //                 <h3>History ({calculationHistory.length})</h3>
// // // // // //                 {calculationHistory.length > 0 && (
// // // // // //                   <button className="clear-history-btn" onClick={() => setCalculationHistory([])}>
// // // // // //                     Clear
// // // // // //                   </button>
// // // // // //                 )}
// // // // // //               </div>
              
// // // // // //               {calculationHistory.length === 0 ? (
// // // // // //                 <div className="empty-state compact">
// // // // // //                   <p>No calculations yet</p>
// // // // // //                 </div>
// // // // // //               ) : (
// // // // // //                 <div className="history-list compact">
// // // // // //                   {calculationHistory.map((item, index) => (
// // // // // //                     <div key={index} className="history-item compact">
// // // // // //                       <div className="history-expression">{item.expression}</div>
// // // // // //                       <div className="history-result">= {formatNumber(item.result)}</div>
// // // // // //                       <div className="history-time">{item.timestamp}</div>
// // // // // //                     </div>
// // // // // //                   ))}
// // // // // //                 </div>
// // // // // //               )}
// // // // // //             </div>

// // // // // //             {/* Voice Commands Guide */}
// // // // // //             <div className="keyboard-shortcuts-section compact">
// // // // // //               <h3>Voice Commands Guide</h3>
// // // // // //               <div className="shortcuts-grid compact">
// // // // // //                 <div className="shortcut-item compact">
// // // // // //                   <span className="shortcut-key">Numbers</span>
// // // // // //                   <span className="shortcut-description">"one", "two", "three"</span>
// // // // // //                 </div>
// // // // // //                 <div className="shortcut-item compact">
// // // // // //                   <span className="shortcut-key">+ - × ÷</span>
// // // // // //                   <span className="shortcut-description">"plus", "minus"</span>
// // // // // //                 </div>
// // // // // //                 <div className="shortcut-item compact">
// // // // // //                   <span className="shortcut-key">Calculate</span>
// // // // // //                   <span className="shortcut-description">"equals", "calculate"</span>
// // // // // //                 </div>
// // // // // //                 <div className="shortcut-item compact">
// // // // // //                   <span className="shortcut-key">Clear</span>
// // // // // //                   <span className="shortcut-description">"clear", "reset"</span>
// // // // // //                 </div>
// // // // // //                 <div className="shortcut-item compact">
// // // // // //                   <span className="shortcut-key">% √</span>
// // // // // //                   <span className="shortcut-description">"percent", "root"</span>
// // // // // //                 </div>
// // // // // //                 <div className="shortcut-item compact">
// // // // // //                   <span className="shortcut-key">Voice</span>
// // // // // //                   <span className="shortcut-description">"voice on/off"</span>
// // // // // //                 </div>
// // // // // //                 <div className="shortcut-item compact">
// // // // // //                   <span className="shortcut-key">Help</span>
// // // // // //                   <span className="shortcut-description">"help", "calculator help"</span>
// // // // // //                 </div>
// // // // // //                 <div className="shortcut-item compact">
// // // // // //                   <span className="shortcut-key">Back</span>
// // // // // //                   <span className="shortcut-description">"dashboard", "back"</span>
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       {/* Status Bar */}
// // // // // //       <div className="status-bar">
// // // // // //         <p>{status}</p>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default TalkingCalculator;


// // // // // import React, { useState, useEffect, useCallback, useRef } from 'react';
// // // // // import { useNavigate } from 'react-router-dom';
// // // // // import { voiceService } from '../../services/voiceService';
// // // // // import './TalkingCalculator.css';

// // // // // const TalkingCalculator = () => {
// // // // //   const navigate = useNavigate();
  
// // // // //   // Calculator state
// // // // //   const [currentDisplay, setCurrentDisplay] = useState('0');
// // // // //   const [previousValue, setPreviousValue] = useState(null);
// // // // //   const [currentOperation, setCurrentOperation] = useState(null);
// // // // //   const [waitingForNewValue, setWaitingForNewValue] = useState(false);
// // // // //   const [calculationHistory, setCalculationHistory] = useState([]);
// // // // //   const [isSpeaking, setIsSpeaking] = useState(true);
// // // // //   const [status, setStatus] = useState("Talking Calculator is ready");
// // // // //   const [spokenText, setSpokenText] = useState("");
  
// // // // //   // Refs
// // // // //   const commandsRegisteredRef = useRef(false);

// // // // //   // Mathematical operations
// // // // //   const mathOperations = {
// // // // //     add: (a, b) => a + b,
// // // // //     subtract: (a, b) => a - b,
// // // // //     multiply: (a, b) => a * b,
// // // // //     divide: (a, b) => {
// // // // //       if (b === 0) throw new Error("Cannot divide by zero");
// // // // //       return a / b;
// // // // //     },
// // // // //     power: (a, b) => Math.pow(a, b),
// // // // //     percentage: (a, b) => (a * b) / 100,
// // // // //     squareRoot: (a) => Math.sqrt(a)
// // // // //   };

// // // // //   // Operation symbols for display
// // // // //   const operationSymbols = {
// // // // //     add: '+',
// // // // //     subtract: '−',
// // // // //     multiply: '×',
// // // // //     divide: '÷',
// // // // //     power: '^',
// // // // //     percentage: '%',
// // // // //     squareRoot: '√'
// // // // //   };

// // // // //   // Speak function
// // // // //   const speak = useCallback((text) => {
// // // // //     if (!isSpeaking) return;
    
// // // // //     const synth = window.speechSynthesis;
// // // // //     if (!synth) return;
    
// // // // //     synth.cancel();
    
// // // // //     const utter = new SpeechSynthesisUtterance(text);
// // // // //     utter.rate = 0.9;
// // // // //     utter.pitch = 1;
// // // // //     utter.volume = 1;
    
// // // // //     if (voiceService.isListening) {
// // // // //       voiceService.stopListening();
// // // // //     }
    
// // // // //     utter.onstart = () => {
// // // // //       console.log("Started speaking:", text);
// // // // //     };
    
// // // // //     utter.onend = () => {
// // // // //       console.log("Finished speaking");
// // // // //       setTimeout(() => {
// // // // //         if (isSpeaking) {
// // // // //           voiceService.startListening();
// // // // //         }
// // // // //       }, 300);
// // // // //     };
    
// // // // //     utter.onerror = (err) => {
// // // // //       console.error("Speech error:", err);
// // // // //       setTimeout(() => {
// // // // //         if (isSpeaking) {
// // // // //           voiceService.startListening();
// // // // //         }
// // // // //       }, 300);
// // // // //     };
    
// // // // //     synth.speak(utter);
// // // // //   }, [isSpeaking]);

// // // // //   // Format number for display
// // // // //   const formatNumber = useCallback((num) => {
// // // // //     if (num === null || num === undefined) return '0';
// // // // //     if (typeof num !== 'number') return num;
    
// // // // //     const numStr = num.toString();
// // // // //     if (numStr.length > 10) {
// // // // //       if (Math.abs(num) > 1e10) {
// // // // //         return num.toExponential(5);
// // // // //       }
// // // // //       return parseFloat(num.toFixed(8)).toString();
// // // // //     }
// // // // //     return numStr;
// // // // //   }, []);

// // // // //   // Handle number input
// // // // //   const handleNumberInput = useCallback((number) => {
// // // // //     console.log("Handling number input:", number);
    
// // // // //     if (waitingForNewValue) {
// // // // //       setCurrentDisplay(number);
// // // // //       setWaitingForNewValue(false);
// // // // //     } else {
// // // // //       setCurrentDisplay(prev => 
// // // // //         prev === '0' || prev === 'Error' ? number : prev + number
// // // // //       );
// // // // //     }
    
// // // // //     speak(number);
// // // // //     setStatus(`Entered: ${number}`);
// // // // //   }, [waitingForNewValue, speak]);

// // // // //   // Handle decimal point
// // // // //   const handleDecimal = useCallback(() => {
// // // // //     console.log("Handling decimal");
    
// // // // //     if (waitingForNewValue) {
// // // // //       setCurrentDisplay('0.');
// // // // //       setWaitingForNewValue(false);
// // // // //     } else if (!currentDisplay.includes('.')) {
// // // // //       setCurrentDisplay(prev => prev + '.');
// // // // //     }
    
// // // // //     speak("point");
// // // // //     setStatus("Decimal point added");
// // // // //   }, [currentDisplay, waitingForNewValue, speak]);

// // // // //   // Handle calculation
// // // // //   const handleCalculate = useCallback(() => {
// // // // //     console.log("Handling calculate");
    
// // // // //     if (currentOperation === null || waitingForNewValue) {
// // // // //       setStatus("Nothing to calculate");
// // // // //       speak("Nothing to calculate");
// // // // //       return;
// // // // //     }

// // // // //     const prevVal = previousValue;
// // // // //     const currVal = parseFloat(currentDisplay);
    
// // // // //     try {
// // // // //       const operationFunction = mathOperations[currentOperation];
// // // // //       if (!operationFunction) {
// // // // //         throw new Error("Unknown operation");
// // // // //       }
      
// // // // //       let result;
// // // // //       if (currentOperation === 'squareRoot') {
// // // // //         result = operationFunction(currVal);
// // // // //       } else {
// // // // //         result = operationFunction(prevVal, currVal);
// // // // //       }
      
// // // // //       // Add to history
// // // // //       const historyEntry = {
// // // // //         expression: currentOperation === 'squareRoot' 
// // // // //           ? `√(${currVal})`
// // // // //           : `${prevVal} ${operationSymbols[currentOperation]} ${currVal}`,
// // // // //         result: result,
// // // // //         timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
// // // // //       };
      
// // // // //       setCalculationHistory(prev => [historyEntry, ...prev.slice(0, 9)]);
// // // // //       setCurrentDisplay(formatNumber(result));
// // // // //       setPreviousValue(null);
// // // // //       setCurrentOperation(null);
// // // // //       setWaitingForNewValue(true);
      
// // // // //       const resultText = formatNumber(result);
// // // // //       setStatus(`Result: ${resultText}`);
      
// // // // //       speak(`Result is ${resultText}`);
      
// // // // //     } catch (error) {
// // // // //       console.error("Calculation error:", error);
// // // // //       setCurrentDisplay('Error');
// // // // //       setStatus("Calculation error");
// // // // //       speak("Error in calculation");
// // // // //     }
// // // // //   }, [currentOperation, currentDisplay, previousValue, waitingForNewValue, formatNumber, speak]);

// // // // //   // Handle operation selection
// // // // //   const handleOperation = useCallback((operation) => {
// // // // //     console.log("Handling operation:", operation);
    
// // // // //     const inputValue = parseFloat(currentDisplay);
    
// // // // //     if (currentOperation !== null && !waitingForNewValue) {
// // // // //       // We need to call handleCalculate directly
// // // // //       const prevVal = previousValue;
// // // // //       const currVal = parseFloat(currentDisplay);
      
// // // // //       try {
// // // // //         const operationFunction = mathOperations[currentOperation];
// // // // //         if (operationFunction) {
// // // // //           let result;
// // // // //           if (currentOperation === 'squareRoot') {
// // // // //             result = operationFunction(currVal);
// // // // //           } else {
// // // // //             result = operationFunction(prevVal, currVal);
// // // // //           }
          
// // // // //           const historyEntry = {
// // // // //             expression: currentOperation === 'squareRoot' 
// // // // //               ? `√(${currVal})`
// // // // //               : `${prevVal} ${operationSymbols[currentOperation]} ${currVal}`,
// // // // //             result: result,
// // // // //             timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
// // // // //           };
          
// // // // //           setCalculationHistory(prev => [historyEntry, ...prev.slice(0, 9)]);
// // // // //           setCurrentDisplay(formatNumber(result));
// // // // //           setPreviousValue(result);
// // // // //           setWaitingForNewValue(true);
          
// // // // //           const resultText = formatNumber(result);
// // // // //           setStatus(`Result: ${resultText}`);
// // // // //           speak(`Result is ${resultText}`);
// // // // //         }
// // // // //       } catch (error) {
// // // // //         console.error("Calculation error:", error);
// // // // //         setCurrentDisplay('Error');
// // // // //         setStatus("Calculation error");
// // // // //         speak("Error in calculation");
// // // // //         setPreviousValue(inputValue);
// // // // //         setCurrentOperation(operation);
// // // // //         setWaitingForNewValue(true);
// // // // //         return;
// // // // //       }
// // // // //     } else {
// // // // //       setPreviousValue(inputValue);
// // // // //     }
    
// // // // //     setCurrentOperation(operation);
// // // // //     setWaitingForNewValue(true);
    
// // // // //     const operationNames = {
// // // // //       add: "plus",
// // // // //       subtract: "minus",
// // // // //       multiply: "multiply",
// // // // //       divide: "divide",
// // // // //       power: "power",
// // // // //       percentage: "percent",
// // // // //       squareRoot: "square root"
// // // // //     };
    
// // // // //     const operationText = operationNames[operation] || operation;
// // // // //     setStatus(`Operation: ${operationText}`);
// // // // //     speak(operationText);
// // // // //   }, [currentDisplay, currentOperation, waitingForNewValue, previousValue, formatNumber, speak]);

// // // // //   // Clear calculator
// // // // //   const handleClear = useCallback(() => {
// // // // //     console.log("Handling clear");
    
// // // // //     setCurrentDisplay('0');
// // // // //     setPreviousValue(null);
// // // // //     setCurrentOperation(null);
// // // // //     setWaitingForNewValue(false);
// // // // //     setStatus("Calculator cleared");
// // // // //     speak("Calculator cleared");
// // // // //   }, [speak]);

// // // // //   // Clear entry only
// // // // //   const handleClearEntry = useCallback(() => {
// // // // //     console.log("Handling clear entry");
    
// // // // //     setCurrentDisplay('0');
// // // // //     setStatus("Entry cleared");
// // // // //     speak("Entry cleared");
// // // // //   }, [speak]);

// // // // //   // Toggle sign
// // // // //   const handleToggleSign = useCallback(() => {
// // // // //     console.log("Handling toggle sign");
    
// // // // //     setCurrentDisplay(prev => formatNumber(-parseFloat(prev)));
// // // // //     setStatus("Sign toggled");
// // // // //     speak("Sign changed");
// // // // //   }, [formatNumber, speak]);

// // // // //   // Percentage
// // // // //   const handlePercentage = useCallback(() => {
// // // // //     console.log("Handling percentage");
    
// // // // //     const value = parseFloat(currentDisplay);
// // // // //     if (previousValue !== null && currentOperation) {
// // // // //       const result = (previousValue * value) / 100;
// // // // //       const historyEntry = {
// // // // //         expression: `${previousValue} × ${value}%`,
// // // // //         result: result,
// // // // //         timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
// // // // //       };
// // // // //       setCalculationHistory(prev => [historyEntry, ...prev.slice(0, 9)]);
// // // // //       setCurrentDisplay(formatNumber(result));
// // // // //       setWaitingForNewValue(true);
// // // // //       const resultText = formatNumber(result);
// // // // //       setStatus(`Percentage: ${resultText}`);
// // // // //       speak(`Result is ${resultText}`);
// // // // //     } else {
// // // // //       setCurrentDisplay(formatNumber(value / 100));
// // // // //       const resultText = formatNumber(value / 100);
// // // // //       setStatus(`Percentage: ${resultText}`);
// // // // //       speak(`Converted to percentage`);
// // // // //     }
// // // // //   }, [currentDisplay, previousValue, currentOperation, formatNumber, speak]);

// // // // //   // Square root
// // // // //   const handleSquareRoot = useCallback(() => {
// // // // //     console.log("Handling square root");
    
// // // // //     const value = parseFloat(currentDisplay);
// // // // //     if (value < 0) {
// // // // //       setCurrentDisplay('Error');
// // // // //       setStatus("Error: Cannot calculate square root of negative number");
// // // // //       speak("Cannot calculate square root of negative number");
// // // // //       return;
// // // // //     }
// // // // //     const result = Math.sqrt(value);
// // // // //     const historyEntry = {
// // // // //       expression: `√(${value})`,
// // // // //       result: result,
// // // // //       timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
// // // // //     };
// // // // //     setCalculationHistory(prev => [historyEntry, ...prev.slice(0, 9)]);
// // // // //     const resultText = formatNumber(result);
// // // // //     setCurrentDisplay(resultText);
// // // // //     setStatus(`Square root: ${resultText}`);
// // // // //     speak(`Square root is ${resultText}`);
// // // // //   }, [currentDisplay, formatNumber, speak]);

// // // // //   // Toggle speech
// // // // //   const toggleSpeech = useCallback(() => {
// // // // //     console.log("Toggling speech");
    
// // // // //     setIsSpeaking(prev => {
// // // // //       const newState = !prev;
// // // // //       setStatus(newState ? "Voice feedback enabled" : "Voice feedback disabled");
      
// // // // //       if (newState) {
// // // // //         if (voiceService.isAvailable()) {
// // // // //           voiceService.startListening();
// // // // //         }
// // // // //         speak("Voice feedback enabled");
// // // // //       } else {
// // // // //         if (voiceService.isListening) {
// // // // //           voiceService.stopListening();
// // // // //         }
// // // // //         speak("Voice feedback disabled");
// // // // //       }
      
// // // // //       return newState;
// // // // //     });
// // // // //   }, [speak]);

// // // // //   // Initialize voice commands
// // // // //   useEffect(() => {
// // // // //     const initializeVoiceCommands = () => {
// // // // //       if (!voiceService.isAvailable()) {
// // // // //         console.log("Voice service not available");
// // // // //         setStatus("Voice service not available");
// // // // //         return;
// // // // //       }

// // // // //       try {
// // // // //         // Clear any existing commands
// // // // //         voiceService.clearCommands();
        
// // // // //         console.log("Registering calculator voice commands");
        
// // // // //         // Define command handlers
// // // // //         const commandHandlers = {
// // // // //           // Navigation commands
// // // // //           dashboard: () => {
// // // // //             console.log("Dashboard command received");
// // // // //             setSpokenText("dashboard");
// // // // //             speak("Going to dashboard");
// // // // //             setTimeout(() => navigate("/dashboard"), 500);
// // // // //           },
// // // // //           home: () => {
// // // // //             console.log("Home command received");
// // // // //             setSpokenText("home");
// // // // //             speak("Going to dashboard");
// // // // //             setTimeout(() => navigate("/dashboard"), 500);
// // // // //           },
// // // // //           back: () => {
// // // // //             console.log("Back command received");
// // // // //             setSpokenText("back");
// // // // //             speak("Going back to dashboard");
// // // // //             setTimeout(() => navigate("/dashboard"), 500);
// // // // //           },
// // // // //           'go back': () => {
// // // // //             console.log("Go back command received");
// // // // //             setSpokenText("go back");
// // // // //             speak("Going back to dashboard");
// // // // //             setTimeout(() => navigate("/dashboard"), 500);
// // // // //           },
          
// // // // //           // Calculator commands
// // // // //           calculate: () => {
// // // // //             console.log("Calculate command received");
// // // // //             setSpokenText("calculate");
// // // // //             handleCalculate();
// // // // //           },
// // // // //           equals: () => {
// // // // //             console.log("Equals command received");
// // // // //             setSpokenText("equals");
// // // // //             handleCalculate();
// // // // //           },
// // // // //           equal: () => {
// // // // //             console.log("Equal command received");
// // // // //             setSpokenText("equal");
// // // // //             handleCalculate();
// // // // //           },
// // // // //           clear: () => {
// // // // //             console.log("Clear command received");
// // // // //             setSpokenText("clear");
// // // // //             handleClear();
// // // // //           },
// // // // //           'clear all': () => {
// // // // //             console.log("Clear all command received");
// // // // //             setSpokenText("clear all");
// // // // //             handleClear();
// // // // //           },
// // // // //           reset: () => {
// // // // //             console.log("Reset command received");
// // // // //             setSpokenText("reset");
// // // // //             handleClear();
// // // // //           },
// // // // //           'clear entry': () => {
// // // // //             console.log("Clear entry command received");
// // // // //             setSpokenText("clear entry");
// // // // //             handleClearEntry();
// // // // //           },
          
// // // // //           // Operation commands
// // // // //           plus: () => {
// // // // //             console.log("Plus command received");
// // // // //             setSpokenText("plus");
// // // // //             handleOperation('add');
// // // // //           },
// // // // //           add: () => {
// // // // //             console.log("Add command received");
// // // // //             setSpokenText("add");
// // // // //             handleOperation('add');
// // // // //           },
// // // // //           minus: () => {
// // // // //             console.log("Minus command received");
// // // // //             setSpokenText("minus");
// // // // //             handleOperation('subtract');
// // // // //           },
// // // // //           subtract: () => {
// // // // //             console.log("Subtract command received");
// // // // //             setSpokenText("subtract");
// // // // //             handleOperation('subtract');
// // // // //           },
// // // // //           multiply: () => {
// // // // //             console.log("Multiply command received");
// // // // //             setSpokenText("multiply");
// // // // //             handleOperation('multiply');
// // // // //           },
// // // // //           times: () => {
// // // // //             console.log("Times command received");
// // // // //             setSpokenText("times");
// // // // //             handleOperation('multiply');
// // // // //           },
// // // // //           divide: () => {
// // // // //             console.log("Divide command received");
// // // // //             setSpokenText("divide");
// // // // //             handleOperation('divide');
// // // // //           },
// // // // //           over: () => {
// // // // //             console.log("Over command received");
// // // // //             setSpokenText("over");
// // // // //             handleOperation('divide');
// // // // //           },
// // // // //           power: () => {
// // // // //             console.log("Power command received");
// // // // //             setSpokenText("power");
// // // // //             handleOperation('power');
// // // // //           },
// // // // //           'to the power': () => {
// // // // //             console.log("To the power command received");
// // // // //             setSpokenText("to the power");
// // // // //             handleOperation('power');
// // // // //           },
// // // // //           percent: () => {
// // // // //             console.log("Percent command received");
// // // // //             setSpokenText("percent");
// // // // //             handlePercentage();
// // // // //           },
// // // // //           percentage: () => {
// // // // //             console.log("Percentage command received");
// // // // //             setSpokenText("percentage");
// // // // //             handlePercentage();
// // // // //           },
// // // // //           'square root': () => {
// // // // //             console.log("Square root command received");
// // // // //             setSpokenText("square root");
// // // // //             handleSquareRoot();
// // // // //           },
// // // // //           squareroot: () => {
// // // // //             console.log("Squareroot command received");
// // // // //             setSpokenText("squareroot");
// // // // //             handleSquareRoot();
// // // // //           },
// // // // //           root: () => {
// // // // //             console.log("Root command received");
// // // // //             setSpokenText("root");
// // // // //             handleSquareRoot();
// // // // //           },
// // // // //           sqrt: () => {
// // // // //             console.log("Sqrt command received");
// // // // //             setSpokenText("sqrt");
// // // // //             handleSquareRoot();
// // // // //           },
          
// // // // //           // Toggle sign
// // // // //           negative: () => {
// // // // //             console.log("Negative command received");
// // // // //             setSpokenText("negative");
// // // // //             handleToggleSign();
// // // // //           },
// // // // //           'change sign': () => {
// // // // //             console.log("Change sign command received");
// // // // //             setSpokenText("change sign");
// // // // //             handleToggleSign();
// // // // //           },
// // // // //           'toggle sign': () => {
// // // // //             console.log("Toggle sign command received");
// // // // //             setSpokenText("toggle sign");
// // // // //             handleToggleSign();
// // // // //           },
          
// // // // //           // Voice control
// // // // //           'voice on': () => {
// // // // //             console.log("Voice on command received");
// // // // //             setSpokenText("voice on");
// // // // //             if (!isSpeaking) {
// // // // //               toggleSpeech();
// // // // //             }
// // // // //           },
// // // // //           'voice off': () => {
// // // // //             console.log("Voice off command received");
// // // // //             setSpokenText("voice off");
// // // // //             if (isSpeaking) {
// // // // //               toggleSpeech();
// // // // //             }
// // // // //           },
// // // // //           'toggle voice': () => {
// // // // //             console.log("Toggle voice command received");
// // // // //             setSpokenText("toggle voice");
// // // // //             toggleSpeech();
// // // // //           },
// // // // //           speak: () => {
// // // // //             console.log("Speak command received");
// // // // //             setSpokenText("speak");
// // // // //             speak(`Current value is ${currentDisplay}`);
// // // // //           },
// // // // //           'speak result': () => {
// // // // //             console.log("Speak result command received");
// // // // //             setSpokenText("speak result");
// // // // //             speak(`Current display shows ${currentDisplay}`);
// // // // //           },
          
// // // // //           // Help command
// // // // //           help: () => {
// // // // //             console.log("Help command received");
// // // // //             setSpokenText("help");
// // // // //             const helpText = "I can help with calculator operations. Say numbers like 'one', 'two', 'three'. " +
// // // // //               "Say operations like 'plus', 'minus', 'multiply', 'divide'. " +
// // // // //               "Say 'equals' or 'calculate' to get the result. " +
// // // // //               "Say 'clear' to reset. Say 'percent' for percentage. " +
// // // // //               "Say 'square root' for square root. Say 'voice on' or 'voice off' to control voice feedback. " +
// // // // //               "Say 'dashboard' to go back to main menu.";
// // // // //             speak(helpText);
// // // // //           },
// // // // //           'calculator help': () => {
// // // // //             console.log("Calculator help command received");
// // // // //             setSpokenText("calculator help");
// // // // //             speak("You can say numbers, operations like plus, minus, multiply, divide, and commands like equals, clear, percent, square root, and dashboard to go back.");
// // // // //           },
          
// // // // //           // What can you do command
// // // // //           'what can you do': () => {
// // // // //             console.log("What can you do command received");
// // // // //             setSpokenText("what can you do");
// // // // //             speak("I am a talking calculator. I can perform basic math operations like addition, subtraction, multiplication, division, percentages, and square roots. You can control me with your voice or use the buttons on screen.");
// // // // //           },
          
// // // // //           // Logout command
// // // // //           logout: () => {
// // // // //             console.log("Logout command received");
// // // // //             setSpokenText("logout");
// // // // //             handleLogout();
// // // // //           }
// // // // //         };

// // // // //         // Register number commands (0-9)
// // // // //         for (let i = 0; i <= 9; i++) {
// // // // //           commandHandlers[i.toString()] = () => {
// // // // //             console.log(`${i} command received`);
// // // // //             setSpokenText(i.toString());
// // // // //             handleNumberInput(i.toString());
// // // // //           };
          
// // // // //           const numberWords = [
// // // // //             "zero", "one", "two", "three", "four", 
// // // // //             "five", "six", "seven", "eight", "nine"
// // // // //           ];
// // // // //           commandHandlers[numberWords[i]] = () => {
// // // // //             console.log(`${numberWords[i]} command received`);
// // // // //             setSpokenText(numberWords[i]);
// // // // //             handleNumberInput(i.toString());
// // // // //           };
// // // // //         }

// // // // //         // Register decimal commands
// // // // //         commandHandlers.point = () => {
// // // // //           console.log("Point command received");
// // // // //           setSpokenText("point");
// // // // //           handleDecimal();
// // // // //         };
// // // // //         commandHandlers.decimal = () => {
// // // // //           console.log("Decimal command received");
// // // // //           setSpokenText("decimal");
// // // // //           handleDecimal();
// // // // //         };
// // // // //         commandHandlers.dot = () => {
// // // // //           console.log("Dot command received");
// // // // //           setSpokenText("dot");
// // // // //           handleDecimal();
// // // // //         };

// // // // //         // Register all commands
// // // // //         Object.entries(commandHandlers).forEach(([command, handler]) => {
// // // // //           voiceService.registerCommand(command, handler);
// // // // //         });
        
// // // // //         // Handle unmatched commands
// // // // //         voiceService.onResultCallback = (transcript) => {
// // // // //           console.log("Calculator voice input:", transcript);
// // // // //           setSpokenText(transcript);
          
// // // // //           const cleanTranscript = transcript.toLowerCase().trim();
          
// // // // //           // Try to process unmatched commands
// // // // //           if (cleanTranscript.includes("help")) {
// // // // //             commandHandlers.help();
// // // // //           } else if (cleanTranscript.includes("dashboard") || cleanTranscript.includes("home")) {
// // // // //             commandHandlers.dashboard();
// // // // //           } else if (cleanTranscript.includes("clear")) {
// // // // //             commandHandlers.clear();
// // // // //           } else if (cleanTranscript.includes("equals") || cleanTranscript.includes("calculate")) {
// // // // //             commandHandlers.calculate();
// // // // //           }
// // // // //         };
        
// // // // //         // Start listening
// // // // //         if (isSpeaking) {
// // // // //           voiceService.startListening();
// // // // //           setStatus("Voice commands ready");
// // // // //           speak("Calculator voice commands activated. Say 'help' for commands.");
// // // // //         }
        
// // // // //         commandsRegisteredRef.current = true;
// // // // //         console.log("Voice commands registered successfully");
        
// // // // //       } catch (error) {
// // // // //         console.error("Error registering voice commands:", error);
// // // // //         setStatus("Error setting up voice commands");
// // // // //       }
// // // // //     };

// // // // //     initializeVoiceCommands();

// // // // //     // Clean up on unmount
// // // // //     return () => {
// // // // //       if (voiceService.isListening) {
// // // // //         voiceService.stopListening();
// // // // //       }
// // // // //       voiceService.clearCommands();
// // // // //     };
// // // // //   }, [navigate, isSpeaking, currentDisplay]); // Removed problematic dependencies

// // // // //   // Handle keyboard input
// // // // //   useEffect(() => {
// // // // //     const handleKeyDown = (e) => {
// // // // //       const key = e.key;
      
// // // // //       if (key >= '0' && key <= '9') {
// // // // //         handleNumberInput(key);
// // // // //       } else if (key === '.') {
// // // // //         handleDecimal();
// // // // //       } else if (key === '+') {
// // // // //         handleOperation('add');
// // // // //       } else if (key === '-') {
// // // // //         handleOperation('subtract');
// // // // //       } else if (key === '*') {
// // // // //         handleOperation('multiply');
// // // // //       } else if (key === '/') {
// // // // //         e.preventDefault();
// // // // //         handleOperation('divide');
// // // // //       } else if (key === 'Enter' || key === '=') {
// // // // //         handleCalculate();
// // // // //       } else if (key === 'Escape' || key === 'Delete') {
// // // // //         handleClear();
// // // // //       } else if (key === 'Backspace') {
// // // // //         handleClearEntry();
// // // // //       } else if (key === '%') {
// // // // //         handlePercentage();
// // // // //       } else if (key === '^') {
// // // // //         handleOperation('power');
// // // // //       } else if (key === 'r' || key === 'R') {
// // // // //         handleSquareRoot();
// // // // //       }
// // // // //     };

// // // // //     window.addEventListener('keydown', handleKeyDown);
// // // // //     return () => window.removeEventListener('keydown', handleKeyDown);
// // // // //   }, []); // Empty dependency array for keyboard listeners

// // // // //   // Handle logout
// // // // //   const handleLogout = async () => {
// // // // //     setStatus("Logging out...");
// // // // //     speak("Logging out...");
    
// // // // //     if (voiceService.isListening) {
// // // // //       voiceService.stopListening();
// // // // //     }
    
// // // // //     localStorage.clear();
    
// // // // //     setTimeout(() => navigate("/"), 1500);
// // // // //   };

// // // // //   const handleBackToDashboard = () => {
// // // // //     navigate("/dashboard");
// // // // //   };

// // // // //   // Current expression for display
// // // // //   const currentExpression = currentOperation && previousValue !== null
// // // // //     ? `${previousValue} ${operationSymbols[currentOperation] || currentOperation} ${waitingForNewValue ? '' : currentDisplay}`
// // // // //     : '';

// // // // //   return (
// // // // //     <div className="talking-calculator-container">
// // // // //       {/* Fixed Header */}
// // // // //       <header className="dashboard-header fixed-header">
// // // // //         <div className="header-content">
// // // // //           <div className="header-left">
// // // // //             <button className="back-btn" onClick={handleBackToDashboard}>
// // // // //               ← Dashboard
// // // // //             </button>
// // // // //             <h1 className="logo">Vision Assist</h1>
// // // // //           </div>
          
// // // // //           {/* Spoken Text Display */}
// // // // //           <div className="header-center">
// // // // //             {spokenText && (
// // // // //               <div className="spoken-text-display">
// // // // //                 <span className="spoken-label">🎤 Heard:</span> <strong>{spokenText}</strong>
// // // // //               </div>
// // // // //             )}
// // // // //           </div>
          
// // // // //           <div className="user-menu">
// // // // //             <button className="logout-btn" onClick={handleLogout}>
// // // // //               Logout
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>
// // // // //       </header>

// // // // //       <div className="calculator-content">
// // // // //         <div className="calculator-header">
// // // // //           <h2>🧮 Talking Calculator</h2>
// // // // //           <p>Voice and keyboard supported calculator</p>
// // // // //         </div>

// // // // //         {/* Status Message */}
// // // // //         {status && (
// // // // //           <div className="status-message">
// // // // //             {status}
// // // // //           </div>
// // // // //         )}

// // // // //         {/* Main Layout */}
// // // // //         <div className="calculator-main-layout">
// // // // //           {/* Left Column: Calculator and Controls */}
// // // // //           <div className="calculator-left-column">
// // // // //             {/* Display Section */}
// // // // //             <div className="calculator-display-section compact">
// // // // //               <div className="expression-display">
// // // // //                 {currentExpression || 'Ready for calculation'}
// // // // //               </div>
// // // // //               <div className="result-display">
// // // // //                 {currentDisplay}
// // // // //               </div>
// // // // //             </div>

// // // // //             {/* Voice Controls */}
// // // // //             <div className="voice-controls-section compact">
// // // // //               <div className="voice-controls-header">
// // // // //                 <span>Voice Controls</span>
// // // // //                 <button 
// // // // //                   className={`voice-toggle-btn ${isSpeaking ? 'active' : ''}`}
// // // // //                   onClick={toggleSpeech}
// // // // //                 >
// // // // //                   {isSpeaking ? '🔊 Voice ON' : '🔈 Voice OFF'}
// // // // //                 </button>
// // // // //               </div>
// // // // //               <div className="voice-buttons">
// // // // //                 <button 
// // // // //                   className="voice-command-btn"
// // // // //                   onClick={() => speak(`Current value is ${currentDisplay}`)}
// // // // //                 >
// // // // //                   Speak Current Value
// // // // //                 </button>
// // // // //                 <button 
// // // // //                   className="voice-command-btn"
// // // // //                   onClick={() => speak("Say numbers like 'one', operations like 'plus', or 'help' for commands")}
// // // // //                 >
// // // // //                   Voice Help
// // // // //                 </button>
// // // // //               </div>
// // // // //             </div>

// // // // //             {/* Calculator Buttons */}
// // // // //             <div className="calculator-buttons-section compact">
// // // // //               <div className="calculator-buttons-grid">
// // // // //                 {/* First Row */}
// // // // //                 <div className="button-row compact">
// // // // //                   <button className="btn-clear compact" onClick={handleClear}>C</button>
// // // // //                   <button className="btn-clear-entry compact" onClick={handleClearEntry}>CE</button>
// // // // //                   <button className="btn-operation compact" onClick={handlePercentage}>%</button>
// // // // //                   <button className="btn-operation compact" onClick={handleSquareRoot}>√</button>
// // // // //                   <button className="btn-operation compact" onClick={() => handleOperation('power')}>x^y</button>
// // // // //                   <button className="btn-operation compact" onClick={() => handleOperation('divide')}>÷</button>
// // // // //                 </div>

// // // // //                 {/* Number Rows */}
// // // // //                 <div className="button-row compact">
// // // // //                   <button className="btn-number compact" onClick={() => handleNumberInput('7')}>7</button>
// // // // //                   <button className="btn-number compact" onClick={() => handleNumberInput('8')}>8</button>
// // // // //                   <button className="btn-number compact" onClick={() => handleNumberInput('9')}>9</button>
// // // // //                   <button className="btn-operation compact" onClick={() => handleOperation('multiply')}>×</button>
// // // // //                 </div>

// // // // //                 <div className="button-row compact">
// // // // //                   <button className="btn-number compact" onClick={() => handleNumberInput('4')}>4</button>
// // // // //                   <button className="btn-number compact" onClick={() => handleNumberInput('5')}>5</button>
// // // // //                   <button className="btn-number compact" onClick={() => handleNumberInput('6')}>6</button>
// // // // //                   <button className="btn-operation compact" onClick={() => handleOperation('subtract')}>−</button>
// // // // //                 </div>

// // // // //                 <div className="button-row compact">
// // // // //                   <button className="btn-number compact" onClick={() => handleNumberInput('1')}>1</button>
// // // // //                   <button className="btn-number compact" onClick={() => handleNumberInput('2')}>2</button>
// // // // //                   <button className="btn-number compact" onClick={() => handleNumberInput('3')}>3</button>
// // // // //                   <button className="btn-operation compact" onClick={() => handleOperation('add')}>+</button>
// // // // //                 </div>

// // // // //                 {/* Last Row */}
// // // // //                 <div className="button-row compact">
// // // // //                   <button className="btn-number compact" onClick={handleToggleSign}>±</button>
// // // // //                   <button className="btn-number compact" onClick={() => handleNumberInput('0')}>0</button>
// // // // //                   <button className="btn-number compact" onClick={handleDecimal}>.</button>
// // // // //                   <button className="btn-equals compact" onClick={handleCalculate}>=</button>
// // // // //                 </div>
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>

// // // // //           {/* Right Column: History and Shortcuts */}
// // // // //           <div className="calculator-right-column">
// // // // //             {/* Calculation History */}
// // // // //             <div className="calculator-history-section compact">
// // // // //               <div className="section-header">
// // // // //                 <h3>History ({calculationHistory.length})</h3>
// // // // //                 {calculationHistory.length > 0 && (
// // // // //                   <button className="clear-history-btn" onClick={() => setCalculationHistory([])}>
// // // // //                     Clear
// // // // //                   </button>
// // // // //                 )}
// // // // //               </div>
              
// // // // //               {calculationHistory.length === 0 ? (
// // // // //                 <div className="empty-state compact">
// // // // //                   <p>No calculations yet</p>
// // // // //                 </div>
// // // // //               ) : (
// // // // //                 <div className="history-list compact">
// // // // //                   {calculationHistory.map((item, index) => (
// // // // //                     <div key={index} className="history-item compact">
// // // // //                       <div className="history-expression">{item.expression}</div>
// // // // //                       <div className="history-result">= {formatNumber(item.result)}</div>
// // // // //                       <div className="history-time">{item.timestamp}</div>
// // // // //                     </div>
// // // // //                   ))}
// // // // //                 </div>
// // // // //               )}
// // // // //             </div>

// // // // //             {/* Voice Commands Guide */}
// // // // //             <div className="keyboard-shortcuts-section compact">
// // // // //               <h3>Voice Commands Guide</h3>
// // // // //               <div className="shortcuts-grid compact">
// // // // //                 <div className="shortcut-item compact">
// // // // //                   <span className="shortcut-key">Numbers</span>
// // // // //                   <span className="shortcut-description">"one", "two", "three"</span>
// // // // //                 </div>
// // // // //                 <div className="shortcut-item compact">
// // // // //                   <span className="shortcut-key">+ - × ÷</span>
// // // // //                   <span className="shortcut-description">"plus", "minus"</span>
// // // // //                 </div>
// // // // //                 <div className="shortcut-item compact">
// // // // //                   <span className="shortcut-key">Calculate</span>
// // // // //                   <span className="shortcut-description">"equals", "calculate"</span>
// // // // //                 </div>
// // // // //                 <div className="shortcut-item compact">
// // // // //                   <span className="shortcut-key">Clear</span>
// // // // //                   <span className="shortcut-description">"clear", "reset"</span>
// // // // //                 </div>
// // // // //                 <div className="shortcut-item compact">
// // // // //                   <span className="shortcut-key">% √</span>
// // // // //                   <span className="shortcut-description">"percent", "root"</span>
// // // // //                 </div>
// // // // //                 <div className="shortcut-item compact">
// // // // //                   <span className="shortcut-key">Voice</span>
// // // // //                   <span className="shortcut-description">"voice on/off"</span>
// // // // //                 </div>
// // // // //                 <div className="shortcut-item compact">
// // // // //                   <span className="shortcut-key">Help</span>
// // // // //                   <span className="shortcut-description">"help", "calculator help"</span>
// // // // //                 </div>
// // // // //                 <div className="shortcut-item compact">
// // // // //                   <span className="shortcut-key">Back</span>
// // // // //                   <span className="shortcut-description">"dashboard", "back"</span>
// // // // //                 </div>
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* Status Bar */}
// // // // //       <div className="status-bar">
// // // // //         <p>{status}</p>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default TalkingCalculator;


// // // // import React, { useState, useEffect, useCallback, useRef } from 'react';
// // // // import { useNavigate } from 'react-router-dom';
// // // // import { voiceService } from '../../services/voiceService';
// // // // import './TalkingCalculator.css';

// // // // const TalkingCalculator = () => {
// // // //   const navigate = useNavigate();
  
// // // //   // Calculator state
// // // //   const [currentDisplay, setCurrentDisplay] = useState('0');
// // // //   const [previousValue, setPreviousValue] = useState(null);
// // // //   const [currentOperation, setCurrentOperation] = useState(null);
// // // //   const [waitingForNewValue, setWaitingForNewValue] = useState(false);
// // // //   const [calculationHistory, setCalculationHistory] = useState([]);
// // // //   const [isSpeaking, setIsSpeaking] = useState(true);
// // // //   const [status, setStatus] = useState("Talking Calculator is ready");
// // // //   const [spokenText, setSpokenText] = useState("");
  
// // // //   // Refs for voice command handling
// // // //   const commandsRegisteredRef = useRef(false);
// // // //   const numberBufferRef = useRef([]);
// // // //   const bufferTimeoutRef = useRef(null);
// // // //   const isListeningRef = useRef(false);

// // // //   // Mathematical operations
// // // //   const mathOperations = {
// // // //     add: (a, b) => a + b,
// // // //     subtract: (a, b) => a - b,
// // // //     multiply: (a, b) => a * b,
// // // //     divide: (a, b) => {
// // // //       if (b === 0) throw new Error("Cannot divide by zero");
// // // //       return a / b;
// // // //     },
// // // //     power: (a, b) => Math.pow(a, b),
// // // //     percentage: (a, b) => (a * b) / 100,
// // // //     squareRoot: (a) => Math.sqrt(a)
// // // //   };

// // //   // Operation symbols for display
// // //   // const operationSymbols = {
// // //   //   add: '+',
// // //   //   subtract: '−',
// // //   //   multiply: '×',
// // //   //   divide: '÷',
// // //   //   power: '^',
// // //   //   percentage: '%',
// // //   //   squareRoot: '√'
// // //   // };

// // //   // // Number words mapping
// // //   // const numberWordsMap = {
// // //   //   'zero': '0', 'one': '1', 'two': '2', 'three': '3', 'four': '4',
// // //   //   'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9',
// // //   //   'ten': '10', 'eleven': '11', 'twelve': '12', 'thirteen': '13',
// // //   //   'fourteen': '14', 'fifteen': '15', 'sixteen': '16', 'seventeen': '17',
// // //   //   'eighteen': '18', 'nineteen': '19', 'twenty': '20', 'thirty': '30',
// // //   //   'forty': '40', 'fifty': '50', 'sixty': '60', 'seventy': '70',
// // //   //   'eighty': '80', 'ninety': '90', 'hundred': '100', 'thousand': '1000'
// // //   // };

// // //   // // Speak function with better timing
// // //   // const speak = useCallback((text, immediate = false) => {
// // //   //   if (!isSpeaking && !immediate) return;
    
// // //   //   const synth = window.speechSynthesis;
// // //   //   if (!synth) return;
    
// // //   //   // Cancel any ongoing speech
// // //   //   synth.cancel();
    
// // //   //   const utter = new SpeechSynthesisUtterance(text);
// // //   //   utter.rate = 1.0; // Slightly faster
// // //   //   utter.pitch = 1;
// // //   //   utter.volume = 1;
    
// // //   //   utter.onstart = () => {
// // //   //     console.log("Started speaking:", text);
// // //   //   };
    
// // //   //   utter.onend = () => {
// // //   //     console.log("Finished speaking");
// // //   //     // Don't resume listening immediately - let the timeout handle it
// // //   //   };
    
// // //   //   utter.onerror = (err) => {
// // //   //     console.error("Speech error:", err);
// // //   //   };
    
// // //   //   synth.speak(utter);
// // //   // }, [isSpeaking]);

// // //   // // Format number for display
// // //   // const formatNumber = useCallback((num) => {
// // //   //   if (num === null || num === undefined) return '0';
// // //   //   if (typeof num !== 'number') return num;
    
// // //   //   const numStr = num.toString();
// // //   //   if (numStr.length > 10) {
// // //   //     if (Math.abs(num) > 1e10) {
// // //   //       return num.toExponential(5);
// // //   //     }
// // //   //     return parseFloat(num.toFixed(8)).toString();
// // //   //   }
// // //   //   return numStr;
// // //   // }, []);

// // //   // // Process number buffer - combines multiple digits into one number
// // //   // const processNumberBuffer = useCallback(() => {
// // //   //   if (numberBufferRef.current.length === 0) return;
    
// // //   //   const numberString = numberBufferRef.current.join('');
// // //   //   numberBufferRef.current = []; // Clear buffer
    
// // //   //   console.log("Processing number buffer:", numberString);
    
// // //   //   if (waitingForNewValue) {
// // //   //     setCurrentDisplay(numberString);
// // //   //     setWaitingForNewValue(false);
// // //   //   } else {
// // //   //     setCurrentDisplay(prev => 
// // //   //       prev === '0' || prev === 'Error' ? numberString : prev + numberString
// // //   //     );
// // //   //   }
    
// // //   //   speak(numberString, true);
// // //   //   setStatus(`Entered: ${numberString}`);
// // //   // }, [waitingForNewValue, speak]);

// // //   // // Handle number input with buffer
// // //   // const handleNumberInput = useCallback((number) => {
// // //   //   console.log("Adding to number buffer:", number);
    
// // //   //   // Add number to buffer
// // //   //   numberBufferRef.current.push(number);
    
// // //   //   // Clear existing timeout
// // //   //   if (bufferTimeoutRef.current) {
// // //   //     clearTimeout(bufferTimeoutRef.current);
// // //   //   }
    
// // //   //   // Set timeout to process buffer after a short delay
// // //   //   bufferTimeoutRef.current = setTimeout(() => {
// // //   //     processNumberBuffer();
// // //   //   }, 500); // 500ms delay to capture multiple digits
    
// // //   //   // Show immediate feedback
// // //   //   setSpokenText(number);
// // //   //   speak(number, true);
// // //   // }, [processNumberBuffer, speak]);

// // //   // // Handle direct number input (for complete numbers)
// // //   // const handleDirectNumber = useCallback((number) => {
// // //   //   console.log("Direct number input:", number);
    
// // //   //   if (waitingForNewValue) {
// // //   //     setCurrentDisplay(number);
// // //   //     setWaitingForNewValue(false);
// // //   //   } else {
// // //   //     setCurrentDisplay(prev => 
// // //   //       prev === '0' || prev === 'Error' ? number : prev + number
// // //   //     );
// // //   //   }
    
// // //   //   speak(number, true);
// // //   //   setStatus(`Entered: ${number}`);
// // //   // }, [waitingForNewValue, speak]);

// // //   // // Handle decimal point
// // //   // const handleDecimal = useCallback(() => {
// // //   //   console.log("Handling decimal");
    
// // //   //   // Process any pending number buffer first
// // //   //   if (numberBufferRef.current.length > 0) {
// // //   //     processNumberBuffer();
// // //   //   }
    
// // //   //   if (waitingForNewValue) {
// // //   //     setCurrentDisplay('0.');
// // //   //     setWaitingForNewValue(false);
// // //   //   } else if (!currentDisplay.includes('.')) {
// // //   //     setCurrentDisplay(prev => prev + '.');
// // //   //   }
    
// // //   //   speak("point", true);
// // //   //   setStatus("Decimal point added");
// // //   // }, [currentDisplay, waitingForNewValue, processNumberBuffer, speak]);

// // //   // // Handle calculation
// // //   // const handleCalculate = useCallback(() => {
// // //   //   console.log("Handling calculate");
    
// // //   //   // Process any pending number buffer first
// // //   //   if (numberBufferRef.current.length > 0) {
// // //   //     processNumberBuffer();
// // //   //   }
    
// // //   //   if (currentOperation === null || waitingForNewValue) {
// // //   //     setStatus("Nothing to calculate");
// // //   //     speak("Nothing to calculate", true);
// // //   //     return;
// // //   //   }

// // //   //   const prevVal = previousValue;
// // //   //   const currVal = parseFloat(currentDisplay);
    
// // //   //   try {
// // //   //     const operationFunction = mathOperations[currentOperation];
// // //   //     if (!operationFunction) {
// // //   //       throw new Error("Unknown operation");
// // //   //     }
      
// // //   //     let result;
// // //   //     if (currentOperation === 'squareRoot') {
// // //   //       result = operationFunction(currVal);
// // //   //     } else {
// // //   //       result = operationFunction(prevVal, currVal);
// // //   //     }
      
// // //   //     // Add to history
// // //   //     const historyEntry = {
// // //   //       expression: currentOperation === 'squareRoot' 
// // //   //         ? `√(${currVal})`
// // //   //         : `${prevVal} ${operationSymbols[currentOperation]} ${currVal}`,
// // //   //       result: result,
// // //   //       timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
// // //   //     };
      
// // //   //     setCalculationHistory(prev => [historyEntry, ...prev.slice(0, 9)]);
// // //   //     setCurrentDisplay(formatNumber(result));
// // //   //     setPreviousValue(null);
// // //   //     setCurrentOperation(null);
// // //   //     setWaitingForNewValue(true);
      
// // //   //     const resultText = formatNumber(result);
// // //   //     setStatus(`Result: ${resultText}`);
      
// // //   //     speak(`Result is ${resultText}`, true);
      
// // //   //   } catch (error) {
// // //   //     console.error("Calculation error:", error);
// // //   //     setCurrentDisplay('Error');
// // //   //     setStatus("Calculation error");
// // //   //     speak("Error in calculation", true);
// // //   //   }
// // //   // }, [currentOperation, currentDisplay, previousValue, waitingForNewValue, formatNumber, speak, processNumberBuffer]);

// // //   // // Handle operation selection
// // //   // const handleOperation = useCallback((operation) => {
// // //   //   console.log("Handling operation:", operation);
    
// // //   //   // Process any pending number buffer first
// // //   //   if (numberBufferRef.current.length > 0) {
// // //   //     processNumberBuffer();
// // //   //   }
    
// // //   //   const inputValue = parseFloat(currentDisplay);
    
// // //   //   if (currentOperation !== null && !waitingForNewValue) {
// // //   //     handleCalculate();
// // //   //     // After calculation, set the operation
// // //   //     setTimeout(() => {
// // //   //       setPreviousValue(parseFloat(currentDisplay));
// // //   //       setCurrentOperation(operation);
// // //   //       setWaitingForNewValue(true);
        
// // //   //       const operationNames = {
// // //   //         add: "plus",
// // //   //         subtract: "minus",
// // //   //         multiply: "multiply",
// // //   //         divide: "divide",
// // //   //         power: "power",
// // //   //         percentage: "percent",
// // //   //         squareRoot: "square root"
// // //   //       };
        
// // //   //       const operationText = operationNames[operation] || operation;
// // //   //       setStatus(`Operation: ${operationText}`);
// // //   //       speak(operationText, true);
// // //   //     }, 300);
// // //   //   } else {
// // //   //     setPreviousValue(inputValue);
// // //   //     setCurrentOperation(operation);
// // //   //     setWaitingForNewValue(true);
      
// // //   //     const operationNames = {
// // //   //       add: "plus",
// // //   //       subtract: "minus",
// // //   //       multiply: "multiply",
// // //   //       divide: "divide",
// // //   //       power: "power",
// // //   //       percentage: "percent",
// // //   //       squareRoot: "square root"
// // //   //     };
      
// // //   //     const operationText = operationNames[operation] || operation;
// // //   //     setStatus(`Operation: ${operationText}`);
// // //   //     speak(operationText, true);
// // //   //   }
// // //   // }, [currentDisplay, currentOperation, waitingForNewValue, handleCalculate, speak, processNumberBuffer]);

// // //   // // Clear calculator
// // //   // const handleClear = useCallback(() => {
// // //   //   console.log("Handling clear");
    
// // //   //   // Clear number buffer
// // //   //   numberBufferRef.current = [];
// // //   //   if (bufferTimeoutRef.current) {
// // //   //     clearTimeout(bufferTimeoutRef.current);
// // //   //   }
    
// // //   //   setCurrentDisplay('0');
// // //   //   setPreviousValue(null);
// // //   //   setCurrentOperation(null);
// // //   //   setWaitingForNewValue(false);
// // //   //   setStatus("Calculator cleared");
// // //   //   speak("Calculator cleared", true);
// // //   // }, [speak]);

// // //   // // Clear entry only
// // //   // const handleClearEntry = useCallback(() => {
// // //   //   console.log("Handling clear entry");
    
// // //   //   // Clear number buffer
// // //   //   numberBufferRef.current = [];
// // //   //   if (bufferTimeoutRef.current) {
// // //   //     clearTimeout(bufferTimeoutRef.current);
// // //   //   }
    
// // //   //   setCurrentDisplay('0');
// // //   //   setStatus("Entry cleared");
// // //   //   speak("Entry cleared", true);
// // //   // }, [speak]);

// // //   // // Toggle sign
// // //   // const handleToggleSign = useCallback(() => {
// // //   //   console.log("Handling toggle sign");
    
// // //   //   // Process any pending number buffer first
// // //   //   if (numberBufferRef.current.length > 0) {
// // //   //     processNumberBuffer();
// // //   //   }
    
// // //   //   setCurrentDisplay(prev => formatNumber(-parseFloat(prev)));
// // //   //   setStatus("Sign toggled");
// // //   //   speak("Sign changed", true);
// // //   // }, [formatNumber, speak, processNumberBuffer]);

// // //   // // Percentage
// // //   // const handlePercentage = useCallback(() => {
// // //   //   console.log("Handling percentage");
    
// // //   //   // Process any pending number buffer first
// // //   //   if (numberBufferRef.current.length > 0) {
// // //   //     processNumberBuffer();
// // //   //   }
    
// // //   //   const value = parseFloat(currentDisplay);
// // //   //   if (previousValue !== null && currentOperation) {
// // //   //     const result = (previousValue * value) / 100;
// // //   //     const historyEntry = {
// // //   //       expression: `${previousValue} × ${value}%`,
// // //   //       result: result,
// // //   //       timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
// // //   //     };
// // //   //     setCalculationHistory(prev => [historyEntry, ...prev.slice(0, 9)]);
// // //   //     setCurrentDisplay(formatNumber(result));
// // //   //     setWaitingForNewValue(true);
// // //   //     const resultText = formatNumber(result);
// // //   //     setStatus(`Percentage: ${resultText}`);
// // //   //     speak(`Result is ${resultText}`, true);
// // //   //   } else {
// // //   //     setCurrentDisplay(formatNumber(value / 100));
// // //   //     const resultText = formatNumber(value / 100);
// // //   //     setStatus(`Percentage: ${resultText}`);
// // //   //     speak(`Converted to percentage`, true);
// // //   //   }
// // //   // }, [currentDisplay, previousValue, currentOperation, formatNumber, speak, processNumberBuffer]);

// // //   // // Square root
// // //   // const handleSquareRoot = useCallback(() => {
// // //   //   console.log("Handling square root");
    
// // //   //   // Process any pending number buffer first
// // //   //   if (numberBufferRef.current.length > 0) {
// // //   //     processNumberBuffer();
// // //   //   }
    
// // //   //   const value = parseFloat(currentDisplay);
// // //   //   if (value < 0) {
// // //   //     setCurrentDisplay('Error');
// // //   //     setStatus("Error: Cannot calculate square root of negative number");
// // //   //     speak("Cannot calculate square root of negative number", true);
// // //   //     return;
// // //   //   }
// // //   //   const result = Math.sqrt(value);
// // //   //   const historyEntry = {
// // //   //     expression: `√(${value})`,
// // //   //     result: result,
// // //   //     timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
// // //   //   };
// // //   //   setCalculationHistory(prev => [historyEntry, ...prev.slice(0, 9)]);
// // //   //   const resultText = formatNumber(result);
// // //   //   setCurrentDisplay(resultText);
// // //   //   setStatus(`Square root: ${resultText}`);
// // //   //   speak(`Square root is ${resultText}`, true);
// // //   // }, [currentDisplay, formatNumber, speak, processNumberBuffer]);

// // //   // // Toggle speech
// // //   // const toggleSpeech = useCallback(() => {
// // //   //   console.log("Toggling speech");
    
// // //   //   setIsSpeaking(prev => {
// // //   //     const newState = !prev;
// // //   //     setStatus(newState ? "Voice feedback enabled" : "Voice feedback disabled");
      
// // //   //     if (newState) {
// // //   //       if (voiceService.isAvailable()) {
// // //   //         voiceService.startListening();
// // //   //       }
// // //   //       speak("Voice feedback enabled", true);
// // //   //     } else {
// // //   //       if (voiceService.isListening) {
// // //   //         voiceService.stopListening();
// // //   //       }
// // //   //       speak("Voice feedback disabled", true);
// // //   //     }
      
// // //   //     return newState;
// // //   //   });
// // //   // }, [speak]);

// // //   // // Parse spoken number text (e.g., "twenty three" -> "23")
// // //   // const parseSpokenNumber = useCallback((text) => {
// // //   //   const words = text.toLowerCase().split(' ');
// // //   //   let result = '';
    
// // //   //   for (let word of words) {
// // //   //     if (numberWordsMap[word]) {
// // //   //       result += numberWordsMap[word];
// // //   //     } else if (word === 'and') {
// // //   //       continue; // Skip 'and' in numbers like "twenty and five"
// // //   //     }
// // //   //   }
    
// // //   //   return result || text;
// // //   // }, []);

// // //   // // Initialize voice commands
// // //   // useEffect(() => {
// // //   //   const initializeVoiceCommands = () => {
// // //   //     if (!voiceService.isAvailable()) {
// // //   //       console.log("Voice service not available");
// // //   //       setStatus("Voice service not available");
// // //   //       return;
// // //   //     }

// // //   //     try {
// // //   //       // Clear any existing commands
// // //   //       voiceService.clearCommands();
        
// // //   //       console.log("Registering calculator voice commands");
        
// // //   //       // Define command handlers
// // //   //       const commandHandlers = {
// // //   //         // Navigation commands
// // //   //         dashboard: () => {
// // //   //           console.log("Dashboard command received");
// // //   //           setSpokenText("dashboard");
// // //   //           speak("Going to dashboard", true);
// // //   //           setTimeout(() => navigate("/dashboard"), 500);
// // //   //         },
// // //   //         home: () => {
// // //   //           console.log("Home command received");
// // //   //           setSpokenText("home");
// // //   //           speak("Going to dashboard", true);
// // //   //           setTimeout(() => navigate("/dashboard"), 500);
// // //   //         },
          
// // //   //         // Calculator commands
// // //   //         calculate: () => {
// // //   //           console.log("Calculate command received");
// // //   //           setSpokenText("calculate");
// // //   //           handleCalculate();
// // //   //         },
// // //   //         equals: () => {
// // //   //           console.log("Equals command received");
// // //   //           setSpokenText("equals");
// // //   //           handleCalculate();
// // //   //         },
// // //   //         clear: () => {
// // //   //           console.log("Clear command received");
// // //   //           setSpokenText("clear");
// // //   //           handleClear();
// // //   //         },
// // //   //         reset: () => {
// // //   //           console.log("Reset command received");
// // //   //           setSpokenText("reset");
// // //   //           handleClear();
// // //   //         },
          
// // //   //         // Operation commands
// // //   //         plus: () => {
// // //   //           console.log("Plus command received");
// // //   //           setSpokenText("plus");
// // //   //           handleOperation('add');
// // //   //         },
// // //   //         add: () => {
// // //   //           console.log("Add command received");
// // //   //           setSpokenText("add");
// // //   //           handleOperation('add');
// // //   //         },
// // //   //         minus: () => {
// // //   //           console.log("Minus command received");
// // //   //           setSpokenText("minus");
// // //   //           handleOperation('subtract');
// // //   //         },
// // //   //         subtract: () => {
// // //   //           console.log("Subtract command received");
// // //   //           setSpokenText("subtract");
// // //   //           handleOperation('subtract');
// // //   //         },
// // //   //         multiply: () => {
// // //   //           console.log("Multiply command received");
// // //   //           setSpokenText("multiply");
// // //   //           handleOperation('multiply');
// // //   //         },
// // //   //         times: () => {
// // //   //           console.log("Times command received");
// // //   //           setSpokenText("times");
// // //   //           handleOperation('multiply');
// // //   //         },
// // //   //         divide: () => {
// // //   //           console.log("Divide command received");
// // //   //           setSpokenText("divide");
// // //   //           handleOperation('divide');
// // //   //         },
// // //   //         percent: () => {
// // //   //           console.log("Percent command received");
// // //   //           setSpokenText("percent");
// // //   //           handlePercentage();
// // //   //         },
// // //   //         'square root': () => {
// // //   //           console.log("Square root command received");
// // //   //           setSpokenText("square root");
// // //   //           handleSquareRoot();
// // //   //         },
// // //   //         root: () => {
// // //   //           console.log("Root command received");
// // //   //           setSpokenText("root");
// // //   //           handleSquareRoot();
// // //   //         },
          
// // //   //         // Decimal point
// // //   //         point: () => {
// // //   //           console.log("Point command received");
// // //   //           setSpokenText("point");
// // //   //           handleDecimal();
// // //   //         },
// // //   //         decimal: () => {
// // //   //           console.log("Decimal command received");
// // //   //           setSpokenText("decimal");
// // //   //           handleDecimal();
// // //   //         },
          
// // //   //         // Voice control
// // //   //         'voice on': () => {
// // //   //           console.log("Voice on command received");
// // //   //           setSpokenText("voice on");
// // //   //           if (!isSpeaking) {
// // //   //             toggleSpeech();
// // //   //           }
// // //   //         },
// // //   //         'voice off': () => {
// // //   //           console.log("Voice off command received");
// // //   //           setSpokenText("voice off");
// // //   //           if (isSpeaking) {
// // //   //             toggleSpeech();
// // //   //           }
// // //   //         },
// // //   //         'toggle voice': () => {
// // //   //           console.log("Toggle voice command received");
// // //   //           setSpokenText("toggle voice");
// // //   //           toggleSpeech();
// // //   //         },
          
// // //   //         // Help command
// // //   //         help: () => {
// // //   //           console.log("Help command received");
// // //   //           setSpokenText("help");
// // //   //           const helpText = "Say numbers like 'one', 'two', 'three'. " +
// // //   //             "Say operations like 'plus', 'minus', 'multiply', 'divide'. " +
// // //   //             "Say 'equals' to get the result. " +
// // //   //             "Say 'clear' to reset. Say 'percent' for percentage. " +
// // //   //             "Say 'square root' for square root. " +
// // //   //             "Say 'dashboard' to go back to main menu.";
// // //   //           speak(helpText, true);
// // //   //         },
// // //   //       };

// // //   //       // Register single digit numbers (0-9)
// // //   //       for (let i = 0; i <= 9; i++) {
// // //   //         commandHandlers[i.toString()] = () => {
// // //   //           console.log(`${i} command received`);
// // //   //           setSpokenText(i.toString());
// // //   //           handleNumberInput(i.toString());
// // //   //         };
          
// // //   //         const numberWords = [
// // //   //           "zero", "one", "two", "three", "four", 
// // //   //           "five", "six", "seven", "eight", "nine"
// // //   //         ];
// // //   //         commandHandlers[numberWords[i]] = () => {
// // //   //           console.log(`${numberWords[i]} command received`);
// // //   //           setSpokenText(numberWords[i]);
// // //   //           handleNumberInput(i.toString());
// // //   //         };
// // //   //       }

// // //   //       // Register common multi-digit numbers
// // //   //       const commonNumbers = {
// // //   //         'ten': '10', 'eleven': '11', 'twelve': '12', 'thirteen': '13',
// // //   //         'fourteen': '14', 'fifteen': '15', 'sixteen': '16', 'seventeen': '17',
// // //   //         'eighteen': '18', 'nineteen': '19', 'twenty': '20', 'thirty': '30',
// // //   //         'forty': '40', 'fifty': '50', 'sixty': '60', 'seventy': '70',
// // //   //         'eighty': '80', 'ninety': '90', 'hundred': '100'
// // //   //       };

// // //   //       Object.entries(commonNumbers).forEach(([word, number]) => {
// // //   //         commandHandlers[word] = () => {
// // //   //           console.log(`${word} command received`);
// // //   //           setSpokenText(word);
// // //   //           handleDirectNumber(number);
// // //   //         };
// // //   //       });

// // //   //       // Register all commands
// // //   //       Object.entries(commandHandlers).forEach(([command, handler]) => {
// // //   //         voiceService.registerCommand(command, handler);
// // //   //       });
        
// // //   //       // Handle unmatched commands - improved number parsing
// // //   //       voiceService.onResultCallback = (transcript) => {
// // //   //         console.log("Calculator voice input:", transcript);
// // //   //         setSpokenText(transcript);
          
// // //   //         const cleanTranscript = transcript.toLowerCase().trim();
          
// // //   //         // Try to parse as a number first
// // //   //         const parsedNumber = parseSpokenNumber(cleanTranscript);
// // //   //         if (parsedNumber !== cleanTranscript && /^\d+$/.test(parsedNumber)) {
// // //   //           // It's a parsed number
// // //   //           console.log("Parsed as number:", parsedNumber);
// // //   //           handleDirectNumber(parsedNumber);
// // //   //           return;
// // //   //         }
          
// // //   //         // Check for common commands
// // //   //         if (cleanTranscript.includes("help")) {
// // //   //           commandHandlers.help();
// // //   //         } else if (cleanTranscript.includes("dashboard") || cleanTranscript.includes("home")) {
// // //   //           commandHandlers.dashboard();
// // //   //         } else if (cleanTranscript.includes("clear")) {
// // //   //           commandHandlers.clear();
// // //   //         } else if (cleanTranscript.includes("equals") || cleanTranscript.includes("calculate")) {
// // //   //           commandHandlers.calculate();
// // //   //         } else if (cleanTranscript.includes("plus") || cleanTranscript.includes("add")) {
// // //   //           commandHandlers.plus();
// // //   //         } else if (cleanTranscript.includes("minus") || cleanTranscript.includes("subtract")) {
// // //   //           commandHandlers.minus();
// // //   //         } else if (cleanTranscript.includes("multiply") || cleanTranscript.includes("times")) {
// // //   //           commandHandlers.multiply();
// // //   //         } else if (cleanTranscript.includes("divide")) {
// // //   //           commandHandlers.divide();
// // //   //         } else if (cleanTranscript.includes("percent")) {
// // //   //           commandHandlers.percent();
// // //   //         }
// // //   //       };
        
// // //   //       // Start listening
// // //   //       if (isSpeaking) {
// // //   //         voiceService.startListening();
// // //   //         setStatus("Voice commands ready");
// // //   //         setTimeout(() => {
// // //   //           speak("Calculator ready. Say numbers and operations.", true);
// // //   //         }, 1000);
// // //   //       }
        
// // //   //       commandsRegisteredRef.current = true;
// // //   //       console.log("Voice commands registered successfully");
        
// // //   //     } catch (error) {
// // //   //       console.error("Error registering voice commands:", error);
// // //   //       setStatus("Error setting up voice commands");
// // //   //     }
// // //   //   };

// // //   //   initializeVoiceCommands();

// // //   //   // Clean up on unmount
// // //   //   return () => {
// // //   //     if (bufferTimeoutRef.current) {
// // //   //       clearTimeout(bufferTimeoutRef.current);
// // //   //     }
// // //   //     if (voiceService.isListening) {
// // //   //       voiceService.stopListening();
// // //   //     }
// // //   //     voiceService.clearCommands();
// // //   //   };
// // //   // }, [navigate, isSpeaking]);

// // //   // // Handle keyboard input
// // //   // useEffect(() => {
// // //   //   const handleKeyDown = (e) => {
// // //   //     const key = e.key;
      
// // //   //     if (key >= '0' && key <= '9') {
// // //   //       handleNumberInput(key);
// // //   //     } else if (key === '.') {
// // //   //       handleDecimal();
// // //   //     } else if (key === '+') {
// // //   //       handleOperation('add');
// // //   //     } else if (key === '-') {
// // //   //       handleOperation('subtract');
// // //   //     } else if (key === '*') {
// // //   //       handleOperation('multiply');
// // //   //     } else if (key === '/') {
// // //   //       e.preventDefault();
// // //   //       handleOperation('divide');
// // //   //     } else if (key === 'Enter' || key === '=') {
// // //   //       handleCalculate();
// // //   //     } else if (key === 'Escape' || key === 'Delete') {
// // //   //       handleClear();
// // //   //     } else if (key === 'Backspace') {
// // //   //       handleClearEntry();
// // //   //     } else if (key === '%') {
// // //   //       handlePercentage();
// // //   //     } else if (key === '^') {
// // //   //       handleOperation('power');
// // //   //     } else if (key === 'r' || key === 'R') {
// // //   //       handleSquareRoot();
// // //   //     }
// // //   //   };

// // //   //   window.addEventListener('keydown', handleKeyDown);
// // //   //   return () => window.removeEventListener('keydown', handleKeyDown);
// // //   // }, []);


// // // import React, { useState, useEffect, useCallback, useRef } from 'react';
// // // import { useNavigate } from 'react-router-dom';
// // // import { voiceService } from '../../services/voiceService';
// // // import './TalkingCalculator.css';

// // // const TalkingCalculator = () => {
// // //   const navigate = useNavigate();
  
// // //   // Calculator state
// // //   const [currentDisplay, setCurrentDisplay] = useState('0');
// // //   const [previousValue, setPreviousValue] = useState(null);
// // //   const [currentOperation, setCurrentOperation] = useState(null);
// // //   const [waitingForNewValue, setWaitingForNewValue] = useState(false);
// // //   const [calculationHistory, setCalculationHistory] = useState([]);
// // //   const [isSpeaking, setIsSpeaking] = useState(true);
// // //   const [status, setStatus] = useState("Talking Calculator is ready");
// // //   const [spokenText, setSpokenText] = useState("");
  
// // //   // Refs for voice command handling
// // //   const commandsRegisteredRef = useRef(false);
// // //   const isProcessingRef = useRef(false);

// // //   // Mathematical operations
// // //   const mathOperations = {
// // //     add: (a, b) => a + b,
// // //     subtract: (a, b) => a - b,
// // //     multiply: (a, b) => a * b,
// // //     divide: (a, b) => {
// // //       if (b === 0) throw new Error("Cannot divide by zero");
// // //       return a / b;
// // //     },
// // //     power: (a, b) => Math.pow(a, b),
// // //     percentage: (a, b) => (a * b) / 100,
// // //     squareRoot: (a) => Math.sqrt(a)
// // //   };

// // //   // Operation symbols for display
// // //   const operationSymbols = {
// // //     add: '+',
// // //     subtract: '−',
// // //     multiply: '×',
// // //     divide: '÷',
// // //     power: '^',
// // //     percentage: '%',
// // //     squareRoot: '√'
// // //   };

// // //   // Number words mapping
// // //   const numberWordsMap = {
// // //     'zero': '0', 'one': '1', 'two': '2', 'three': '3', 'four': '4',
// // //     'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9',
// // //     'ten': '10', 'eleven': '11', 'twelve': '12', 'thirteen': '13',
// // //     'fourteen': '14', 'fifteen': '15', 'sixteen': '16', 'seventeen': '17',
// // //     'eighteen': '18', 'nineteen': '19', 'twenty': '20', 'thirty': '30',
// // //     'forty': '40', 'fifty': '50', 'sixty': '60', 'seventy': '70',
// // //     'eighty': '80', 'ninety': '90', 'hundred': '100', 'thousand': '1000'
// // //   };

// // //   // Speak function
// // //   const speak = useCallback((text, immediate = false) => {
// // //     if (!isSpeaking && !immediate) return;
    
// // //     const synth = window.speechSynthesis;
// // //     if (!synth) return;
    
// // //     synth.cancel();
    
// // //     const utter = new SpeechSynthesisUtterance(text);
// // //     utter.rate = 1.0;
// // //     utter.pitch = 1;
// // //     utter.volume = 1;
    
// // //     utter.onend = () => {
// // //       // Small delay before allowing next speech
// // //       setTimeout(() => {
// // //         isProcessingRef.current = false;
// // //       }, 100);
// // //     };
    
// // //     utter.onerror = (err) => {
// // //       console.error("Speech error:", err);
// // //       isProcessingRef.current = false;
// // //     };
    
// // //     isProcessingRef.current = true;
// // //     synth.speak(utter);
// // //   }, [isSpeaking]);

// // //   // Format number for display
// // //   const formatNumber = useCallback((num) => {
// // //     if (num === null || num === undefined) return '0';
// // //     if (typeof num !== 'number') return num;
    
// // //     const numStr = num.toString();
// // //     if (numStr.length > 10) {
// // //       if (Math.abs(num) > 1e10) {
// // //         return num.toExponential(5);
// // //       }
// // //       return parseFloat(num.toFixed(8)).toString();
// // //     }
// // //     return numStr;
// // //   }, []);

// // //   // Handle number input
// // //   const handleNumberInput = useCallback((number) => {
// // //     if (isProcessingRef.current) return;
    
// // //     console.log("Number input:", number);
    
// // //     if (waitingForNewValue) {
// // //       setCurrentDisplay(number);
// // //       setWaitingForNewValue(false);
// // //     } else {
// // //       setCurrentDisplay(prev => 
// // //         prev === '0' || prev === 'Error' ? number : prev + number
// // //       );
// // //     }
    
// // //     speak(number, true);
// // //     setStatus(`Entered: ${number}`);
// // //   }, [waitingForNewValue, speak]);

// // //   // Handle direct number input (for complete numbers from voice)
// // //   const handleDirectNumber = useCallback((number) => {
// // //     if (isProcessingRef.current) return;
    
// // //     console.log("Direct number input:", number);
    
// // //     if (waitingForNewValue) {
// // //       setCurrentDisplay(number);
// // //       setWaitingForNewValue(false);
// // //     } else {
// // //       setCurrentDisplay(prev => 
// // //         prev === '0' || prev === 'Error' ? number : prev + number
// // //       );
// // //     }
    
// // //     speak(number, true);
// // //     setStatus(`Entered: ${number}`);
// // //   }, [waitingForNewValue, speak]);

// // //   // Handle decimal point
// // //   const handleDecimal = useCallback(() => {
// // //     if (isProcessingRef.current) return;
    
// // //     console.log("Handling decimal");
    
// // //     if (waitingForNewValue) {
// // //       setCurrentDisplay('0.');
// // //       setWaitingForNewValue(false);
// // //     } else if (!currentDisplay.includes('.')) {
// // //       setCurrentDisplay(prev => prev + '.');
// // //     }
    
// // //     speak("point", true);
// // //     setStatus("Decimal point added");
// // //   }, [currentDisplay, waitingForNewValue, speak]);

// // //   // Handle calculation
// // //   const handleCalculate = useCallback(() => {
// // //     if (isProcessingRef.current) return;
    
// // //     console.log("Handling calculate");
    
// // //     if (currentOperation === null || previousValue === null) {
// // //       setStatus("Nothing to calculate");
// // //       speak("Nothing to calculate", true);
// // //       return;
// // //     }

// // //     const prevVal = previousValue;
// // //     const currVal = parseFloat(currentDisplay);
    
// // //     try {
// // //       const operationFunction = mathOperations[currentOperation];
// // //       if (!operationFunction) {
// // //         throw new Error("Unknown operation");
// // //       }
      
// // //       let result;
// // //       if (currentOperation === 'squareRoot') {
// // //         result = operationFunction(currVal);
// // //       } else {
// // //         result = operationFunction(prevVal, currVal);
// // //       }
      
// // //       // Add to history
// // //       const historyEntry = {
// // //         expression: currentOperation === 'squareRoot' 
// // //           ? `√(${currVal})`
// // //           : `${prevVal} ${operationSymbols[currentOperation]} ${currVal}`,
// // //         result: result,
// // //         timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
// // //       };
      
// // //       setCalculationHistory(prev => [historyEntry, ...prev.slice(0, 9)]);
// // //       const resultText = formatNumber(result);
// // //       setCurrentDisplay(resultText);
// // //       setPreviousValue(result);
// // //       setCurrentOperation(null);
// // //       setWaitingForNewValue(true);
      
// // //       setStatus(`Result: ${resultText}`);
// // //       speak(`Result is ${resultText}`, true);
      
// // //     } catch (error) {
// // //       console.error("Calculation error:", error);
// // //       setCurrentDisplay('Error');
// // //       setStatus("Calculation error");
// // //       speak("Error in calculation", true);
// // //     }
// // //   }, [currentOperation, currentDisplay, previousValue, formatNumber, speak]);

// // //   // Handle operation selection - FIXED VERSION
// // //   const handleOperation = useCallback((operation) => {
// // //     if (isProcessingRef.current) return;
    
// // //     console.log("Handling operation:", operation);
    
// // //     const inputValue = parseFloat(currentDisplay);
    
// // //     // If we already have an operation and a previous value, calculate first
// // //     if (currentOperation !== null && previousValue !== null) {
// // //       handleCalculate();
      
// // //       // Set up the next operation after calculation
// // //       setTimeout(() => {
// // //         setPreviousValue(parseFloat(currentDisplay));
// // //         setCurrentOperation(operation);
// // //         setWaitingForNewValue(true);
        
// // //         const operationText = getOperationText(operation);
// // //         setStatus(`Operation: ${operationText}`);
// // //         speak(operationText, true);
// // //       }, 500);
// // //     } else {
// // //       // No previous operation, just set up the new one
// // //       setPreviousValue(inputValue);
// // //       setCurrentOperation(operation);
// // //       setWaitingForNewValue(true);
      
// // //       const operationText = getOperationText(operation);
// // //       setStatus(`Operation: ${operationText}`);
// // //       speak(operationText, true);
// // //     }
// // //   }, [currentDisplay, currentOperation, previousValue, handleCalculate, speak]);

// // //   // Helper function for operation text
// // //   const getOperationText = (operation) => {
// // //     const operationNames = {
// // //       add: "plus",
// // //       subtract: "minus",
// // //       multiply: "multiply",
// // //       divide: "divide",
// // //       power: "power",
// // //       percentage: "percent",
// // //       squareRoot: "square root"
// // //     };
// // //     return operationNames[operation] || operation;
// // //   };

// // //   // Clear calculator
// // //   const handleClear = useCallback(() => {
// // //     console.log("Handling clear");
    
// // //     setCurrentDisplay('0');
// // //     setPreviousValue(null);
// // //     setCurrentOperation(null);
// // //     setWaitingForNewValue(false);
// // //     setStatus("Calculator cleared");
// // //     speak("Calculator cleared", true);
// // //   }, [speak]);

// // //   // Clear entry only
// // //   const handleClearEntry = useCallback(() => {
// // //     console.log("Handling clear entry");
    
// // //     setCurrentDisplay('0');
// // //     setStatus("Entry cleared");
// // //     speak("Entry cleared", true);
// // //   }, [speak]);

// // //   // Toggle sign
// // //   const handleToggleSign = useCallback(() => {
// // //     setCurrentDisplay(prev => formatNumber(-parseFloat(prev)));
// // //     setStatus("Sign toggled");
// // //     speak("Sign changed", true);
// // //   }, [formatNumber, speak]);

// // //   // Percentage
// // //   const handlePercentage = useCallback(() => {
// // //     const value = parseFloat(currentDisplay);
// // //     const result = value / 100;
// // //     setCurrentDisplay(formatNumber(result));
// // //     const resultText = formatNumber(result);
// // //     setStatus(`Percentage: ${resultText}`);
// // //     speak(`Converted to percentage: ${resultText}`, true);
// // //   }, [currentDisplay, formatNumber, speak]);

// // //   // Square root
// // //   const handleSquareRoot = useCallback(() => {
// // //     const value = parseFloat(currentDisplay);
// // //     if (value < 0) {
// // //       setCurrentDisplay('Error');
// // //       setStatus("Error: Cannot calculate square root of negative number");
// // //       speak("Cannot calculate square root of negative number", true);
// // //       return;
// // //     }
// // //     const result = Math.sqrt(value);
// // //     const historyEntry = {
// // //       expression: `√(${value})`,
// // //       result: result,
// // //       timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
// // //     };
// // //     setCalculationHistory(prev => [historyEntry, ...prev.slice(0, 9)]);
// // //     const resultText = formatNumber(result);
// // //     setCurrentDisplay(resultText);
// // //     setStatus(`Square root: ${resultText}`);
// // //     speak(`Square root is ${resultText}`, true);
// // //   }, [currentDisplay, formatNumber, speak]);

// // //   // Toggle speech
// // //   const toggleSpeech = useCallback(() => {
// // //     setIsSpeaking(prev => {
// // //       const newState = !prev;
// // //       setStatus(newState ? "Voice feedback enabled" : "Voice feedback disabled");
      
// // //       if (newState) {
// // //         if (voiceService.isAvailable()) {
// // //           voiceService.startListening();
// // //         }
// // //         speak("Voice feedback enabled", true);
// // //       } else {
// // //         if (voiceService.isListening) {
// // //           voiceService.stopListening();
// // //         }
// // //         speak("Voice feedback disabled", true);
// // //       }
      
// // //       return newState;
// // //     });
// // //   }, [speak]);

// // //   // Parse spoken number text
// // //   const parseSpokenNumber = useCallback((text) => {
// // //     const words = text.toLowerCase().split(/\s+/);
// // //     let total = 0;
// // //     let current = 0;
    
// // //     for (let word of words) {
// // //       if (numberWordsMap[word]) {
// // //         const value = parseInt(numberWordsMap[word]);
// // //         if (value === 100) {
// // //           current = (current || 1) * 100;
// // //         } else if (value === 1000) {
// // //           current = (current || 1) * 1000;
// // //         } else if (value >= 100) {
// // //           // For numbers like 20, 30, etc.
// // //           current = (current || 0) + value;
// // //         } else {
// // //           current = (current || 0) * 10 + value;
// // //         }
// // //       }
// // //     }
    
// // //     total += current;
// // //     return total > 0 ? total.toString() : text;
// // //   }, []);

// // //   // Register voice commands
// // //   const registerVoiceCommands = useCallback(() => {
// // //     if (!voiceService.isAvailable()) {
// // //       console.log("Voice service not available");
// // //       setStatus("Voice service not available");
// // //       return;
// // //     }

// // //     try {
// // //       voiceService.clearCommands();
      
// // //       console.log("Registering calculator voice commands");
      
// // //       // Navigation commands
// // //       voiceService.registerCommand('dashboard', () => {
// // //         console.log("Dashboard command received");
// // //         setSpokenText("dashboard");
// // //         speak("Going to dashboard", true);
// // //         setTimeout(() => navigate("/dashboard"), 1000);
// // //       });
      
// // //       voiceService.registerCommand('home', () => {
// // //         console.log("Home command received");
// // //         setSpokenText("home");
// // //         speak("Going to dashboard", true);
// // //         setTimeout(() => navigate("/dashboard"), 1000);
// // //       });
      
// // //       // Calculator commands
// // //       voiceService.registerCommand('calculate', () => {
// // //         console.log("Calculate command received");
// // //         setSpokenText("calculate");
// // //         handleCalculate();
// // //       });
      
// // //       voiceService.registerCommand('equals', () => {
// // //         console.log("Equals command received");
// // //         setSpokenText("equals");
// // //         handleCalculate();
// // //       });
      
// // //       voiceService.registerCommand('clear', () => {
// // //         console.log("Clear command received");
// // //         setSpokenText("clear");
// // //         handleClear();
// // //       });
      
// // //       voiceService.registerCommand('reset', () => {
// // //         console.log("Reset command received");
// // //         setSpokenText("reset");
// // //         handleClear();
// // //       });
      
// // //       // Operation commands
// // //       voiceService.registerCommand('plus', () => {
// // //         console.log("Plus command received");
// // //         setSpokenText("plus");
// // //         handleOperation('add');
// // //       });
      
// // //       voiceService.registerCommand('add', () => {
// // //         console.log("Add command received");
// // //         setSpokenText("add");
// // //         handleOperation('add');
// // //       });
      
// // //       voiceService.registerCommand('minus', () => {
// // //         console.log("Minus command received");
// // //         setSpokenText("minus");
// // //         handleOperation('subtract');
// // //       });
      
// // //       voiceService.registerCommand('subtract', () => {
// // //         console.log("Subtract command received");
// // //         setSpokenText("subtract");
// // //         handleOperation('subtract');
// // //       });
      
// // //       voiceService.registerCommand('multiply', () => {
// // //         console.log("Multiply command received");
// // //         setSpokenText("multiply");
// // //         handleOperation('multiply');
// // //       });
      
// // //       voiceService.registerCommand('times', () => {
// // //         console.log("Times command received");
// // //         setSpokenText("times");
// // //         handleOperation('multiply');
// // //       });
      
// // //       voiceService.registerCommand('divide', () => {
// // //         console.log("Divide command received");
// // //         setSpokenText("divide");
// // //         handleOperation('divide');
// // //       });
      
// // //       voiceService.registerCommand('percent', () => {
// // //         console.log("Percent command received");
// // //         setSpokenText("percent");
// // //         handlePercentage();
// // //       });
      
// // //       voiceService.registerCommand('square root', () => {
// // //         console.log("Square root command received");
// // //         setSpokenText("square root");
// // //         handleSquareRoot();
// // //       });
      
// // //       voiceService.registerCommand('root', () => {
// // //         console.log("Root command received");
// // //         setSpokenText("root");
// // //         handleSquareRoot();
// // //       });
      
// // //       // Decimal point
// // //       voiceService.registerCommand('point', () => {
// // //         console.log("Point command received");
// // //         setSpokenText("point");
// // //         handleDecimal();
// // //       });
      
// // //       voiceService.registerCommand('decimal', () => {
// // //         console.log("Decimal command received");
// // //         setSpokenText("decimal");
// // //         handleDecimal();
// // //       });
      
// // //       // Voice control
// // //       voiceService.registerCommand('voice on', () => {
// // //         console.log("Voice on command received");
// // //         setSpokenText("voice on");
// // //         if (!isSpeaking) {
// // //           toggleSpeech();
// // //         }
// // //       });
      
// // //       voiceService.registerCommand('voice off', () => {
// // //         console.log("Voice off command received");
// // //         setSpokenText("voice off");
// // //         if (isSpeaking) {
// // //           toggleSpeech();
// // //         }
// // //       });
      
// // //       voiceService.registerCommand('toggle voice', () => {
// // //         console.log("Toggle voice command received");
// // //         setSpokenText("toggle voice");
// // //         toggleSpeech();
// // //       });
      
// // //       // Help command
// // //       voiceService.registerCommand('help', () => {
// // //         console.log("Help command received");
// // //         setSpokenText("help");
// // //         const helpText = "Say numbers like 'one', 'two', 'three'. " +
// // //           "Say operations like 'plus', 'minus', 'multiply', 'divide'. " +
// // //           "Say 'equals' to get the result. " +
// // //           "Say 'clear' to reset. Say 'percent' for percentage. " +
// // //           "Say 'square root' for square root. " +
// // //           "Say 'dashboard' to go back to main menu.";
// // //         speak(helpText, true);
// // //       });
      
// // //       // Register single digit numbers
// // //       for (let i = 0; i <= 9; i++) {
// // //         voiceService.registerCommand(i.toString(), () => {
// // //           console.log(`${i} command received`);
// // //           setSpokenText(i.toString());
// // //           handleNumberInput(i.toString());
// // //         });
// // //       }
      
// // //       // Register number words
// // //       const numberWords = [
// // //         "zero", "one", "two", "three", "four", 
// // //         "five", "six", "seven", "eight", "nine",
// // //         "ten", "eleven", "twelve", "thirteen", "fourteen",
// // //         "fifteen", "sixteen", "seventeen", "eighteen", "nineteen",
// // //         "twenty", "thirty", "forty", "fifty", "sixty",
// // //         "seventy", "eighty", "ninety", "hundred"
// // //       ];
      
// // //       numberWords.forEach(word => {
// // //         voiceService.registerCommand(word, () => {
// // //           console.log(`${word} command received`);
// // //           setSpokenText(word);
// // //           const parsedNumber = parseSpokenNumber(word);
// // //           handleDirectNumber(parsedNumber);
// // //         });
// // //       });
      
// // //       // Handle general number parsing for unmatched commands
// // //       voiceService.onResultCallback = (transcript) => {
// // //         console.log("Voice input:", transcript);
// // //         setSpokenText(transcript);
        
// // //         const cleanTranscript = transcript.toLowerCase().trim();
        
// // //         // Try to parse as a number
// // //         const parsedNumber = parseSpokenNumber(cleanTranscript);
// // //         if (parsedNumber !== cleanTranscript && /^\d+$/.test(parsedNumber)) {
// // //           console.log("Parsed as number:", parsedNumber);
// // //           handleDirectNumber(parsedNumber);
// // //           return;
// // //         }
// // //       };
      
// // //       commandsRegisteredRef.current = true;
// // //       console.log("Voice commands registered successfully");
      
// // //     } catch (error) {
// // //       console.error("Error registering voice commands:", error);
// // //       setStatus("Error setting up voice commands");
// // //     }
// // //   }, [navigate, speak, handleCalculate, handleClear, handleOperation, handlePercentage, 
// // //       handleSquareRoot, handleDecimal, isSpeaking, toggleSpeech, handleNumberInput, 
// // //       handleDirectNumber, parseSpokenNumber]);

// // //   // Initialize voice commands - FIXED useEffect
// // //   useEffect(() => {
// // //     // Only register commands once
// // //     if (!commandsRegisteredRef.current) {
// // //       registerVoiceCommands();
      
// // //       // Start listening if speaking is enabled
// // //       if (isSpeaking && voiceService.isAvailable()) {
// // //         voiceService.startListening();
// // //         setStatus("Voice commands ready");
// // //         setTimeout(() => {
// // //           speak("Calculator ready. Say numbers and operations.", true);
// // //         }, 1000);
// // //       }
// // //     }
    
// // //     // Clean up on unmount
// // //     return () => {
// // //       if (voiceService.isListening) {
// // //         voiceService.stopListening();
// // //       }
// // //     };
// // //   }, [registerVoiceCommands, isSpeaking, speak]);

// // //   // Handle keyboard input - FIXED
// // //   useEffect(() => {
// // //     const handleKeyDown = (e) => {
// // //       const key = e.key;
      
// // //       if (key >= '0' && key <= '9') {
// // //         handleNumberInput(key);
// // //       } else if (key === '.') {
// // //         handleDecimal();
// // //       } else if (key === '+') {
// // //         handleOperation('add');
// // //       } else if (key === '-') {
// // //         handleOperation('subtract');
// // //       } else if (key === '*') {
// // //         handleOperation('multiply');
// // //       } else if (key === '/') {
// // //         e.preventDefault();
// // //         handleOperation('divide');
// // //       } else if (key === 'Enter' || key === '=') {
// // //         e.preventDefault();
// // //         handleCalculate();
// // //       } else if (key === 'Escape' || key === 'Delete') {
// // //         handleClear();
// // //       } else if (key === 'Backspace') {
// // //         handleClearEntry();
// // //       } else if (key === '%') {
// // //         handlePercentage();
// // //       } else if (key === '^') {
// // //         handleOperation('power');
// // //       } else if (key === 'r' || key === 'R') {
// // //         handleSquareRoot();
// // //       }
// // //     };

// // //     window.addEventListener('keydown', handleKeyDown);
// // //     return () => window.removeEventListener('keydown', handleKeyDown);
// // //   }, [handleNumberInput, handleDecimal, handleOperation, handleCalculate, 
// // //       handleClear, handleClearEntry, handlePercentage, handleSquareRoot]);

// // //   // Rest of the component remains the same...
// // //   // (handleLogout, handleBackToDashboard, and JSX remain unchanged)
// // //   // Handle logout
// // //   const handleLogout = async () => {
// // //     setStatus("Logging out...");
// // //     speak("Logging out...", true);
    
// // //     if (voiceService.isListening) {
// // //       voiceService.stopListening();
// // //     }
    
// // //     localStorage.clear();
    
// // //     setTimeout(() => navigate("/"), 1500);
// // //   };

// // //   const handleBackToDashboard = () => {
// // //     navigate("/dashboard");
// // //   };

// // //   // Current expression for display
// // //   const currentExpression = currentOperation && previousValue !== null
// // //     ? `${previousValue} ${operationSymbols[currentOperation] || currentOperation} ${waitingForNewValue ? '' : currentDisplay}`
// // //     : '';

// // //   return (
// // //     <div className="talking-calculator-container">
// // //       {/* Fixed Header */}
// // //       <header className="dashboard-header fixed-header">
// // //         <div className="header-content">
// // //           <div className="header-left">
// // //             <button className="back-btn" onClick={handleBackToDashboard}>
// // //               ← Dashboard
// // //             </button>
// // //             <h1 className="logo">Vision Assist</h1>
// // //           </div>
          
// // //           {/* Spoken Text Display */}
// // //           <div className="header-center">
// // //             {spokenText && (
// // //               <div className="spoken-text-display">
// // //                 <span className="spoken-label">🎤 Heard:</span> <strong>{spokenText}</strong>
// // //               </div>
// // //             )}
// // //           </div>
          
// // //           <div className="user-menu">
// // //             <button className="logout-btn" onClick={handleLogout}>
// // //               Logout
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </header>

// // //       <div className="calculator-content">
// // //         <div className="calculator-header">
// // //           <h2>🧮 Talking Calculator</h2>
// // //           <p>Speak numbers naturally: "twenty three", "one hundred five"</p>
// // //         </div>

// // //         {/* Status Message */}
// // //         {status && (
// // //           <div className="status-message">
// // //             {status}
// // //           </div>
// // //         )}

// // //         {/* Quick Voice Tips */}
// // //         <div className="voice-tips">
// // //           <p><strong>Tip:</strong> Say complete numbers like "twenty three" instead of "two three"</p>
// // //         </div>

// // //         {/* Main Layout */}
// // //         <div className="calculator-main-layout">
// // //           {/* Left Column: Calculator and Controls */}
// // //           <div className="calculator-left-column">
// // //             {/* Display Section */}
// // //             <div className="calculator-display-section compact">
// // //               <div className="expression-display">
// // //                 {currentExpression || 'Ready for calculation'}
// // //               </div>
// // //               <div className="result-display">
// // //                 {currentDisplay}
// // //               </div>
// // //             </div>

// // //             {/* Voice Controls */}
// // //             <div className="voice-controls-section compact">
// // //               <div className="voice-controls-header">
// // //                 <span>Voice Controls</span>
// // //                 <button 
// // //                   className={`voice-toggle-btn ${isSpeaking ? 'active' : ''}`}
// // //                   onClick={toggleSpeech}
// // //                 >
// // //                   {isSpeaking ? '🔊 Voice ON' : '🔈 Voice OFF'}
// // //                 </button>
// // //               </div>
// // //               <div className="voice-buttons">
// // //                 <button 
// // //                   className="voice-command-btn"
// // //                   onClick={() => speak(`Current value is ${currentDisplay}`, true)}
// // //                 >
// // //                   Speak Value
// // //                 </button>
// // //                 <button 
// // //                   className="voice-command-btn"
// // //                   onClick={() => speak("Say complete numbers like 'twenty three' or 'one hundred five'", true)}
// // //                 >
// // //                   Quick Tip
// // //                 </button>
// // //               </div>
// // //             </div>

// // //             {/* Calculator Buttons */}
// // //             <div className="calculator-buttons-section compact">
// // //               <div className="calculator-buttons-grid">
// // //                 {/* First Row */}
// // //                 <div className="button-row compact">
// // //                   <button className="btn-clear compact" onClick={handleClear}>C</button>
// // //                   <button className="btn-clear-entry compact" onClick={handleClearEntry}>CE</button>
// // //                   <button className="btn-operation compact" onClick={handlePercentage}>%</button>
// // //                   <button className="btn-operation compact" onClick={handleSquareRoot}>√</button>
// // //                   <button className="btn-operation compact" onClick={() => handleOperation('power')}>x^y</button>
// // //                   <button className="btn-operation compact" onClick={() => handleOperation('divide')}>÷</button>
// // //                 </div>

// // //                 {/* Number Rows */}
// // //                 <div className="button-row compact">
// // //                   <button className="btn-number compact" onClick={() => handleNumberInput('7')}>7</button>
// // //                   <button className="btn-number compact" onClick={() => handleNumberInput('8')}>8</button>
// // //                   <button className="btn-number compact" onClick={() => handleNumberInput('9')}>9</button>
// // //                   <button className="btn-operation compact" onClick={() => handleOperation('multiply')}>×</button>
// // //                 </div>

// // //                 <div className="button-row compact">
// // //                   <button className="btn-number compact" onClick={() => handleNumberInput('4')}>4</button>
// // //                   <button className="btn-number compact" onClick={() => handleNumberInput('5')}>5</button>
// // //                   <button className="btn-number compact" onClick={() => handleNumberInput('6')}>6</button>
// // //                   <button className="btn-operation compact" onClick={() => handleOperation('subtract')}>−</button>
// // //                 </div>

// // //                 <div className="button-row compact">
// // //                   <button className="btn-number compact" onClick={() => handleNumberInput('1')}>1</button>
// // //                   <button className="btn-number compact" onClick={() => handleNumberInput('2')}>2</button>
// // //                   <button className="btn-number compact" onClick={() => handleNumberInput('3')}>3</button>
// // //                   <button className="btn-operation compact" onClick={() => handleOperation('add')}>+</button>
// // //                 </div>

// // //                 {/* Last Row */}
// // //                 <div className="button-row compact">
// // //                   <button className="btn-number compact" onClick={handleToggleSign}>±</button>
// // //                   <button className="btn-number compact" onClick={() => handleDirectNumber('0')}>0</button>
// // //                   <button className="btn-number compact" onClick={handleDecimal}>.</button>
// // //                   <button className="btn-equals compact" onClick={handleCalculate}>=</button>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>

// // //           {/* Right Column: History and Shortcuts */}
// // //           <div className="calculator-right-column">
// // //             {/* Calculation History */}
// // //             <div className="calculator-history-section compact">
// // //               <div className="section-header">
// // //                 <h3>History ({calculationHistory.length})</h3>
// // //                 {calculationHistory.length > 0 && (
// // //                   <button className="clear-history-btn" onClick={() => setCalculationHistory([])}>
// // //                     Clear
// // //                   </button>
// // //                 )}
// // //               </div>
              
// // //               {calculationHistory.length === 0 ? (
// // //                 <div className="empty-state compact">
// // //                   <p>No calculations yet</p>
// // //                 </div>
// // //               ) : (
// // //                 <div className="history-list compact">
// // //                   {calculationHistory.map((item, index) => (
// // //                     <div key={index} className="history-item compact">
// // //                       <div className="history-expression">{item.expression}</div>
// // //                       <div className="history-result">= {formatNumber(item.result)}</div>
// // //                       <div className="history-time">{item.timestamp}</div>
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               )}
// // //             </div>

// // //             {/* Voice Commands Guide */}
// // //             <div className="keyboard-shortcuts-section compact">
// // //               <h3>Better Voice Commands</h3>
// // //               <div className="shortcuts-grid compact">
// // //                 <div className="shortcut-item compact">
// // //                   <span className="shortcut-key">Numbers</span>
// // //                   <span className="shortcut-description">"twenty three" (not "two three")</span>
// // //                 </div>
// // //                 <div className="shortcut-item compact">
// // //                   <span className="shortcut-key">Operations</span>
// // //                   <span className="shortcut-description">"plus", "minus", "multiply", "divide"</span>
// // //                 </div>
// // //                 <div className="shortcut-item compact">
// // //                   <span className="shortcut-key">Calculate</span>
// // //                   <span className="shortcut-description">"equals" or "calculate"</span>
// // //                 </div>
// // //                 <div className="shortcut-item compact">
// // //                   <span className="shortcut-key">Clear</span>
// // //                   <span className="shortcut-description">"clear" or "reset"</span>
// // //                 </div>
// // //                 <div className="shortcut-item compact">
// // //                   <span className="shortcut-key">Special</span>
// // //                   <span className="shortcut-description">"percent", "square root"</span>
// // //                 </div>
// // //                 <div className="shortcut-item compact">
// // //                   <span className="shortcut-key">Navigation</span>
// // //                   <span className="shortcut-description">"dashboard", "help"</span>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Status Bar */}
// // //       <div className="status-bar">
// // //         <p>{status}</p>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default TalkingCalculator;




// // import React, { useState, useEffect, useCallback, useRef } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { voiceService } from '../../services/voiceService';
// // import './TalkingCalculator.css';

// // const TalkingCalculator = () => {
// //   const navigate = useNavigate();
  
// //   // Calculator state
// //   const [currentDisplay, setCurrentDisplay] = useState('0');
// //   const [previousValue, setPreviousValue] = useState(null);
// //   const [currentOperation, setCurrentOperation] = useState(null);
// //   const [waitingForNewValue, setWaitingForNewValue] = useState(false);
// //   const [calculationHistory, setCalculationHistory] = useState([]);
// //   const [isSpeaking, setIsSpeaking] = useState(true);
// //   const [status, setStatus] = useState("Talking Calculator is ready");
// //   const [spokenText, setSpokenText] = useState("");
  
// //   // Refs
// //   const commandsRegisteredRef = useRef(false);
// //   const lastSpokenTimeRef = useRef(0);
// //   const speechQueueRef = useRef([]);
// //   const isSpeakingRef = useRef(false);

// //   // Mathematical operations
// //   const mathOperations = {
// //     add: (a, b) => a + b,
// //     subtract: (a, b) => a - b,
// //     multiply: (a, b) => a * b,
// //     divide: (a, b) => {
// //       if (b === 0) throw new Error("Cannot divide by zero");
// //       return a / b;
// //     },
// //     power: (a, b) => Math.pow(a, b),
// //     percentage: (a, b) => (a * b) / 100,
// //     squareRoot: (a) => Math.sqrt(a)
// //   };

// //   // Operation symbols for display
// //   const operationSymbols = {
// //     add: '+',
// //     subtract: '−',
// //     multiply: '×',
// //     divide: '÷',
// //     power: '^',
// //     percentage: '%',
// //     squareRoot: '√'
// //   };

// //   // Number words mapping for 1-100
// //   const numberWordsMap = useRef({});
  
// //   // Initialize number words mapping for 1-100
// //   useEffect(() => {
// //     const map = {};
    
// //     // Single digits
// //     const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
// //     const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
// //     const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    
// //     // Add 0-9
// //     for (let i = 0; i <= 9; i++) {
// //       map[ones[i] || 'zero'] = i.toString();
// //     }
    
// //     // Add 10-19
// //     for (let i = 0; i <= 9; i++) {
// //       map[teens[i]] = (10 + i).toString();
// //     }
    
// //     // Add 20-99
// //     for (let ten = 2; ten <= 9; ten++) {
// //       for (let one = 0; one <= 9; one++) {
// //         if (one === 0) {
// //           map[tens[ten]] = (ten * 10).toString();
// //         } else {
// //           map[`${tens[ten]} ${ones[one]}`] = (ten * 10 + one).toString();
// //           map[`${tens[ten]}-${ones[one]}`] = (ten * 10 + one).toString();
// //         }
// //       }
// //     }
    
// //     // Add 100
// //     map['hundred'] = '100';
// //     map['one hundred'] = '100';
    
// //     numberWordsMap.current = map;
// //   }, []);

// //   // Fast speak function - minimal delay
// //   const speak = useCallback((text, immediate = false) => {
// //     if (!isSpeaking && !immediate) return;
    
// //     const synth = window.speechSynthesis;
// //     if (!synth) return;
    
// //     // Cancel only if we're speaking a lot
// //     const now = Date.now();
// //     if (now - lastSpokenTimeRef.current < 500) {
// //       synth.cancel();
// //     }
    
// //     const utter = new SpeechSynthesisUtterance(text);
// //     utter.rate = 1.2; // Faster speech
// //     utter.pitch = 1;
// //     utter.volume = 1;
    
// //     utter.onend = () => {
// //       isSpeakingRef.current = false;
// //       lastSpokenTimeRef.current = Date.now();
      
// //       // Process next in queue
// //       if (speechQueueRef.current.length > 0) {
// //         const nextText = speechQueueRef.current.shift();
// //         speak(nextText, true);
// //       }
// //     };
    
// //     utter.onerror = () => {
// //       isSpeakingRef.current = false;
// //       lastSpokenTimeRef.current = Date.now();
// //     };
    
// //     if (isSpeakingRef.current) {
// //       speechQueueRef.current.push(text);
// //     } else {
// //       isSpeakingRef.current = true;
// //       lastSpokenTimeRef.current = Date.now();
// //       synth.speak(utter);
// //     }
// //   }, [isSpeaking]);

// //   // Format number for display
// //   const formatNumber = useCallback((num) => {
// //     if (num === null || num === undefined) return '0';
// //     if (typeof num !== 'number') return num;
    
// //     const numStr = num.toString();
// //     if (numStr.length > 10) {
// //       if (Math.abs(num) > 1e10) {
// //         return num.toExponential(5);
// //       }
// //       return parseFloat(num.toFixed(8)).toString();
// //     }
// //     return numStr;
// //   }, []);

// //   // Fast number input
// //   const handleNumberInput = useCallback((number) => {
// //     console.log("Number input:", number);
    
// //     if (waitingForNewValue) {
// //       setCurrentDisplay(number);
// //       setWaitingForNewValue(false);
// //     } else {
// //       setCurrentDisplay(prev => 
// //         prev === '0' || prev === 'Error' ? number : prev + number
// //       );
// //     }
    
// //     // Don't speak every digit, just update status
// //     setStatus(`Entered: ${number}`);
// //   }, [waitingForNewValue]);

// //   // Handle direct number input
// //   const handleDirectNumber = useCallback((number) => {
// //     console.log("Direct number input:", number);
    
// //     if (waitingForNewValue) {
// //       setCurrentDisplay(number);
// //       setWaitingForNewValue(false);
// //     } else {
// //       setCurrentDisplay(prev => 
// //         prev === '0' || prev === 'Error' ? number : prev + number
// //       );
// //     }
    
// //     setStatus(`Entered: ${number}`);
// //   }, [waitingForNewValue]);

// //   // Fast decimal point
// //   const handleDecimal = useCallback(() => {
// //     if (waitingForNewValue) {
// //       setCurrentDisplay('0.');
// //       setWaitingForNewValue(false);
// //     } else if (!currentDisplay.includes('.')) {
// //       setCurrentDisplay(prev => prev + '.');
// //     }
    
// //     setStatus("Decimal point added");
// //   }, [currentDisplay, waitingForNewValue]);

// //   // Fast calculation
// //   const handleCalculate = useCallback(() => {
// //     if (currentOperation === null || previousValue === null) {
// //       setStatus("Nothing to calculate");
// //       speak("Nothing to calculate", true);
// //       return;
// //     }

// //     const prevVal = previousValue;
// //     const currVal = parseFloat(currentDisplay);
    
// //     try {
// //       const operationFunction = mathOperations[currentOperation];
// //       let result;
      
// //       if (currentOperation === 'squareRoot') {
// //         result = operationFunction(currVal);
// //       } else {
// //         result = operationFunction(prevVal, currVal);
// //       }
      
// //       // Add to history
// //       const historyEntry = {
// //         expression: currentOperation === 'squareRoot' 
// //           ? `√(${currVal})`
// //           : `${prevVal} ${operationSymbols[currentOperation]} ${currVal}`,
// //         result: result,
// //         timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
// //       };
      
// //       setCalculationHistory(prev => [historyEntry, ...prev.slice(0, 9)]);
// //       const resultText = formatNumber(result);
// //       setCurrentDisplay(resultText);
// //       setPreviousValue(result);
// //       setCurrentOperation(null);
// //       setWaitingForNewValue(true);
      
// //       setStatus(`Result: ${resultText}`);
// //       speak(`Result is ${resultText}`, true);
      
// //     } catch (error) {
// //       console.error("Calculation error:", error);
// //       setCurrentDisplay('Error');
// //       setStatus("Calculation error");
// //       speak("Error in calculation", true);
// //     }
// //   }, [currentOperation, currentDisplay, previousValue, formatNumber, speak]);

// //   // Fast operation handling
// //   const handleOperation = useCallback((operation) => {
// //     const inputValue = parseFloat(currentDisplay);
    
// //     // If we already have an operation, calculate first
// //     if (currentOperation !== null && previousValue !== null && !waitingForNewValue) {
// //       handleCalculate();
      
// //       // Set up the next operation after calculation
// //       setTimeout(() => {
// //         setPreviousValue(parseFloat(currentDisplay));
// //         setCurrentOperation(operation);
// //         setWaitingForNewValue(true);
        
// //         const operationText = getOperationText(operation);
// //         setStatus(`Operation: ${operationText}`);
// //         speak(operationText, true);
// //       }, 100);
// //     } else {
// //       // No previous operation, just set up the new one
// //       setPreviousValue(inputValue);
// //       setCurrentOperation(operation);
// //       setWaitingForNewValue(true);
      
// //       const operationText = getOperationText(operation);
// //       setStatus(`Operation: ${operationText}`);
// //       speak(operationText, true);
// //     }
// //   }, [currentDisplay, currentOperation, previousValue, waitingForNewValue, handleCalculate, speak]);

// //   // Helper function for operation text
// //   const getOperationText = (operation) => {
// //     const operationNames = {
// //       add: "plus",
// //       subtract: "minus",
// //       multiply: "multiply",
// //       divide: "divide",
// //       power: "power",
// //       percentage: "percent",
// //       squareRoot: "square root"
// //     };
// //     return operationNames[operation] || operation;
// //   };

// //   // Clear calculator
// //   const handleClear = useCallback(() => {
// //     setCurrentDisplay('0');
// //     setPreviousValue(null);
// //     setCurrentOperation(null);
// //     setWaitingForNewValue(false);
// //     setStatus("Calculator cleared");
// //     speak("Cleared", true);
// //   }, [speak]);

// //   // Clear entry only
// //   const handleClearEntry = useCallback(() => {
// //     setCurrentDisplay('0');
// //     setStatus("Entry cleared");
// //     speak("Cleared", true);
// //   }, [speak]);

// //   // Toggle sign
// //   const handleToggleSign = useCallback(() => {
// //     setCurrentDisplay(prev => formatNumber(-parseFloat(prev)));
// //     setStatus("Sign toggled");
// //   }, [formatNumber]);

// //   // Percentage
// //   const handlePercentage = useCallback(() => {
// //     const value = parseFloat(currentDisplay);
// //     const result = value / 100;
// //     setCurrentDisplay(formatNumber(result));
// //     setStatus(`Percentage: ${formatNumber(result)}`);
// //   }, [currentDisplay, formatNumber]);

// //   // Square root
// //   const handleSquareRoot = useCallback(() => {
// //     const value = parseFloat(currentDisplay);
// //     if (value < 0) {
// //       setCurrentDisplay('Error');
// //       setStatus("Error: Cannot calculate square root of negative number");
// //       speak("Negative square root error", true);
// //       return;
// //     }
// //     const result = Math.sqrt(value);
// //     const historyEntry = {
// //       expression: `√(${value})`,
// //       result: result,
// //       timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
// //     };
// //     setCalculationHistory(prev => [historyEntry, ...prev.slice(0, 9)]);
// //     const resultText = formatNumber(result);
// //     setCurrentDisplay(resultText);
// //     setStatus(`Square root: ${resultText}`);
// //     speak(`Square root is ${resultText}`, true);
// //   }, [currentDisplay, formatNumber, speak]);

// //   // Toggle speech
// //   const toggleSpeech = useCallback(() => {
// //     setIsSpeaking(prev => {
// //       const newState = !prev;
// //       setStatus(newState ? "Voice feedback enabled" : "Voice feedback disabled");
      
// //       if (newState) {
// //         if (voiceService.isAvailable()) {
// //           voiceService.startListening();
// //         }
// //         speak("Voice on", true);
// //       } else {
// //         if (voiceService.isListening) {
// //           voiceService.stopListening();
// //         }
// //         speak("Voice off", true);
// //       }
      
// //       return newState;
// //     });
// //   }, [speak]);

// //   // Parse full expressions like "two plus three"
// //   const parseFullExpression = useCallback((text) => {
// //     const lowerText = text.toLowerCase().trim();
    
// //     // Common patterns
// //     const patterns = [
// //       // Pattern: number operation number
// //       /^(\w+(?:\s+\w+)*?)\s+(plus|add|minus|subtract|multiply|times|divide|over)\s+(\w+(?:\s+\w+)*?)$/,
// //       // Pattern: calculate number operation number
// //       /^calculate\s+(\w+(?:\s+\w+)*?)\s+(plus|add|minus|subtract|multiply|times|divide|over)\s+(\w+(?:\s+\w+)*?)$/,
// //       // Pattern: what is number operation number
// //       /^what(?:'s| is)\s+(\w+(?:\s+\w+)*?)\s+(plus|add|minus|subtract|multiply|times|divide|over)\s+(\w+(?:\s+\w+)*?)$/,
// //     ];
    
// //     for (const pattern of patterns) {
// //       const match = lowerText.match(pattern);
// //       if (match) {
// //         const num1Text = match[1];
// //         const opText = match[2];
// //         const num2Text = match[3];
        
// //         // Convert text to numbers
// //         const num1 = parseSpokenNumber(num1Text);
// //         const num2 = parseSpokenNumber(num2Text);
        
// //         if (num1 && num2) {
// //           // Convert operation text to operation code
// //           const opMap = {
// //             'plus': 'add',
// //             'add': 'add',
// //             'minus': 'subtract',
// //             'subtract': 'subtract',
// //             'multiply': 'multiply',
// //             'times': 'multiply',
// //             'divide': 'divide',
// //             'over': 'divide'
// //           };
          
// //           const operation = opMap[opText];
          
// //           if (operation) {
// //             // Perform calculation immediately
// //             const num1Val = parseFloat(num1);
// //             const num2Val = parseFloat(num2);
            
// //             try {
// //               const result = mathOperations[operation](num1Val, num2Val);
// //               const resultText = formatNumber(result);
              
// //               // Add to history
// //               const historyEntry = {
// //                 expression: `${num1Val} ${operationSymbols[operation]} ${num2Val}`,
// //                 result: result,
// //                 timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
// //               };
              
// //               setCalculationHistory(prev => [historyEntry, ...prev.slice(0, 9)]);
// //               setCurrentDisplay(resultText);
// //               setPreviousValue(result);
// //               setCurrentOperation(null);
// //               setWaitingForNewValue(true);
              
// //               setStatus(`${num1Val} ${operation} ${num2Val} = ${resultText}`);
// //               speak(`Result is ${resultText}`, true);
              
// //               return true; // Successfully parsed and calculated
// //             } catch (error) {
// //               console.error("Calculation error in parseFullExpression:", error);
// //             }
// //           }
// //         }
// //       }
// //     }
    
// //     return false; // Not a full expression
// //   }, [formatNumber, speak]);

// //   // Parse spoken number text
// //   const parseSpokenNumber = useCallback((text) => {
// //     const lowerText = text.toLowerCase().trim();
    
// //     // Check direct mapping first
// //     if (numberWordsMap.current[lowerText]) {
// //       return numberWordsMap.current[lowerText];
// //     }
    
// //     // Check for hyphenated numbers
// //     if (lowerText.includes('-')) {
// //       const parts = lowerText.split('-');
// //       let result = '';
// //       for (const part of parts) {
// //         if (numberWordsMap.current[part.trim()]) {
// //           result += numberWordsMap.current[part.trim()];
// //         }
// //       }
// //       if (result) return result;
// //     }
    
// //     // Check for spaced numbers (like "twenty three")
// //     const words = lowerText.split(/\s+/);
// //     if (words.length > 1) {
// //       const mapped = words.map(word => numberWordsMap.current[word]).filter(Boolean);
// //       if (mapped.length === words.length) {
// //         return mapped.join('');
// //       }
// //     }
    
// //     // Try to parse as regular number
// //     if (/^\d+$/.test(lowerText)) {
// //       return lowerText;
// //     }
    
// //     return null;
// //   }, []);

// //   // Register voice commands
// //   const registerVoiceCommands = useCallback(() => {
// //     if (!voiceService.isAvailable()) {
// //       console.log("Voice service not available");
// //       setStatus("Voice service not available");
// //       return;
// //     }

// //     try {
// //       voiceService.clearCommands();
      
// //       console.log("Registering calculator voice commands");
      
// //       // Navigation commands
// //       voiceService.registerCommand('dashboard', () => {
// //         setSpokenText("dashboard");
// //         speak("Going to dashboard", true);
// //         setTimeout(() => navigate("/dashboard"), 1000);
// //       });
      
// //       voiceService.registerCommand('home', () => {
// //         setSpokenText("home");
// //         speak("Going home", true);
// //         setTimeout(() => navigate("/dashboard"), 1000);
// //       });
      
// //       // Calculator commands
// //       voiceService.registerCommand('calculate', () => {
// //         setSpokenText("calculate");
// //         handleCalculate();
// //       });
      
// //       voiceService.registerCommand('equals', () => {
// //         setSpokenText("equals");
// //         handleCalculate();
// //       });
      
// //       voiceService.registerCommand('clear', () => {
// //         setSpokenText("clear");
// //         handleClear();
// //       });
      
// //       voiceService.registerCommand('reset', () => {
// //         setSpokenText("reset");
// //         handleClear();
// //       });
      
// //       // Operation commands
// //       const operationCommands = {
// //         'plus': 'add',
// //         'add': 'add',
// //         'minus': 'subtract',
// //         'subtract': 'subtract',
// //         'multiply': 'multiply',
// //         'times': 'multiply',
// //         'divide': 'divide',
// //         'over': 'divide',
// //         'percent': 'percentage',
// //         'square root': 'squareRoot',
// //         'root': 'squareRoot',
// //         'power': 'power',
// //         'to the power': 'power'
// //       };
      
// //       Object.entries(operationCommands).forEach(([command, operation]) => {
// //         voiceService.registerCommand(command, () => {
// //           setSpokenText(command);
// //           handleOperation(operation);
// //         });
// //       });
      
// //       // Decimal point
// //       voiceService.registerCommand('point', () => {
// //         setSpokenText("point");
// //         handleDecimal();
// //       });
      
// //       voiceService.registerCommand('decimal', () => {
// //         setSpokenText("decimal");
// //         handleDecimal();
// //       });
      
// //       // Voice control
// //       voiceService.registerCommand('voice on', () => {
// //         setSpokenText("voice on");
// //         if (!isSpeaking) toggleSpeech();
// //       });
      
// //       voiceService.registerCommand('voice off', () => {
// //         setSpokenText("voice off");
// //         if (isSpeaking) toggleSpeech();
// //       });
      
// //       voiceService.registerCommand('toggle voice', () => {
// //         setSpokenText("toggle voice");
// //         toggleSpeech();
// //       });
      
// //       // Help command
// //       voiceService.registerCommand('help', () => {
// //         setSpokenText("help");
// //         const helpText = "You can say full expressions like 'two plus three' or individual commands. Say numbers 1 to 100. Say 'equals' for result. Say 'clear' to reset.";
// //         speak(helpText, true);
// //       });
      
// //       // Register numbers 1-100
// //       Object.entries(numberWordsMap.current).forEach(([word, number]) => {
// //         voiceService.registerCommand(word, () => {
// //           setSpokenText(word);
// //           handleDirectNumber(number);
// //         });
// //       });
      
// //       // Also register digits 0-9
// //       for (let i = 0; i <= 9; i++) {
// //         voiceService.registerCommand(i.toString(), () => {
// //           setSpokenText(i.toString());
// //           handleNumberInput(i.toString());
// //         });
// //       }
      
// //       // Handle all other voice input for full expressions
// //       voiceService.onResultCallback = (transcript) => {
// //         console.log("Voice input received:", transcript);
// //         setSpokenText(transcript);
        
// //         // First try to parse as full expression
// //         const wasFullExpression = parseFullExpression(transcript);
// //         if (wasFullExpression) {
// //           return;
// //         }
        
// //         // If not a full expression, try to parse as single number
// //         const parsedNumber = parseSpokenNumber(transcript);
// //         if (parsedNumber) {
// //           console.log("Parsed as number:", parsedNumber);
// //           handleDirectNumber(parsedNumber);
// //         }
// //       };
      
// //       commandsRegisteredRef.current = true;
// //       console.log("Voice commands registered successfully");
      
// //     } catch (error) {
// //       console.error("Error registering voice commands:", error);
// //       setStatus("Error setting up voice commands");
// //     }
// //   }, [navigate, speak, handleCalculate, handleClear, handleOperation, 
// //       handleDecimal, isSpeaking, toggleSpeech, handleNumberInput, 
// //       handleDirectNumber, parseFullExpression, parseSpokenNumber]);

// //   // Initialize voice commands
// //   useEffect(() => {
// //     // Only register commands once
// //     if (!commandsRegisteredRef.current) {
// //       registerVoiceCommands();
      
// //       // Start listening if speaking is enabled
// //       if (isSpeaking && voiceService.isAvailable()) {
// //         voiceService.startListening();
// //         setStatus("Voice commands ready");
// //         setTimeout(() => {
// //           speak("Ready. Say numbers or expressions like 'two plus three'.", true);
// //         }, 500);
// //       }
// //     }
    
// //     // Clean up on unmount
// //     return () => {
// //       if (voiceService.isListening) {
// //         voiceService.stopListening();
// //       }
// //     };
// //   }, [registerVoiceCommands, isSpeaking, speak]);

// //   // Fast keyboard input with immediate response
// //   useEffect(() => {
// //     const handleKeyDown = (e) => {
// //       const key = e.key;
      
// //       // Prevent default for calculator keys to avoid browser shortcuts
// //       if ('0123456789.+-*/=EnterEscapeDeleteBackspace%^rR'.includes(key)) {
// //         e.preventDefault();
// //       }
      
// //       if (key >= '0' && key <= '9') {
// //         handleNumberInput(key);
// //       } else if (key === '.') {
// //         handleDecimal();
// //       } else if (key === '+') {
// //         handleOperation('add');
// //       } else if (key === '-') {
// //         handleOperation('subtract');
// //       } else if (key === '*') {
// //         handleOperation('multiply');
// //       } else if (key === '/') {
// //         handleOperation('divide');
// //       } else if (key === 'Enter' || key === '=') {
// //         handleCalculate();
// //       } else if (key === 'Escape' || key === 'Delete') {
// //         handleClear();
// //       } else if (key === 'Backspace') {
// //         handleClearEntry();
// //       } else if (key === '%') {
// //         handlePercentage();
// //       } else if (key === '^') {
// //         handleOperation('power');
// //       } else if (key === 'r' || key === 'R') {
// //         handleSquareRoot();
// //       }
// //     };

// //     window.addEventListener('keydown', handleKeyDown, true);
// //     return () => window.removeEventListener('keydown', handleKeyDown, true);
// //   }, [handleNumberInput, handleDecimal, handleOperation, handleCalculate, 
// //       handleClear, handleClearEntry, handlePercentage, handleSquareRoot]);

// //   // Handle logout
// //   const handleLogout = async () => {
// //     setStatus("Logging out...");
// //     speak("Logging out", true);
    
// //     if (voiceService.isListening) {
// //       voiceService.stopListening();
// //     }
    
// //     localStorage.clear();
    
// //     setTimeout(() => navigate("/"), 1000);
// //   };

// //   const handleBackToDashboard = () => {
// //     navigate("/dashboard");
// //   };

// //   // Current expression for display
// //   const currentExpression = currentOperation && previousValue !== null
// //     ? `${previousValue} ${operationSymbols[currentOperation] || currentOperation} ${waitingForNewValue ? '' : currentDisplay}`
// //     : '';

// //   return (
// //     <div className="talking-calculator-container">
// //       {/* Fixed Header */}
// //       <header className="dashboard-header fixed-header">
// //         <div className="header-content">
// //           <div className="header-left">
// //             <button className="back-btn" onClick={handleBackToDashboard}>
// //               ← Dashboard
// //             </button>
// //             <h1 className="logo">Vision Assist</h1>
// //           </div>
          
// //           {/* Spoken Text Display */}
// //           <div className="header-center">
// //             {spokenText && (
// //               <div className="spoken-text-display">
// //                 <span className="spoken-label">🎤 Heard:</span> <strong>{spokenText}</strong>
// //               </div>
// //             )}
// //           </div>
          
// //           <div className="user-menu">
// //             <button className="logout-btn" onClick={handleLogout}>
// //               Logout
// //             </button>
// //           </div>
// //         </div>
// //       </header>

// //       <div className="calculator-content">
// //         <div className="calculator-header">
// //           <h2>🧮 Fast Talking Calculator</h2>
// //           <p>Speak naturally: "twenty three plus fifteen" or individual commands</p>
// //         </div>

// //         {/* Status Message */}
// //         {status && (
// //           <div className="status-message">
// //             {status}
// //           </div>
// //         )}

// //         {/* Quick Voice Tips */}
// //         <div className="voice-tips">
// //           <p><strong>Tip:</strong> Say full expressions like "two plus three" or use individual commands</p>
// //         </div>

// //         {/* Main Layout */}
// //         <div className="calculator-main-layout">
// //           {/* Left Column: Calculator and Controls */}
// //           <div className="calculator-left-column">
// //             {/* Display Section */}
// //             <div className="calculator-display-section compact">
// //               <div className="expression-display">
// //                 {currentExpression || 'Ready for calculation'}
// //               </div>
// //               <div className="result-display">
// //                 {currentDisplay}
// //               </div>
// //             </div>

// //             {/* Voice Controls */}
// //             <div className="voice-controls-section compact">
// //               <div className="voice-controls-header">
// //                 <span>Voice Controls</span>
// //                 <button 
// //                   className={`voice-toggle-btn ${isSpeaking ? 'active' : ''}`}
// //                   onClick={toggleSpeech}
// //                 >
// //                   {isSpeaking ? '🔊 ON' : '🔈 OFF'}
// //                 </button>
// //               </div>
// //               <div className="voice-buttons">
// //                 <button 
// //                   className="voice-command-btn"
// //                   onClick={() => {
// //                     const value = currentDisplay === '0' ? 'zero' : currentDisplay;
// //                     speak(`Current value is ${value}`, true);
// //                   }}
// //                 >
// //                   Speak Value
// //                 </button>
// //                 <button 
// //                   className="voice-command-btn"
// //                   onClick={() => handleClear()}
// //                 >
// //                   Quick Clear
// //                 </button>
// //               </div>
// //             </div>

// //             {/* Fast Calculator Buttons */}
// //             <div className="calculator-buttons-section compact">
// //               <div className="calculator-buttons-grid fast-buttons">
// //                 {/* First Row */}
// //                 <div className="button-row compact">
// //                   <button className="btn-clear compact" onClick={handleClear}>C</button>
// //                   <button className="btn-clear-entry compact" onClick={handleClearEntry}>CE</button>
// //                   <button className="btn-operation compact" onClick={handlePercentage}>%</button>
// //                   <button className="btn-operation compact" onClick={handleSquareRoot}>√</button>
// //                   <button className="btn-operation compact" onClick={() => handleOperation('divide')}>÷</button>
// //                 </div>

// //                 {/* Number Rows */}
// //                 <div className="button-row compact">
// //                   <button className="btn-number compact" onClick={() => handleNumberInput('7')}>7</button>
// //                   <button className="btn-number compact" onClick={() => handleNumberInput('8')}>8</button>
// //                   <button className="btn-number compact" onClick={() => handleNumberInput('9')}>9</button>
// //                   <button className="btn-operation compact" onClick={() => handleOperation('multiply')}>×</button>
// //                 </div>

// //                 <div className="button-row compact">
// //                   <button className="btn-number compact" onClick={() => handleNumberInput('4')}>4</button>
// //                   <button className="btn-number compact" onClick={() => handleNumberInput('5')}>5</button>
// //                   <button className="btn-number compact" onClick={() => handleNumberInput('6')}>6</button>
// //                   <button className="btn-operation compact" onClick={() => handleOperation('subtract')}>−</button>
// //                 </div>

// //                 <div className="button-row compact">
// //                   <button className="btn-number compact" onClick={() => handleNumberInput('1')}>1</button>
// //                   <button className="btn-number compact" onClick={() => handleNumberInput('2')}>2</button>
// //                   <button className="btn-number compact" onClick={() => handleNumberInput('3')}>3</button>
// //                   <button className="btn-operation compact" onClick={() => handleOperation('add')}>+</button>
// //                 </div>

// //                 {/* Last Row */}
// //                 <div className="button-row compact">
// //                   <button className="btn-number compact" onClick={handleToggleSign}>±</button>
// //                   <button className="btn-number compact" onClick={() => handleNumberInput('0')}>0</button>
// //                   <button className="btn-number compact" onClick={handleDecimal}>.</button>
// //                   <button className="btn-equals compact" onClick={handleCalculate}>=</button>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Right Column: History and Shortcuts */}
// //           <div className="calculator-right-column">
// //             {/* Calculation History */}
// //             <div className="calculator-history-section compact">
// //               <div className="section-header">
// //                 <h3>History ({calculationHistory.length})</h3>
// //                 {calculationHistory.length > 0 && (
// //                   <button className="clear-history-btn" onClick={() => setCalculationHistory([])}>
// //                     Clear
// //                   </button>
// //                 )}
// //               </div>
              
// //               {calculationHistory.length === 0 ? (
// //                 <div className="empty-state compact">
// //                   <p>No calculations yet</p>
// //                 </div>
// //               ) : (
// //                 <div className="history-list compact">
// //                   {calculationHistory.map((item, index) => (
// //                     <div key={index} className="history-item compact">
// //                       <div className="history-expression">{item.expression}</div>
// //                       <div className="history-result">= {formatNumber(item.result)}</div>
// //                       <div className="history-time">{item.timestamp}</div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               )}
// //             </div>

// //             {/* Voice Commands Guide */}
// //             <div className="keyboard-shortcuts-section compact">
// //               <h3>Voice Commands (Fast)</h3>
// //               <div className="shortcuts-grid compact">
// //                 <div className="shortcut-item compact">
// //                   <span className="shortcut-key">Full Expression</span>
// //                   <span className="shortcut-description">"two plus three" or "ten minus five"</span>
// //                 </div>
// //                 <div className="shortcut-item compact">
// //                   <span className="shortcut-key">Numbers 1-100</span>
// //                   <span className="shortcut-description">"twenty three", "fifty six", "one hundred"</span>
// //                 </div>
// //                 <div className="shortcut-item compact">
// //                   <span className="shortcut-key">Operations</span>
// //                   <span className="shortcut-description">"plus", "minus", "multiply", "divide"</span>
// //                 </div>
// //                 <div className="shortcut-item compact">
// //                   <span className="shortcut-key">Calculate</span>
// //                   <span className="shortcut-description">"equals" or "calculate"</span>
// //                 </div>
// //                 <div className="shortcut-item compact">
// //                   <span className="shortcut-key">Clear</span>
// //                   <span className="shortcut-description">"clear" or "reset"</span>
// //                 </div>
// //                 <div className="shortcut-item compact">
// //                   <span className="shortcut-key">Special</span>
// //                   <span className="shortcut-description">"percent", "square root"</span>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Status Bar */}
// //       <div className="status-bar">
// //         <p>{status}</p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default TalkingCalculator;









// // src/components/TalkingCalculator/TalkingCalculator.jsx
// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { voiceService } from '../../services/voiceService';
// import { initializeCalculatorCommands, stopCalculatorCommands } from '../../voice-commands/TalkingCalculatorVoiceCommands';
// import './TalkingCalculator.css';

// const TalkingCalculator = () => {
//   const navigate = useNavigate();
  
//   // Calculator state
//   const [currentDisplay, setCurrentDisplay] = useState('0');
//   const [previousValue, setPreviousValue] = useState(null);
//   const [currentOperation, setCurrentOperation] = useState(null);
//   const [waitingForNewValue, setWaitingForNewValue] = useState(false);
//   const [calculationHistory, setCalculationHistory] = useState([]);
//   const [isSpeaking, setIsSpeaking] = useState(true);
//   const [status, setStatus] = useState("Talking Calculator is ready");
//   const [spokenText, setSpokenText] = useState("");
  
//   // Refs
//   const commandsRegisteredRef = useRef(false);
//   const lastSpokenTimeRef = useRef(0);
//   const speechQueueRef = useRef([]);
//   const isSpeakingRef = useRef(false);

//   // Mathematical operations
//   const mathOperations = useRef({
//     add: (a, b) => a + b,
//     subtract: (a, b) => a - b,
//     multiply: (a, b) => a * b,
//     divide: (a, b) => {
//       if (b === 0) throw new Error("Cannot divide by zero");
//       return a / b;
//     },
//     power: (a, b) => Math.pow(a, b),
//     percentage: (a, b) => (a * b) / 100,
//     squareRoot: (a) => Math.sqrt(a)
//   }).current;

//   // Operation symbols for display
//   const operationSymbols = useRef({
//     add: '+',
//     subtract: '−',
//     multiply: '×',
//     divide: '÷',
//     power: '^',
//     percentage: '%',
//     squareRoot: '√'
//   }).current;

//   // Fast speak function
//   const speak = useCallback((text, immediate = false) => {
//     if (!isSpeaking && !immediate) return;
    
//     const synth = window.speechSynthesis;
//     if (!synth) return;
    
//     // Cancel only if we're speaking a lot
//     const now = Date.now();
//     if (now - lastSpokenTimeRef.current < 500) {
//       synth.cancel();
//     }
    
//     const utter = new SpeechSynthesisUtterance(text);
//     utter.rate = 1.2;
//     utter.pitch = 1;
//     utter.volume = 1;
    
//     utter.onend = () => {
//       isSpeakingRef.current = false;
//       lastSpokenTimeRef.current = Date.now();
      
//       // Process next in queue
//       if (speechQueueRef.current.length > 0) {
//         const nextText = speechQueueRef.current.shift();
//         speak(nextText, true);
//       }
//     };
    
//     utter.onerror = () => {
//       isSpeakingRef.current = false;
//       lastSpokenTimeRef.current = Date.now();
//     };
    
//     if (isSpeakingRef.current) {
//       speechQueueRef.current.push(text);
//     } else {
//       isSpeakingRef.current = true;
//       lastSpokenTimeRef.current = now;
//       synth.speak(utter);
//     }
//   }, [isSpeaking]);

//   // Format number for display
//   const formatNumber = useCallback((num) => {
//     if (num === null || num === undefined) return '0';
//     if (typeof num !== 'number') return num;
    
//     const numStr = num.toString();
//     if (numStr.length > 10) {
//       if (Math.abs(num) > 1e10) {
//         return num.toExponential(5);
//       }
//       return parseFloat(num.toFixed(8)).toString();
//     }
//     return numStr;
//   }, []);

//   // Fast number input
//   const handleNumberInput = useCallback((number) => {
//     if (waitingForNewValue) {
//       setCurrentDisplay(number);
//       setWaitingForNewValue(false);
//     } else {
//       setCurrentDisplay(prev => 
//         prev === '0' || prev === 'Error' ? number : prev + number
//       );
//     }
    
//     setStatus(`Entered: ${number}`);
//   }, [waitingForNewValue]);

//   // Handle direct number input
//   const handleDirectNumber = useCallback((number) => {
//     if (waitingForNewValue) {
//       setCurrentDisplay(number);
//       setWaitingForNewValue(false);
//     } else {
//       setCurrentDisplay(prev => 
//         prev === '0' || prev === 'Error' ? number : prev + number
//       );
//     }
    
//     setStatus(`Entered: ${number}`);
//   }, [waitingForNewValue]);

//   // Fast decimal point
//   const handleDecimal = useCallback(() => {
//     if (waitingForNewValue) {
//       setCurrentDisplay('0.');
//       setWaitingForNewValue(false);
//     } else if (!currentDisplay.includes('.')) {
//       setCurrentDisplay(prev => prev + '.');
//     }
    
//     setStatus("Decimal point added");
//   }, [currentDisplay, waitingForNewValue]);

//   // Fast calculation
//   const handleCalculate = useCallback(() => {
//     if (currentOperation === null || previousValue === null) {
//       setStatus("Nothing to calculate");
//       speak("Nothing to calculate", true);
//       return;
//     }

//     const prevVal = previousValue;
//     const currVal = parseFloat(currentDisplay);
    
//     try {
//       const operationFunction = mathOperations[currentOperation];
//       let result;
      
//       if (currentOperation === 'squareRoot') {
//         result = operationFunction(currVal);
//       } else {
//         result = operationFunction(prevVal, currVal);
//       }
      
//       // Add to history
//       const historyEntry = {
//         expression: currentOperation === 'squareRoot' 
//           ? `√(${currVal})`
//           : `${prevVal} ${operationSymbols[currentOperation]} ${currVal}`,
//         result: result,
//         timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
//       };
      
//       setCalculationHistory(prev => [historyEntry, ...prev.slice(0, 9)]);
//       const resultText = formatNumber(result);
//       setCurrentDisplay(resultText);
//       setPreviousValue(result);
//       setCurrentOperation(null);
//       setWaitingForNewValue(true);
      
//       setStatus(`Result: ${resultText}`);
//       speak(`Result is ${resultText}`, true);
      
//     } catch (error) {
//       console.error("Calculation error:", error);
//       setCurrentDisplay('Error');
//       setStatus("Calculation error");
//       speak("Error in calculation", true);
//     }
//   }, [currentOperation, currentDisplay, previousValue, formatNumber, speak, mathOperations, operationSymbols]);

//   // Fast operation handling
//   const handleOperation = useCallback((operation) => {
//     const inputValue = parseFloat(currentDisplay);
    
//     // If we already have an operation, calculate first
//     if (currentOperation !== null && previousValue !== null && !waitingForNewValue) {
//       handleCalculate();
      
//       // Set up the next operation after calculation
//       setTimeout(() => {
//         setPreviousValue(parseFloat(currentDisplay));
//         setCurrentOperation(operation);
//         setWaitingForNewValue(true);
        
//         const operationText = getOperationText(operation);
//         setStatus(`Operation: ${operationText}`);
//         speak(operationText, true);
//       }, 100);
//     } else {
//       // No previous operation, just set up the new one
//       setPreviousValue(inputValue);
//       setCurrentOperation(operation);
//       setWaitingForNewValue(true);
      
//       const operationText = getOperationText(operation);
//       setStatus(`Operation: ${operationText}`);
//       speak(operationText, true);
//     }
//   }, [currentDisplay, currentOperation, previousValue, waitingForNewValue, handleCalculate, speak]);

//   // Helper function for operation text
//   const getOperationText = (operation) => {
//     const operationNames = {
//       add: "plus",
//       subtract: "minus",
//       multiply: "multiply",
//       divide: "divide",
//       power: "power",
//       percentage: "percent",
//       squareRoot: "square root"
//     };
//     return operationNames[operation] || operation;
//   };

//   // Clear calculator
//   const handleClear = useCallback(() => {
//     setCurrentDisplay('0');
//     setPreviousValue(null);
//     setCurrentOperation(null);
//     setWaitingForNewValue(false);
//     setStatus("Calculator cleared");
//     speak("Cleared", true);
//   }, [speak]);

//   // Clear entry only
//   const handleClearEntry = useCallback(() => {
//     setCurrentDisplay('0');
//     setStatus("Entry cleared");
//     speak("Cleared", true);
//   }, [speak]);

//   // Toggle sign
//   const handleToggleSign = useCallback(() => {
//     setCurrentDisplay(prev => formatNumber(-parseFloat(prev)));
//     setStatus("Sign toggled");
//   }, [formatNumber]);

//   // Percentage
//   const handlePercentage = useCallback(() => {
//     const value = parseFloat(currentDisplay);
//     const result = value / 100;
//     setCurrentDisplay(formatNumber(result));
//     setStatus(`Percentage: ${formatNumber(result)}`);
//   }, [currentDisplay, formatNumber]);

//   // Square root
//   const handleSquareRoot = useCallback(() => {
//     const value = parseFloat(currentDisplay);
//     if (value < 0) {
//       setCurrentDisplay('Error');
//       setStatus("Error: Cannot calculate square root of negative number");
//       speak("Negative square root error", true);
//       return;
//     }
//     const result = Math.sqrt(value);
//     const historyEntry = {
//       expression: `√(${value})`,
//       result: result,
//       timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
//     };
//     setCalculationHistory(prev => [historyEntry, ...prev.slice(0, 9)]);
//     const resultText = formatNumber(result);
//     setCurrentDisplay(resultText);
//     setStatus(`Square root: ${resultText}`);
//     speak(`Square root is ${resultText}`, true);
//   }, [currentDisplay, formatNumber, speak]);

//   // Toggle speech
//   const toggleSpeech = useCallback(() => {
//     setIsSpeaking(prev => {
//       const newState = !prev;
//       setStatus(newState ? "Voice feedback enabled" : "Voice feedback disabled");
      
//       if (newState) {
//         if (voiceService.isAvailable()) {
//           voiceService.startListening();
//         }
//         speak("Voice on", true);
//       } else {
//         if (voiceService.isListening) {
//           voiceService.stopListening();
//         }
//         speak("Voice off", true);
//       }
      
//       return newState;
//     });
//   }, [speak]);

//   // Handle logout
//   const handleLogout = useCallback(async () => {
//     setStatus("Logging out...");
//     speak("Logging out", true);
    
//     if (voiceService.isListening) {
//       voiceService.stopListening();
//     }
    
//     localStorage.clear();
    
//     setTimeout(() => navigate("/"), 1000);
//   }, [navigate, speak]);

//   // Handle back to dashboard
//   const handleBackToDashboard = useCallback(() => {
//     navigate("/dashboard");
//   }, [navigate]);

//   // Initialize voice commands
//   useEffect(() => {
//     // Only register commands once
//     if (!commandsRegisteredRef.current) {
//       const handlers = {
//         navigate,
//         speak,
//         handleNumberInput,
//         handleDirectNumber,
//         handleCalculate,
//         handleClear,
//         handleOperation,
//         handleDecimal,
//         isSpeaking,
//         toggleSpeech,
//         setSpokenText,
//         setStatus,
//         setCurrentDisplay,
//         setPreviousValue,
//         setCurrentOperation,
//         setWaitingForNewValue,
//         setCalculationHistory,
//         formatNumber,
//         mathOperations,
//         operationSymbols
//       };
      
//       initializeCalculatorCommands(handlers);
//       commandsRegisteredRef.current = true;
      
//       // Start listening if speaking is enabled
//       if (isSpeaking && voiceService.isAvailable()) {
//         voiceService.startListening();
//         setStatus("Voice commands ready");
//         setTimeout(() => {
//           speak("Ready. Say numbers or expressions like 'two plus three'.", true);
//         }, 500);
//       }
//     }
    
//     // Clean up on unmount
//     return () => {
//       stopCalculatorCommands();
//     };
//   }, [isSpeaking, speak]);

//   // Fast keyboard input with immediate response
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       const key = e.key;
      
//       // Prevent default for calculator keys to avoid browser shortcuts
//       if ('0123456789.+-*/=EnterEscapeDeleteBackspace%^rR'.includes(key)) {
//         e.preventDefault();
//       }
      
//       if (key >= '0' && key <= '9') {
//         handleNumberInput(key);
//       } else if (key === '.') {
//         handleDecimal();
//       } else if (key === '+') {
//         handleOperation('add');
//       } else if (key === '-') {
//         handleOperation('subtract');
//       } else if (key === '*') {
//         handleOperation('multiply');
//       } else if (key === '/') {
//         handleOperation('divide');
//       } else if (key === 'Enter' || key === '=') {
//         handleCalculate();
//       } else if (key === 'Escape' || key === 'Delete') {
//         handleClear();
//       } else if (key === 'Backspace') {
//         handleClearEntry();
//       } else if (key === '%') {
//         handlePercentage();
//       } else if (key === '^') {
//         handleOperation('power');
//       } else if (key === 'r' || key === 'R') {
//         handleSquareRoot();
//       }
//     };

//     window.addEventListener('keydown', handleKeyDown, true);
//     return () => window.removeEventListener('keydown', handleKeyDown, true);
//   }, [handleNumberInput, handleDecimal, handleOperation, handleCalculate, 
//       handleClear, handleClearEntry, handlePercentage, handleSquareRoot]);

//   // Current expression for display
//   const currentExpression = currentOperation && previousValue !== null
//     ? `${previousValue} ${operationSymbols[currentOperation] || currentOperation} ${waitingForNewValue ? '' : currentDisplay}`
//     : '';

//   return (
//     <div className="talking-calculator-container">
//       {/* Fixed Header */}
//       <header className="dashboard-header fixed-header">
//         <div className="header-content">
//           <div className="header-left">
//             <button className="back-btn" onClick={handleBackToDashboard}>
//               ← Dashboard
//             </button>
//             <h1 className="logo">Vision Assist</h1>
//           </div>
          
//           {/* Spoken Text Display */}
//           <div className="header-center">
//             {spokenText && (
//               <div className="spoken-text-display">
//                 <span className="spoken-label">🎤 Heard:</span> <strong>{spokenText}</strong>
//               </div>
//             )}
//           </div>
          
//           <div className="user-menu">
//             <button className="voice-toggle-btn-small" onClick={toggleSpeech}>
//               {isSpeaking ? '🔊' : '🔇'}
//             </button>
//             <button className="logout-btn" onClick={handleLogout}>
//               Logout
//             </button>
//           </div>
//         </div>
//       </header>

//       <div className="calculator-content">
//         <div className="calculator-header">
//           <h2>🧮 Fast Talking Calculator</h2>
//           <p>Speak naturally: "twenty three plus fifteen" or individual commands</p>
//         </div>

//         {/* Status Message */}
//         {status && (
//           <div className="status-message">
//             {status}
//           </div>
//         )}

//         {/* Quick Voice Tips */}
//         <div className="voice-tips">
//           <p><strong>Tip:</strong> Say full expressions like "two plus three" or use individual commands</p>
//         </div>

//         {/* Main Layout */}
//         <div className="calculator-main-layout">
//           {/* Left Column: Calculator and Controls */}
//           <div className="calculator-left-column">
//             {/* Display Section */}
//             <div className="calculator-display-section compact">
//               <div className="expression-display">
//                 {currentExpression || 'Ready for calculation'}
//               </div>
//               <div className="result-display">
//                 {currentDisplay}
//               </div>
//             </div>

//             {/* Voice Controls */}
//             <div className="voice-controls-section compact">
//               <div className="voice-controls-header">
//                 <span>Voice Controls</span>
//                 <button 
//                   className={`voice-toggle-btn ${isSpeaking ? 'active' : ''}`}
//                   onClick={toggleSpeech}
//                 >
//                   {isSpeaking ? '🔊 ON' : '🔈 OFF'}
//                 </button>
//               </div>
//               <div className="voice-buttons">
//                 <button 
//                   className="voice-command-btn"
//                   onClick={() => {
//                     const value = currentDisplay === '0' ? 'zero' : currentDisplay;
//                     speak(`Current value is ${value}`, true);
//                   }}
//                 >
//                   Speak Value
//                 </button>
//                 <button 
//                   className="voice-command-btn"
//                   onClick={() => handleClear()}
//                 >
//                   Quick Clear
//                 </button>
//               </div>
//             </div>

//             {/* Fast Calculator Buttons */}
//             <div className="calculator-buttons-section compact">
//               <div className="calculator-buttons-grid fast-buttons">
//                 {/* First Row */}
//                 <div className="button-row compact">
//                   <button className="btn-clear compact" onClick={handleClear}>C</button>
//                   <button className="btn-clear-entry compact" onClick={handleClearEntry}>CE</button>
//                   <button className="btn-operation compact" onClick={handlePercentage}>%</button>
//                   <button className="btn-operation compact" onClick={handleSquareRoot}>√</button>
//                   <button className="btn-operation compact" onClick={() => handleOperation('divide')}>÷</button>
//                 </div>

//                 {/* Number Rows */}
//                 <div className="button-row compact">
//                   <button className="btn-number compact" onClick={() => handleNumberInput('7')}>7</button>
//                   <button className="btn-number compact" onClick={() => handleNumberInput('8')}>8</button>
//                   <button className="btn-number compact" onClick={() => handleNumberInput('9')}>9</button>
//                   <button className="btn-operation compact" onClick={() => handleOperation('multiply')}>×</button>
//                 </div>

//                 <div className="button-row compact">
//                   <button className="btn-number compact" onClick={() => handleNumberInput('4')}>4</button>
//                   <button className="btn-number compact" onClick={() => handleNumberInput('5')}>5</button>
//                   <button className="btn-number compact" onClick={() => handleNumberInput('6')}>6</button>
//                   <button className="btn-operation compact" onClick={() => handleOperation('subtract')}>−</button>
//                 </div>

//                 <div className="button-row compact">
//                   <button className="btn-number compact" onClick={() => handleNumberInput('1')}>1</button>
//                   <button className="btn-number compact" onClick={() => handleNumberInput('2')}>2</button>
//                   <button className="btn-number compact" onClick={() => handleNumberInput('3')}>3</button>
//                   <button className="btn-operation compact" onClick={() => handleOperation('add')}>+</button>
//                 </div>

//                 {/* Last Row */}
//                 <div className="button-row compact">
//                   <button className="btn-number compact" onClick={handleToggleSign}>±</button>
//                   <button className="btn-number compact" onClick={() => handleNumberInput('0')}>0</button>
//                   <button className="btn-number compact" onClick={handleDecimal}>.</button>
//                   <button className="btn-equals compact" onClick={handleCalculate}>=</button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Column: History and Shortcuts */}
//           <div className="calculator-right-column">
//             {/* Calculation History */}
//             <div className="calculator-history-section compact">
//               <div className="section-header">
//                 <h3>History ({calculationHistory.length})</h3>
//                 {calculationHistory.length > 0 && (
//                   <button className="clear-history-btn" onClick={() => setCalculationHistory([])}>
//                     Clear
//                   </button>
//                 )}
//               </div>
              
//               {calculationHistory.length === 0 ? (
//                 <div className="empty-state compact">
//                   <p>No calculations yet</p>
//                 </div>
//               ) : (
//                 <div className="history-list compact">
//                   {calculationHistory.map((item, index) => (
//                     <div key={index} className="history-item compact">
//                       <div className="history-expression">{item.expression}</div>
//                       <div className="history-result">= {formatNumber(item.result)}</div>
//                       <div className="history-time">{item.timestamp}</div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Voice Commands Guide */}
//             <div className="keyboard-shortcuts-section compact">
//               <h3>Voice Commands (Fast)</h3>
//               <div className="shortcuts-grid compact">
//                 <div className="shortcut-item compact">
//                   <span className="shortcut-key">Full Expression</span>
//                   <span className="shortcut-description">"two plus three" or "ten minus five"</span>
//                 </div>
//                 <div className="shortcut-item compact">
//                   <span className="shortcut-key">Numbers 1-100</span>
//                   <span className="shortcut-description">"twenty three", "fifty six", "one hundred"</span>
//                 </div>
//                 <div className="shortcut-item compact">
//                   <span className="shortcut-key">Operations</span>
//                   <span className="shortcut-description">"plus", "minus", "multiply", "divide"</span>
//                 </div>
//                 <div className="shortcut-item compact">
//                   <span className="shortcut-key">Calculate</span>
//                   <span className="shortcut-description">"equals" or "calculate"</span>
//                 </div>
//                 <div className="shortcut-item compact">
//                   <span className="shortcut-key">Clear</span>
//                   <span className="shortcut-description">"clear" or "reset"</span>
//                 </div>
//                 <div className="shortcut-item compact">
//                   <span className="shortcut-key">Special</span>
//                   <span className="shortcut-description">"percent", "square root"</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Status Bar */}
//       <div className="status-bar">
//         <p>{status}</p>
//       </div>
//     </div>
//   );
// };

// export default TalkingCalculator;


// src/components/TalkingCalculator/TalkingCalculator.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { voiceService } from '../../services/voiceService';
import { initializeCalculatorCommands, stopCalculatorCommands } from '../../voice-commands/TalkingCalculatorVoiceCommands';
import './TalkingCalculator.css';

const TalkingCalculator = () => {
  const navigate = useNavigate();
  
  // Calculator state
  const [currentDisplay, setCurrentDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [currentOperation, setCurrentOperation] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);
  const [calculationHistory, setCalculationHistory] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(true);
  const [status, setStatus] = useState("Talking Calculator is ready");
  const [spokenText, setSpokenText] = useState("");
  const [voiceActive, setVoiceActive] = useState(false);
  
  // Refs
  const commandsRegisteredRef = useRef(false);
  const lastSpokenTimeRef = useRef(0);
  const speechQueueRef = useRef([]);
  const isSpeakingRef = useRef(false);
  const componentMountedRef = useRef(true);

  // Mathematical operations
  const mathOperations = useRef({
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => {
      if (b === 0) throw new Error("Cannot divide by zero");
      return a / b;
    },
    power: (a, b) => Math.pow(a, b),
    percentage: (a, b) => (a * b) / 100,
    squareRoot: (a) => Math.sqrt(a)
  }).current;

  // Operation symbols for display
  const operationSymbols = useRef({
    add: '+',
    subtract: '−',
    multiply: '×',
    divide: '÷',
    power: '^',
    percentage: '%',
    squareRoot: '√'
  }).current;

  // Add this function to your TalkingCalculator.jsx component
const mapOperatorToOperation = useCallback((operator) => {
  const operatorMap = {
    '+': 'add',
    '-': 'subtract',
    '*': 'multiply',
    '×': 'multiply',
    '/': 'divide',
    '÷': 'divide',
    'plus': 'add',
    'add': 'add',
    'minus': 'subtract',
    'subtract': 'subtract',
    'multiply': 'multiply',
    'times': 'multiply',
    'divide': 'divide',
    'over': 'divide',
    'into': 'multiply'  // Indian English
  };
  
  return operatorMap[operator.toLowerCase()] || null;
}, []);

  // Fast speak function
  const speak = useCallback((text, immediate = false) => {
    if (!isSpeaking && !immediate) return;
    
    const synth = window.speechSynthesis;
    if (!synth) return;
    
    // Cancel only if we're speaking a lot
    const now = Date.now();
    if (now - lastSpokenTimeRef.current < 500) {
      synth.cancel();
    }
    
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1.2;
    utter.pitch = 1;
    utter.volume = 1;
    
    utter.onend = () => {
      isSpeakingRef.current = false;
      lastSpokenTimeRef.current = Date.now();
      
      // Process next in queue
      if (speechQueueRef.current.length > 0) {
        const nextText = speechQueueRef.current.shift();
        speak(nextText, true);
      }
    };
    
    utter.onerror = () => {
      isSpeakingRef.current = false;
      lastSpokenTimeRef.current = Date.now();
    };
    
    if (isSpeakingRef.current) {
      speechQueueRef.current.push(text);
    } else {
      isSpeakingRef.current = true;
      lastSpokenTimeRef.current = now;
      synth.speak(utter);
    }
  }, [isSpeaking]);

  // Format number for display
  const formatNumber = useCallback((num) => {
    if (num === null || num === undefined) return '0';
    if (typeof num !== 'number') return num;
    
    const numStr = num.toString();
    if (numStr.length > 10) {
      if (Math.abs(num) > 1e10) {
        return num.toExponential(5);
      }
      return parseFloat(num.toFixed(8)).toString();
    }
    return numStr;
  }, []);

  // Fast number input
  const handleNumberInput = useCallback((number) => {
    if (waitingForNewValue) {
      setCurrentDisplay(number);
      setWaitingForNewValue(false);
    } else {
      setCurrentDisplay(prev => 
        prev === '0' || prev === 'Error' ? number : prev + number
      );
    }
    
    setStatus(`Entered: ${number}`);
  }, [waitingForNewValue]);

  // Handle direct number input
  const handleDirectNumber = useCallback((number) => {
    if (waitingForNewValue) {
      setCurrentDisplay(number);
      setWaitingForNewValue(false);
    } else {
      setCurrentDisplay(prev => 
        prev === '0' || prev === 'Error' ? number : prev + number
      );
    }
    
    setStatus(`Entered: ${number}`);
  }, [waitingForNewValue]);

  // Fast decimal point
  const handleDecimal = useCallback(() => {
    if (waitingForNewValue) {
      setCurrentDisplay('0.');
      setWaitingForNewValue(false);
    } else if (!currentDisplay.includes('.')) {
      setCurrentDisplay(prev => prev + '.');
    }
    
    setStatus("Decimal point added");
  }, [currentDisplay, waitingForNewValue]);

  // Fast calculation
  const handleCalculate = useCallback(() => {
    if (currentOperation === null || previousValue === null) {
      setStatus("Nothing to calculate");
      speak("Nothing to calculate", true);
      return;
    }

    const prevVal = previousValue;
    const currVal = parseFloat(currentDisplay);
    
    try {
      const operationFunction = mathOperations[currentOperation];
      let result;
      
      if (currentOperation === 'squareRoot') {
        result = operationFunction(currVal);
      } else {
        result = operationFunction(prevVal, currVal);
      }
      
      // Add to history
      const historyEntry = {
        expression: currentOperation === 'squareRoot' 
          ? `√(${currVal})`
          : `${prevVal} ${operationSymbols[currentOperation]} ${currVal}`,
        result: result,
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      };
      
      setCalculationHistory(prev => [historyEntry, ...prev.slice(0, 9)]);
      const resultText = formatNumber(result);
      setCurrentDisplay(resultText);
      setPreviousValue(result);
      setCurrentOperation(null);
      setWaitingForNewValue(true);
      
      setStatus(`Result: ${resultText}`);
      speak(`Result is ${resultText}`, true);
      
    } catch (error) {
      console.error("Calculation error:", error);
      setCurrentDisplay('Error');
      setStatus("Calculation error");
      speak("Error in calculation", true);
    }
  }, [currentOperation, currentDisplay, previousValue, formatNumber, speak, mathOperations, operationSymbols]);

  // Fast operation handling
  const handleOperation = useCallback((operation) => {
    const inputValue = parseFloat(currentDisplay);
    
    // If we already have an operation, calculate first
    if (currentOperation !== null && previousValue !== null && !waitingForNewValue) {
      handleCalculate();
      
      // Set up the next operation after calculation
      setTimeout(() => {
        setPreviousValue(parseFloat(currentDisplay));
        setCurrentOperation(operation);
        setWaitingForNewValue(true);
        
        const operationText = getOperationText(operation);
        setStatus(`Operation: ${operationText}`);
        speak(operationText, true);
      }, 100);
    } else {
      // No previous operation, just set up the new one
      setPreviousValue(inputValue);
      setCurrentOperation(operation);
      setWaitingForNewValue(true);
      
      const operationText = getOperationText(operation);
      setStatus(`Operation: ${operationText}`);
      speak(operationText, true);
    }
  }, [currentDisplay, currentOperation, previousValue, waitingForNewValue, handleCalculate, speak]);

  // Helper function for operation text
  const getOperationText = (operation) => {
    const operationNames = {
      add: "plus",
      subtract: "minus",
      multiply: "multiply",
      divide: "divide",
      power: "power",
      percentage: "percent",
      squareRoot: "square root"
    };
    return operationNames[operation] || operation;
  };

  // Clear calculator
  const handleClear = useCallback(() => {
    setCurrentDisplay('0');
    setPreviousValue(null);
    setCurrentOperation(null);
    setWaitingForNewValue(false);
    setStatus("Calculator cleared");
    speak("Cleared", true);
  }, [speak]);

  // Clear entry only
  const handleClearEntry = useCallback(() => {
    setCurrentDisplay('0');
    setStatus("Entry cleared");
    speak("Cleared", true);
  }, [speak]);

  // Toggle sign
  const handleToggleSign = useCallback(() => {
    setCurrentDisplay(prev => formatNumber(-parseFloat(prev)));
    setStatus("Sign toggled");
  }, [formatNumber]);

  // Percentage
  const handlePercentage = useCallback(() => {
    const value = parseFloat(currentDisplay);
    const result = value / 100;
    setCurrentDisplay(formatNumber(result));
    setStatus(`Percentage: ${formatNumber(result)}`);
  }, [currentDisplay, formatNumber]);

  // Square root
  const handleSquareRoot = useCallback(() => {
    const value = parseFloat(currentDisplay);
    if (value < 0) {
      setCurrentDisplay('Error');
      setStatus("Error: Cannot calculate square root of negative number");
      speak("Negative square root error", true);
      return;
    }
    const result = Math.sqrt(value);
    const historyEntry = {
      expression: `√(${value})`,
      result: result,
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };
    setCalculationHistory(prev => [historyEntry, ...prev.slice(0, 9)]);
    const resultText = formatNumber(result);
    setCurrentDisplay(resultText);
    setStatus(`Square root: ${resultText}`);
    speak(`Square root is ${resultText}`, true);
  }, [currentDisplay, formatNumber, speak]);

  // Toggle speech
  const toggleSpeech = useCallback(() => {
    setIsSpeaking(prev => {
      const newState = !prev;
      setStatus(newState ? "Voice feedback enabled" : "Voice feedback disabled");
      
      if (newState) {
        voiceService.shouldBeListening = true;
        setTimeout(() => {
          if (!voiceService.isListening && voiceService.shouldBeListening) {
            voiceService.startListening();
          }
        }, 300);
        speak("Voice on", true);
      } else {
        voiceService.shouldBeListening = false;
        if (voiceService.isListening) {
          voiceService.stopListening();
        }
        speak("Voice off", true);
      }
      
      return newState;
    });
  }, [speak]);

  // Handle logout
  const handleLogout = useCallback(async () => {
    setStatus("Logging out...");
    speak("Logging out", true);
    
    if (voiceService.isListening) {
      voiceService.stopListening();
    }
    
    localStorage.clear();
    
    setTimeout(() => navigate("/"), 1000);
  }, [navigate, speak]);

  // Handle back to dashboard
  const handleBackToDashboard = useCallback(() => {
    navigate("/dashboard");
  }, [navigate]);

  // Reinitialize voice commands
  const reinitializeVoiceCommands = useCallback(() => {
    console.log("Reinitializing voice commands...");
    
    const handlers = {
      navigate,
      speak,
      handleNumberInput,
      handleDirectNumber,
      handleCalculate,
      handleClear,
      handleOperation,
      handleDecimal,
      isSpeaking,
      toggleSpeech,
      setSpokenText,
      setStatus,
      setCurrentDisplay,
      setPreviousValue,
      setCurrentOperation,
      setWaitingForNewValue,
      setCalculationHistory,
      formatNumber,
      mathOperations,
      operationSymbols
    };
    
    // Force reinitialization
    commandsRegisteredRef.current = false;
    
    // Initialize calculator commands
    initializeCalculatorCommands(handlers);
    commandsRegisteredRef.current = true;
    
    // Update voice active state
    setVoiceActive(voiceService.isListening);
    
    setStatus("Voice commands reinitialized");
    speak("Voice commands reinitialized", true);
  }, [
    navigate, speak, handleNumberInput, handleDirectNumber, handleCalculate, 
    handleClear, handleOperation, handleDecimal, isSpeaking, toggleSpeech,
    formatNumber, mathOperations, operationSymbols
  ]);

  // Monitor voice service state
  useEffect(() => {
    const checkVoiceState = () => {
      if (componentMountedRef.current) {
        setVoiceActive(voiceService.isListening);
      }
    };

    // Check initially
    checkVoiceState();

    // Set up interval to check voice state
    const intervalId = setInterval(checkVoiceState, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Initialize voice commands - MAIN EFFECT
  useEffect(() => {
    console.log("=== TALKING CALCULATOR MOUNTED ===");
    componentMountedRef.current = true;
    
    // Only register commands once
    if (!commandsRegisteredRef.current) {
      console.log("Initializing voice commands for the first time...");
      
      const handlers = {
        navigate,
        speak,
        handleNumberInput,
        handleDirectNumber,
        handleCalculate,
        handleClear,
        handleOperation,
        handleDecimal,
        isSpeaking,
        toggleSpeech,
        setSpokenText,
        setStatus,
        setCurrentDisplay,
        setPreviousValue,
        setCurrentOperation,
        setWaitingForNewValue,
        setCalculationHistory,
        formatNumber,
        mathOperations,
        operationSymbols
      };
      
      // Initialize with a delay to ensure clean state
      const initTimer = setTimeout(() => {
        if (componentMountedRef.current) {
          console.log("Calling initializeCalculatorCommands...");
          const success = initializeCalculatorCommands(handlers);
          
          if (success) {
            commandsRegisteredRef.current = true;
            console.log("Voice commands initialized successfully");
            
            // Start listening after initialization
            if (isSpeaking && voiceService.isAvailable()) {
              voiceService.shouldBeListening = true;
              
              const startTimer = setTimeout(() => {
                if (componentMountedRef.current && !voiceService.isListening && voiceService.shouldBeListening) {
                  try {
                    voiceService.startListening();
                    console.log("Voice listening started successfully");
                    setVoiceActive(true);
                    
                    // Welcome message
                    setTimeout(() => {
                      if (componentMountedRef.current) {
                        setStatus("Calculator ready. Try saying '2 plus 5' or 'help'.");
                        speak("Calculator ready. Say numbers or expressions like two plus five.", true);
                      }
                    }, 1000);
                  } catch (error) {
                    console.error("Failed to start listening:", error);
                  }
                }
              }, 800);
              
              // Cleanup timer
              return () => clearTimeout(startTimer);
            }
          } else {
            console.error("Failed to initialize calculator commands");
          }
        }
      }, 500);
      
      // Cleanup init timer
      return () => clearTimeout(initTimer);
    }
    
    // Clean up on unmount
    return () => {
      console.log("=== TALKING CALCULATOR UNMOUNTING ===");
      componentMountedRef.current = false;
      voiceService.shouldBeListening = false;
      
      setTimeout(() => {
        if (!voiceService.shouldBeListening) {
          stopCalculatorCommands();
        }
      }, 300);
    };
  }, [isSpeaking, speak]);

  // Fast keyboard input with immediate response
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;
      
      // Prevent default for calculator keys to avoid browser shortcuts
      if ('0123456789.+-*/=EnterEscapeDeleteBackspace%^rR'.includes(key)) {
        e.preventDefault();
      }
      
      if (key >= '0' && key <= '9') {
        handleNumberInput(key);
      } else if (key === '.') {
        handleDecimal();
      } else if (key === '+') {
        handleOperation('add');
      } else if (key === '-') {
        handleOperation('subtract');
      } else if (key === '*') {
        handleOperation('multiply');
      } else if (key === '/') {
        handleOperation('divide');
      } else if (key === 'Enter' || key === '=') {
        handleCalculate();
      } else if (key === 'Escape' || key === 'Delete') {
        handleClear();
      } else if (key === 'Backspace') {
        handleClearEntry();
      } else if (key === '%') {
        handlePercentage();
      } else if (key === '^') {
        handleOperation('power');
      } else if (key === 'r' || key === 'R') {
        handleSquareRoot();
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [handleNumberInput, handleDecimal, handleOperation, handleCalculate, 
      handleClear, handleClearEntry, handlePercentage, handleSquareRoot]);

  // Current expression for display
  const currentExpression = currentOperation && previousValue !== null
    ? `${previousValue} ${operationSymbols[currentOperation] || currentOperation} ${waitingForNewValue ? '' : currentDisplay}`
    : '';

  return (
    <div className="talking-calculator-container">
      {/* Fixed Header */}
      <header className="dashboard-header fixed-header">
        <div className="header-content">
          <div className="header-left">
            <button className="back-btn" onClick={handleBackToDashboard}>
              ← Dashboard
            </button>
            <h1 className="logo">Vision Assist</h1>
          </div>
          
          {/* Spoken Text Display */}
          <div className="header-center">
            {spokenText && (
              <div className="spoken-text-display">
                <span className="spoken-label">🎤 Heard:</span> <strong>{spokenText}</strong>
              </div>
            )}
          </div>
          
          <div className="user-menu">
            <span className="voice-status-indicator">
              {voiceActive ? '🔊' : '🔇'}
            </span>
            <button className="voice-toggle-btn-small" onClick={toggleSpeech}>
              {isSpeaking ? 'Voice On' : 'Voice Off'}
            </button>
            <button 
              className="reinit-btn"
              onClick={reinitializeVoiceCommands}
              title="Reinitialize voice commands"
            >
              🔄 Reinit
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="calculator-content">
        <div className="calculator-header">
          <h2>🧮 Fast Talking Calculator</h2>
          <p>Speak naturally: "twenty three plus fifteen" or individual commands</p>
          
          {/* Debug info */}
          <div className="debug-info">
            <span className="debug-item">
              Voice: {voiceActive ? '✅ Active' : '❌ Inactive'}
            </span>
            <span className="debug-item">
              Feature: {voiceService.currentFeature}
            </span>
            <button 
              className="debug-btn-small"
              onClick={() => {
                console.log("=== DEBUG INFO ===");
                console.log("Current Feature:", voiceService.currentFeature);
                console.log("Is Listening:", voiceService.isListening);
                console.log("Should Be Listening:", voiceService.shouldBeListening);
                console.log("Commands Count:", voiceService.commands.size);
                console.log("Dynamic Handlers:", voiceService.dynamicHandlers.length);
                setStatus(`Debug: ${voiceService.currentFeature}, Listening: ${voiceService.isListening}`);
              }}
            >
              Debug
            </button>
          </div>
        </div>

        {/* Status Message */}
        {status && (
          <div className="status-message">
            {status}
          </div>
        )}

        {/* Quick Voice Tips */}
        <div className="voice-tips">
          <p><strong>Tip:</strong> Say full expressions like "two plus three" or use individual commands</p>
        </div>

        {/* Main Layout */}
        <div className="calculator-main-layout">
          {/* Left Column: Calculator and Controls */}
          <div className="calculator-left-column">
            {/* Display Section */}
            <div className="calculator-display-section compact">
              <div className="expression-display">
                {currentExpression || 'Ready for calculation'}
              </div>
              <div className="result-display">
                {currentDisplay}
              </div>
            </div>

            {/* Voice Controls */}
            <div className="voice-controls-section compact">
              <div className="voice-controls-header">
                <span>Voice Controls</span>
                <button 
                  className={`voice-toggle-btn ${isSpeaking ? 'active' : ''}`}
                  onClick={toggleSpeech}
                >
                  {isSpeaking ? '🔊 ON' : '🔈 OFF'}
                </button>
              </div>
              <div className="voice-buttons">
                <button 
                  className="voice-command-btn"
                  onClick={() => {
                    const value = currentDisplay === '0' ? 'zero' : currentDisplay;
                    speak(`Current value is ${value}`, true);
                  }}
                >
                  Speak Value
                </button>
                <button 
                  className="voice-command-btn"
                  onClick={() => handleClear()}
                >
                  Quick Clear
                </button>
                <button 
                  className="voice-command-btn"
                  onClick={() => {
                    const helpText = "Say numbers, operations, or expressions. Try '2 plus 5' or 'help'.";
                    setStatus(helpText);
                    speak(helpText, true);
                  }}
                >
                  Quick Help
                </button>
              </div>
            </div>

            {/* Fast Calculator Buttons */}
            <div className="calculator-buttons-section compact">
              <div className="calculator-buttons-grid fast-buttons">
                {/* First Row */}
                <div className="button-row compact">
                  <button className="btn-clear compact" onClick={handleClear}>C</button>
                  <button className="btn-clear-entry compact" onClick={handleClearEntry}>CE</button>
                  <button className="btn-operation compact" onClick={handlePercentage}>%</button>
                  <button className="btn-operation compact" onClick={handleSquareRoot}>√</button>
                  <button className="btn-operation compact" onClick={() => handleOperation('divide')}>÷</button>
                </div>

                {/* Number Rows */}
                <div className="button-row compact">
                  <button className="btn-number compact" onClick={() => handleNumberInput('7')}>7</button>
                  <button className="btn-number compact" onClick={() => handleNumberInput('8')}>8</button>
                  <button className="btn-number compact" onClick={() => handleNumberInput('9')}>9</button>
                  <button className="btn-operation compact" onClick={() => handleOperation('multiply')}>×</button>
                </div>

                <div className="button-row compact">
                  <button className="btn-number compact" onClick={() => handleNumberInput('4')}>4</button>
                  <button className="btn-number compact" onClick={() => handleNumberInput('5')}>5</button>
                  <button className="btn-number compact" onClick={() => handleNumberInput('6')}>6</button>
                  <button className="btn-operation compact" onClick={() => handleOperation('subtract')}>−</button>
                </div>

                <div className="button-row compact">
                  <button className="btn-number compact" onClick={() => handleNumberInput('1')}>1</button>
                  <button className="btn-number compact" onClick={() => handleNumberInput('2')}>2</button>
                  <button className="btn-number compact" onClick={() => handleNumberInput('3')}>3</button>
                  <button className="btn-operation compact" onClick={() => handleOperation('add')}>+</button>
                </div>

                {/* Last Row */}
                <div className="button-row compact">
                  <button className="btn-number compact" onClick={handleToggleSign}>±</button>
                  <button className="btn-number compact" onClick={() => handleNumberInput('0')}>0</button>
                  <button className="btn-number compact" onClick={handleDecimal}>.</button>
                  <button className="btn-equals compact" onClick={handleCalculate}>=</button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: History and Shortcuts */}
          <div className="calculator-right-column">
            {/* Calculation History */}
            <div className="calculator-history-section compact">
              <div className="section-header">
                <h3>History ({calculationHistory.length})</h3>
                {calculationHistory.length > 0 && (
                  <button className="clear-history-btn" onClick={() => setCalculationHistory([])}>
                    Clear
                  </button>
                )}
              </div>
              
              {calculationHistory.length === 0 ? (
                <div className="empty-state compact">
                  <p>No calculations yet</p>
                </div>
              ) : (
                <div className="history-list compact">
                  {calculationHistory.map((item, index) => (
                    <div key={index} className="history-item compact">
                      <div className="history-expression">{item.expression}</div>
                      <div className="history-result">= {formatNumber(item.result)}</div>
                      <div className="history-time">{item.timestamp}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Voice Commands Guide */}
            <div className="keyboard-shortcuts-section compact">
              <h3>Voice Commands (Fast)</h3>
              <div className="shortcuts-grid compact">
                <div className="shortcut-item compact">
                  <span className="shortcut-key">Full Expression</span>
                  <span className="shortcut-description">"two plus three" or "ten minus five"</span>
                </div>
                <div className="shortcut-item compact">
                  <span className="shortcut-key">Numbers 1-100</span>
                  <span className="shortcut-description">"twenty three", "fifty six", "one hundred"</span>
                </div>
                <div className="shortcut-item compact">
                  <span className="shortcut-key">Operations</span>
                  <span className="shortcut-description">"plus", "minus", "multiply", "divide"</span>
                </div>
                <div className="shortcut-item compact">
                  <span className="shortcut-key">Calculate</span>
                  <span className="shortcut-description">"equals" or "calculate"</span>
                </div>
                <div className="shortcut-item compact">
                  <span className="shortcut-key">Clear</span>
                  <span className="shortcut-description">"clear" or "reset"</span>
                </div>
                <div className="shortcut-item compact">
                  <span className="shortcut-key">Special</span>
                  <span className="shortcut-description">"percent", "square root", "into"</span>
                </div>
              </div>
              <div className="quick-examples">
                <h4>Quick Examples:</h4>
                <ul>
                  <li>"2 plus 5"</li>
                  <li>"ten multiply three"</li>
                  <li>"4 into 6"</li>
                  <li>"equals" (to calculate)</li>
                  <li>"clear" (to reset)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="status-bar">
        <div className="status-info">
          <span className="status-text">{status}</span>
          <span className="voice-state">
            Voice: {voiceActive ? '✅ Active' : '❌ Inactive'} | Feature: {voiceService.currentFeature}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TalkingCalculator;