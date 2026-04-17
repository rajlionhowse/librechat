/**
 * Augments a loadTools result with skill-specific configurable properties:
 * the request object and pre-computed accessible skill IDs. The sandbox
 * API key is resolved from `process.env[EnvVar.CODE_API_KEY]` where needed
 * (see handlers.ts and skillFiles.ts) — no per-user lookup.
 */
export function enrichWithSkillConfigurable(
  result: { loadedTools: unknown[]; configurable?: Record<string, unknown> },
  req: { user?: { id?: string } },
  accessibleSkillIds: unknown[],
): { loadedTools: unknown[]; configurable: Record<string, unknown> } {
  return {
    ...result,
    configurable: {
      ...result.configurable,
      req,
      accessibleSkillIds,
    },
  };
}
