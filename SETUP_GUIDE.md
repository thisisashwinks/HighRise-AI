# Upload Feature Setup Guide

This guide will help you set up the environment variables needed for the upload feature with leaderboard.

## Quick Start

1. **Copy the example file** (already done):
   ```bash
   cp .env.local.example .env.local
   ```

2. **Fill in your API credentials** in `.env.local`

3. **Restart the dev server** after adding credentials

## Required Services & Setup

### 1. Cloudinary (File Storage)

**Purpose**: Store uploaded images, videos, and GIFs

**Setup Steps**:
1. Sign up at [cloudinary.com](https://cloudinary.com) (free tier available)
2. Go to Dashboard → Settings → Account Details
3. Copy your:
   - Cloud Name
   - API Key
   - API Secret

**Free Tier Limits**:
- 10GB storage
- 20GB bandwidth/month
- 300K total files

**Add to `.env.local`**:
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 2. Upstash Redis (Metadata Storage)

**Purpose**: Store upload metadata, user profiles, and leaderboard data

**Setup Steps**:
1. Sign up at [upstash.com](https://upstash.com) (free tier available)
2. Create a new Redis database
3. Go to your database → REST API tab
4. Copy your:
   - REST URL
   - REST Token

**Free Tier Limits**:
- 256MB storage
- 500K commands/month

**Add to `.env.local`**:
```env
UPSTASH_REDIS_REST_URL=https://your-database.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_token_here
```

**Note**: When deploying to Vercel, you can use the Vercel Marketplace to auto-inject these variables.

### 3. Google Gemini API (AI Generation - Optional)

**Purpose**: Auto-generate titles and descriptions from uploaded content

**Setup Steps**:
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the API key

**Free Tier Limits**:
- 5-15 requests per minute
- 250K tokens per minute
- 1,000 requests per day

**Add to `.env.local`**:
```env
GEMINI_API_KEY=your_gemini_api_key
```

**Note**: This is optional. The app will work without it, but AI generation features will be disabled.

### 4. Admin Configuration (Optional)

**Purpose**: Control who can access the admin dashboard

**Add to `.env.local`**:
```env
ADMIN_EMAILS=admin@example.com,admin2@example.com
```

**Note**: If not set, all `@gohighlevel.com` emails can access admin features.

### 5. Vercel Cron Secret (For Production)

**Purpose**: Secure the daily usage monitoring cron job

**Add to `.env.local`** (generate a random secret):
```env
VERCEL_CRON_SECRET=your_random_secret_here
```

You can generate a secret with:
```bash
openssl rand -base64 32
```

## Testing Without Credentials

The application will:
- ✅ Load the UI successfully
- ✅ Show the inspirations page
- ✅ Display the leaderboard (empty)
- ❌ Uploads will fail (shows error message)
- ❌ AI generation will be disabled (button hidden)

## Verification

After setting up credentials:

1. **Restart the dev server**:
   ```bash
   npm run dev
   ```

2. **Test upload flow**:
   - Go to `/inspirations`
   - Click "Upload"
   - Try uploading an image
   - Check if it appears in the grid

3. **Test AI generation**:
   - Upload an image
   - Click "Generate with AI" next to title/description
   - Verify suggestions appear

4. **Check admin dashboard**:
   - Go to `/inspirations/admin`
   - Enter your email
   - Verify usage stats appear

## Troubleshooting

### "Upload failed" errors
- Check Cloudinary credentials are correct
- Verify file size is under 10MB
- Check file type is supported (JPEG, PNG, GIF, WebP, MP4, WebM, QuickTime)

### "Redis connection failed" errors
- Verify Upstash Redis URL and token
- Check your Upstash database is active
- Ensure you're using REST API credentials (not Redis CLI)

### AI generation not working
- Verify Gemini API key is set
- Check you haven't exceeded daily limits (1,000 requests/day)
- Try again after a minute (rate limit: 10 requests/minute)

### Build errors
- Ensure all environment variables are set before building
- Run `npm run build` to verify everything compiles

## Next Steps

Once everything is working:
1. Test the full upload flow
2. Verify leaderboard updates correctly
3. Test karma point calculations
4. Check admin dashboard shows correct usage stats

## Production Deployment

When deploying to Vercel:
1. Add all environment variables in Vercel dashboard
2. Install Upstash Redis from Vercel Marketplace (auto-injects credentials)
3. Set up the cron job in `vercel.json` (already configured)
4. Verify the cron secret matches in Vercel environment variables
