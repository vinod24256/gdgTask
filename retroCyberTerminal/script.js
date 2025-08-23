"use strict";

const commandInput = document.getElementById("command-input");
const output = document.querySelector(".output");

let commandHistory = [];

const commands = {
  help: function () {
    return [
      "Available commands:",
      "help - Show this help message",
      "clear - Clear the terminal",
      "whoami - Show user info",
      "date - Show current date and time",
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
  output.scrollTop = output.scrollHeight;
}
