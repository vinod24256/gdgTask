const terminalContent = document.querySelector(".terminal-content");
const commandInput = document.getElementById("command-input");
const output = document.querySelector(".output");
const body = document.querySelector("body");
const splashScreen = document.getElementById("splash-screen");
const terminal = document.querySelector(".terminal");

let loopingSound;
let bootUpSound;

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
        playSingleSound("assets/sounds/boot_up.m4a");
        addToOutput("System initialized. Are you ready?");
        addToOutput("Type 'help' for available commands");
        commandInput.focus();
        stopSound(bootUpSound);
      }, 1000);
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
};

let sysState = "stable";
let conversationMode = false;

const fileSystem = {
  "debugger.log":
    "FATAL ERROR in script.js: Uncaught ReferenceError: 'key' is not defined at function grant_access() line 412. Memory integrity compromised.",
  "security_protocol.txt":
    "System keys are generated from the session's unique process ID. Current PID: 0010067",

  "access.log": "FAIL...FAIL...FAIL...LOGIN ATTEMPT...root...FAIL...",
  "morpheus_chat.log":
    "Morpheus: The exploit must be triggered manually. There is no other way.",
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
      result.push("✓ Level 2: Second fragment found - THE WHITE");
      count++;
    }
    if (foundSecrets.level3) {
      result.push("✓ Level 3: Third fragment found - RABBIT");
      count++;
    }

    if (count === 0) {
      result.push("No secrets discovered yet. Try scanning the system...");
    } else if (count === 3) {
      result.push("");
      result.push("🎉 ALL SECRETS FOUND! 🎉");
      result.push("Master Key: Follow The White Rabbit");
    } else {
      result.push(`Progress: ${count}/3 secrets found`);
    }

    return result;
  },
  ls: function () {
    if (sysState !== "glitch") {
      return [`Command not found: ls`];
    }
    return [Object.keys(fileSystem).join("   ")];
  },

  cat: function (args) {
    if (sysState !== "glitch") {
      return [`Command not found: cat`];
    }
    const filename = args;
    if (fileSystem[filename]) {
      return [fileSystem[filename]];
    }
    return [`cat: ${filename}: No such file`];
  },
  breach: function () {
    if (sysState === "stable") {
      sysState = "glitch";
      body.classList.add("glitch-active");

      if (!foundSecrets.level1) {
        loopingSound = playSound("assets/sounds/alarm.wav");
        setTimeout(() => {
          stopSound(loopingSound);
          commands.clear();
          body.classList.remove("glitch-active");
          addToOutput(
            "ACCESS DENIED: System integrity must be compromised first."
          );
        }, 3000);
        return [];
      }
      if (!foundSecrets.level2) {
        loopingSound = playSound("assets/sounds/alarm.wav");
        foundSecrets.level2 = true;

        scrambleEffect(
          "✓ Level 2 secret discovered! Fragment: THE WHITE",
          () => {
            scrambleEffect("!!! SYSTEM INTEGRITY COMPROMISED !!!", () => {
              scrambleEffect("Firewall breached. You are in.", () => {
                // This message now makes more sense
                scrambleEffect("New commands may now be available.", () => {
                  terminal.classList.add("shake-effect");
                  setTimeout(() => {
                    terminal.classList.remove("shake-effect");
                    body.classList.remove("glitch-active");
                    stopSound(loopingSound);
                  }, 500);
                });
              });
            });
          }
        );
      }
      return [];
    }
    return ["System is already unstable."];
  },
};

commandInput.addEventListener("keydown", (e) => {
  if (e.key !== "Enter") {
    playSingleSound("assets/sounds/key_press.wav", 0.4);
  }
});

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
  const [cmd, ...args] = command.split(" ");

  if (commands[cmd]) {
    // If it's a normal, safe command, run it
    const result = commands[cmd](args.join(" "));
    result.forEach((line) => addToOutput(line));
  } else if (sysState === "glitch") {
    try {
      eval(command);
    } catch (error) {
      addToOutput(`SYNTAX ERROR: ${error.message}`);
    }
  } else {
    playSingleSound("assets/sounds/error.mp3");
    addToOutput(`Command not found: ${command}`);
  }
}

function addToOutput(text) {
  const p = document.createElement("p");
  p.textContent = text;
  output.appendChild(p);
  terminalContent.scrollTop = terminalContent.scrollHeight;
}

function addMultiLineOutput(text) {
  const pre = document.createElement("pre"); // Use a <pre> tag for ASCII art
  pre.textContent = text;
  output.appendChild(pre);
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
          playSingleSound("assets/sounds/secondLevelVictory.m4a");
          foundSecrets.level1 = true;
          setTimeout(() => {
            addToOutput("✓ Level 1 secret discovered! Fragment: Follow");
            stopSound(loopingSound);
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
  audio.addEventListener("error", () => {
    console.log(`Could not load ${soundFile}`);
  });
  audio.loop = true;
  audio.play().catch((e) => console.log("Audio play failed:", e));
  return audio;
}

function playSingleSound(soundFile, volume = 1.0) {
  const audio = new Audio(soundFile);
  audio.volume = 0.4;
  audio.play();
}

function stopSound(audioObject) {
  if (audioObject) {
    audioObject.pause();
    audioObject.currentTime = 0;
  }
}

function systemCrash() {
  stopSound(loopingSound);
  playSingleSound("assets/sounds/crash.mp3");
  body.innerHTML =
    '<div id="crash-screen" style="color:red; text-align:center; font-size:2rem; padding-top: 40vh;">FATAL SYSTEM ERROR<br>...REBOOTING...</div>';
  setTimeout(() => {
    location.reload();
  }, 3000);
}

function grant_access(key) {
  if (String(key) === "0010067") {
    if (!foundSecrets.level3) {
      foundSecrets.level3 = true;
      stopSound(loopingSound);
      playSingleSound("assets/sounds/victory_theme.wav");
      commandInput.disabled = true;

      setTimeout(() => {
        commands.clear();

        scrambleEffect(">>> KERNEL ACCESS GRANTED", () => {
          scrambleEffect(">>> MASTER KEY: Follow The White Rabbit", () => {
            scrambleEffect(">>> PURPOSE COMPLETE.", () => {
              scrambleEffect(">>> SELF-DESTRUCT SEQUENCE INITIATED...", () => {
                setTimeout(() => {
                  window.location.href = "404.html";
                }, 3000);
              });
            });
          });
        });
      }, 500);
    }
  } else {
    systemCrash();
  }
}
