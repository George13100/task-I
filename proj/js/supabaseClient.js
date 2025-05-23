
// supabaseClient.js
const SUPABASE_URL =
 'https://umgwaqoazwbczepffhxg.supabase.co';
const SUPABASE_ANON_KEY = 
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtZ3dhcW9hendiY3plcGZmaHhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwMjU0ODYsImV4cCI6MjA2MzYwMTQ4Nn0.Gjt0GrOhd0e2NXiVSRg82xoyp4ijJpuHAxVNhqlHL-0';

const supabase =
 supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
