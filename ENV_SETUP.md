# Environment Setup

## Claude API Integration

To enable AI-powered instrument recommendations, you need to set up your Anthropic API key:

1. Get an API key from [Anthropic Console](https://console.anthropic.com/)

2. Create a `.env.local` file in the `musio-discover` directory:

```bash
ANTHROPIC_API_KEY=your-api-key-here
```

3. Restart the development server

## How it works

When you type a prompt like "Epic orchestral battle scene" and click Generate:

1. The app sends your prompt to Claude
2. Claude analyzes the Musio instrument catalog
3. Claude suggests the perfect combination of instruments
4. Each instrument comes with a reason for why it fits

If the API key is not set or there's an error, the app falls back to a local rule-based recommendation engine.
