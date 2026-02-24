import React, { useState } from 'react';

const Employee = ({ idx, employee, setEmployees }) => {
  const { name, position, salary } = employee;
  
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(salary);

  const handleSave = () => {
    setEmployees(prev => prev.map(emp => 
      emp.id === employee.id ? { ...emp, salary: Number(editValue) } : emp
    ));
    setIsEditing(false);
  };

  const isSaveDisabled = Number(editValue) === salary || editValue === '';

  return (
    <React.Fragment>
      <td>{name}</td>
      <td className='pl-20'>{position}</td>
      <td className='pl-20'>
        {!isEditing ? (
          <div
            data-testid={'employee-salary-div-' + idx}
            onClick={() => setIsEditing(true)}
            style={{ cursor: 'pointer' }}
          >
            {salary}
          </div>
        ) : (
          <input
            data-testid={'employee-salary-input-' + idx}
            type='number'
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            autoFocus
          />
        )}
      </td>
      <td className='pl-20'>
        <button
          className={'x-small w-75 ma-0 px-25'}
          data-testid={'employee-save-button-' + idx}
          disabled={isSaveDisabled}
          onClick={handleSave}
        >
          Save
        </button>
      </td>
    </React.Fragment>
  );
};

export default Employee;