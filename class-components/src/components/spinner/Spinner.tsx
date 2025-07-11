import { Component, type ReactNode } from 'react';
import spinner from '../../assets/spinner.png';
import './spinner.css';

class Spinner extends Component {
  render(): ReactNode {
    return (
      <div className="spinner-container">
        <img className="spinner-img" src={spinner} alt="Loading..." />
      </div>
    );
  }
}

export default Spinner;
