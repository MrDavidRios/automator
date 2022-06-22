import { useEffect, useState } from 'react';

const Dropdown = ({
  options,
  selected = 0,
  type,
  callback,
}: {
  options: string[];
  selected: number;
  type: string;
  callback: Function;
}) => {
  const [selectedOption, setSelectedOption] = useState(selected);

  let stateFinished = false;

  useEffect(() => {
    stateFinished = true;
  });

  function updateSelectedOption(idx: number) {
    setSelectedOption(idx);
    callback(type, idx);
  }

  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {stateFinished ? options[selectedOption] : options[selected]}
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        {options.map((option, idx) => (
          <li key={idx}>
            <a
              onClick={() => updateSelectedOption(idx)}
              className="dropdown-item"
              draggable="false"
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
