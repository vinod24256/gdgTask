"use strict";

const terminalContent = document.querySelector(".terminal-content");
const commandInput = document.getElementById("command-input");
const output = document.querySelector(".output");
const body = document.querySelector("body");
const splashScreen = document.getElementById("splash-screen");
const terminal = document.querySelector(".terminal");

let alarmSound;

window.onload = () => {
  document.body.addEventListener(
    "click",
    () => {
      const canvas = document.getElementById("matrix-bg");
      const ctx = canvas.getContext("2d");

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const katakana =
        "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン";
      const latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const nums = "0123456789";
      const alphabet = katakana + latin + nums;
      const fontSize = 16;
      const columns = canvas.width / fontSize;
      const rainDrops = [];
      for (let x = 0; x < columns; x++) {
        rainDrops[x] = 1;
      }
      const drawMatrix = () => {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#00ff00";
        ctx.font = fontSize + "px monospace";
        for (let i = 0; i < rainDrops.length; i++) {
          const text = alphabet.charAt(
            Math.floor(Math.random() * alphabet.length)
          );
          ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
          if (
            rainDrops[i] * fontSize > canvas.height &&
            Math.random() > 0.975
          ) {
            rainDrops[i] = 0;
          }
          rainDrops[i]++;
        }
      };

      setInterval(drawMatrix, 30);

      setTimeout(() => {
        splashScreen.style.display = "none";
        terminal.style.display = "block";
        terminal.style.animation = "fadeIn 1s";
        addToOutput("System initialized. Are you ready?");
        addToOutput("Type 'help' for available commands");
        commandInput.focus();
      }, 2000);
    },
    { once: true }
  );
};

let commandHistory = [];
let secretFragments = [];
let foundSecrets = {
  level1: false,
  level2: false,
  level3: false,
  level4: false,
};
let sysState = "stable";

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

  //   scan: function () {
  //     const messages = [
  //       "Scanning system for anomalies...",
  //       "...",
  //       "FOUND: Hidden data detected in terminal output",
  //     ];
  //     setTimeout(() => {
  //       addSecretHoverText(
  //         "HINT: Some words in this terminal hide secrets. Try hovering around..."
  //       );
  //     }, 2000);

  //     return messages;
  //   },

  scan: function () {
    const p = document.createElement("p");
    output.appendChild(p);
    let percent = 0;

    const scanInterval = setInterval(() => {
      percent += Math.floor(Math.random() * 10) + 1;
      if (percent > 100) {
        percent = 100;
      }

      const progressBar = `[${"#".repeat(percent / 5)}${"-".repeat(
        20 - percent / 5
      )}]`;
      p.textContent = `Scanning system for anomalies... ${progressBar} ${percent}%`;
      terminalContent.scrollTop = terminalContent.scrollHeight;

      if (percent === 100) {
        clearInterval(scanInterval);

        addToOutput("...");
        addToOutput("FOUND: Hidden data detected in terminal output");
        setTimeout(() => {
          addSecretHoverText(
            "HINT: Some words in this terminal hide secrets. Try hovering around..."
          );
        }, 1000);
      }
    }, 150);
    return [];
  },

  secrets: function () {
    const result = ["Discovered secrets:"];
    let count = 0;

    if (foundSecrets.level1) {
      result.push("✓ Level 1: First fragment found - Follow");
      count++;
    }
    if (foundSecrets.level2) {
      result.push("✓ Level 2: Second fragment found - THE");
      count++;
    }
    if (foundSecrets.level3) {
      result.push("✓ Level 3: Third fragment found - WHITE");
      count++;
    }
    if (foundSecrets.level4) {
      result.push("✓ Level 3: Third fragment found - RABBIT");
      count++;
    }

    if (count === 0) {
      result.push("No secrets discovered yet. Try scanning the system...");
    } else if (count === 4) {
      result.push("");
      result.push("🎉 ALL SECRETS FOUND! 🎉");
      result.push("Master Key: Follow The White Rabbit");
    } else {
      result.push(`Progress: ${count}/4 secrets found`);
    }

    return result;
  },
  breach: function () {
    if (sysState === "stable") {
      sysState = "glitch";
      body.classList.add("glitch-active");

      if (!foundSecrets.level1) {
        alarmSound = pslaySound(
          "assets/sounds/74206__timbre__star-trek-emergency-simulation.wav"
        );
        setTimeout(() => {
          stopSound(alarmSound);
          commands.clear();
          body.classList.remove("glitch-active");
          addToOutput(
            "ACCESS DENIED: System integrity must be compromised first."
          );
        }, 5000);
        return [];
      }
      if (!foundSecrets.level2) {
        alarmSound = playSound(
          "assets/sounds/74206__timbre__star-trek-emergency-simulation.wav"
        );
        foundSecrets.level2 = true;

        scrambleEffect("✓ Level 2 secret discovered!", () => {
          scrambleEffect("!!! SYSTEM INTEGRITY COMPROMISED !!!", () => {
            scrambleEffect("Firewall breached. You are in.", () => {
              scrambleEffect(
                "✓ Level 2 secret discovered! Fragment: THE",
                () => {
                  terminal.classList.add("shake-effect");
                  setTimeout(() => {
                    terminal.classList.remove("shake-effect");
                    body.classList.remove("glitch-active");
                    stopSound(alarmSound);
                  }, 500);
                }
              );
            });
          });
        });
      }
      return [];
    }
    return ["System is already unstable."];
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

  const words = text.split(" ");
  words.forEach((word, index) => {
    if (word === "secrets" || word === "terminal" || word === "hovering") {
      const span = document.createElement("span");
      span.className = "secret-hover";
      span.textContent = word;

      const hiddenText = document.createElement("span");
      hiddenText.className = "hidden-text";
      hiddenText.textContent = "First fragment: Follow";
      span.appendChild(hiddenText);

      span.addEventListener("mouseenter", function () {
        if (!foundSecrets.level1) {
          foundSecrets.level1 = true;
          setTimeout(() => {
            addToOutput("✓ Level 1 secret discovered! Fragment: Follow");
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

function scrambleEffect(text, onComplete) {
  const p = document.createElement("p");
  output.appendChild(p);
  const chars = "!<>-_\\/[]{}—=+*^?#";
  let i = 0;

  const scrambleInterval = setInterval(() => {
    let scrambledText = "";
    for (let j = 0; j < text.length; j++) {
      if (j <= i) {
        scrambledText += text[j];
      } else {
        scrambledText += chars[Math.floor(Math.random() * chars.length)];
      }
    }
    p.textContent = scrambledText;
    terminalContent.scrollTop = terminalContent.scrollHeight;

    if (i >= text.length) {
      clearInterval(scrambleInterval);
      if (onComplete) {
        onComplete();
      }
    }
    i++;
  }, 50);
}

function playSound(soundFile) {
  const audio = new Audio(soundFile);
  audio.loop = true;
  audio.play();
  return audio;
}
function stopSound(audioObject) {
  if (audioObject) {
    audioObject.pause();
    audioObject.currentTime = 0;
  }
}
