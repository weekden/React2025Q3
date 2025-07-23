import type { ReactNode } from 'react';
import type { MessageProps } from '../../types/message';

function Message({ message }: MessageProps): ReactNode {
  return (
    <div className="message-container">
      <p className="message">{message}</p>
    </div>
  );
}

export default Message;
