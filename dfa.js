// script.js

document.addEventListener('DOMContentLoaded', function () {
  const $ = go.GraphObject.make;
  const myDiagram = $(go.Diagram, 'myDiagramDiv', {
    layout: $(go.CircularLayout)
  });

  myDiagram.nodeTemplate = $(
    go.Node, 'Auto',
    $(go.Shape, 'Circle',
      { strokeWidth: 2, fill: 'white' },
      new go.Binding('fill', 'isAcceptState', (accept) => accept ? 'lightgreen' : 'white')
    ),
    $(go.TextBlock, { margin: 8 }, new go.Binding('text', 'key'))
  );

  myDiagram.linkTemplate = $(
    go.Link,
    $(go.Shape),
    $(go.Shape, { toArrow: 'Standard' }),
    $(go.Panel, 'Auto',
      $(go.Shape, { fill: 'lightgray' }),
      $(go.TextBlock, { margin: 3 }, new go.Binding('text', 'label'))
    )
  );

  document.getElementById('generateBtn').addEventListener('click', () => {
    const inputStatement = document.getElementById('dfaInput').value;
    const dfa = generateDFA(inputStatement);

    if (dfa) {
      const { states, transitions, startState, acceptStates } = dfa;

      const nodeDataArray = states.map(state => ({
        key: state,
        isAcceptState: acceptStates.includes(state)
      }));

      const linkDataArray = [];
      for (const [from, trans] of Object.entries(transitions)) {
        for (const [symbol, to] of Object.entries(trans)) {
          linkDataArray.push({ from, to, label: symbol });
        }
      }

      myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
    } else {
      alert("Unsupported condition or unable to generate DFA.");
    }
  });

  function generateDFA(statement) {
    const conditions = [
      {
        pattern: /starts with 'a' and ends with 'a'/i,
        dfa: {
          states: ['q0', 'q1', 'q2', 'q3'],
          transitions: {
            q0: { a: 'q1', b: 'q3' },
            q1: { a: 'q1', b: 'q2' },
            q2: { a: 'q1', b: 'q3' },
            q3: { a: 'q3', b: 'q3' }
          },
          startState: 'q0',
          acceptStates: ['q1']
        }
      },
      {
        pattern: /ends with 'abc'/i,
        dfa: {
          states: ['q0', 'q1', 'q2', 'q3', 'q4'],
          transitions: {
            q0: { a: 'q1', b: 'q0', c: 'q0' },
            q1: { a: 'q1', b: 'q2', c: 'q0' },
            q2: { a: 'q1', b: 'q0', c: 'q3' },
            q3: { a: 'q1', b: 'q0', c: 'q0' },
            q4: { a: 'q4', b: 'q4', c: 'q4' }
          },
          startState: 'q0',
          acceptStates: ['q3']
        }
      },
      {
        pattern: /contains 'ab' as a substring/i,
        dfa: {
          states: ['q0', 'q1', 'q2'],
          transitions: {
            q0: { a: 'q1', b: 'q0' },
            q1: { a: 'q1', b: 'q2' },
            q2: { a: 'q2', b: 'q2' }
          },
          startState: 'q0',
          acceptStates: ['q2']
        }
      }
    ];

    for (const condition of conditions) {
      if (condition.pattern.test(statement)) {
        return condition.dfa;
      }
    }

    return null;
  }
});
