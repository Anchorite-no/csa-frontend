import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatRecruitDeadline,
  recruitmentIsOpen,
  serializeRecruitDeadlineInput,
  toRecruitDeadlineInput,
} from '../src/utils/recruitDeadline.js';

test('admin input round-trips 23:59 Beijing time with an explicit offset', () => {
  const value = serializeRecruitDeadlineInput('2026-09-30T23:59');
  assert.equal(value, '2026-09-30T23:59:00+08:00');
  assert.equal(toRecruitDeadlineInput(value), '2026-09-30T23:59');
  assert.equal(new Date(value).toISOString(), '2026-09-30T15:59:00.000Z');
});

test('display and input use Beijing time even for UTC API values', () => {
  assert.equal(toRecruitDeadlineInput('2026-09-30T15:59:00Z'), '2026-09-30T23:59');
  assert.equal(formatRecruitDeadline('2026-09-30T15:59:00Z'), '2026-09-30 23:59（北京时间）');
});

test('legacy date-only values retain the whole date through 23:59', () => {
  assert.equal(toRecruitDeadlineInput('2026-09-30'), '2026-09-30T23:59');
});

test('server status takes precedence over the browser clock', () => {
  assert.equal(recruitmentIsOpen({ deadline: '2000-01-01', is_open: true }), true);
  assert.equal(recruitmentIsOpen({ deadline: '2099-01-01', is_open: false }), false);
  assert.equal(recruitmentIsOpen({ deadline: 'invalid' }), false);
  assert.throws(() => serializeRecruitDeadlineInput('2026-09-30'));
});
