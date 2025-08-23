"use strict";

const terminalContent = document.querySelector(".terminal-content");
const commandInput = document.getElementById("command-input");
const output = document.querySelector(".output");

let commandHistory = [];
let secretFragments = [];
let foundSecrets = {
  level1: false,
  level2: false,
  level3: false,
};

const commands = {
  help: function () {
    return [
      "Available commands:",
      "help - Show this help message",
      "clear - Clear the terminal",
      "whoami - Show user info",
      "date - Show current date and time",
      "scan - Scan system for anomalies",
      "secrets - Show discovered secrets",
    ];
  },

  clear: function () {
    output.innerHTML = " ";
    return [];
  },

  whoami: function () {
    return ["root@cyber-terminal"];
  },

  date: function () {
    return [new Date().toString()];
  },

  scan: function () {
    const messages = [
      "Scanning system for anomalies...",
      "...",
      "FOUND: Hidden data detected in terminal output",
    ];
    setTimeout(() => {
      addSecretHoverText(
        "HINT: Some words in this terminal hide secrets. Try hovering around..."
      );
    }, 2000);

    return messages;
  },

  secrets: function () {
    const result = ["Discovered secrets:"];
    let count = 0;

    if (foundSecrets.level1) {
      result.push("✓ Level 1: First fragment found - CYBER");
      count++;
    }
    if (foundSecrets.level2) {
      result.push("✓ Level 2: Second fragment found - PUNK");
      count++;
    }
    if (foundSecrets.level3) {
      result.push("✓ Level 3: Third fragment found - 2025");
      count++;
    }

    if (count === 0) {
      result.push("No secrets discovered yet. Try scanning the system...");
    } else if (count === 3) {
      result.push("");
      result.push("🎉 ALL SECRETS FOUND! 🎉");
      result.push("Master Key: CYBER-PUNK-2025");
    } else {
      result.push(`Progress: ${count}/3 secrets found`);
    }

    return result;
  },
};

commandInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const command = commandInput.value.trim().toLowerCase();

    if (command) {
      commandHistory.push(command);
      addToOutput("$ " + command);
      executeCommand(command);
    }
    commandInput.value = "";
  }
});

function executeCommand(command) {
  if (commands[command]) {
    const result = commands[command]();
    result.forEach((line) => addToOutput(line));
  } else {
    addToOutput(`Command not found: ${command}`);
  }
}

function addToOutput(text) {
  const p = document.createElement("p");
  p.textContent = text;
  output.appendChild(p);
  terminalContent.scrollTop = terminalContent.scrollHeight;
}

function addSecretHoverText(text) {
  const p = document.createElement("p");

  // Split text to make certain words hoverable
  const words = text.split(" ");
  words.forEach((word, index) => {
    if (word === "secrets" || word === "terminal" || word === "hovering") {
      const span = document.createElement("span");
      span.className = "secret-hover";
      span.textContent = word;

      const hiddenText = document.createElement("span");
      hiddenText.className = "hidden-text";
      hiddenText.textContent = "First fragment: CYBER";
      span.appendChild(hiddenText);

      span.addEventListener("mouseenter", function () {
        if (!foundSecrets.level1) {
          foundSecrets.level1 = true;
          setTimeout(() => {
            addToOutput("✓ Level 1 secret discovered! Fragment: CYBER");
          }, 500);
        }
      });

      p.appendChild(span);
    } else {
      const span = document.createElement("span");
      span.textContent = word;
      p.appendChild(span);
    }

    if (index < words.length - 1) {
      p.appendChild(document.createTextNode(" "));
    }
  });

  output.appendChild(p);
  output.scrollTop = output.scrollHeight;
}
