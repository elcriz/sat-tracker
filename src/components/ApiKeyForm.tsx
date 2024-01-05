import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Header } from './Header';

interface ApiKeyFormProps {
  onChange: (value: string) => void;
}

function ApiKeyForm({ onChange }: ApiKeyFormProps) {
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(value.length >= 24);
  }, [value])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isValid) {
      onChange(value.trim());
    }
  }

  return (
    <main>
      <Header />
      <form
        className="api-key-form"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="api-key">Enter your N2YO.com api key:</label>
          <input
            id="api-key"
            type="text"
            placeholder="XXXXX-XXXXX-XXXXX"
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          disabled={!isValid}
        >
          Submit
        </button>
      </form>
    </main>
  );
}

export { ApiKeyForm };
