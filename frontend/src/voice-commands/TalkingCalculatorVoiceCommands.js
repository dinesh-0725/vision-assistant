// // // // src/voice-commands/TalkingCalculatorVoiceCommands.js
// // // import { voiceService } from '../services/voiceService';

// // // // Mathematical operations mapping
// // // const operationSymbols = {
// // //   add: '+',
// // //   subtract: '−',
// // //   multiply: '×',
// // //   divide: '÷',
// // //   power: '^',
// // //   percentage: '%',
// // //   squareRoot: '√'
// // // };

// // // // Operation names for speech
// // // const operationNames = {
// // //   add: "plus",
// // //   subtract: "minus", 
// // //   multiply: "multiply",
// // //   divide: "divide",
// // //   power: "power",
// // //   percentage: "percent",
// // //   squareRoot: "square root"
// // // };

// // // // Number words mapping for 1-100
// // // let numberWordsMap = {};

// // // // Initialize number words mapping
// // // const initializeNumberWordsMap = () => {
// // //   const map = {};
  
// // //   // Single digits
// // //   const ones = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
// // //   const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
// // //   const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  
// // //   // Add 0-9
// // //   for (let i = 0; i <= 9; i++) {
// // //     map[ones[i]] = i.toString();
// // //   }
  
// // //   // Add 10-19
// // //   for (let i = 0; i <= 9; i++) {
// // //     map[teens[i]] = (10 + i).toString();
// // //   }
  
// // //   // Add 20-99
// // //   for (let ten = 2; ten <= 9; ten++) {
// // //     for (let one = 0; one <= 9; one++) {
// // //       if (one === 0) {
// // //         map[tens[ten]] = (ten * 10).toString();
// // //       } else {
// // //         map[`${tens[ten]} ${ones[one]}`] = (ten * 10 + one).toString();
// // //         map[`${tens[ten]}-${ones[one]}`] = (ten * 10 + one).toString();
// // //       }
// // //     }
// // //   }
  
// // //   // Add 100
// // //   map['hundred'] = '100';
// // //   map['one hundred'] = '100';
  
// // //   numberWordsMap = map;
// // //   return map;
// // // };

// // // // Parse spoken number text
// // // const parseSpokenNumber = (text) => {
// // //   const lowerText = text.toLowerCase().trim();
  
// // //   // Initialize map if needed
// // //   if (Object.keys(numberWordsMap).length === 0) {
// // //     initializeNumberWordsMap();
// // //   }
  
// // //   // Check direct mapping first
// // //   if (numberWordsMap[lowerText]) {
// // //     return numberWordsMap[lowerText];
// // //   }
  
// // //   // Check for hyphenated numbers
// // //   if (lowerText.includes('-')) {
// // //     const parts = lowerText.split('-');
// // //     let result = '';
// // //     for (const part of parts) {
// // //       if (numberWordsMap[part.trim()]) {
// // //         result += numberWordsMap[part.trim()];
// // //       }
// // //     }
// // //     if (result) return result;
// // //   }
  
// // //   // Check for spaced numbers (like "twenty three")
// // //   const words = lowerText.split(/\s+/);
// // //   if (words.length > 1) {
// // //     const mapped = words.map(word => numberWordsMap[word]).filter(Boolean);
// // //     if (mapped.length === words.length) {
// // //       return mapped.join('');
// // //     }
// // //   }
  
// // //   // Try to parse as regular number
// // //   if (/^\d+$/.test(lowerText)) {
// // //     return lowerText;
// // //   }
  
// // //   return null;
// // // };

// // // // Parse full expressions like "two plus three"
// // // const parseFullExpression = (text, handlers) => {
// // //   const lowerText = text.toLowerCase().trim();
// // //   const { 
// // //     setCurrentDisplay, 
// // //     setPreviousValue, 
// // //     setCurrentOperation, 
// // //     setWaitingForNewValue,
// // //     setCalculationHistory,
// // //     setStatus,
// // //     speak,
// // //     formatNumber,
// // //     mathOperations,
// // //     operationSymbols
// // //   } = handlers;
  
// // //   // Common patterns
// // //   const patterns = [
// // //     // Pattern: number operation number
// // //     /^(\w+(?:\s+\w+)*?)\s+(plus|add|minus|subtract|multiply|times|divide|over|to the power of|percent of)\s+(\w+(?:\s+\w+)*?)$/,
// // //     // Pattern: calculate number operation number
// // //     /^calculate\s+(\w+(?:\s+\w+)*?)\s+(plus|add|minus|subtract|multiply|times|divide|over|to the power of|percent of)\s+(\w+(?:\s+\w+)*?)$/,
// // //     // Pattern: what is number operation number
// // //     /^what(?:'s| is)\s+(\w+(?:\s+\w+)*?)\s+(plus|add|minus|subtract|multiply|times|divide|over|to the power of|percent of)\s+(\w+(?:\s+\w+)*?)$/,
// // //     // Pattern: square root of number
// // //     /^(?:square root|root|sqrt) of (\w+(?:\s+\w+)*?)$/,
// // //     // Pattern: number percent
// // //     /^(\w+(?:\s+\w+)*?)\s+percent$/,
// // //   ];
  
// // //   for (const pattern of patterns) {
// // //     const match = lowerText.match(pattern);
// // //     if (match) {
// // //       // Handle square root
// // //       if (pattern.toString().includes('square root')) {
// // //         const numText = match[1];
// // //         const num = parseSpokenNumber(numText);
        
// // //         if (num) {
// // //           const numVal = parseFloat(num);
// // //           if (numVal < 0) {
// // //             setCurrentDisplay('Error');
// // //             setStatus("Error: Cannot calculate square root of negative number");
// // //             speak("Negative square root error", true);
// // //             return true;
// // //           }
          
// // //           const result = Math.sqrt(numVal);
// // //           const resultText = formatNumber(result);
          
// // //           const historyEntry = {
// // //             expression: `√(${numVal})`,
// // //             result: result,
// // //             timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
// // //           };
          
// // //           setCalculationHistory(prev => [historyEntry, ...prev.slice(0, 9)]);
// // //           setCurrentDisplay(resultText);
// // //           setPreviousValue(result);
// // //           setCurrentOperation(null);
// // //           setWaitingForNewValue(true);
          
// // //           setStatus(`Square root: ${resultText}`);
// // //           speak(`Square root of ${numVal} is ${resultText}`, true);
// // //           return true;
// // //         }
// // //       }
      
// // //       // Handle percent
// // //       else if (pattern.toString().includes('percent')) {
// // //         const numText = match[1];
// // //         const num = parseSpokenNumber(numText);
        
// // //         if (num) {
// // //           const numVal = parseFloat(num);
// // //           const result = numVal / 100;
// // //           const resultText = formatNumber(result);
          
// // //           setCurrentDisplay(resultText);
// // //           setStatus(`Percentage: ${resultText}`);
// // //           speak(`${numVal} percent is ${resultText}`, true);
// // //           return true;
// // //         }
// // //       }
      
// // //       // Handle regular operations
// // //       else if (match.length >= 3) {
// // //         const num1Text = match[1];
// // //         const opText = match[2];
// // //         const num2Text = match[3];
        
// // //         // Convert text to numbers
// // //         const num1 = parseSpokenNumber(num1Text);
// // //         const num2 = parseSpokenNumber(num2Text);
        
// // //         if (num1 && num2) {
// // //           // Convert operation text to operation code
// // //           const opMap = {
// // //             'plus': 'add',
// // //             'add': 'add',
// // //             'minus': 'subtract',
// // //             'subtract': 'subtract',
// // //             'multiply': 'multiply',
// // //             'times': 'multiply',
// // //             'divide': 'divide',
// // //             'over': 'divide',
// // //             'to the power of': 'power',
// // //             'percent of': 'percentage'
// // //           };
          
// // //           const operation = opMap[opText];
          
// // //           if (operation) {
// // //             // Perform calculation immediately
// // //             const num1Val = parseFloat(num1);
// // //             const num2Val = parseFloat(num2);
            
