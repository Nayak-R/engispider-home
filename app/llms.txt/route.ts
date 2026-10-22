import { buildLlmsIndex } from '@/lib/llms';

/**
 * /llms.txt — the index an AI engine reads first.
 *
 * A static route handler, which `output: 'export'` writes straight into
 * out/llms.txt at build time. Generated from data/, so it cannot drift
 * from the pages it points at.
 */
export const dynamic = 'force-static';

export function GET() {
  return new Response(buildLlmsIndex(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
