# Sourced helper. Reads hook JSON on stdin, sets FILE.
# Uses node (guaranteed — Astro requires it), falls back to sed.
_hook_extract_path() {
  local input="$1"
  if command -v node >/dev/null 2>&1; then
    printf '%s' "$input" | node -e '
      let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{
        try{const j=JSON.parse(s);const t=j.tool_input||{};
        process.stdout.write(t.file_path||t.path||"");}catch(e){process.stdout.write("");}
      });' 2>/dev/null
  else
    printf '%s' "$input" | sed -n 's/.*"file_path"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p'
  fi
}