// // //             try {
// // //               const result = mathOperations[operation](num1Val, num2Val);
// // //               const resultText = formatNumber(result);
              
// // //               // Add to history
// // //               const historyEntry = {
// // //                 expression: `${num1Val} ${operationSymbols[operation]} ${num2Val}`,
// // //                 result: result,
// // //                 timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
// // //               };
              
// // //               setCalculationHistory(prev => [historyEntry, ...prev.slice(0, 9)]);
// // //               setCurrentDisplay(resultText);
// // //               setPreviousValue(result);
// // //               setCurrentOperation(null);
// // //               setWaitingForNewValue(true);
              
// // //               setStatus(`${num1Val} ${operation} ${num2Val} = ${resultText}`);
// // //               speak(`${num1Val} ${operationNames[operation]} ${num2Val} is ${resultText}`, true);
              
// // //               return true; // Successfully parsed and calculated
// // //             } catch (error) {
// // //               console.error("Calculation error:", error);
// // //               setCurrentDisplay('Error');
// // //               setStatus("Calculation error");
// // //               speak("Error in calculation", true);
// // //               return true;
// // //             }
// // //           }
// // //         }
// // //       }
// // //     }
// // //   }
  
// // //   return false; // Not a full expression
// // // };

// // // // Initialize calculator voice commands
// // // export const initializeCalculatorCommands = (handlers) => {
// // //   const { 
// // //     navigate, 
// // //     speak, 
// // //     handleNumberInput, 
// // //     handleDirectNumber, 
// // //     handleCalculate, 
// // //     handleClear,
// // //     handleOperation,
// // //     handleDecimal,
// // //     isSpeaking,
// // //     toggleSpeech,
// // //     setSpokenText,
// // //     setStatus,
// // //     parseFullExpression: customParseFullExpression,
// // //     parseSpokenNumber: customParseSpokenNumber
// // //   } = handlers;
  
// // //   console.log('[CalculatorCommands] Initializing calculator voice commands');
  
// // //   // Clear existing commands and set feature
// // //   voiceService.setFeature('calculator');
// // //   voiceService.clearDynamicHandlers();
// // //   voiceService.clearCommands();
  
// // //   // Initialize number words map
// // //   if (Object.keys(numberWordsMap).length === 0) {
// // //     initializeNumberWordsMap();
// // //   }
  
// // //   // Helper function to execute command safely
// // //   const executeSafe = (commandName, action) => {
// // //     return () => {
// // //       console.log(`[CalculatorCommands] Executing command: ${commandName}`);
// // //       try {
// // //         setSpokenText(commandName);
// // //         action();
// // //       } catch (error) {
// // //         console.error(`[CalculatorCommands] Error in command ${commandName}:`, error);
// // //         setStatus(`Error executing: ${commandName}`);
// // //         speak(`Error with command: ${commandName}`, true);
// // //       }
// // //     };
// // //   };
  
// // //   // Navigation commands
// // //   voiceService.registerCommand('dashboard', executeSafe('dashboard', () => {
// // //     speak("Going to dashboard", true);
// // //     setTimeout(() => navigate("/dashboard"), 1000);
// // //   }));
  
// // //   voiceService.registerCommand('home', executeSafe('home', () => {
// // //     speak("Going home", true);
// // //     setTimeout(() => navigate("/dashboard"), 1000);
// // //   }));
  
// // //   voiceService.registerCommand('go to dashboard', executeSafe('go to dashboard', () => {
// // //     speak("Going to dashboard", true);
// // //     setTimeout(() => navigate("/dashboard"), 1000);
// // //   }));
  
// // //   voiceService.registerCommand('back', executeSafe('back', () => {
// // //     speak("Going back", true);
// // //     setTimeout(() => navigate("/dashboard"), 1000);
// // //   }));
  
// // //   voiceService.registerCommand('go back', executeSafe('go back', () => {
// // //     speak("Going back", true);
// // //     setTimeout(() => navigate("/dashboard"), 1000);
// // //   }));
  
// // //   // Calculator commands
// // //   voiceService.registerCommand('calculate', executeSafe('calculate', () => {
// // //     handleCalculate();
// // //   }));
  
// // //   voiceService.registerCommand('equals', executeSafe('equals', () => {
// // //     handleCalculate();
// // //   }));
  
// // //   voiceService.registerCommand('equal', executeSafe('equal', () => {
// // //     handleCalculate();
// // //   }));
  
// // //   voiceService.registerCommand('clear', executeSafe('clear', () => {
// // //     handleClear();
// // //   }));
  
// // //   voiceService.registerCommand('reset', executeSafe('reset', () => {
// // //     handleClear();
// // //   }));
  
// // //   // Operation commands
// // //   const operationCommands = {
// // //     'plus': 'add',
// // //     'add': 'add',
// // //     'minus': 'subtract',
// // //     'subtract': 'subtract',
// // //     'multiply': 'multiply',
// // //     'times': 'multiply',
// // //     'divide': 'divide',
// // //     'over': 'divide',
// // //     'percent': 'percentage',
// // //     'percentage': 'percentage',
// // //     'square root': 'squareRoot',
// // //     'root': 'squareRoot',
// // //     'power': 'power',
// // //     'to the power': 'power'
// // //   };
  
// // //   Object.entries(operationCommands).forEach(([command, operation]) => {
// // //     voiceService.registerCommand(command, executeSafe(command, () => {
// // //       handleOperation(operation);
// // //     }));
// // //   });
  
// // //   // Decimal point
// // //   voiceService.registerCommand('point', executeSafe('point', () => {
// // //     handleDecimal();
// // //   }));
  
// // //   voiceService.registerCommand('decimal', executeSafe('decimal', () => {
// // //     handleDecimal();
// // //   }));
  
// // //   voiceService.registerCommand('dot', executeSafe('dot', () => {
// // //     handleDecimal();
// // //   }));
  
// // //   // Voice control
// // //   voiceService.registerCommand('voice on', executeSafe('voice on', () => {
// // //     if (!isSpeaking) toggleSpeech();
// // //   }));
  
// // //   voiceService.registerCommand('voice off', executeSafe('voice off', () => {
// // //     if (isSpeaking) toggleSpeech();
// // //   }));
  
// // //   voiceService.registerCommand('toggle voice', executeSafe('toggle voice', () => {
// // //     toggleSpeech();
// // //   }));
  
// // //   voiceService.registerCommand('speak on', executeSafe('speak on', () => {
// // //     if (!isSpeaking) toggleSpeech();
// // //   }));
  
// // //   voiceService.registerCommand('speak off', executeSafe('speak off', () => {
// // //     if (isSpeaking) toggleSpeech();
// // //   }));
  
// // //   // Help command
// // //   voiceService.registerCommand('help', executeSafe('help', () => {
// // //     const helpText = "You can say full expressions like 'two plus three' or individual commands. Say numbers 1 to 100. Say 'equals' for result. Say 'clear' to reset.";
// // //     setStatus(helpText);
// // //     speak(helpText, true);
// // //   }));
  
// // //   voiceService.registerCommand('what can i say', executeSafe('what can i say', () => {
// // //     const helpText = "Say numbers like 'twenty three', operations like 'plus', 'equals' for result, 'clear' to reset, or full expressions like 'ten plus five'.";
// // //     setStatus(helpText);
// // //     speak(helpText, true);
// // //   }));
  
// // //   // Register numbers 1-100
// // //   Object.entries(numberWordsMap).forEach(([word, number]) => {
// // //     voiceService.registerCommand(word, executeSafe(word, () => {
// // //       handleDirectNumber(number);
// // //     }));
// // //   });
  
// // //   // Also register digits 0-9
// // //   for (let i = 0; i <= 9; i++) {
// // //     voiceService.registerCommand(i.toString(), executeSafe(i.toString(), () => {
// // //       handleNumberInput(i.toString());
// // //     }));
// // //   }
  
// // //   // Register full number phrases (like "twenty three")
// // //   voiceService.registerDynamicHandler(
// // //     /^(\w+(?:\s+\w+)*?)$/,
// // //     (matches) => {
// // //       const text = matches[0];
// // //       const parsedNumber = parseSpokenNumber(text);
      
