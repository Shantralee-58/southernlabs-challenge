// -------------------- STUDENT INFO --------------------
const studentName = sessionStorage.getItem("studentName") || "Student";
const studentEmail = sessionStorage.getItem("studentEmail") || "idah@southernlabs.com";
document.getElementById("studentInfo").textContent = `Player: ${studentName} (${studentEmail})`;

// -------------------- LEVELS --------------------
let currentLevel = parseInt(sessionStorage.getItem("currentLevel")) || 1;

// Define 20 levels

const levels = [
  {
    instructions: "Level 1: Reach the goal 🏆!",
    startPos: { x: 0, y: 0 },
    grid: [
      ["robot", "", "", "", ""],
      ["", "obstacle", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "stairs", "", ""],
      ["", "", "", "", "item"]
    ]
  },
  {
    instructions: "Level 2: Avoid obstacles and reach the goal!",
    startPos: { x: 0, y: 1 },
    grid: [
      ["", "", "obstacle", "", ""],
      ["robot", "", "", "obstacle", ""],
      ["", "stairs", "", "", ""],
      ["", "", "", "obstacle", ""],
      ["", "", "", "", "item"]
    ]
  },
  {
    instructions: "Level 3: Use the stairs to reach higher ground!",
    startPos: { x: 1, y: 4 },
    grid: [
      ["", "", "", "", ""],
      ["", "obstacle", "", "", ""],
      ["", "", "stairs", "", ""],
      ["", "", "", "obstacle", ""],
      ["", "robot", "", "", "item"]
    ]
  },
  {
    instructions: "Level 4: Jump over obstacles to reach the goal!",
    startPos: { x: 0, y: 0 },
    grid: [
      ["robot", "", "obstacle", "", ""],
      ["", "", "", "", ""],
      ["", "obstacle", "", "stairs", ""],
      ["", "", "", "", ""],
      ["", "", "", "", "item"]
    ]
  },
  {
    instructions: "Level 5: Navigate carefully to reach the trophy!",
    startPos: { x: 2, y: 2 },
    grid: [
      ["", "obstacle", "", "", ""],
      ["", "", "stairs", "", ""],
      ["", "", "robot", "obstacle", ""],
      ["", "", "", "", ""],
      ["", "", "", "", "item"]
    ]
  },
  {
    instructions: "Level 6: Avoid obstacles and use stairs.",
    startPos: { x: 0, y: 3 },
    grid: [
      ["", "", "", "", ""],
      ["", "obstacle", "", "", ""],
      ["stairs", "", "", "obstacle", ""],
      ["robot", "", "", "", ""],
      ["", "", "", "", "item"]
    ]
  },
  {
    instructions: "Level 7: Watch your step and reach the goal!",
    startPos: { x: 4, y: 0 },
    grid: [
      ["", "", "", "", "robot"],
      ["", "obstacle", "", "", ""],
      ["", "", "stairs", "", ""],
      ["", "", "", "obstacle", ""],
      ["", "", "", "", "item"]
    ]
  },
  {
    instructions: "Level 8: Use jumps to reach the trophy!",
    startPos: { x: 0, y: 2 },
    grid: [
      ["", "obstacle", "", "", ""],
      ["", "", "", "obstacle", ""],
      ["robot", "", "", "", ""],
      ["", "", "stairs", "", ""],
      ["", "", "", "", "item"]
    ]
  },
  {
    instructions: "Level 9: Combine stairs and jumps to win!",
    startPos: { x: 1, y: 1 },
    grid: [
      ["", "", "", "", ""],
      ["", "robot", "obstacle", "", ""],
      ["", "", "stairs", "", ""],
      ["", "obstacle", "", "", ""],
      ["", "", "", "", "item"]
    ]
  },
  {
    instructions: "Level 10: Carefully navigate the obstacles!",
    startPos: { x: 0, y: 4 },
    grid: [
      ["", "", "", "", ""],
      ["", "obstacle", "", "", ""],
      ["", "", "stairs", "", ""],
      ["", "", "", "", ""],
      ["robot", "", "", "", "item"]
    ]
  },
  {
    instructions: "Level 11: Use jumps and stairs to reach the goal!",
    startPos: { x: 2, y: 0 },
    grid: [
      ["", "", "robot", "", ""],
      ["", "obstacle", "", "stairs", ""],
      ["", "", "", "", ""],
      ["", "", "", "obstacle", ""],
      ["", "", "", "", "item"]
    ]
  },
  {
    instructions: "Level 12: Obstacles ahead, plan your path!",
    startPos: { x: 0, y: 0 },
    grid: [
      ["robot", "", "obstacle", "", ""],
      ["", "", "", "obstacle", ""],
      ["", "stairs", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", "item"]
    ]
  },
  {
    instructions: "Level 13: Make use of all your skills!",
    startPos: { x: 1, y: 3 },
    grid: [
      ["", "", "", "", ""],
      ["", "obstacle", "", "", ""],
      ["", "", "stairs", "", ""],
      ["", "robot", "", "obstacle", ""],
      ["", "", "", "", "item"]
    ]
  },
  {
    instructions: "Level 14: Avoid obstacles and move fast!",
    startPos: { x: 0, y: 1 },
    grid: [
      ["", "obstacle", "", "", ""],
      ["robot", "", "stairs", "", ""],
      ["", "", "", "obstacle", ""],
      ["", "", "", "", ""],
      ["", "", "", "", "item"]
    ]
  },
  {
    instructions: "Level 15: Strategic jumps to win the level!",
    startPos: { x: 2, y: 2 },
    grid: [
      ["", "", "", "", ""],
      ["", "obstacle", "", "", ""],
      ["", "", "robot", "stairs", ""],
      ["", "", "", "", ""],
      ["", "", "", "", "item"]
    ]
  },
  {
    instructions: "Level 16: Use loops to reach the trophy!",
    startPos: { x: 0, y: 0 },
    grid: [
      ["robot", "", "", "obstacle", ""],
      ["", "", "stairs", "", ""],
      ["", "", "", "", ""],
      ["", "obstacle", "", "", ""],
      ["", "", "", "", "item"]
    ]
  },
  {
    instructions: "Level 17: Mix moves and jumps to succeed!",
    startPos: { x: 1, y: 4 },
    grid: [
      ["", "", "", "", ""],
      ["", "obstacle", "", "", ""],
      ["", "", "stairs", "", ""],
      ["", "", "", "", ""],
      ["", "robot", "", "", "item"]
    ]
  },
  {
    instructions: "Level 18: Plan your path carefully!",
    startPos: { x: 0, y: 2 },
    grid: [
      ["", "", "", "", ""],
      ["", "stairs", "", "obstacle", ""],
      ["robot", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", "item"]
    ]
  },
  {
    instructions: "Level 19: Obstacles everywhere, reach the goal!",
    startPos: { x: 0, y: 0 },
    grid: [
      ["robot", "", "", "", ""],
      ["", "obstacle", "", "", ""],
      ["", "", "stairs", "", ""],
      ["", "", "", "obstacle", ""],
      ["", "", "", "", "item"]
    ]
  },
  {
    instructions: "Level 20: Final level! Reach the ultimate trophy 🏆!",
    startPos: { x: 2, y: 2 },
    grid: [
      ["", "", "", "", ""],
      ["", "obstacle", "", "stairs", ""],
      ["", "", "robot", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", "item"]
    ]
  }
];
// Robot position
let robotPos = { ...levels[currentLevel-1].startPos };

// -------------------- RENDER GRID --------------------
const grid = document.getElementById("grid");
const instructionsEl = document.getElementById("instructions");
const levelInfoEl = document.getElementById("level-info");

function renderGrid(){
  grid.innerHTML="";
  const cells = levels[currentLevel-1].grid;
  for(let y=0;y<5;y++){
    for(let x=0;x<5;x++){
      const div=document.createElement("div");
      div.classList.add("cell");
      const val=cells[y][x];
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

renderGrid();

// -------------------- ROBOT MOVEMENT --------------------
function moveRobot(dx,dy){
  const cells=levels[currentLevel-1].grid;
  const newX=robotPos.x+dx;
  const newY=robotPos.y+dy;
  if(newX<0||newX>4||newY<0||newY>4) return;
  if(cells[newY][newX]==="obstacle") return;
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
  { type:"jump", message0:"Jump Up 2", previousStatement:null, nextStatement:null, colour:230 },
  { type:"repeat_block", message0:"Repeat %1 times %2", args0:[
      {type:"field_number", name:"TIMES", value:2, min:1},
      {type:"input_statement", name:"DO"}
    ], previousStatement:null, nextStatement:null, colour:60 }
]);

Blockly.JavaScript['start_block']=function(block){
  return Blockly.JavaScript.statementToCode(block,'NEXT')||'';
};
Blockly.JavaScript['move_up']=()=> 'moveRobot(0,-1);\n';
Blockly.JavaScript['move_down']=()=> 'moveRobot(0,1);\n';
Blockly.JavaScript['move_left']=()=> 'moveRobot(-1,0);\n';
Blockly.JavaScript['move_right']=()=> 'moveRobot(1,0);\n';
Blockly.JavaScript['jump']=()=> 'moveRobot(0,-2);\n';
Blockly.JavaScript['repeat_block']=function(block){
  const times=block.getFieldValue("TIMES");
  const code=Blockly.JavaScript.statementToCode(block,"DO");
  return `for(let i=0;i<${times};i++){\n${code}}\n`;
};

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
      {kind:"block", type:"jump"},
      {kind:"block", type:"repeat_block"}
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
  const duration=Math.floor(Math.random()*1000); // placeholder
  console.log({
    studentName,
    studentEmail,
    studentCourse: sessionStorage.getItem("studentCourse"),
    level: currentLevel,
    passed: goalReached,
    duration,
    time: new Date()
  });
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

