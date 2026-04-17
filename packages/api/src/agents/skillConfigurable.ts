/**
 * Augments a loadTools result with skill-specific configurable properties:
 * the request object, pre-computed accessible skill IDs, and the
 * `codeEnvAvailable` capability flag. Downstream skill consumers
 * (skill-tool handler, primeInvokedSkills) gate sandbox uploads on
 * `codeEnvAvailable` — not on API-key presence — so skill file priming
 * never runs when `execute_code` is disabled for the agent.
 */
export function enrichWithSkillConfigurable(
  result: { loadedTools: unknown[]; configurable?: Record<string, unknown> },
  req: { user?: { id?: string } },
  accessibleSkillIds: unknown[],
  codeEnvAvailable: boolean,
): { loadedTools: unknown[]; configurable: Record<string, unknown> } {
  return {
    ...result,
    configurable: {
      ...result.configurable,
      req,
      codeEnvAvailable,
      accessibleSkillIds,
    },
  };
}