// // //       if (parsedNumber) {
// // //         console.log('[CalculatorCommands] Dynamic number match:', text, '->', parsedNumber);
// // //         setSpokenText(text);
// // //         handleDirectNumber(parsedNumber);
// // //         return true;
// // //       }
      
// // //       return false;
// // //     }
// // //   );
  
// // //   // Handle all other voice input for full expressions
// // //   voiceService.onResultCallback = (transcript) => {
// // //     console.log('[CalculatorCommands] Voice input received:', transcript);
// // //     setSpokenText(transcript);
    
// // //     // First try to parse as full expression using the component's function
// // //     const wasFullExpression = parseFullExpression(transcript, handlers);
// // //     if (wasFullExpression) {
// // //       return;
// // //     }
    
// // //     // If not a full expression, try to parse as single number
// // //     const parsedNumber = parseSpokenNumber(transcript);
// // //     if (parsedNumber) {
// // //       console.log('[CalculatorCommands] Parsed as number:', parsedNumber);
// // //       handleDirectNumber(parsedNumber);
// // //       return;
// // //     }
    
// // //     // If nothing matched, provide feedback
// // //     const feedback = `I heard "${transcript}". Try saying a number, operation, or expression like "two plus three". Say "help" for commands.`;
// // //     setStatus(feedback);
// // //     speak(feedback, true);
// // //   };
  
// // //   console.log('[CalculatorCommands] Voice commands initialized');
// // // };

// // // // Stop calculator voice commands
// // // export const stopCalculatorCommands = () => {
// // //   console.log('[CalculatorCommands] Stopping calculator commands');
// // //   voiceService.stopListening();
// // //   voiceService.clearDynamicHandlers();
  
// // //   // Keep only navigation commands
// // //   const navigationCommands = [
// // //     'dashboard', 'home', 'go to dashboard', 'logout', 
// // //     'sign out', 'exit', 'go back', 'back'
// // //   ];
  
// // //   const newCommands = new Map();
  
// // //   for (const [pattern, handler] of voiceService.commands.entries()) {
// // //     if (navigationCommands.some(navCmd => pattern.includes(navCmd))) {
// // //       newCommands.set(pattern, handler);
// // //     }
// // //   }
  
// // //   voiceService.commands = newCommands;
// // //   voiceService.setFeature('default');
// // // };



// // // src/voice-commands/TalkingCalculatorVoiceCommands.js
// // import { voiceService } from '../services/voiceService';

// // let calculatorCommandsInitialized = false;

// // // Number words mapping
// // const numberWordsMap = {};

// // const initializeNumberWordsMap = () => {
// //   // Single digits
// //   const ones = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
// //   const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
// //   const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  
// //   // Add 0-9
// //   for (let i = 0; i <= 9; i++) {
// //     numberWordsMap[ones[i]] = i.toString();
// //   }
  
// //   // Add 10-19
// //   for (let i = 0; i <= 9; i++) {
// //     numberWordsMap[teens[i]] = (10 + i).toString();
// //   }
  
// //   // Add 20-99
// //   for (let ten = 2; ten <= 9; ten++) {
// //     for (let one = 0; one <= 9; one++) {
// //       if (one === 0) {
// //         numberWordsMap[tens[ten]] = (ten * 10).toString();
// //       } else {
// //         numberWordsMap[`${tens[ten]} ${ones[one]}`] = (ten * 10 + one).toString();
// //         numberWordsMap[`${tens[ten]}-${ones[one]}`] = (ten * 10 + one).toString();
// //       }
// //     }
// //   }
  
// //   // Add 100
// //   numberWordsMap['hundred'] = '100';
// //   numberWordsMap['one hundred'] = '100';
// // };

// // // Parse spoken number
// // const parseSpokenNumber = (text) => {
// //   const lowerText = text.toLowerCase().trim();
  
// //   if (Object.keys(numberWordsMap).length === 0) {
// //     initializeNumberWordsMap();
// //   }
  
// //   // Check direct mapping
// //   if (numberWordsMap[lowerText]) {
// //     return numberWordsMap[lowerText];
// //   }
  
// //   // Check for hyphenated
// //   if (lowerText.includes('-')) {
// //     const parts = lowerText.split('-');
// //     let result = '';
// //     for (const part of parts) {
// //       if (numberWordsMap[part.trim()]) {
// //         result += numberWordsMap[part.trim()];
// //       }
// //     }
// //     if (result) return result;
// //   }
  
// //   // Check for spaced numbers
// //   const words = lowerText.split(/\s+/);
// //   if (words.length > 1) {
// //     const mapped = words.map(word => numberWordsMap[word]).filter(Boolean);
// //     if (mapped.length === words.length) {
// //       return mapped.join('');
// //     }
// //   }
  
// //   // Try as regular number
// //   if (/^\d+$/.test(lowerText)) {
// //     return lowerText;
// //   }
  
// //   return null;
// // };

// // // Initialize calculator voice commands
// // export const initializeCalculatorCommands = (handlers) => {
// //   console.log('[CalculatorCommands] Initializing...');
  
// //   if (calculatorCommandsInitialized) {
// //     console.log('[CalculatorCommands] Already initialized');
// //     return;
// //   }
  
// //   // Initialize number map
// //   if (Object.keys(numberWordsMap).length === 0) {
// //     initializeNumberWordsMap();
// //   }
  
// //   const { 
// //     navigate, 
// //     speak, 
// //     handleNumberInput, 
// //     handleDirectNumber, 
// //     handleCalculate, 
// //     handleClear,
// //     handleOperation,
// //     handleDecimal,
// //     isSpeaking,
// //     toggleSpeech,
// //     setSpokenText,
// //     setStatus,
// //     setCurrentDisplay,
// //     setPreviousValue,
// //     setCurrentOperation,
// //     setWaitingForNewValue,
// //     setCalculationHistory,
// //     formatNumber,
// //     mathOperations,
// //     operationSymbols
// //   } = handlers;
  
// //   // Set feature to calculator
// //   voiceService.setFeature('calculator');
// //   voiceService.clearCommands();
// //   voiceService.clearDynamicHandlers();
  
// //   // Helper function
// //   const executeSafe = (commandName, action) => {
// //     return () => {
// //       console.log(`[CalculatorCommands] Executing: ${commandName}`);
// //       try {
// //         setSpokenText(commandName);
// //         action();
// //       } catch (error) {
// //         console.error(`[CalculatorCommands] Error in ${commandName}:`, error);
// //       }
// //     };
// //   };
  
// //   // 1. Navigation commands (MUST REGISTER THESE)
// //   const navCommands = {
// //     'dashboard': () => {
// //       speak("Going to dashboard", true);
// //       setTimeout(() => navigate("/dashboard"), 1000);
// //     },
// //     'home': () => {
// //       speak("Going home", true);
// //       setTimeout(() => navigate("/dashboard"), 1000);
// //     },
// //     'go to dashboard': () => {
// //       speak("Going to dashboard", true);
// //       setTimeout(() => navigate("/dashboard"), 1000);
// //     },
// //     'back': () => {
// //       speak("Going back", true);
// //       setTimeout(() => navigate("/dashboard"), 1000);
// //     },
// //     'go back': () => {
// //       speak("Going back", true);
// //       setTimeout(() => navigate("/dashboard"), 1000);
// //     }
// //   };
  
// //   Object.entries(navCommands).forEach(([command, action]) => {
// //     voiceService.registerCommand(command, executeSafe(command, action));
// //   });
  
// //   // 2. Calculator commands
// //   const calcCommands = {
// //     // Basic
// //     'calculate': () => handleCalculate(),
// //     'equals': () => handleCalculate(),
// //     'equal': () => handleCalculate(),
// //     'clear': () => handleClear(),
// //     'reset': () => handleClear(),
    
