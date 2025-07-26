# 🧠 AI Chatbot Backend (Gemini + Node.js + TypeScript)

This is a backend API for a context-aware AI chatbot built for the **InQuantum AI Internship** program. It uses Google’s **Gemini Pro model** to generate intelligent, contextual replies and stores user conversation history in a local JSON file.

---

## 🚀 Features

* Built with **TypeScript** and **Express**
* Integrated with **Gemini Pro** via `@google/genai`
* Maintains per-user context with a simplified **Model Context Protocol (MCP)**
* Clean, well-structured codebase with **Prettier**, **ESLint**, and **TSX**
* File-based persistent context (`data.json`)
* Fully local & framework-independent — no DB or cloud functions required

---

## 🛠 Tech Stack

| Layer         | Technology            |
| ------------- | --------------------- |
| Language      | TypeScript            |
| Runtime       | Node.js               |
| Framework     | Express.js            |
| AI Model      | Google Gemini Pro     |
| Context Store | Local JSON file       |
| Package Tool  | pnpm                  |
| Dev Tools     | Prettier, ESLint, tsx |

---

## 📦 Installation

```bash
pnpm install
```

---

## 🔧 Setup Environment

Create a `.env` file in the root:

```
GEMINI_API_KEY=your_google_api_key_here
```

You can use `.env.example` as a template.

---

## 📨 API Usage

### `POST /chat`

Send a user message and receive an AI-generated response based on previous context.

**Request:**

```json
{
  "userId": "123",
  "message": "What is AI?"
}
```

**Response:**

```json
{
  "response": "AI is the simulation of human intelligence in machines."
}
```

---

## 🧠 MCP (Model Context Protocol) Logic

1. **Input Handling**: Validates `userId` and `message`.
2. **Context Retrieval**: Loads last 10 messages from `data.json` for that user.
3. **AI Completion**: Sends message history to Gemini via SDK.
4. **Response Handling**: Saves AI reply and sends it to the client.
5. **Persistence**: Stores updated message history per user in a JSON file.

---

## 📁 Project Structure

```     
/src
  data.json            ← Per-user chat context
  index.ts             ← Main Express app with POST /chat
.env
.env.example
README.md
tsconfig.json
package.json
```

---

## 📜 Scripts

| Command           | Description                    |
| ----------------- | ------------------------------ |
| `pnpm dev`        | Run with live reload           |
| `pnpm build`      | Compile TypeScript to `dist/`  |
| `pnpm start`      | Build + run project            |
| `pnpm lint`       | Check for linting issues       |
| `pnpm format`     | Auto-fix code with ESLint      |
| `pnpm format:prt` | Format all files with Prettier |
| `pnpm typecheck`  | TypeScript type checking       |

---

## ❗ Limitations & Notes

* Uses file-based storage (`data.json`) — not suitable for high-concurrency production use
* Assumes valid Google Gemini API key
* Gemini model used: `gemini-2.0-flash` (via `@google/genai`)
