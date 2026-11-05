const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const isEmail = (v) => EMAIL.test(String(v || '').trim());

/** US phone: accepts any formatting, needs 10 digits (optionally a leading 1). */
export const isPhone = (v) => {
  const d = String(v || '').replace(/\D/g, '');
  return d.length === 10 || (d.length === 11 && d.startsWith('1'));
};

export const formatPhone = (v) => {
  const d = String(v || '').replace(/\D/g, '').replace(/^1(?=\d{10})/, '').slice(0, 10);
  if (d.length < 4) return d;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
};

export const required = (v) => (Array.isArray(v) ? v.length > 0 : String(v ?? '').trim().length > 0);

/** Today's date as YYYY-MM-DD in the visitor's local time. */
export const todayISO = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};