// //     // Operations
// //     'plus': () => handleOperation('add'),
// //     'add': () => handleOperation('add'),
// //     'minus': () => handleOperation('subtract'),
// //     'subtract': () => handleOperation('subtract'),
// //     'multiply': () => handleOperation('multiply'),
// //     'times': () => handleOperation('multiply'),
// //     'divide': () => handleOperation('divide'),
// //     'over': () => handleOperation('divide'),
// //     'percent': () => handleOperation('percentage'),
// //     'percentage': () => handleOperation('percentage'),
// //     'square root': () => handleOperation('squareRoot'),
// //     'root': () => handleOperation('squareRoot'),
// //     'power': () => handleOperation('power'),
    
// //     // Decimal
// //     'point': () => handleDecimal(),
// //     'decimal': () => handleDecimal(),
// //     'dot': () => handleDecimal(),
    
// //     // Voice control
// //     'voice on': () => { if (!isSpeaking) toggleSpeech(); },
// //     'voice off': () => { if (isSpeaking) toggleSpeech(); },
// //     'toggle voice': () => toggleSpeech(),
    
// //     // Help
// //     'help': () => {
// //       const helpText = "Say numbers like 'twenty three', operations like 'plus', or expressions like 'two plus three'.";
// //       setStatus(helpText);
// //       speak(helpText, true);
// //     }
// //   };
  
// //   Object.entries(calcCommands).forEach(([command, action]) => {
// //     voiceService.registerCommand(command, executeSafe(command, action));
// //   });
  
// //   // 3. Register numbers 0-9
// //   for (let i = 0; i <= 9; i++) {
// //     voiceService.registerCommand(i.toString(), executeSafe(i.toString(), () => {
// //       handleNumberInput(i.toString());
// //     }));
// //   }
  
// //   // 4. Register number words
// //   Object.entries(numberWordsMap).forEach(([word, number]) => {
// //     voiceService.registerCommand(word, executeSafe(word, () => {
// //       handleDirectNumber(number);
// //     }));
// //   });
  
// //   // 5. Add dynamic handler for "into" (Indian English for multiply)
// //   voiceService.registerDynamicHandler(
// //     /^(\d+|\w+(?:\s+\w+)*?)\s+into\s+(\d+|\w+(?:\s+\w+)*?)$/i,
// //     (matches) => {
// //       const [_, num1Text, num2Text] = matches;
      
// //       const num1 = parseSpokenNumber(num1Text) || num1Text;
// //       const num2 = parseSpokenNumber(num2Text) || num2Text;
      
// //       if (num1 && num2) {
// //         const num1Val = parseFloat(num1);
// //         const num2Val = parseFloat(num2);
// //         const result = num1Val * num2Val;
// //         const resultText = formatNumber(result);
        
// //         const historyEntry = {
// //           expression: `${num1Val} × ${num2Val}`,
// //           result: result,
// //           timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
// //         };
        
// //         setCalculationHistory(prev => [historyEntry, ...prev.slice(0, 9)]);
// //         setCurrentDisplay(resultText);
// //         setPreviousValue(result);
// //         setCurrentOperation(null);
// //         setWaitingForNewValue(true);
        
// //         setStatus(`${num1Val} × ${num2Val} = ${resultText}`);
// //         speak(`${num1Val} into ${num2Val} is ${resultText}`, true);
        
// //         return true;
// //       }
// //       return false;
// //     }
// //   );
  
// //   // 6. Add dynamic handler for mathematical expressions
// //   voiceService.registerDynamicHandler(
// //     /^(\d+|\w+(?:\s+\w+)*?)\s+(plus|add|minus|subtract|multiply|times|divide|over)\s+(\d+|\w+(?:\s+\w+)*?)$/i,
// //     (matches) => {
// //       const [_, num1Text, opText, num2Text] = matches;
      
// //       const num1 = parseSpokenNumber(num1Text) || num1Text;
// //       const num2 = parseSpokenNumber(num2Text) || num2Text;
      
// //       if (num1 && num2) {
// //         const opMap = {
// //           'plus': 'add',
// //           'add': 'add',
// //           'minus': 'subtract',
// //           'subtract': 'subtract',
// //           'multiply': 'multiply',
// //           'times': 'multiply',
// //           'divide': 'divide',
// //           'over': 'divide'
// //         };
        
// //         const operation = opMap[opText.toLowerCase()];
        
// //         if (operation) {
// //           const num1Val = parseFloat(num1);
// //           const num2Val = parseFloat(num2);
          
// //           try {
// //             const result = mathOperations[operation](num1Val, num2Val);
// //             const resultText = formatNumber(result);
            
// //             const historyEntry = {
// //               expression: `${num1Val} ${operationSymbols[operation]} ${num2Val}`,
// //               result: result,
// //               timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
// //             };
            
// //             setCalculationHistory(prev => [historyEntry, ...prev.slice(0, 9)]);
// //             setCurrentDisplay(resultText);
// //             setPreviousValue(result);
// //             setCurrentOperation(null);
// //             setWaitingForNewValue(true);
            
// //             setStatus(`${num1Val} ${operation} ${num2Val} = ${resultText}`);
// //             speak(`${num1Val} ${operation} ${num2Val} is ${resultText}`, true);
            
// //             return true;
// //           } catch (error) {
// //             console.error("[CalculatorCommands] Calculation error:", error);
// //           }
// //         }
// //       }
// //       return false;
// //     }
// //   );
  
// //   // 7. Set up general callback for unhandled input
// //   voiceService.onResultCallback = (transcript) => {
// //     console.log('[CalculatorCommands] Unhandled input:', transcript);
// //     setSpokenText(transcript);
    
// //     // Try to parse as a single number
// //     const parsedNumber = parseSpokenNumber(transcript);
// //     if (parsedNumber) {
// //       console.log('[CalculatorCommands] Parsed as number:', parsedNumber);
// //       handleDirectNumber(parsedNumber);
// //       return;
// //     }
    
// //     // If not a number, provide feedback
// //     const feedback = `I heard "${transcript}". Try saying a number or expression like "two plus three".`;
// //     setStatus(feedback);
// //     speak(feedback, true);
// //   };
  
// //   calculatorCommandsInitialized = true;
// //   console.log('[CalculatorCommands] Initialized successfully');
// //   console.log('[CalculatorCommands] Registered commands:', Array.from(voiceService.commands.keys()));
  
// //   // Start listening
// //   setTimeout(() => {
// //     if (!voiceService.isListening) {
// //       voiceService.shouldBeListening = true;
// //       voiceService.startListening();
// //     }
// //   }, 500);
// // };

// // // Stop calculator voice commands
// // export const stopCalculatorCommands = () => {
// //   console.log('[CalculatorCommands] Stopping...');
// //   calculatorCommandsInitialized = false;
  
// //   // Stop listening but don't clear commands
// //   if (voiceService.isListening) {
// //     voiceService.stopListening();
// //   }
  
// //   // Switch back to default feature
// //   voiceService.setFeature('default');
// // };


// // src/voice-commands/TalkingCalculatorVoiceCommands.js
// import { voiceService } from '../services/voiceService';

// let calculatorCommandsInitialized = false;

// // Number words mapping
// const numberWordsMap = {};

// const initializeNumberWordsMap = () => {
//   // Single digits
//   const ones = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
//   const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
//   const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  
//   // Add 0-9
//   for (let i = 0; i <= 9; i++) {
//     numberWordsMap[ones[i]] = i.toString();
//   }
  
//   // Add 10-19
//   for (let i = 0; i <= 9; i++) {
//     numberWordsMap[teens[i]] = (10 + i).toString();
//   }
  
//   // Add 20-99
//   for (let ten = 2; ten <= 9; ten++) {
//     for (let one = 0; one <= 9; one++) {
//       if (one === 0) {
//         numberWordsMap[tens[ten]] = (ten * 10).toString();
//       } else {
//         numberWordsMap[`${tens[ten]} ${ones[one]}`] = (ten * 10 + one).toString();
//         numberWordsMap[`${tens[ten]}-${ones[one]}`] = (ten * 10 + one).toString();
//       }
//     }
//   }
  
//   // Add 100
//   numberWordsMap['hundred'] = '100';
//   numberWordsMap['one hundred'] = '100';
// };

