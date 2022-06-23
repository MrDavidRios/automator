import { useEffect, useState } from 'react';

const Dropdown = ({ options, selected = 0, type, callback }: { options: string; selected: number; type: string; callback: Function }) => {
  const [selectedOption, setSelectedOption] = useState(selected);

  const optionsArr: { text: string; enabled: boolean }[] = JSON.parse(options);

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
      <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        {stateFinished ? optionsArr[selectedOption].text : optionsArr[selected].text}
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        {optionsArr.map((option, idx) => (
          <li key={idx}>
            <a onClick={() => updateSelectedOption(idx)} className={`dropdown-item ${option.enabled ? '' : 'disabled'}`} draggable="false" href="#">
              {option.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
