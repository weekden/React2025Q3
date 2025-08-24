import type { JSX } from 'react';
import type { MessageProps } from '../../types/message';

function Message({ message }: MessageProps): JSX.Element {
  return (
    <div className="message-container">
      <p className="message">{message}</p>
    </div>
  );
}

export default Message;
