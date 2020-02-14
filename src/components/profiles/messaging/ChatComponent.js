import React from 'react';
import { Chat, Channel, ChannelHeader, Thread, Window, ChannelList } from 'stream-chat-react';
import { MessageList, MessageInput } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';

import 'stream-chat-react/dist/css/index.css';



const ChatComponent = (props) => {
  //client = stream.connect('dmr78d6h89rt', null, '68343');
  const client = new StreamChat("3e3rdknp58kg");
  const userToken = localStorage.getItem('chat_token');

  const email = localStorage.getItem('user_Email');
  console.log(email)
  var n = email.indexOf("@");
  var name = email.slice(0, n);
  console.log(name);

  //client.disconnect();
  client.setUser(
    {
        id: name,
        name: name,
        image: localStorage.getItem('user_pic'),
    },
    userToken,
  );

  /*const conversation = client.channel('messaging', 'new-chat3', {
    name: 'Chat',
    image: 'http://bit.ly/2O35mws',
});*/

 const filters = { type: 'messaging'};
const sort = { last_message_at: -1 };
const channels = client.queryChannels(filters, sort);




  return(
    <div style={{marginLeft: '100px',marginTop: '50px'}}>
        <Chat client={client} theme={'messaging light'}>
        <ChannelList filters={filters} sort={sort}/>
          <Channel>
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput />
            </Window>
            <Thread />
          </Channel>
      </Chat>
    </div>
    
  );
  
};



export default ChatComponent;