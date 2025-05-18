// services/groqService.js

const { PythonShell } = require('python-shell');
const path = require('path');

async function extractCVData(cvText) {
  return new Promise((resolve, reject) => {
    const pyshell = new PythonShell('groq_service.py', {
      mode: 'text',
      pythonOptions: ['-u'],
      scriptPath: path.resolve(__dirname), // adjust if your .py file is elsewhere
      args: [cvText]
    });

    let output='';

    pyshell.on('message', function (message) {
      output += message;
    });

    pyshell.on('stderr', function (stderr) {
      console.error('Python stderr:', stderr);
    });

    pyshell.end(function (err) {
      if (err) return reject(err);

      try {
        const json = JSON.parse(output);
        resolve(json);
      } catch (parseErr) {
        console.error('Failed to parse JSON from Python output:', output);
        reject(parseErr);
      }
    });
  });
}

module.exports = { extractCVData };
