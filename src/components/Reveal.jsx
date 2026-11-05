import { useReveal } from '@/lib/hooks';

/** Scroll-reveal wrapper. `delay` staggers siblings (ms). */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useReveal();
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={delay ? { '--d': `${delay}ms` } : undefined} {...rest}>
      {children}
    </Tag>
  );
}
