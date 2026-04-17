import { enrichWithSkillConfigurable } from './skillConfigurable';

describe('enrichWithSkillConfigurable', () => {
  const req = { user: { id: 'user-1' } };
  const accessibleSkillIds = ['skill-a', 'skill-b'];

  it('augments configurable with req and accessibleSkillIds', () => {
    const result = enrichWithSkillConfigurable(
      { loadedTools: [], configurable: { other: 'value' } },
      req,
      accessibleSkillIds,
    );

    expect(result.configurable).toEqual({
      other: 'value',
      req,
      accessibleSkillIds,
    });
  });

  it('does not inject a codeApiKey key', () => {
    const result = enrichWithSkillConfigurable(
      { loadedTools: [], configurable: {} },
      req,
      accessibleSkillIds,
    );

    expect(result.configurable).not.toHaveProperty('codeApiKey');
  });

  it('preserves loadedTools unchanged', () => {
    const tools = [{ name: 'x' }];
    const result = enrichWithSkillConfigurable(
      { loadedTools: tools, configurable: undefined },
      req,
      accessibleSkillIds,
    );

    expect(result.loadedTools).toBe(tools);
  });
});
