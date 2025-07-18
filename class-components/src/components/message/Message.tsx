import { Component, type ReactNode } from 'react';
import type { MessageProps } from '../../types/message';

class Message extends Component<MessageProps> {
  public render(): ReactNode {
    return (
      <div className="message-container">
        <p className="message">{this.props.message}</p>
      </div>
    );
  }
}

export default Message;
