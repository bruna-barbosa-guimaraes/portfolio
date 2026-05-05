import type { ReactNode } from 'react';

type HighlightProps = {
  children: ReactNode;
};

export function Highlight({ children }: HighlightProps) {
  return <span className="highlight">{children}</span>;
}
