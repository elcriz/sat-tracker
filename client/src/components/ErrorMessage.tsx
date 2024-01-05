import { ReactNode } from 'react';

interface ErrorMessageProps {
  children: ReactNode;
}

function ErrorMessage({ children }: ErrorMessageProps) {
  return (
    <main>
      <div className="error">
        <div>
          Uh oh, an error occured!<br />Please refresh and try again...<br /><br />
          <strong>Error:</strong> {children}
        </div>
      </div>
    </main>
  );
}

export { ErrorMessage };
