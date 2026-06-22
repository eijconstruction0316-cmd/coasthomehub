-- CoastHomeHub Database Schema DDL (Supabase / PostgreSQL)

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Planner Briefs (Renovation Matchmaker project briefs)
CREATE TABLE IF NOT EXISTS planner_briefs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    project_type VARCHAR(50) NOT NULL, -- Bathroom, Kitchen, Flooring, Painting, Outdoor
    answers JSONB NOT NULL DEFAULT '[]'::jsonb, -- JSON array of answers
    photos JSONB NOT NULL DEFAULT '[]'::jsonb,  -- JSON array of photo metadata
    brief JSONB NOT NULL -- AI-generated brief (scope, budgetRange, timeline, location, materials, assumptions, risks, nextSteps)
);

-- 2. Contractor Accounts (Subscription states)
CREATE TABLE IF NOT EXISTS contractor_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    stripe_customer_id VARCHAR(255),
    stripe_subscription_id VARCHAR(255),
    subscription_status VARCHAR(50) DEFAULT 'inactive', -- active, trialing, past_due, inactive
    subscription_plan VARCHAR(50) DEFAULT 'founding'
);

-- 3. Contractor Profiles (Client-facing)
CREATE TABLE IF NOT EXISTS contractor_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID REFERENCES contractor_accounts(id) ON DELETE CASCADE,
    business_name VARCHAR(255) NOT NULL,
    abn VARCHAR(11) UNIQUE NOT NULL, -- 11-digit Australian Business Number
    phone VARCHAR(50),
    website VARCHAR(255),
    service_categories TEXT[] DEFAULT '{}'::text[], -- e.g., ['Bathroom', 'Kitchen', 'Painting']
    service_suburbs TEXT[] DEFAULT '{}'::text[], -- QLD local suburb list
    rating_average DECIMAL(3,2) DEFAULT 0.00,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. QBCC License Info (Vetted by admin)
CREATE TABLE IF NOT EXISTS contractor_licenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID REFERENCES contractor_accounts(id) ON DELETE CASCADE,
    license_number VARCHAR(100) NOT NULL,
    license_class VARCHAR(255) NOT NULL, -- e.g., Builder Low Rise, Plumber
    expiry_date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'pending', -- pending, verified, expired, invalid
    verified_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Contractor Insurances (Public Liability / Workers Comp)
CREATE TABLE IF NOT EXISTS contractor_insurances (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID REFERENCES contractor_accounts(id) ON DELETE CASCADE,
    policy_number VARCHAR(100) NOT NULL,
    coverage_amount DECIMAL(12,2) NOT NULL, -- e.g., 20000000.00 (AUD 20M)
    expiry_date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'pending', -- pending, verified, expired
    document_url VARCHAR(500), -- S3 or Supabase Storage PDF Link
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Lead Purchase Matches (Pay-per-lead or subscription matches)
CREATE TABLE IF NOT EXISTS lead_purchases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    brief_id UUID REFERENCES planner_briefs(id) ON DELETE CASCADE,
    contractor_id UUID REFERENCES contractor_accounts(id) ON DELETE CASCADE,
    purchased_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    price_paid DECIMAL(8,2) DEFAULT 0.00, -- Amount paid for single lead if applicable
    UNIQUE(brief_id, contractor_id) -- Avoid duplicate lead matchmaking
);
