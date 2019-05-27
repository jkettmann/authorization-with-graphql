const messages = [
  {
    id: '1',
    senderId: '2',
    receiverId: '3',
    text: 'Hey Jen, how are you doing?',
  },
  {
    id: '2',
    senderId: '3',
    receiverId: '2',
    text: 'Hi Roy, I\'m doing great! How are you?',
  },
];

const getById = (id) => messages.find((message) => message.id === id);

const getParticipantIds = (id) => {
  const message = getById(id);

  if (!message) {
    return [];
  }

  return [
    message.senderId,
    message.receiverId,
  ];
}

export default {
  getById,
  getParticipantIds,
};