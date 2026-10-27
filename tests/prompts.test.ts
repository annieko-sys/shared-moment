import assert from 'node:assert/strict';
import test from 'node:test';
import { nextPromptIndex, situations } from '../components/prompt-library';
import { choices, tinyMissions } from '../components/activities';

test('every situation has distinct, usable questions', () => {
  assert.equal(situations.length, 3);
  for (const situation of situations) {
    assert.ok(situation.prompts.length >= 5);
    assert.equal(new Set(situation.prompts).size, situation.prompts.length);
    assert.ok(situation.prompts.every(prompt => prompt.endsWith('?')));
  }
});

test('asking for another idea never repeats the current question', () => {
  for (let count = 2; count <= 10; count++) {
    for (let current = 0; current < count; current++) {
      for (const random of [() => 0, () => 0.4, () => 0.999]) {
        const next = nextPromptIndex(current, count, random);
        assert.ok(next >= 0 && next < count);
        assert.notEqual(next, current);
      }
    }
  }
});

test('shared activities offer multiple distinct rounds with two clear options', () => {
  assert.ok(choices.length >= 5);
  assert.ok(tinyMissions.length >= 5);
  assert.equal(new Set(choices.map(item => item.question)).size, choices.length);
  assert.equal(new Set(tinyMissions).size, tinyMissions.length);
  for (const item of choices) {
    assert.equal(item.options.length, 2);
    assert.notEqual(item.options[0], item.options[1]);
  }
});
