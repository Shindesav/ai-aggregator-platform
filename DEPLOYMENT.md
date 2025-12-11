# Deployment Guide

This guide covers deploying the AI Model Aggregator Platform to Vercel and setting up the GitHub repository.

## GitHub Repository Setup

### 1. Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon → "New repository"
3. Repository name: `ai-aggregator-platform` or your preferred name
4. Description: "Multi-model AI aggregator platform with single/multi-model execution"
5. Choose "Public" or "Private"
6. **Do not** initialize with README, .gitignore, or license (we already have these)
7. Click "Create repository"

### 2. Push Code to GitHub

After creating the repository, run these commands:

```bash
# Add the remote repository (replace with your actual repository URL)
git remote add origin https://github.com/YOUR_USERNAME/ai-aggregator-platform.git

# Push the code
git push -u origin master
```

## Vercel Deployment

### Method 1: Deploy from GitHub (Recommended)

1. Go to [Vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (leave default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next` (leave default)

### Method 2: Deploy from CLI

If you have Vercel CLI installed:

```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# For production deployment
vercel --prod
```

## Environment Variables Setup

### On Vercel Dashboard

1. Go to your project dashboard
2. Click "Settings" → "Environment Variables"
3. Add the following variables:

```
HUGGINGFACE_API_KEY=your_actual_huggingface_api_key
NEXT_PUBLIC_APP_NAME=AI Model Aggregator
NODE_ENV=production
LOG_LEVEL=info
RATE_LIMIT_REQUESTS_PER_MINUTE=60
RATE_LIMIT_REQUESTS_PER_HOUR=1000
```

### Getting Hugging Face API Key

1. Go to [Hugging Face](https://huggingface.co)
2. Sign up/Login to your account
3. Go to Settings → Access Tokens
4. Create a new token with "Read" permissions
5. Copy the token and use it as `HUGGINGFACE_API_KEY`

## Post-Deployment Configuration

### 1. Verify Deployment

After deployment, your app will be available at:
- **Development**: `https://your-project.vercel.app`
- **Production**: `https://ai-aggregator-platform.vercel.app` (or your custom domain)

### 2. Test the Application

1. Open the deployed URL
2. Try selecting a single model (e.g., DialoGPT-medium)
3. Enter a prompt like "Hello, how are you?"
4. Click "Execute Single Model"
5. Verify you get a response

### 3. Test Multi-Model Execution

1. Switch to "Multi-Model" mode
2. Select multiple models
3. Enter a prompt
4. Click "Execute Multi-Model"
5. Verify you get responses from all selected models

## Custom Domain (Optional)

To use a custom domain:

1. Go to Vercel project settings
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Monitoring and Maintenance

### Vercel Analytics

Enable Vercel Analytics for monitoring:
1. Go to Project Settings → Analytics
2. Enable Web Vitals and Speed Insights

### Logs

View application logs:
1. Go to Vercel dashboard
2. Click "Functions" tab
3. View real-time logs and function invocations

### Scaling

The application is designed to scale automatically:
- Vercel's serverless functions scale based on traffic
- Rate limiting prevents abuse
- Caching can be added for performance

## Troubleshooting

### Common Issues

1. **API Key Issues**
   - Verify Hugging Face API key is correct
   - Check token has proper permissions
   - Ensure environment variable is set in Vercel

2. **Build Failures**
   - Check Next.js build logs
   - Verify all dependencies are installed
   - Ensure TypeScript compilation passes

3. **Runtime Errors**
   - Check Vercel function logs
   - Verify API endpoints are working
   - Test locally with `npm run dev`

4. **Rate Limiting**
   - Users may hit rate limits during testing
   - Increase limits in environment variables if needed
   - Implement user-specific API keys for higher limits

### Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify environment variables
3. Test API endpoints individually
4. Check Hugging Face API status

## Performance Optimization

### Current Optimizations
- Serverless functions for API routes
- Client-side caching with React
- Optimized bundle size with Next.js

### Future Enhancements
- Redis caching for responses
- CDN optimization for static assets
- Database integration for user management
- Advanced monitoring with DataDog or similar

## Security Considerations

### Current Security Measures
- API key authentication
- Rate limiting on all endpoints
- Input validation and sanitization
- HTTPS everywhere (provided by Vercel)

### Additional Security (Future)
- User authentication system
- API key management dashboard
- Audit logging
- Content moderation
- Data encryption at rest

## Backup and Recovery

### Code Backup
- All code is version controlled on GitHub
- Regular commits ensure version history
- Branches for feature development

### Data Backup (Future)
- User data in PostgreSQL with automated backups
- Redis cache can be configured for persistence
- Regular database snapshots

---

## Quick Start Commands

```bash
# 1. Create GitHub repo and push code
git remote add origin https://github.com/YOUR_USERNAME/ai-aggregator-platform.git
git push -u origin master

# 2. Deploy to Vercel
vercel

# 3. Set environment variables in Vercel dashboard
# HUGGINGFACE_API_KEY=your_key_here

# 4. Test deployment
curl https://your-deployment-url.vercel.app/api/health
```

For additional help, refer to:
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Hugging Face API Docs](https://huggingface.co/docs/api-inference/index)
