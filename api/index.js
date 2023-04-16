const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
const { exec } = require("child_process");
const port = 3000;

const splitFileName = (filename) => {
  const nameArr = filename.split(".");
  return {
    name: nameArr[0],
    extension: nameArr[1],
  };
};

app.use(cors());
app.get("/", (req, res) => res.send("Default Route"));
app.get("/wasm/:filename", async (req, res) => {
  const filename = req.params.filename;

  const { name } = splitFileName(filename);
  const wasmFilePath = __dirname + "/" + name + ".wasm";

  await exec(`wat2wasm ${name}.wat`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).send("Error creating file");
    }

    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return res.status(500).send("Error creating file");
    }

    // console.log(`File ${name}.wasm created successfully`);

    if (fs.existsSync(wasmFilePath)) {
      const wasmFile = fs.readFileSync(wasmFilePath);
      res.contentType("application/wasm");
      res.send(wasmFile);
    } else {
      res.status(404).send(" 404 File not found");
    }
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
