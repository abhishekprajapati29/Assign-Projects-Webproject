var users = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();
  console.log(name,room)
  const existingUser = users.find((user) => user.room === room && user.name === name);

  if(!name || !room) return { error: 'Username and room are required.' };

  const user = { id, name, room };
  if(existingUser)
  {
    users = users.filter((user) => user.room !== room && user.name !== name)
  }
  users.push(user);

  

  return { user };
}

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if(index !== -1) return users.splice(index, 1)[0];
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

const getName = (name) => users.filter((user)=> user.name === name);

module.exports = { addUser, removeUser, getUser, getName, getUsersInRoom };