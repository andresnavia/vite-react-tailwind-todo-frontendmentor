import { useEffect, useState } from 'react';
import IconMoon from './Icons/IconMoon';
import IconSun from './Icons/IconSun';

const initialDarkToggle = document.documentElement.className.includes('dark');

const Header = () => {
  const [darkToggle, setDarkToggle] = useState(initialDarkToggle);

  useEffect(() => {
    if (darkToggle) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, [darkToggle]);

  return (
    <header className="container mx-auto px-4 pt-8 md:max-w-xl">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold uppercase tracking-[0.3em] text-white">Todo</h1>
        <button onClick={() => setDarkToggle(!darkToggle)}>
          {darkToggle ? <IconSun /> : <IconMoon />}
        </button>
      </div>
    </header>
  );
};

export default Header;
