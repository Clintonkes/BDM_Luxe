import { useEffect, useRef, useState } from 'react';

/** localStorage-backed state that tolerates private mode / blocked storage. */
export function useStoredState(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw === null ? initial : JSON.parse(raw);
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage unavailable; keep in memory only */
    }
  }, [key, value]);
  return [value, setValue];
}

/** Adds .is-in to an element once it scrolls into view. */
export function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      el.classList.add('is-in');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

/** True when the business is open right now (America/New_York). */
export function useOpenNow(hours) {
  const [state, setState] = useState(() => computeOpen(hours));
  useEffect(() => {
    const t = setInterval(() => setState(computeOpen(hours)), 60_000);
    return () => clearInterval(t);
  }, [hours]);
  return state;
}

function computeOpen(hours) {
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/New_York',
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).formatToParts(new Date());
    const get = (t) => parts.find((p) => p.type === t)?.value;
    const day = get('weekday').slice(0, 2);
    const mins = (parseInt(get('hour'), 10) % 24) * 60 + parseInt(get('minute'), 10);
    const today = hours.find((h) => h.days.includes(day));
    if (!today?.open) return { open: false, today };
    const toMin = (s) => parseInt(s.slice(0, 2), 10) * 60 + parseInt(s.slice(3), 10);
    return { open: mins >= toMin(today.open) && mins < toMin(today.close), today };
  } catch {
    return { open: false, today: null };
  }
}
