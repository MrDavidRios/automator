import { useState } from 'react';

const Dropdown = ({ options }: { options: string[] }) => {
  const [selectedOption, setSelectedOption] = useState(0);

  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {options[selectedOption]}
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        {options.map((option, idx) => (
          <li>
            <a
              onClick={() => setSelectedOption(idx)}
              className="dropdown-item"
              href="#"
            >
              {option}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
