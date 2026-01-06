// -------------------- STUDENT INFO --------------------
const studentName = sessionStorage.getItem("studentName") || "Student";
const studentEmail = sessionStorage.getItem("studentEmail") || "idah@southernlabs.com";
document.getElementById("studentInfo").textContent = `Player: ${studentName} (${studentEmail})`;

let currentLevel = parseInt(sessionStorage.getItem("currentLevel")) || 1;

// -------------------- LEVELS --------------------
const levels = [];
for(let i=1;i<=20;i++){
    levels.push({
        number: i,
        instructions: `Level ${i}: Reach the goal 🏆 using movement blocks!`,
        grid:[
            ["","","","",""],
            ["","obstacle","","",""],
            ["","stairs","robot","","item"],
            ["","","obstacle","",""],
            ["","","","",""]
        ]
    });
}

let robotPos = {x:2, y:2};

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

function moveRobot(dx, dy){
    const cells = levels[currentLevel-1].grid;
    const newX = robotPos.x+dx;
    const newY = robotPos.y+dy;
    if(newX<0||newX>4||newY<0||newY>4) return;
    if(cells[newY][newX]==="obstacle") return;
    if(cells[newY][newX]==="item"){ alert("🎉 Level Completed!"); }
    cells[robotPos.y][robotPos.x]="";
    robotPos={x:newX,y:newY};
    cells[robotPos.y][robotPos.x]="robot";
    renderGrid();
}

// -------------------- BLOCKLY --------------------
Blockly.defineBlocksWithJsonArray([
    {type:"start_block", message0:"Start", nextStatement:null, colour:160},
    {type:"move_up", message0:"Move Up", previousStatement:null, nextStatement:null, colour:120},
    {type:"move_down", message0:"Move Down", previousStatement:null, nextStatement:null, colour:120},
    {type:"move_left", message0:"Move Left", previousStatement:null, nextStatement:null, colour:120},
    {type:"move_right", message0:"Move Right", previousStatement:null, nextStatement:null, colour:120},
    {type:"jump", message0:"Jump Up 2", previousStatement:null, nextStatement:null, colour:230}
]);

Blockly.JavaScript['start_block'] = function(block){ return Blockly.JavaScript.statementToCode(block,'NEXT'); };
Blockly.JavaScript['move_up'] = function(){ return 'moveRobot(0,-1);\n'; };
Blockly.JavaScript['move_down'] = function(){ return 'moveRobot(0,1);\n'; };
Blockly.JavaScript['move_left'] = function(){ return 'moveRobot(-1,0);\n'; };
Blockly.JavaScript['move_right'] = function(){ return 'moveRobot(1,0);\n'; };
Blockly.JavaScript['jump'] = function(){ return 'moveRobot(0,-2);\n'; };

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
document.getElementById("runBtn").addEventListener("click", ()=>{
    const code = Blockly.JavaScript.workspaceToCode(workspace);
    if(!code){ alert("Attach blocks to Start!"); return; }
    try{ eval(code); } catch(e){ alert("Error in your code: "+e); }
});

document.getElementById("submitBtn").addEventListener("click", ()=>{
    const cells = levels[currentLevel-1].grid;
    const passed = cells[robotPos.y][robotPos.x]==="item";
    alert(passed ? "✅ You passed this level!" : "❌ You did not pass.");
    if(currentLevel<20){
        currentLevel++;
        sessionStorage.setItem("currentLevel", currentLevel);
        robotPos={x:2,y:2};
        renderGrid();
        workspace.clear();
    } else {
        alert("🎉 All 20 levels completed!");
    }
});

// Run code on Enter
document.addEventListener("keydown",(e)=>{
    if(e.key==="Enter") document.getElementById("runBtn").click();
});

// Initial render
renderGrid();

