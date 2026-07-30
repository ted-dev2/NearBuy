-- Migration: Add location to venues
ALTER TABLE public.venues ADD COLUMN IF NOT EXISTS location TEXT;
