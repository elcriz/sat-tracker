import { ReactNode } from 'react';

interface HeaderProps {
  children?: ReactNode;
}

function Header({ children }: HeaderProps) {
  return (
      <header>
        <h1>LEO Satellite Tracker</h1>
        {children}
      </header>
  );
}

export { Header };
