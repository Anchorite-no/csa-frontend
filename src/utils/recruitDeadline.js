const BEIJING_OFFSET_MS = 8 * 60 * 60 * 1000;

export function recruitDeadlineDate(value) {
  const explicitValue = /^\d{4}-\d{2}-\d{2}$/.test(value || '')
    ? `${value}T23:59:00+08:00`
    : value;
  return new Date(explicitValue);
}

export function toRecruitDeadlineInput(value) {
  const date = recruitDeadlineDate(value);
  if (Number.isNaN(date.getTime())) return '';
  return new Date(date.getTime() + BEIJING_OFFSET_MS).toISOString().slice(0, 16);
}

export function serializeRecruitDeadlineInput(value) {
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value)) {
    throw new Error('请选择完整的截止日期和时间');
  }
  return `${value}:00+08:00`;
}

export function formatRecruitDeadline(value) {
  const input = toRecruitDeadlineInput(value);
  return input ? `${input.replace('T', ' ')}（北京时间）` : '未设置';
}

export function recruitmentIsOpen(data) {
  if (typeof data.is_open === 'boolean') return data.is_open;
  return Date.now() < recruitDeadlineDate(data.deadline).getTime();
}
