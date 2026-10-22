import { buildLlmsFull } from '@/lib/llms';

/**
 * /llms-full.txt — the whole corpus in one document.
 *
 * For engines that will fetch exactly one URL: every product, service,
 * customer and answered question, generated from the same data the site
 * renders from.
 */
export const dynamic = 'force-static';

export function GET() {
  return new Response(buildLlmsFull(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
