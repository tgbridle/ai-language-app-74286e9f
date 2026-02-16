import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch all entries
    const { data, error } = await supabase
      .from("dictionary")
      .select("*")
      .order("german_word");

    if (error) throw error;

    // Group by word_type
    const grouped: Record<string, unknown[]> = {};
    for (const entry of data) {
      if (!grouped[entry.word_type]) {
        grouped[entry.word_type] = [];
      }
      grouped[entry.word_type].push(entry);
    }

    // Add summary
    const exportData = {
      exported_at: new Date().toISOString(),
      total_entries: data.length,
      word_types: Object.fromEntries(
        Object.entries(grouped).map(([type, entries]) => [type, entries.length])
      ),
      entries: grouped,
    };

    return new Response(JSON.stringify(exportData, null, 2), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
        "Content-Disposition": 'attachment; filename="langly-dictionary-export.json"',
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
