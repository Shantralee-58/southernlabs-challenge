// -------------------- STUDENT INFO --------------------
const studentName = sessionStorage.getItem("studentName") || "Student";
const studentEmail = sessionStorage.getItem("studentEmail") || "idah@southernlabs.com";
document.getElementById("studentInfo").textContent = `Player: ${studentName} (${studentEmail})`;

// -------------------- LEVELS --------------------
let currentLevel = parseInt(sessionStorage.getItem("currentLevel")) || 1;

// Define 20 levels (here first 3 for example, extend similarly)
const levels = [
  {
    instructions: "Level 1: Reach the goal 🏆!",
    startPos: { x: 0, y: 2 },
    grid: [
      ["", "", "", "", ""],
      ["", "obstacle", "", "", ""],
      ["robot", "", "", "stairs", "item"],
      ["", "", "obstacle", "", ""],
      ["", "", "", "", ""]
    ]
  },
  {
    instructions: "Level 2: Avoid obstacles to reach the goal!",
    startPos: { x: 0, y: 2 },
    grid: [
      ["", "", "", "", ""],
      ["", "obstacle", "obstacle", "", ""],
      ["robot", "", "", "stairs", "item"],
      ["", "obstacle", "", "", ""],
      ["", "", "", "", ""]
    ]
  },
  {
    instructions: "Level 3: Use stairs and jump to reach the goal!",
    startPos: { x: 0, y: 2 },
    grid: [
      ["", "", "", "obstacle", ""],
      ["", "stairs", "", "", ""],
      ["robot", "", "obstacle", "", "item"],
      ["", "", "", "", ""],
      ["", "", "", "", ""]
    ]
  }
  // ... repeat up to level 20
];

// Robot position
let robotPos = { ...levels[currentLevel-1].startPos };

// -------------------- RENDER GRID --------------------
const grid = document.getElementById("grid");
const instructionsEl = document.getElementById("instructions");
const levelInfoEl = document.getElementById("level-info");

function renderGrid() {
  grid.innerHTML = "";
  const cells = levels[currentLevel-1].grid;
  for (let y=0; y<5; y++){
    for (let x=0; x<5; x++){
      const div = document.createElement("div");
      div.classList.add("cell");
      const val = cells[y][x];
      if(val) div.classList.add(val);
      if(val==="robot") div.textContent="🤖";
      if(val==="obstacle") div.textContent="⛔";
      if(val==="item") div.textContent="🏆";
      if(val==="stairs") div.textContent="🪜";
      grid.appendChild(div);
    }
  }
  instructionsEl.textContent = levels[currentLevel-1].instructions;
  levelInfoEl.textContent = `Level ${currentLevel}`;
}

// -------------------- ROBOT MOVEMENT --------------------
function moveRobot(dx,dy){
  const cells = levels[currentLevel-1].grid;
  const newX = robotPos.x + dx;
  const newY = robotPos.y + dy;
  if(newX<0 || newX>4 || newY<0 || newY>4) return;
  if(cells[newY][newX]==="obstacle") return;
  // move
  cells[robotPos.y][robotPos.x]="";
  robotPos={x:newX,y:newY};
  cells[robotPos.y][robotPos.x]="robot";
  renderGrid();
}

// -------------------- BLOCKLY --------------------
Blockly.defineBlocksWithJsonArray([
  { type:"start_block", message0:"Start", nextStatement:null, colour:160 },
  { type:"move_up", message0:"Move Up", previousStatement:null, nextStatement:null, colour:120 },
  { type:"move_down", message0:"Move Down", previousStatement:null, nextStatement:null, colour:120 },
  { type:"move_left", message0:"Move Left", previousStatement:null, nextStatement:null, colour:120 },
  { type:"move_right", message0:"Move Right", previousStatement:null, nextStatement:null, colour:120 },
  { type:"jump", message0:"Jump Up 2", previousStatement:null, nextStatement:null, colour:230 }
]);

Blockly.JavaScript['start_block']=function(block){
  const code=Blockly.JavaScript.statementToCode(block,'NEXT');
  return code||'';
};
Blockly.JavaScript['move_up']=()=> 'moveRobot(0,-1);\n';
Blockly.JavaScript['move_down']=()=> 'moveRobot(0,1);\n';
Blockly.JavaScript['move_left']=()=> 'moveRobot(-1,0);\n';
Blockly.JavaScript['move_right']=()=> 'moveRobot(1,0);\n';
Blockly.JavaScript['jump']=()=> 'moveRobot(0,-2);\n';

// -------------------- INITIALIZE BLOCKLY --------------------
const workspace = Blockly.inject('blocklyDiv',{
  toolbox:{
    kind:"flyoutToolbox",
    contents:[
      {kind:"block", type:"start_block"},
      {kind:"block", type:"move_up"},
      {kind:"block", type:"move_down"},
      {kind:"block", type:"move_left"},
      {kind:"block", type:"move_right"},
      {kind:"block", type:"jump"}
    ]
  }
});

// -------------------- BUTTONS --------------------
document.getElementById("runBtn").addEventListener("click",()=>{
  const code=Blockly.JavaScript.workspaceToCode(workspace);
  if(!code){ alert("Attach blocks to Start!"); return;}
  try{ eval(code); } catch(e){ console.error(e); alert("Error in code!"); }
});

document.getElementById("submitBtn").addEventListener("click",()=>{
  const cells=levels[currentLevel-1].grid;
  const goalReached=cells[robotPos.y][robotPos.x]==="item";
  alert(goalReached ? "✅ Passed!" : "❌ Not passed");
  if(currentLevel<levels.length){
    currentLevel++;
    sessionStorage.setItem("currentLevel",currentLevel);
    robotPos={...levels[currentLevel-1].startPos};
    renderGrid();
    workspace.clear();
  } else {
    alert("🎉 All levels completed!");
  }
});

// -------------------- INITIAL RENDER --------------------
renderGrid();

