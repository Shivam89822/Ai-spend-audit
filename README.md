# AI Spend Audit

An AI-powered platform for auditing and analyzing AI service spending.

## Getting Started

See [ARCHITECTURE.md](ARCHITECTURE.md) for system design and [DEVLOG.md](DEVLOG.md) for development notes.

Create `server/.env` from `server/.env.example` and set `MONGO_URI` plus `GEMINI_API_KEY` before starting the backend. Audit summaries are generated on the server with Gemini and stored with each audit result.

## Project Structure

- `client/` - Frontend application
- `server/` - Backend API
- `docs/` - Documentation

## License

TBD
