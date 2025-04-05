# TOC
# DFA Generator

A web-based application that allows users to **generate and visualize Deterministic Finite Automata (DFA)** based on user input. This tool is useful for students, educators, or anyone interested in learning about finite automata and formal languages.

## 🚀 Features

- Input custom DFA configuration (states, alphabets, transitions, start and accept states).
- Real-time visualization of the DFA using [GoJS](https://gojs.net/).
- Easy-to-use, clean UI.
- Supports common patterns like:
  - "starts with 'a' and ends with 'a'"
  - "ends with 'abc'"
  - "contains 'ab' as a substring"

## 🖥️ Live Interface

The app provides a form where users can:
- Define the DFA states and alphabets.
- Enter transitions in the format:
  state,input=nextState; state2,input2=nextState2;
  
## 🧠 Technologies Used
- **HTML/CSS** – For structure and styling
- **JavaScript** – For interactivity and logic
- **GoJS** – For dynamic graph rendering
