import { NextRequest, NextResponse } from 'next/server';
import { AuditRequest, AuditResult } from '@/lib/types';
import { calculateOverlapMetrics, generateHealthScore, generateRecommendations } from '@/lib/audit-engine';
import { generateCreativeCards } from '@/lib/creative-generator';
import { extractBrandName } from '@/lib/formatters';

interface DomainMetadata {
  title?: string;
  description?: string;
  isReachable: boolean;
  cleanDomain: string;
}

async function verifyAndFetchDomain(rawUrl: string): Promise<DomainMetadata> {
  let cleanDomain = rawUrl.trim().toLowerCase();
  cleanDomain = cleanDomain.replace(/^(https?:\/\/)?(www\.)?/, '');
  cleanDomain = cleanDomain.split('/')[0].split('?')[0];

  const domainRegex = /^[a-z0-9-]+(\.[a-z0-9-]+)+$/i;
  if (!domainRegex.test(cleanDomain)) {
    return { isReachable: false, cleanDomain };
  }

  const testProtocols = ['https://', 'http://'];
  
  for (const protocol of testProtocols) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const response = await fetch(`${protocol}${cleanDomain}`, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml',
        },
        signal: controller.signal,
        redirect: 'follow',
      });

      clearTimeout(timeoutId);

      if (response.ok || (response.status >= 200 && response.status < 400) || response.status === 403) {
        let title: string | undefined;
        let description: string | undefined;

        try {
          const html = await response.text();
          const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
          if (titleMatch && titleMatch[1]) {
            title = titleMatch[1].trim().replace(/\s+/g, ' ');
          }

          const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i) ||
                            html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i);
          if (descMatch && descMatch[1]) {
            description = descMatch[1].trim();
          }
        } catch {
        }

        return {
          isReachable: true,
          cleanDomain,
          title,
          description,
        };
      }
    } catch {
    }
  }

  return { isReachable: false, cleanDomain };
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as AuditRequest;

    if (!body.url || !body.monthlySpend) {
      return NextResponse.json(
        { error: 'Brand URL and Monthly Spend are required.' },
        { status: 400 }
      );
    }

    const domainMeta = await verifyAndFetchDomain(body.url);

    if (!domainMeta.isReachable) {
      return NextResponse.json(
        {
          error: `Domain unreachable: Could not connect to "${domainMeta.cleanDomain}". Please verify that this is an active, live website.`,
        },
        { status: 400 }
      );
    }

    const brandName = body.brandName || extractBrandName(domainMeta.cleanDomain);
    const overlap = calculateOverlapMetrics(body);
    const healthScore = generateHealthScore(overlap.overlapPercent, body.channels?.length || 2);
    const creatives = generateCreativeCards(brandName, body.industry || 'saas');
    const recommendations = generateRecommendations(body.industry || 'saas', overlap);

    const result: AuditResult = {
      brandName,
      url: domainMeta.cleanDomain,
      metaTitle: domainMeta.title,
      metaDescription: domainMeta.description,
      currency: body.currency || 'INR',
      monthlySpend: body.monthlySpend,
      industry: body.industry || 'saas',
      healthScore,
      overlap,
      creatives,
      recommendations,
      generatedAt: new Date().toISOString(),
    };

    return NextResponse.json(result);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
