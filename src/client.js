import { createClient } from '@supabase/supabase-js'

const URL = 'https://vaabndedxymfilswybbf.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhYWJuZGVkeHltZmlsc3d5YmJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3ODI4OTEsImV4cCI6MjA0NjM1ODg5MX0.Y_FXppGWsguX09KpdbSXNE0SYiAqkulQ9GZhyjdQ8zY';

export const supabase = createClient(URL, API_KEY);
