---
title: "AISKOUT Platform: Your Complete Local AI Development Environment"
date: 2025-01-11 02:00:00 +0000
categories: [AI, Platform, Docker, Self-Hosted]
tags: [ai, n8n, supabase, ollama, open-webui, flowise, neo4j, langfuse, searxng, wordpress]
pin: true
---

We're excited to announce the **AISKOUT Platform** - a comprehensive, open-source Docker Compose template that bootstraps a fully-featured local AI and low-code development environment in minutes.

## 🚀 What is AISKOUT Platform?

AISKOUT Platform combines the best self-hosted AI tools into a single, cohesive environment. Built on the foundation of n8n's self-hosted AI starter kit, we've enhanced it with additional powerful components to create the ultimate local AI development stack.

### ✨ What's Included

- **[n8n](https://n8n.io/)** - Low-code platform with 400+ integrations and advanced AI components
- **[Supabase](https://supabase.com/)** - Open source database as a service for AI agents
- **[Ollama](https://ollama.com/)** - Cross-platform LLM platform for local models
- **[Open WebUI](https://openwebui.com/)** - ChatGPT-like interface for your local models
- **[Flowise](https://flowiseai.com/)** - No/low code AI agent builder
- **[Qdrant](https://qdrant.tech/)** - High-performance vector store
- **[Neo4j](https://neo4j.com/)** - Knowledge graph engine for GraphRAG
- **[SearXNG](https://searxng.org/)** - Privacy-focused metasearch engine
- **[Langfuse](https://langfuse.com/)** - LLM engineering platform for observability
- **[WordPress](https://wordpress.org/)** - AI-powered content management
- **[Caddy](https://caddyserver.com/)** - Managed HTTPS/TLS for custom domains

## 🎯 Key Features

### Complete AI Workflow Automation
Build sophisticated AI workflows using n8n's visual interface with pre-configured connections to all platform components.

### Local LLM Support
Run models like Llama, Mistral, and CodeLlama locally with GPU acceleration support for NVIDIA and AMD cards.

### Vector Database Integration
Choose between Supabase's built-in vector support or Qdrant for high-performance vector operations.

### Knowledge Graphs
Leverage Neo4j for advanced AI techniques like GraphRAG and LightRAG.

### Production Ready
Deploy to cloud environments with automatic HTTPS via Caddy and proper security configurations.

## 🛠 Quick Start

### Prerequisites
- [Docker/Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Python](https://www.python.org/downloads/)
- [Git](https://git-scm.com/)

### Installation

```bash
# Clone the repository
git clone https://github.com/aiskout-org/aiskout-platform.git
cd aiskout-platform

# Copy environment template
cp .env.example .env

# Edit .env with your secure values
# Generate secure random values for all secrets

# Start services (choose your profile)
python start_services.py --profile gpu-nvidia  # For NVIDIA GPUs
python start_services.py --profile gpu-amd     # For AMD GPUs  
python start_services.py --profile cpu         # CPU only
```

### Access Your Services

Once running, access your services at:

- **n8n**: http://localhost:5678
- **Open WebUI**: http://localhost:8080
- **Flowise**: http://localhost:3001
- **Supabase Studio**: http://localhost:8000
- **Langfuse**: http://localhost:3000
- **SearXNG**: http://localhost:8081
- **WordPress**: http://localhost:8090

## 🔧 Recent Updates

### WordPress Supabase Connector
We've released a dedicated [WordPress Supabase Connector plugin](https://github.com/aiskout-org/wp-supabase-connector) that enables seamless integration between WordPress and Supabase for AI-powered websites.

### Enhanced Project Management
- Automated GitHub project board integration
- Issue and PR templates for streamlined development
- Comprehensive documentation and setup guides

### Improved Caddy Configuration
- Fixed configuration issues with empty hostname variables
- Added default port mappings for local development
- Restored SearXNG integration with security headers

## 🌟 Use Cases

### AI Agent Development
Build sophisticated AI agents that can:
- Process documents and extract insights
- Interact with multiple data sources
- Perform web searches and data collection
- Generate content and reports

### Local AI Experimentation
- Test different LLM models safely
- Develop RAG applications with your own data
- Build knowledge graphs from unstructured data
- Create AI-powered workflows without cloud dependencies

### Production AI Applications
- Deploy scalable AI services with custom domains
- Monitor LLM performance with Langfuse
- Manage user authentication via Supabase
- Create AI-powered websites with WordPress integration

## 🚀 Getting Started

Ready to dive in? Check out our comprehensive guides:

1. **[Installation Guide](https://github.com/aiskout-org/aiskout-platform#installation)** - Get up and running in minutes
2. **[AI Workflow Templates](https://n8n.io/workflows/?categories=AI)** - Pre-built workflows to import
3. **[Cloud Deployment](https://github.com/aiskout-org/aiskout-platform#deploying-to-the-cloud)** - Production deployment guide

## 🤝 Contributing

AISKOUT Platform is open source and welcomes contributions! Whether you're fixing bugs, adding features, or improving documentation, we'd love your help.

- **Repository**: [github.com/aiskout-org/aiskout-platform](https://github.com/aiskout-org/aiskout-platform)
- **Issues**: Report bugs or request features
- **Discussions**: Share ideas and get help from the community

## 📄 License

AISKOUT Platform is licensed under the Apache License 2.0, making it free for both personal and commercial use.

---

*Ready to supercharge your AI development? [Get started with AISKOUT Platform today!](https://github.com/aiskout-org/aiskout-platform)*
