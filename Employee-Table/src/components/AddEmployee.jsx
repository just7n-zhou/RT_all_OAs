import { useState } from 'react';

const AddEmployee = ({ employees, setEmployees }) => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [salary, setSalary] = useState('');

  const isAddDisabled = !name.trim() || !position.trim() || !salary;

  const handleAdd = () => {
    const nextId = employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1;
    
    const newEmployee = {
      id: nextId,
      name,
      position,
      salary: Number(salary)
    };

    setEmployees([...employees, newEmployee]);
    setName('');
    setPosition('');
    setSalary('');
  };

  return (
    <div className='add-employee'>
      <input
        data-testid='add-employee-name-input'
        type='text'
        placeholder='Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        data-testid='add-employee-position-input'
        type='text'
        placeholder='Position'
        value={position}
        onChange={(e) => setPosition(e.target.value)}
      />
      <input
        data-testid='add-employee-salary-input'
        type='number'
        placeholder='Salary'
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
      />
      <button
        data-testid='add-employee-button'
        disabled={isAddDisabled}
        onClick={handleAdd}
      >
        Add
      </button>
    </div>
  );
};

export default AddEmployee;