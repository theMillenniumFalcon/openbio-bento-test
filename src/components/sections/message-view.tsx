export default function MessageView(): React.ReactElement {
  const sampleMessages = [
    {
      id: 1,
      sender: "John Doe",
      content: "Hey! How's the project coming along?",
      timestamp: "10:30 AM",
      isSender: false
    },
    {
      id: 2,
      sender: "You",
      content: "It's going great! I've finished the frontend components and now working on the API integration.",
      timestamp: "10:32 AM",
      isSender: true
    },
    {
      id: 3,
      sender: "John Doe",
      content: "That's awesome! Can you share the progress report?",
      timestamp: "10:35 AM",
      isSender: false
    },
    {
      id: 4,
      sender: "You",
      content: "Sure! I'll send it over in the next hour. The UI is looking really clean with the new design system.",
      timestamp: "10:37 AM",
      isSender: true
    },
    {
      id: 5,
      sender: "John Doe",
      content: "Perfect! Looking forward to seeing it. Great work! 👍",
      timestamp: "10:40 AM",
      isSender: false
    }
  ];

  return (
    <div className="w-1/3 p-4 bg-gray-50 h-full flex flex-col">
      <div className="bg-white rounded-lg shadow-sm flex-1 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-800">Chat with John Doe</h3>
          <p className="text-sm text-gray-500">Online</p>
        </div>
        
        {/* Messages */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {sampleMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isSender ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.isSender
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-gray-200 text-gray-800 rounded-bl-none'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.isSender ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Input area */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}