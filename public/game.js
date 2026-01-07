// -------------------- STUDENT INFO --------------------
const studentName = sessionStorage.getItem("studentName") || "Student";
const studentEmail = sessionStorage.getItem("studentEmail") || "idah@southernlabs.com";
const studentCourse = sessionStorage.getItem("studentCourse") || "";
document.getElementById("studentInfo").textContent = `Player: ${studentName} (${studentEmail}) - ${studentCourse}`;

// -------------------- LEVELS --------------------
let currentLevel = parseInt(sessionStorage.getItem("currentLevel")) || 1;

// Simple 5x5 grids with obstacles, goal, stairs. (20 levels)
const levels = [];
for(let i=1;i<=20;i++){
  levels.push({
    instructions:`Level ${i}: Reach the goal 🏆!`,
    startPos:{x:0,y:4},
    goalPos:{x:4,y:0},
    obstacles:[
      {x:1,y:4},{x:2,y:3},{x:3,y:2},{x:2,y:1},{x:1,y:0}
    ]
  });
}

let robotPos = {...levels[currentLevel-1].startPos};

// -------------------- RENDER GRID --------------------
const grid=document.getElementById("grid");
const instructionsEl=document.getElementById("instructions");
const levelInfoEl=document.getElementById("level-info");

function renderGrid(){
  grid.innerHTML="";
  for(let y=0;y<5;y++){
    for(let x=0;x<5;x++){
      const div=document.createElement("div");
      div.classList.add("cell");
      if(x===robotPos.x && y===robotPos.y) div.textContent="🤖";
      if(x===levels[currentLevel-1].goalPos.x && y===levels[currentLevel-1].goalPos.y) div.textContent="🏆";
      if(levels[currentLevel-1].obstacles.some(o=>o.x===x&&o.y===y)) div.textContent="⛔";
      grid.appendChild(div);
    }
  }
  instructionsEl.textContent = levels[currentLevel-1].instructions;
  levelInfoEl.textContent = `Level ${currentLevel}`;
}

// -------------------- MOVEMENT --------------------
function moveRobot(dx,dy){
  const newX=robotPos.x+dx;
  const newY=robotPos.y+dy;
  if(newX<0||newX>4||newY<0||newY>4) return;
  if(levels[currentLevel-1].obstacles.some(o=>o.x===newX&&o.y===newY)) return;
  robotPos={x:newX,y:newY};
  renderGrid();
}

// -------------------- BLOCKLY --------------------
Blockly.defineBlocksWithJsonArray([
  {type:"start_block", message0:"Start", nextStatement:null, colour:160},
  {type:"move_up", message0:"Move Up", previousStatement:null, nextStatement:null, colour:120},
  {type:"move_down", message0:"Move Down", previousStatement:null, nextStatement:null, colour:120},
  {type:"move_left", message0:"Move Left", previousStatement:null, nextStatement:null, colour:120},
  {type:"move_right", message0:"Move Right", previousStatement:null, nextStatement:null, colour:120},
  {type:"jump", message0:"Jump Up 2", previousStatement:null, nextStatement:null, colour:230},
  {type:"repeat_block", message0:"Repeat %1 times %2", args0:[
    {type:"field_number", name:"TIMES", value:2, min:1,max:10},
    {type:"input_statement", name:"DO"}
  ], previousStatement:null, nextStatement:null, colour:260}
]);

Blockly.JavaScript['start_block']=function(block){return Blockly.JavaScript.statementToCode(block,'NEXT')||'';};
Blockly.JavaScript['move_up']=()=> 'moveRobot(0,-1);\n';
Blockly.JavaScript['move_down']=()=> 'moveRobot(0,1);\n';
Blockly.JavaScript['move_left']=()=> 'moveRobot(-1,0);\n';
Blockly.JavaScript['move_right']=()=> 'moveRobot(1,0);\n';
Blockly.JavaScript['jump']=()=> 'moveRobot(0,-2);\n';
Blockly.JavaScript['repeat_block']=function(block){
  const times=block.getFieldValue('TIMES');
  const statements=Blockly.JavaScript.statementToCode(block,'DO');
  return `for(let i=0;i<${times};i++){\n${statements}}\n`;
};

// Inject Blockly
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
  try{ eval(code); } catch(e){ alert("Error in blocks!"); }
});

document.getElementById("submitBtn").addEventListener("click",()=>{
  const goalReached = (robotPos.x===levels[currentLevel-1].goalPos.x && robotPos.y===levels[currentLevel-1].goalPos.y);
  const duration=(Date.now()-parseInt(sessionStorage.getItem("startTime")))/1000;
  
  // send email to server
  fetch("/submit", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      studentName, studentEmail, studentCourse, currentLevel, passed:goalReached, duration
    })
  });

  alert(goalReached?"✅ Passed!":"❌ Not passed");

  if(currentLevel<levels.length){
    currentLevel++;
    sessionStorage.setItem("currentLevel",currentLevel);
    robotPos={...levels[currentLevel-1].startPos};
    renderGrid();
    workspace.clear();
  } else {
    alert("🎉 All 20 levels completed!");
  }
});

renderGrid();

