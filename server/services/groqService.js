const { PythonShell } = require('python-shell');
const path = require('path');

async function runPythonScript(args) {
  return new Promise((resolve, reject) => {
    const options = {
      mode: 'text',
      pythonOptions: ['-u'],
      scriptPath: path.resolve(__dirname),
      args: args
    };

    let output = '';
    
    // Determine which script to run based on first argument
    const scriptName = args[0].endsWith('.py') ? args[0] : 'groq_service.py';
    const scriptArgs = args[0].endsWith('.py') ? args.slice(1) : args;

    const pyshell = new PythonShell(scriptName, {
      ...options,
      args: scriptArgs
    });

    pyshell.on('message', (message) => {
      output += message;
    });

    pyshell.on('stderr', (stderr) => {
      console.error('Python stderr:', stderr);
    });

    pyshell.end((err) => {
      if (err) return reject(err);
      try {
        resolve(JSON.parse(output));
      } catch (parseErr) {
        console.error('Failed to parse Python output:', output);
        reject(parseErr);
      }
    });
  });
}

async function extractCVData(cvText) {
  try {
    const result = await runPythonScript(['groq_service.py', cvText]);
    return result;
  } catch (err) {
    console.error('CV extraction failed:', err);
    throw err;
  }
}

module.exports = {
  extractCVData,
  runPythonScript
};