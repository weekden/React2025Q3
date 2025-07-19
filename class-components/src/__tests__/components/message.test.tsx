import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import Message from '../../components/message/Message';

describe('Message component', () => {
  it('should render message element', () => {
    render(<Message message="Test message" />);
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });
});
