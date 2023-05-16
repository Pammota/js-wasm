
document.getElementById("res-hold").style.visibility = "hidden";

async function getWasm() {
  const wasmFile = await fetch("http://localhost:3000/wasm/test.wasm");

  const wasm = await WebAssembly.instantiateStreaming(wasmFile, {
    js: {
      log: (x) => console.log(x),
      alert: (x) => alert(x),
      dom: (x) => {
        document.getElementById("res-hold").style.visibility = "visible";
        const element = document.getElementById("result");
        element.innerHTML = x;
      },
    },
  });

  return wasm.instance.exports.add2nrOpt;
}

let add2nrOpt;
getWasm().then((func)=> {
  add2nrOpt = func;
});


const selectorToInt = (selector) => { 
  if(selector === "log") return 0;
  if(selector === "alert") return 1;
  if(selector === "dom") return 2;
}

const onButtonPress = () => {
  const nr1 = document.getElementById("num1").value;
  const nr2 = document.getElementById("num2").value;
  const selector = selectorToInt(document.getElementById("selector").value);
  if(selector !==2)
    document.getElementById("res-hold").style.visibility = "hidden";

  add2nrOpt(nr1,nr2,selector);
}

const recompile = () => {
  getWasm().then((func)=> {
    add2nrOpt = func;
  });
  console.log("Recompiled WAT file.");
}

