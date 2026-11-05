/** Pexels photo helpers. Only IDs verified to resolve are used on the site. */
export const pexels = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg`;

const WIDTHS = [480, 800, 1200, 1600, 2200];

export const sized = (src, w) => `${src}?auto=compress&cs=tinysrgb&w=${w}`;

export const srcSet = (src) => WIDTHS.map((w) => `${sized(src, w)} ${w}w`).join(', ');
