import type { JSX } from 'react';
import { useAppSelector } from '../../store/redux';
import './table.css';

function ResultTable(): JSX.Element | null {
  const data = useAppSelector((state) => state.formData);
  if (!data || data.data.length === 0) {
    return null;
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Country</th>
            <th>Password</th>
            <th>Photo</th>
          </tr>
        </thead>
        <tbody>
          {data.data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.gender}</td>
              <td>{item.email}</td>
              <td>{item.country}</td>
              <td>{item.password}</td>
              <td>{item.avatar && <img src={item.avatar} alt="avatar" />}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResultTable;
