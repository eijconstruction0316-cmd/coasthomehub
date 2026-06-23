-- CoastHomeHub Database Schema Definitions (PostgreSQL)
-- Phase 1: Content-First, Trust-First Magazine & Directory Platform

-- User roles & tiers
CREATE TYPE user_role AS ENUM ('homeowner', 'tradie', 'supplier_manager', 'admin');
CREATE TYPE subscription_tier AS ENUM ('free', 'founding', 'growth', 'elite');

-- Core Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role user_role NOT NULL DEFAULT 'homeowner',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tradie Business Profiles
CREATE TABLE IF NOT EXISTS tradie_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    business_name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    licence_number VARCHAR(100) UNIQUE NOT NULL,
    licence_status VARCHAR(100) NOT NULL,
    insurance_details TEXT,
    location VARCHAR(255) NOT NULL,
    trade_type VARCHAR(100) NOT NULL,
    trust_score NUMERIC(3,2) DEFAULT 5.00,
    response_rate INTEGER DEFAULT 100,
    projects_completed INTEGER DEFAULT 0,
    subscription subscription_tier DEFAULT 'free',
    gallery_urls TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Magazine Content Registry
CREATE TABLE IF NOT EXISTS articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    excerpt TEXT,
    category VARCHAR(100) NOT NULL,
    content_type VARCHAR(100) NOT NULL, -- e.g., 'DIY Guides', 'Builder Insights'
    body TEXT NOT NULL,
    hero_image VARCHAR(512),
    video_youtube_id VARCHAR(50),
    author VARCHAR(255) NOT NULL,
    tags VARCHAR(100)[],
    published_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Quoting / Lead Schema
CREATE TABLE IF NOT EXISTS quote_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    homeowner_id UUID REFERENCES users(id) ON DELETE SET NULL,
    job_type VARCHAR(100) NOT NULL,
    suburb VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    budget_range VARCHAR(100) NOT NULL,
    photo_urls TEXT[],
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Matched leads connections
CREATE TABLE IF NOT EXISTS quote_matches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quote_id UUID REFERENCES quote_requests(id) ON DELETE CASCADE,
    tradie_id UUID REFERENCES tradie_profiles(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'introduced',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Two-sided verified reviews
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reviewer_id UUID REFERENCES users(id) ON DELETE SET NULL,
    tradie_id UUID REFERENCES tradie_profiles(id) ON DELETE CASCADE,
    quote_id UUID REFERENCES quote_requests(id) ON DELETE SET NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Suppliers registry
CREATE TABLE IF NOT EXISTS suppliers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) UNIQUE NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    logo_url VARCHAR(512),
    website_url VARCHAR(512)
);

-- Supplier Products curation
CREATE TABLE IF NOT EXISTS supplier_products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    supplier_id UUID REFERENCES suppliers(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    affiliate_url VARCHAR(1024) NOT NULL,
    price_guide VARCHAR(100),
    review_summary TEXT
);

-- Indexes for performance & quick SEO lookup
CREATE INDEX IF NOT EXISTS idx_tradie_slug ON tradie_profiles(slug);
CREATE INDEX IF NOT EXISTS idx_tradie_location_trade ON tradie_profiles(location, trade_type);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
