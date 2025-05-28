# 🌍 Geography Chatbot – Technical README

## ❓ Secrets Setup
1. Copy env.example and rename to .env.local
2. replace `<your-openai-api-key>` with your API key

## ✅ What’s Implemented

### 🧠 Chatbot
- **Conversational Geography Assistant** powered by OpenAI (GPT-4.1)
- **User Onboarding**: Asks for:
  1. Favorite country  
  2. Favorite continent  
  3. Favorite destination  
- **Streaming Responses** using `@ai-sdk/openai` and Vercel's edge runtime
- **Message Logging**: All messages are timestamped, ordered, and tracked per session in a mock database

### 📊 Feedback API
- Users can upvote/downvote assistant replies
- Feedback stored for ratio analysis (e.g. good vs bad)
- Foundation for future model fine-tuning or analytics

### ⚙️ Infrastructure Added
- **React Query** for managing async state
- **Atomic Design Structure** for reusable UI components
- **Prettier** for consistent code formatting

---

## 🚀 Future Improvements

### 🤖 Chatbot
- **Chat History & Sessions**  
  Save and organize past chats. Let users:
  - Browse previous conversations
  - Search, rename, or delete sessions
  - View timestamps or summaries for each chat

- **New Chat & Session Management**  
  Start a fresh chat anytime with a "New Chat" button. Option to:
  - Continue from previous sessions
  - Duplicate existing sessions for branching questions

### 🤖 AI Enhancements
- **Personalized Travel Suggestions**  
  Generate itineraries with hidden gems, local events, and seasonal highlights based on user preferences

- **Visa & Entry Rules**  
  Summarize visa policies, vaccination requirements, and entry fees per country

- **Weather & Climate Tips**  
  Provide 7-day forecasts and ideal travel seasons for chosen destinations

- **User Management**  
  When user logged in - inject user details into system context

---

#### 🧠 Model Context Protocol (MCP)

- **Tool-based Execution**  
  Enable the assistant to call tools like this through the web:
  - `getWeather(location)`
  - `getVisaRequirements(country)`
  - `fetchEvents(country, dateRange)`
  
  This allows more precise and real-time responses rather than generic knowledge.

- **Context Injection**  
  Keep a memory of user onboarding preferences (country, continent, destination) and inject them into the prompt automatically during each interaction for a personalized, stateful experience.

- **Modular Expansion**  
  Future tools like "budget estimator" or "flight finder" could be added to the toolset without retraining the model.

---

#### 🧭 Collaborative Filtering (Future)

If users' preferences are stored (e.g. favorite country/continent/destination), collaborative filtering can be introduced to improve suggestions by:

- Recommending destinations loved by similar users
- Predicting follow-up questions based on others with similar travel profiles
- Creating clusters of travel styles (e.g. adventure-seekers, beach-goers, cultural tourists) to tailor suggestions
- Ranking search results or responses based on what's worked well for similar users in the past

---

### 🧪 Testing & Monitoring

- **Monitoring & Alerts**  
  Set up real-time error tracking and performance monitoring using tools like **Sentry** or **LogRocket**. This helps surface:
  - Unexpected API failures (e.g., LLM downtime)
  - Latency spikes in chat response times
  - UI errors impacting user experience  
  Configure alerts (Slack/Email) so issues are caught **before users report them**.

- **User Behavior Analysis**  
  Use **PostHog**, **Plausible**, or **Google Analytics 4** to track:
  - Which questions are asked most frequently
  - Where users drop off in onboarding or during chats
  - Button usage (e.g., feedback thumbs, scrolling, reloading)

- **Basic E2E Test Suite**  
  A lightweight set of end-to-end smoke tests to ensure core flows work after each deployment. This includes:
  - App loads successfully  
  - Chat interface opens  
  - User can send and receive messages  

  These quick checks act as a **sanity safety net**, helping us move fast without breaking critical functionality in future releases.

---

### 💬 UX & Design
- Allow manual scroll takeover without forced auto-scroll
- Add typewriter effect and human avatar for emotional connection
- Improve accessibility and mobile UI responsiveness

---

### 🧱 Technical Enhancements
- **Onboarding FSM**  
  Model onboarding as a finite-state machine for clarity and maintainability

- **Auto Deploy**  
  Add CI/CD pipeline for builds, tests, and deploys

- **User Management**  
  Give users a screen they can login

---

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone git@github.com:jake-owen-p/chatboxtest.git
   cd chatboxtest
   ```

2. Ensure the correct Node version:
   ```bash
   nvm install 22.15.0
   nvm use
   ```

3. Copy env.example and rename to .env.local and replace `<your-openai-api-key>` with your API key

4. Install dependencies and run the development server:
   ```bash
   npm install
   npm run dev
   ```

