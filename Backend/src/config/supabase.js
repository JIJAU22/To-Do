const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error('Missing environment variable: SUPABASE_URL');
}

if (!supabaseKey) {
  throw new Error('Missing environment variable: SUPABASE_ANON_KEY');
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
