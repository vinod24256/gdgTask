# Retro Cyber Terminal - GDG UG2 Technical Assessment

Welcome to the Retro Cyber Terminal, an immersive web-based challenge created for the Google Developer Group UG2 Technical Assessment. This project is a fully interactive terminal experience designed to capture the 1980s cyberpunk and 1990s hacker aesthetic, featuring a multi-layered secret key puzzle.

**Live Application:** [**INSERT YOUR VERCEL/NETLIFY DEPLOYMENT LINK HERE**]

---

## 🚀 Why This Project Stands Out

This project was built not just to meet the requirements of the "Web Development: Digital Interface Challenge," but to exceed them. It combines a polished, retro aesthetic with a deep, narrative-driven puzzle that requires genuine investigative effort. The result is an engaging and memorable user experience that showcases a strong command of vanilla JavaScript, creative problem-solving, and a keen eye for detail.

- **Innovative Puzzle Design:** The three-level puzzle goes beyond simple commands, incorporating source code inspection (Morse code), a simulated file system with decoys, and a final "exploit" that allows the user to execute a hidden JavaScript function—a meta-puzzle that breaks the fourth wall.
- **Immersive Experience:** The project is a complete sensory experience. The Matrix-style digital rain, CRT effects, and a full suite of sound effects for keystrokes, errors, and dramatic events work together to fully immerse the user in the hacker fantasy.
- **Narrative Storytelling:** The puzzle tells a story, from the iconic "WAKE UP, NEO" intro to the high-stakes "breach," the final "kernel access" exploit, and a self-destruct sequence that provides a definitive, dramatic conclusion.

---

## 📸 Visual Showcase

The user journey is designed to be visually engaging, progressing from a mysterious entry point to a dramatic conclusion.

### **Splash Screen & Main Interface**

The experience begins with an iconic "WAKE UP, NEO" splash screen, complete with a blinking call to action that immediately sets the tone. This leads into the main terminal, featuring an animated Matrix-style digital rain background and glowing CRT effects.

![Splash Screen](retroCyberTerminal/assets/images/Screenshot%202025-08-24%20163525.png)
![Main Terminal Interface](retroCyberTerminal/assets/images/Screenshot%202025-08-24%20163552.png)

### **The Breach & Investigation**

The `scan` command features a dynamic, animated progress bar. The `breach` sequence is a high-impact event, with dramatic red visuals, a screen shake, and a blaring alarm that signifies the system's compromise.

![Scan Animation](retroCyberTerminal/assets/images/Screenshot%202025-08-24%20163637.png)
![Breach Sequence Effect](retroCyberTerminal/assets/images/Screenshot%202025-08-24%20163652.png)

### **The Finale**

The victory sequence provides a satisfying conclusion, followed by a "self-destruct" that redirects the user to a custom-designed 404 page, completing the narrative arc.

![Victory Screen](retroCyberTerminal/assets/images/Screenshot%202025-08-24%20163833.png)
![404 Page](retroCyberTerminal/assets/images/Screenshot%202025-08-24%20163839.png)

---

## 🔑 The Secret Key: A 3-Step Discovery Process

The secret key, **"Follow The White Rabbit,"** is designed to be discovered through a three-level puzzle that tests different skills, fulfilling the "investigative effort" requirement.

<details>
  <summary><strong>Spoiler:</strong> Click to reveal the secret key discovery process</summary>
  
  1.  **Level 1: Observation & Interaction**
      * The user must run the `scan` command, which features an animated progress bar and reveals a hint about hoverable text.
      * By hovering over specific words in the hint, the user discovers the first fragment: **"Follow"**. A success chime confirms the discovery.

2.  **Level 2: Investigation & Exploitation**

    - The user must inspect the `index.html` source code to find a hidden Morse code comment.
    - Decoding the Morse code reveals the secret command: `breach`.
    - Running the `breach` command compromises the system, triggering dramatic red visual effects, a continuous alarm sound, and a screen shake. This unlocks new file system commands (`ls`, `cat`) and reveals the second fragment: **"THE WHITE"**.

3.  **Level 3: Deduction & Code Execution**
    - In the unstable system, the user must use `ls` and `cat` to investigate the newly available files, including several decoys designed to mislead them.
    - `debugger.log` reveals a "crashed" function named `grant_access(key)`.
    - `security_protocol.txt` reveals the key needed for that function: `0010067`.
    - The user must execute the hidden function directly from the terminal by typing `grant_access('0010067')`. This "exploit," made possible by a fallback to `eval()`, simulates a vulnerability in the terminal itself. It reveals the final fragment, **"RABBIT"**, and triggers the self-destruct finale.

</details>

---

## 🛠️ Technology Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6)
- **Fonts:** Google Fonts (`VT323`)
- **Deployment:** Vercel / Netlify

---

## 📦 Installation and Setup

1.  Clone the repository:
    ```bash
    git clone https://github.com/vinod24256/gdgTask.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd gdgTask
    ```
3.  Open the `index.html` file in any modern web browser. (A local server is not required).
