# AI Model Aggregator Platform

A multi-model AI aggregator platform that enables users to interact with multiple AI models simultaneously or individually through a unified interface.

## Features

- **Single Mode**: Select and interact with one AI model at a time
- **Multi-Mode**: Execute prompts across multiple models in parallel
- **Model Types**: Support for Large Language Models (LLMs) and Multimodal Models
- **Real-time Responses**: Stream responses from multiple models concurrently
- **Scalable Architecture**: Built for high availability and performance

## Integrated Models

### Large Language Models (LLMs)
1. **DialoGPT-medium** (`microsoft/DialoGPT-medium`)
   - Conversational AI model optimized for dialogue generation
   - Good for chat applications and interactive conversations

2. **DistilGPT-2** (`distilgpt2`)
   - Lightweight GPT-2 model with 82 million parameters
   - Fast inference, suitable for general text generation

### Multimodal Models
1. **BLIP Image Captioning** (`Salesforce/blip-image-captioning-base`)
   - Vision-language model for image-to-text generation
   - Generates descriptive captions from images

2. **Whisper Tiny** (`openai/whisper-tiny`)
   - Speech recognition model for audio-to-text conversion
   - Lightweight version optimized for efficiency

## Architecture Overview

```
┌─────────────────┐    ┌──────────────────────┐    ┌─────────────────┐
│   Frontend UI   │────│   API Gateway Layer  │────│  Orchestration  │
│   (React/Next)  │    │   (Next.js API)      │    │   Service       │
└─────────────────┘    └──────────────────────┘    └─────────────────┘
                                                          │
                                                          │
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Model Adapter  │    │  Model Adapter  │    │  Model Adapter  │
│   (LLM #1)      │    │   (LLM #2)      │    │ (Multimodal #1)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                                          │
                                                          │
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   HuggingFace   │    │   External APIs │    │    Caching      │
│   Inference     │    │   (Optional)    │    │   Layer         │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## System Components

### 1. Frontend Layer
- **Framework**: Next.js 14 with React
- **UI**: Minimal, responsive interface
- **Features**: Model selection, prompt input, response display

### 2. API Gateway Layer
- **Authentication**: API key validation
- **Rate Limiting**: Request throttling per user
- **Request Routing**: Route to appropriate services

### 3. Orchestration Service
- **Single Mode**: Sequential execution
- **Multi-Mode**: Parallel execution with Promise.all()
- **Error Handling**: Graceful degradation
- **Response Aggregation**: Combine results from multiple models

### 4. Model Adapters
- **Standardized Interface**: Unified API for different model types
- **Error Handling**: Model-specific error management
- **Caching**: Response caching for performance
- **Fallback Logic**: Alternative model selection on failure

### 5. External Integrations
- **Hugging Face**: Primary inference provider
- **Optional APIs**: Support for external model providers
- **Monitoring**: Response time tracking

## Request Flow Diagrams

### Single Model Mode
```
User Request → API Gateway → Orchestration Service → Model Adapter → HuggingFace → Response
```

### Multi-Model Parallel Execution
```
User Request → API Gateway → Orchestration Service
                                      │
                    ┌─────────────────┼─────────────────┐
                    │                 │                 │
            Model Adapter 1   Model Adapter 2   Model Adapter 3
                    │                 │                 │
            HuggingFace 1    HuggingFace 2    HuggingFace 3
                    │                 │                 │
                    └─────────────────┼─────────────────┘
                                      │
                            Response Aggregation
```

## Scaling Strategy

### Horizontal Scaling
- **Stateless Design**: All services are stateless for easy scaling
- **Load Balancer**: Distribute requests across multiple instances
- **Auto-scaling**: Scale based on CPU/memory usage

### Performance Optimization
- **Caching Layer**: Redis for response caching
- **CDN**: Static asset delivery
- **Database**: Optimized queries with indexing

### Traffic Management
- **Rate Limiting**: Per-user and global limits
- **Queue System**: Handle burst traffic
- **Circuit Breaker**: Prevent cascade failures

## User Management Strategy

### Authentication
- **API Keys**: Simple key-based authentication
- **JWT Tokens**: For session management (future)
- **OAuth**: Support for third-party login (future)

### Authorization
- **Role-based Access**: Different permission levels
- **Model Access Control**: Restrict access to specific models
- **Usage Quotas**: Daily/monthly limits per user

### Request Limits
- **Concurrent Requests**: Max parallel requests per user
- **Request Size**: Limit input size
- **Response Time**: Timeout handling

## Application Uptime Considerations

### Monitoring
- **Health Checks**: Service availability monitoring
- **Performance Metrics**: Response times, error rates
- **Resource Usage**: CPU, memory, disk monitoring

### High Availability (HA)
- **Redundancy**: Multiple instances across regions
- **Failover**: Automatic switching to backup services
- **Data Backup**: Regular database backups

### Fault Tolerance
- **Circuit Breakers**: Stop cascading failures
- **Retry Logic**: Automatic retry with exponential backoff
- **Graceful Degradation**: Continue operation with reduced functionality

## Technology Stack

### Backend
- **Framework**: Next.js API Routes
- **Language**: TypeScript
- **Database**: PostgreSQL (future use)
- **Cache**: Redis (future use)

### Frontend
- **Framework**: Next.js 14
- **UI Library**: React with Tailwind CSS
- **State Management**: React hooks

### Infrastructure
- **Hosting**: Vercel
- **CI/CD**: GitHub Actions
- **Version Control**: Git

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd ai-aggregator-platform

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

### Environment Variables

```env
# Hugging Face API
HUGGINGFACE_API_KEY=your_api_key_here

# Application
NEXT_PUBLIC_API_URL=http://localhost:3000
NODE_ENV=development

# Optional: External API keys
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
```

## API Documentation

### Single Model Request
```http
POST /api/models/single
Content-Type: application/json

{
  "model": "microsoft/DialoGPT-medium",
  "prompt": "Hello, how are you?",
  "parameters": {
    "max_length": 100,
    "temperature": 0.7
  }
}
```

### Multi-Model Request
```http
POST /api/models/multi
Content-Type: application/json

{
  "models": [
    "microsoft/DialoGPT-medium",
    "distilgpt2",
    "Salesforce/blip-image-captioning-base"
  ],
  "prompt": "Describe this image",
  "image_url": "https://example.com/image.jpg"
}
```

## Deployment

### Vercel Deployment
1. Connect GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

### Manual Deployment
```bash
# Build the application
npm run build

# Start production server
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support and questions, please open an issue on GitHub.