// // Parse spoken number
// const parseSpokenNumber = (text) => {
//   const lowerText = text.toLowerCase().trim();
  
//   if (Object.keys(numberWordsMap).length === 0) {
//     initializeNumberWordsMap();
//   }
  
//   // Check direct mapping
//   if (numberWordsMap[lowerText]) {
//     return numberWordsMap[lowerText];
//   }
  
//   // Check for hyphenated
//   if (lowerText.includes('-')) {
//     const parts = lowerText.split('-');
//     let result = '';
//     for (const part of parts) {
//       if (numberWordsMap[part.trim()]) {
//         result += numberWordsMap[part.trim()];
//       }
//     }
//     if (result) return result;
//   }
  
//   // Check for spaced numbers
//   const words = lowerText.split(/\s+/);
//   if (words.length > 1) {
//     const mapped = words.map(word => numberWordsMap[word]).filter(Boolean);
//     if (mapped.length === words.length) {
//       return mapped.join('');
//     }
//   }
  
//   // Try as regular number
//   if (/^\d+$/.test(lowerText)) {
//     return lowerText;
//   }
  
//   return null;
// };

// // Initialize calculator voice commands
// export const initializeCalculatorCommands = (handlers) => {
//   console.log('[CalculatorCommands] === INITIALIZING CALCULATOR COMMANDS ===');
  
//   // Reset initialization flag to allow reinitialization
//   calculatorCommandsInitialized = false;
  
//   // Stop any existing listening
//   if (voiceService.isListening) {
//     console.log('[CalculatorCommands] Stopping existing listening...');
//     voiceService.stopListening();
//   }
  
//   // Clear all previous commands and handlers
//   voiceService.clearCommands();
//   voiceService.clearDynamicHandlers();
  
//   // Set feature to calculator BEFORE registering commands
//   voiceService.setFeature('calculator');
  
//   const { 
//     navigate, 
//     speak, 
//     handleNumberInput, 
//     handleDirectNumber, 
//     handleCalculate, 
//     handleClear,
//     handleOperation,
//     handleDecimal,
//     isSpeaking,
//     toggleSpeech,
//     setSpokenText,
//     setStatus,
//     setCurrentDisplay,
//     setPreviousValue,
//     setCurrentOperation,
//     setWaitingForNewValue,
//     setCalculationHistory,
//     formatNumber,
//     mathOperations,
//     operationSymbols
//   } = handlers;
  
//   // Initialize number map
//   if (Object.keys(numberWordsMap).length === 0) {
//     initializeNumberWordsMap();
//   }
  
//   // Helper function for safe execution
//   const executeSafe = (commandName, action) => {
//     return () => {
//       console.log(`[CalculatorCommands] Executing: ${commandName}`);
//       try {
//         setSpokenText(commandName);
//         action();
//       } catch (error) {
//         console.error(`[CalculatorCommands] Error in ${commandName}:`, error);
//         setStatus(`Error: ${commandName}`);
//       }
//     };
//   };
  
//   // ========== REGISTER ALL COMMANDS ==========
  
//   // 1. Navigation Commands
//   const registerNavigationCommands = () => {
//     const navCommands = {
//       'dashboard': () => {
//         speak("Going to dashboard", true);
//         setTimeout(() => navigate("/dashboard"), 1000);
//       },
//       'home': () => {
//         speak("Going home", true);
//         setTimeout(() => navigate("/dashboard"), 1000);
//       },
//       'go to dashboard': () => {
//         speak("Going to dashboard", true);
//         setTimeout(() => navigate("/dashboard"), 1000);
//       },
//       'back': () => {
//         speak("Going back", true);
//         setTimeout(() => navigate("/dashboard"), 1000);
//       },
//       'go back': () => {
//         speak("Going back", true);
//         setTimeout(() => navigate("/dashboard"), 1000);
//       },
//       'return': () => {
//         speak("Returning to dashboard", true);
//         setTimeout(() => navigate("/dashboard"), 1000);
//       },
//       'main menu': () => {
//         speak("Going to main menu", true);
//         setTimeout(() => navigate("/dashboard"), 1000);
//       }
//     };
    
//     Object.entries(navCommands).forEach(([command, action]) => {
//       voiceService.registerCommand(command, executeSafe(command, action));
//     });
    
//     console.log(`[CalculatorCommands] Registered ${Object.keys(navCommands).length} navigation commands`);
//   };
  
//   // 2. Basic Calculator Commands
//   const registerBasicCommands = () => {
//     const basicCommands = {
//       'calculate': () => handleCalculate(),
//       'equals': () => handleCalculate(),
//       'equal': () => handleCalculate(),
//       'clear': () => handleClear(),
//       'reset': () => handleClear(),
//       'clear all': () => handleClear(),
//       'delete': () => {
//         setCurrentDisplay(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
//         setStatus("Deleted last digit");
//       },
//       'backspace': () => {
//         setCurrentDisplay(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
//         setStatus("Deleted last digit");
//       }
//     };
    
//     Object.entries(basicCommands).forEach(([command, action]) => {
//       voiceService.registerCommand(command, executeSafe(command, action));
//     });
//   };
  
//   // 3. Operation Commands
//   const registerOperationCommands = () => {
//     const operationCommands = {
//       'plus': () => handleOperation('add'),
//       'add': () => handleOperation('add'),
//       'minus': () => handleOperation('subtract'),
//       'subtract': () => handleOperation('subtract'),
//       'multiply': () => handleOperation('multiply'),
//       'times': () => handleOperation('multiply'),
//       'divide': () => handleOperation('divide'),
//       'over': () => handleOperation('divide'),
//       'percent': () => handleOperation('percentage'),
//       'percentage': () => handleOperation('percentage'),
//       'square root': () => handleOperation('squareRoot'),
//       'root': () => handleOperation('squareRoot'),
//       'power': () => handleOperation('power'),
//       'exponent': () => handleOperation('power'),
//       'to the power': () => handleOperation('power')
//     };
    
//     Object.entries(operationCommands).forEach(([command, action]) => {
//       voiceService.registerCommand(command, executeSafe(command, action));
//     });
//   };
  
//   // 4. Decimal and Special Commands
//   const registerSpecialCommands = () => {
//     const specialCommands = {
//       'point': () => handleDecimal(),
//       'decimal': () => handleDecimal(),
//       'dot': () => handleDecimal(),
//       'percentage': () => handleOperation('percentage'),
//       'percent': () => {
//         const value = parseFloat(currentDisplay);
//         const result = value / 100;
//         setCurrentDisplay(formatNumber(result));
//         setStatus(`Percentage: ${formatNumber(result)}`);
//       }
//     };
    
//     Object.entries(specialCommands).forEach(([command, action]) => {
//       voiceService.registerCommand(command, executeSafe(command, action));
//     });
//   };
  
//   // 5. Voice Control Commands
//   const registerVoiceControlCommands = () => {
//     const voiceCommands = {
//       'voice on': () => {
//         if (!isSpeaking) {
//           toggleSpeech();
//           speak("Voice turned on", true);
//         }
//       },
//       'voice off': () => {
//         if (isSpeaking) {
//           toggleSpeech();
//           speak("Voice turned off", true);
//         }
//       },
//       'toggle voice': () => {
//         toggleSpeech();
//       },
//       'speak on': () => {
//         if (!isSpeaking) {
//           toggleSpeech();
//           speak("Voice turned on", true);
//         }
//       },
//       'speak off': () => {
//         if (isSpeaking) {
//           toggleSpeech();
//           speak("Voice turned off", true);
//         }
//       },
//       'mute': () => {
//         if (isSpeaking) {
//           toggleSpeech();
//           speak("Muted", true);
//         }
//       },
//       'unmute': () => {
//         if (!isSpeaking) {
//           toggleSpeech();
//           speak("Unmuted", true);
//         }
//       }
//     };
    
//     Object.entries(voiceCommands).forEach(([command, action]) => {
//       voiceService.registerCommand(command, executeSafe(command, action));
//     });
//   };
  
