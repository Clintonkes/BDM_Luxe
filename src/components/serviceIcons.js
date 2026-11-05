import { Building2, LayoutGrid, Leaf, PenTool, Scissors, Shovel, Sprout, TreeDeciduous } from 'lucide-react';

/** Explicit map so only the icons actually used are bundled. */
const map = { Building2, LayoutGrid, Leaf, PenTool, Scissors, Shovel, TreeDeciduous };

export const serviceIcon = (name) => map[name] ?? Sprout;
