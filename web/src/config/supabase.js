import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://obgdgoxnglimrrqyoiee.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9iZ2Rnb3huZ2xpbXJycXlvaWVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4NzAxOTcsImV4cCI6MjA4NTQ0NjE5N30.5k0MYbAfNGDkyuyHFjdtTRi2CNI_92zFbZa7N6Wx5rg";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