//   // 6. Help Commands
//   const registerHelpCommands = () => {
//     const helpCommands = {
//       'help': () => {
//         const helpText = "You can say: numbers like 'twenty three', operations like 'plus', expressions like 'two plus three', 'equals' to calculate, 'clear' to reset, or 'dashboard' to go back.";
//         setStatus(helpText);
//         speak(helpText, true);
//       },
//       'what can i say': () => {
//         const helpText = "Say numbers, operations, expressions, 'equals', 'clear', 'help', or 'dashboard'.";
//         setStatus(helpText);
//         speak(helpText, true);
//       },
//       'show commands': () => {
//         const helpText = "Commands: numbers, plus, minus, multiply, divide, equals, clear, help, dashboard.";
//         setStatus(helpText);
//         speak(helpText, true);
//       },
//       'commands': () => {
//         const helpText = "Available: numbers, operations, expressions, calculate, clear, voice control.";
//         setStatus(helpText);
//         speak(helpText, true);
//       }
//     };
    
//     Object.entries(helpCommands).forEach(([command, action]) => {
//       voiceService.registerCommand(command, executeSafe(command, action));
//     });
//   };
  
//   // 7. Register all number commands
//   const registerNumberCommands = () => {
//     // Register digits 0-9
//     for (let i = 0; i <= 9; i++) {
//       voiceService.registerCommand(i.toString(), executeSafe(i.toString(), () => {
//         handleNumberInput(i.toString());
//       }));
//     }
    
//     // Register number words
//     Object.entries(numberWordsMap).forEach(([word, number]) => {
//       voiceService.registerCommand(word, executeSafe(word, () => {
//         handleDirectNumber(number);
//       }));
//     });
//   };
  
//   // Register all command categories
//   registerNavigationCommands();
//   registerBasicCommands();
//   registerOperationCommands();
//   registerSpecialCommands();
//   registerVoiceControlCommands();
//   registerHelpCommands();
//   registerNumberCommands();
  
//   // ========== REGISTER DYNAMIC HANDLERS ==========
  
//   // 1. Handler for "into" (Indian English multiplication)
//   voiceService.registerDynamicHandler(
//     /^(\d+|\w+(?:\s+\w+)*?)\s+into\s+(\d+|\w+(?:\s+\w+)*?)$/i,
//     (matches) => {
//       console.log('[CalculatorCommands] Dynamic handler matched "into" pattern:', matches);
//       const [_, num1Text, num2Text] = matches;
      
//       const num1 = parseSpokenNumber(num1Text) || num1Text;
//       const num2 = parseSpokenNumber(num2Text) || num2Text;
      
//       if (num1 && num2) {
//         const num1Val = parseFloat(num1);
//         const num2Val = parseFloat(num2);
//         const result = num1Val * num2Val;
//         const resultText = formatNumber(result);
        
//         const historyEntry = {
//           expression: `${num1Val} × ${num2Val}`,
//           result: result,
//           timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
//         };
        
//         setCalculationHistory(prev => [historyEntry, ...prev.slice(0, 9)]);
//         setCurrentDisplay(resultText);
//         setPreviousValue(result);
//         setCurrentOperation(null);
//         setWaitingForNewValue(true);
        
//         setStatus(`${num1Val} × ${num2Val} = ${resultText}`);
//         speak(`${num1Val} into ${num2Val} is ${resultText}`, true);
        
//         return true;
//       }
//       return false;
//     }
//   );
  
//   // 2. Handler for mathematical expressions
//   voiceService.registerDynamicHandler(
//     /^(\d+|\w+(?:\s+\w+)*?)\s+(plus|add|minus|subtract|multiply|times|divide|over)\s+(\d+|\w+(?:\s+\w+)*?)$/i,
//     (matches) => {
//       console.log('[CalculatorCommands] Dynamic handler matched expression:', matches);
//       const [_, num1Text, opText, num2Text] = matches;
      
//       const num1 = parseSpokenNumber(num1Text) || num1Text;
//       const num2 = parseSpokenNumber(num2Text) || num2Text;
      
//       if (num1 && num2) {
//         const opMap = {
//           'plus': 'add',
//           'add': 'add',
//           'minus': 'subtract',
//           'subtract': 'subtract',
//           'multiply': 'multiply',
//           'times': 'multiply',
//           'divide': 'divide',
//           'over': 'divide'
//         };
        
//         const operation = opMap[opText.toLowerCase()];
        
//         if (operation) {
//           const num1Val = parseFloat(num1);
//           const num2Val = parseFloat(num2);
          
//           try {
//             const result = mathOperations[operation](num1Val, num2Val);
//             const resultText = formatNumber(result);
            
//             const historyEntry = {
//               expression: `${num1Val} ${operationSymbols[operation]} ${num2Val}`,
//               result: result,
//               timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
//             };
            
//             setCalculationHistory(prev => [historyEntry, ...prev.slice(0, 9)]);
//             setCurrentDisplay(resultText);
//             setPreviousValue(result);
//             setCurrentOperation(null);
//             setWaitingForNewValue(true);
            
//             setStatus(`${num1Val} ${operation} ${num2Val} = ${resultText}`);
//             speak(`${num1Val} ${operation} ${num2Val} is ${resultText}`, true);
            
//             return true;
//           } catch (error) {
//             console.error("[CalculatorCommands] Calculation error:", error);
//             setCurrentDisplay('Error');
//             setStatus("Calculation error");
//             speak("Error in calculation", true);
//             return true;
//           }
//         }
//       }
//       return false;
//     }
//   );
  
//   // 3. Handler for expressions with operators (+, -, *, /)
//   voiceService.registerDynamicHandler(
//     /^(\d+)\s*([+\-*/])\s*(\d+)$/,
//     (matches) => {
//       console.log('[CalculatorCommands] Dynamic handler matched operator expression:', matches);
//       const [_, num1Text, operator, num2Text] = matches;
      
//       const num1Val = parseFloat(num1Text);
//       const num2Val = parseFloat(num2Text);
      
//       let operation;
//       let operationName;
      
//       switch(operator) {
//         case '+':
//           operation = 'add';
//           operationName = 'plus';
//           break;
//         case '-':
//           operation = 'subtract';
//           operationName = 'minus';
//           break;
//         case '*':
//           operation = 'multiply';
//           operationName = 'multiply';
//           break;
//         case '/':
//           operation = 'divide';
//           operationName = 'divide';
//           break;
//         default:
//           return false;
//       }
      
//       try {
//         const result = mathOperations[operation](num1Val, num2Val);
//         const resultText = formatNumber(result);
        
//         const historyEntry = {
//           expression: `${num1Val} ${operator} ${num2Val}`,
//           result: result,
//           timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
//         };
        
//         setCalculationHistory(prev => [historyEntry, ...prev.slice(0, 9)]);
//         setCurrentDisplay(resultText);
//         setPreviousValue(result);
//         setCurrentOperation(null);
//         setWaitingForNewValue(true);
        
//         setStatus(`${num1Val} ${operator} ${num2Val} = ${resultText}`);
//         speak(`${num1Val} ${operationName} ${num2Val} is ${resultText}`, true);
        
//         return true;
//       } catch (error) {
//         console.error("[CalculatorCommands] Operator calculation error:", error);
//         return false;
//       }
//     }
//   );
  
//   // Set up general callback for unhandled input
//   voiceService.onResultCallback = (transcript) => {
//     console.log('[CalculatorCommands] General callback for:', transcript);
//     setSpokenText(transcript);
    
//     // Try to parse as a single number
//     const parsedNumber = parseSpokenNumber(transcript);
//     if (parsedNumber) {
//       console.log('[CalculatorCommands] Parsed as number:', parsedNumber);
//       handleDirectNumber(parsedNumber);
//       return;
//     }
    
//     // If not a number, provide feedback
//     const feedback = `I heard "${transcript}". Try saying a number or expression like "2 plus 5". Say "help" for commands.`;
//     setStatus(feedback);
//     speak(feedback, true);
//   };
  
//   calculatorCommandsInitialized = true;
  
