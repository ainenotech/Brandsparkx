/**
 * Sends a form submission to the Google Apps Script web app.
 * Throws with the script's error message when it answers { ok: false }.
 */
export async function postToScript(payload: unknown) {
  const url = process.env.NEXT_PUBLIC_CONTACT_SCRIPT_URL;
  if (!url) throw new Error("NEXT_PUBLIC_CONTACT_SCRIPT_URL is not set");
  // No Content-Type header: it keeps this a simple text/plain request, so the
  // browser skips the CORS preflight that Apps Script cannot answer.
  const res = await fetch(url, { method: "POST", body: JSON.stringify(payload) });
  const result = (await res.json()) as { ok?: boolean; error?: string };
  if (!result.ok) throw new Error(result.error || "Submission rejected");
}
