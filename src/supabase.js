const SUPABASE_URL = "https://zqatolmkqdiufxayrmdd.supabase.co";

const SUPABASE_ANON_KEY =
  "sb_publishable_KHPyjfsV9m7XH01K9Cf0Lg_lKtLs7nc";

window.supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);