//   console.log('[CalculatorCommands] === INITIALIZATION COMPLETE ===');
//   console.log('[CalculatorCommands] Current feature:', voiceService.currentFeature);
//   console.log('[CalculatorCommands] Commands registered:', voiceService.commands.size);
//   console.log('[CalculatorCommands] Dynamic handlers:', voiceService.dynamicHandlers.length);
  
//   return true;
// };

// // Stop calculator voice commands
// export const stopCalculatorCommands = () => {
//   console.log('[CalculatorCommands] Stopping calculator commands...');
  
//   calculatorCommandsInitialized = false;
  
//   // Don't clear commands, just stop listening and switch to default
//   if (voiceService.isListening) {
//     voiceService.stopListening();
//   }
  
//   // Keep navigation commands but switch to default feature
//   voiceService.setFeature('default');
  
//   console.log('[CalculatorCommands] Stopped. Current feature:', voiceService.currentFeature);
// };



// src/voice-commands/TalkingCalculatorVoiceCommands.js
import { voiceService } from '../services/voiceService';

let calculatorCommandsInitialized = false;

// Number words mapping
const numberWordsMap = {};

const initializeNumberWordsMap = () => {
  // Single digits
  const ones = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  
  // Add 0-9
  for (let i = 0; i <= 9; i++) {
    numberWordsMap[ones[i]] = i.toString();
  }
  
  // Add 10-19
  for (let i = 0; i <= 9; i++) {
    numberWordsMap[teens[i]] = (10 + i).toString();
  }
  
  // Add 20-99
  for (let ten = 2; ten <= 9; ten++) {
    for (let one = 0; one <= 9; one++) {
      if (one === 0) {
        numberWordsMap[tens[ten]] = (ten * 10).toString();
      } else {
        numberWordsMap[`${tens[ten]} ${ones[one]}`] = (ten * 10 + one).toString();
        numberWordsMap[`${tens[ten]}-${ones[one]}`] = (ten * 10 + one).toString();
      }
    }
  }
  
  // Add 100
  numberWordsMap['hundred'] = '100';
  numberWordsMap['one hundred'] = '100';
};

// Parse spoken number - PRODUCTION READY
const parseSpokenNumber = (text) => {
  if (!text || typeof text !== 'string') {
    return null;
  }
  
  const lowerText = text.toLowerCase().trim();
  
  if (Object.keys(numberWordsMap).length === 0) {
    initializeNumberWordsMap();
  }
  
  // Check direct mapping first
  if (numberWordsMap[lowerText]) {
    return numberWordsMap[lowerText];
  }
  
  // Check for hyphenated
  if (lowerText.includes('-')) {
    const parts = lowerText.split('-');
    let result = '';
    for (const part of parts) {
      const trimmed = part.trim();
      if (numberWordsMap[trimmed]) {
        result += numberWordsMap[trimmed];
      }
    }
    if (result) return result;
  }
  
  // Check for spaced numbers
  const words = lowerText.split(/\s+/);
  if (words.length > 1) {
    const mapped = words.map(word => numberWordsMap[word]).filter(Boolean);
    if (mapped.length === words.length) {
      return mapped.join('');
    }
  }
  
  // Try as regular number
  if (/^\d+$/.test(lowerText)) {
    return lowerText;
  }
  
  return null;
};

