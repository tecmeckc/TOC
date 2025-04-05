

console.log("script.js is being executed");

document.addEventListener('DOMContentLoaded', function () {
  console.log("DOM fully loaded");

  // Initialize GoJS Diagram
  const $ = go.GraphObject.make;
  const myDiagram = $(go.Diagram, 'myDiagramDiv', {
    'undoManager.isEnabled': true,
    layout: $(go.ForceDirectedLayout)  // Automatically layout the nodes
  });

  console.log("GoJS Diagram initialized");

  // Define the Node template
  myDiagram.nodeTemplate =
    $(go.Node, 'Auto',
      $(go.Shape, 'Circle', { strokeWidth: 1, fill: 'white', portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer' },
        new go.Binding('fill', 'isAcceptState', function (isAccept) {
          return isAccept ? 'lightgreen' : 'white';
        })
      ),
      $(go.TextBlock, { margin: 8, editable: true },
        new go.Binding('text', 'key'))
    );

  // Define the Link template
  myDiagram.linkTemplate =
    $(go.Link,
      $(go.Shape),
      $(go.Shape, { toArrow: 'Standard' }),
      $(go.Panel, 'Auto',
        $(go.Shape, { fill: $(go.Brush, 'Radial', { 0: 'white', 1: 'lightgray' }) }),
        $(go.TextBlock, { margin: 3, editable: true },
          new go.Binding('text', 'label'))
      )
    );

  // Handle form submission
  const form = document.getElementById('dfaForm');
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    console.log("Generate DFA button clicked");

    // Retrieve user inputs
    const states = document.getElementById('states').value.split(',').map(s => s.trim());
    const alphabets = document.getElementById('alphabets').value.split(',').map(a => a.trim());
    const transitionsInput = document.getElementById('transitions').value;
    const startState = document.getElementById('startState').value.trim();
    const acceptStates = document.getElementById('acceptStates').value.split(',').map(s => s.trim());

    console.log("Inputs received:", { states, alphabets, transitionsInput, startState, acceptStates });

    // Parse transitions
    const transitions = transitionsInput.split(';').reduce((acc, trans) => {
      const [stateInput, nextState] = trans.split('=').map(s => s.trim());
      const [state, input] = stateInput.split(',').map(s => s.trim());
      if (!acc[state]) acc[state] = {};
      acc[state][input] = nextState;
      return acc;
    }, {});

    console.log("Parsed transitions:", transitions);

    // Create nodes data
    const nodeDataArray = states.map(state => ({
      key: state,
      isAcceptState: acceptStates.includes(state)
    }));

    // Create links data
    const linkDataArray = [];
    for (const [state, paths] of Object.entries(transitions)) {
      for (const [input, nextState] of Object.entries(paths)) {
        linkDataArray.push({
          from: state,
          to: nextState,
          label: input
        });
      }
    }

    console.log("Node Data Array:", nodeDataArray);
    console.log("Link Data Array:", linkDataArray);

    // Set the diagram's model
    myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);

    // Highlight the start state
    const startNode = myDiagram.findNodeForKey(startState);
    if (startNode) {
      myDiagram.select(startNode);
      myDiagram.centerRect(startNode.actualBounds);
    }
  });
});