// Initialize calculator voice commands
export const initializeCalculatorCommands = (handlers) => {
  console.log('[CalculatorCommands] === INITIALIZING CALCULATOR COMMANDS ===');
  
  // Reset initialization flag to allow reinitialization
  calculatorCommandsInitialized = false;
  
  // Stop any existing listening
  if (voiceService.isListening) {
    console.log('[CalculatorCommands] Stopping existing listening...');
    voiceService.stopListening();
  }
  
  // Clear all previous commands and handlers
  voiceService.clearCommands();
  voiceService.clearDynamicHandlers();
  
  // Set feature to calculator BEFORE registering commands
  voiceService.setFeature('calculator');
  
  const { 
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
  } = handlers;
  
  // Initialize number map
  if (Object.keys(numberWordsMap).length === 0) {
    initializeNumberWordsMap();
  }
  
  // Helper function for safe execution
  const executeSafe = (commandName, action) => {
    return () => {
      console.log(`[CalculatorCommands] Executing: ${commandName}`);
      try {
        setSpokenText(commandName);
        action();
      } catch (error) {
        console.error(`[CalculatorCommands] Error in ${commandName}:`, error);
        setStatus(`Error: ${commandName}`);
      }
    };
  };
  
  // ========== REGISTER ALL COMMANDS ==========
  
  // 1. Register digits 0-9
  for (let i = 0; i <= 10; i++) {
    const num = i === 10 ? '10' : i.toString();
    voiceService.registerCommand(num, executeSafe(num, () => {
      handleNumberInput(num);
    }));
  }
  
  // 2. Register number words
  Object.entries(numberWordsMap).forEach(([word, number]) => {
    voiceService.registerCommand(word, executeSafe(word, () => {
      handleDirectNumber(number);
    }));
  });
  
  // 3. Basic operations
  voiceService.registerCommand('plus', executeSafe('plus', () => handleOperation('add')));
  voiceService.registerCommand('add', executeSafe('add', () => handleOperation('add')));
  voiceService.registerCommand('minus', executeSafe('minus', () => handleOperation('subtract')));
  voiceService.registerCommand('subtract', executeSafe('subtract', () => handleOperation('subtract')));
  voiceService.registerCommand('multiply', executeSafe('multiply', () => handleOperation('multiply')));
  voiceService.registerCommand('times', executeSafe('times', () => handleOperation('multiply')));
  voiceService.registerCommand('divide', executeSafe('divide', () => handleOperation('divide')));
  voiceService.registerCommand('over', executeSafe('over', () => handleOperation('divide')));
  voiceService.registerCommand('percent', executeSafe('percent', () => handleOperation('percentage')));
  voiceService.registerCommand('percentage', executeSafe('percentage', () => handleOperation('percentage')));
  voiceService.registerCommand('square root', executeSafe('square root', () => handleOperation('squareRoot')));
  voiceService.registerCommand('root', executeSafe('root', () => handleOperation('squareRoot')));
  voiceService.registerCommand('power', executeSafe('power', () => handleOperation('power')));
  
  // 4. Calculator controls
  voiceService.registerCommand('calculate', executeSafe('calculate', handleCalculate));
  voiceService.registerCommand('equals', executeSafe('equals', handleCalculate));
  voiceService.registerCommand('equal', executeSafe('equal', handleCalculate));
  voiceService.registerCommand('clear', executeSafe('clear', handleClear));
  voiceService.registerCommand('reset', executeSafe('reset', handleClear));
  voiceService.registerCommand('point', executeSafe('point', handleDecimal));
  voiceService.registerCommand('decimal', executeSafe('decimal', handleDecimal));
  voiceService.registerCommand('dot', executeSafe('dot', handleDecimal));
  
  // 5. Navigation
  voiceService.registerCommand('dashboard', executeSafe('dashboard', () => {
    speak("Going to dashboard", true);
    setTimeout(() => navigate("/dashboard"), 1000);
  }));
  voiceService.registerCommand('home', executeSafe('home', () => {
    speak("Going home", true);
    setTimeout(() => navigate("/dashboard"), 1000);
  }));
  voiceService.registerCommand('back', executeSafe('back', () => {
    speak("Going back", true);
    setTimeout(() => navigate("/dashboard"), 1000);
  }));
  
  // 6. Voice control
  voiceService.registerCommand('voice on', executeSafe('voice on', () => {
    if (!isSpeaking) toggleSpeech();
  }));
  voiceService.registerCommand('voice off', executeSafe('voice off', () => {
    if (isSpeaking) toggleSpeech();
  }));
  voiceService.registerCommand('toggle voice', executeSafe('toggle voice', toggleSpeech));
  
  // 7. Help
  voiceService.registerCommand('help', executeSafe('help', () => {
    const helpText = "Say numbers, operations like 'plus', expressions like '2 plus 5', 'equals', 'clear', or 'dashboard'.";
    setStatus(helpText);
    speak(helpText, true);
  }));
  
  // ========== REGISTER DYNAMIC HANDLERS ==========
  
  // FIXED: Handler for "into" - CORRECT REGEX PATTERN
  voiceService.registerDynamicHandler(
    /^(\d+|\w+(?:\s+\w+)*)\s+into\s+(\d+|\w+(?:\s+\w+)*)$/i,
    (matches, transcript) => {
      console.log('[CalculatorCommands] "into" handler matched:', matches, 'from:', transcript);
      
      // Extract numbers from matches array
      const num1Text = matches && matches[0] ? matches[0] : '';
      const num2Text = matches && matches[1] ? matches[1] : '';
      
      if (!num1Text || !num2Text) {
        console.log('[CalculatorCommands] Missing numbers in "into" pattern');
        return false;
      }
      
      // Parse numbers
      const num1 = parseSpokenNumber(num1Text) || num1Text;
      const num2 = parseSpokenNumber(num2Text) || num2Text;
      
      if (num1 && num2) {
        const num1Val = parseFloat(num1);
        const num2Val = parseFloat(num2);
        const result = num1Val * num2Val;
        const resultText = formatNumber(result);
        
        const historyEntry = {
          expression: `${num1Val} × ${num2Val}`,
          result: result,
          timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        };
        
        setCalculationHistory(prev => [historyEntry, ...prev.slice(0, 9)]);
        setCurrentDisplay(resultText);
        setPreviousValue(result);
        setCurrentOperation(null);
        setWaitingForNewValue(true);
        
        setStatus(`${num1Val} × ${num2Val} = ${resultText}`);
        speak(`${num1Val} into ${num2Val} is ${resultText}`, true);
        
        return true;
      }
      return false;
    }
  );
  
  // FIXED: Handler for mathematical expressions - CORRECT REGEX PATTERN
  voiceService.registerDynamicHandler(
    /^(\d+|\w+(?:\s+\w+)*)\s+(plus|add|minus|subtract|multiply|times|divide|over)\s+(\d+|\w+(?:\s+\w+)*)$/i,
    (matches, transcript) => {
      console.log('[CalculatorCommands] Expression handler matched:', matches, 'from:', transcript);
      
      // Extract components from matches array
      const num1Text = matches && matches[0] ? matches[0] : '';
      const opText = matches && matches[1] ? matches[1] : '';
      const num2Text = matches && matches[2] ? matches[2] : '';
      
      if (!num1Text || !opText || !num2Text) {
        console.log('[CalculatorCommands] Missing components in expression pattern');
        return false;
      }
      
      // Parse numbers
      const num1 = parseSpokenNumber(num1Text) || num1Text;
      const num2 = parseSpokenNumber(num2Text) || num2Text;
      
      if (num1 && num2) {
        const opMap = {
          'plus': 'add',
          'add': 'add',
          'minus': 'subtract',
          'subtract': 'subtract',
          'multiply': 'multiply',
          'times': 'multiply',
          'divide': 'divide',
          'over': 'divide'
        };
        
        const operation = opMap[opText.toLowerCase()];
        
        if (operation) {
          const num1Val = parseFloat(num1);
          const num2Val = parseFloat(num2);
          
          try {
            const result = mathOperations[operation](num1Val, num2Val);
            const resultText = formatNumber(result);
            
            const historyEntry = {
              expression: `${num1Val} ${operationSymbols[operation]} ${num2Val}`,
              result: result,
              timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
            };
            
            setCalculationHistory(prev => [historyEntry, ...prev.slice(0, 9)]);
            setCurrentDisplay(resultText);
            setPreviousValue(result);
            setCurrentOperation(null);
            setWaitingForNewValue(true);
            
            setStatus(`${num1Val} ${operation} ${num2Val} = ${resultText}`);
            speak(`${num1Val} ${opText} ${num2Val} is ${resultText}`, true);
            
            return true;
          } catch (error) {
            console.error("[CalculatorCommands] Calculation error:", error);
            setCurrentDisplay('Error');
            setStatus("Calculation error");
            speak("Error in calculation", true);
            return true;
          }
        }
      }
      return false;
    }
  );
  
  // FIXED: Handler for expressions with operators (+, -, *, /) - CORRECT REGEX PATTERN
  voiceService.registerDynamicHandler(
    /^(\d+)\s*([+\-*/])\s*(\d+)$/,
    (matches, transcript) => {
      console.log('[CalculatorCommands] Operator expression handler matched:', matches, 'from:', transcript);
      
      // Extract components from matches array
      const num1Text = matches && matches[0] ? matches[0] : '';
      const operator = matches && matches[1] ? matches[1] : '';
      const num2Text = matches && matches[2] ? matches[2] : '';
      
      if (!num1Text || !operator || !num2Text) {
        console.log('[CalculatorCommands] Missing components in operator expression');
        return false;
      }
      
      const num1Val = parseFloat(num1Text);
      const num2Val = parseFloat(num2Text);
      
      let operation;
      let operationName;
      
      switch(operator) {
        case '+':
          operation = 'add';
          operationName = 'plus';
          break;
        case '-':
          operation = 'subtract';
          operationName = 'minus';
          break;
        case '*':
          operation = 'multiply';
          operationName = 'multiply';
          break;
        case '/':
          operation = 'divide';
          operationName = 'divide';
          break;
        default:
          return false;
      }
      
      try {
        const result = mathOperations[operation](num1Val, num2Val);
        const resultText = formatNumber(result);
        
        const historyEntry = {
          expression: `${num1Val} ${operator} ${num2Val}`,
          result: result,
          timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        };
        
        setCalculationHistory(prev => [historyEntry, ...prev.slice(0, 9)]);
        setCurrentDisplay(resultText);
        setPreviousValue(result);
        setCurrentOperation(null);
        setWaitingForNewValue(true);
        
        setStatus(`${num1Val} ${operator} ${num2Val} = ${resultText}`);
        speak(`${num1Val} ${operationName} ${num2Val} is ${resultText}`, true);
        
        return true;
      } catch (error) {
        console.error("[CalculatorCommands] Operator calculation error:", error);
        return false;
      }
    }
  );
  
  // Set up general callback for unhandled input
  voiceService.onResultCallback = (transcript) => {
    console.log('[CalculatorCommands] General callback for:', transcript);
    setSpokenText(transcript);
    
    // Try to parse as a single number
    const parsedNumber = parseSpokenNumber(transcript);
    if (parsedNumber) {
      console.log('[CalculatorCommands] Parsed as number:', parsedNumber);
      handleDirectNumber(parsedNumber);
      return;
    }
    
    // If not a number, check if it's a single character operator
    if (transcript === '+' || transcript === '-' || transcript === '*' || transcript === '/') {
      const opMap = {
        '+': 'add',
        '-': 'subtract',
        '*': 'multiply',
        '/': 'divide'
      };
      
      const operation = opMap[transcript];
      if (operation) {
        handleOperation(operation);
        return;
      }
    }
    
    // If not a number or operator, provide feedback
    const feedback = `I heard "${transcript}". Try saying a number, operator (+, -, *, /), or expression like "2 plus 5".`;
    setStatus(feedback);
    speak(feedback, true);
  };
  
  calculatorCommandsInitialized = true;
  
  console.log('[CalculatorCommands] === INITIALIZATION COMPLETE ===');
  console.log('[CalculatorCommands] Current feature:', voiceService.currentFeature);
  console.log('[CalculatorCommands] Commands registered:', voiceService.commands.size);
  console.log('[CalculatorCommands] Dynamic handlers:', voiceService.dynamicHandlers.length);
  
  return true;
};

// Stop calculator voice commands
export const stopCalculatorCommands = () => {
  console.log('[CalculatorCommands] Stopping calculator commands...');
  
  calculatorCommandsInitialized = false;
  
  // Don't clear commands, just stop listening and switch to default
  if (voiceService.isListening) {
    voiceService.stopListening();
  }
  
  // Keep navigation commands but switch to default feature
  voiceService.setFeature('default');
  
  console.log('[CalculatorCommands] Stopped. Current feature:', voiceService.currentFeature);
};