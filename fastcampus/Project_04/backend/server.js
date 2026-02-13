const { Server } = require('socket.io');

const io = new Server({
  cors: {
    origin: '*',
    credentials: true,
  },
});

io.listen(4000);

const players = [];
/*
클라이언트의 소켓 아이디, 캐릭터의 위치 좌표, 유저 닉네임, 직군 정보, 캐릭터 모델링, 마이룸 배치 정보 
*/

io.on('connection', (socket) => {
  console.log('연결됨!');

  io.emit('players', players);

  // 유저 정보
  socket.on(
    'initialize',
    ({ tempNickname, tempJobPosition, selectedCharacterGlbNameIndex }) => {
      const newPlayer = {
        id: socket.id,
        position: [0, 0, 0],
        nickname: tempNickname,
        jobPosition: tempJobPosition,
        selectedCharacterGlbNameIndex,
        myRoom: {
          objects: [],
        },
      };
      players.push(newPlayer);

      socket.emit(
        'initialize',
        players.find((p) => p.id === socket.id),
      );

      io.emit('enter', {
        id: socket.id,
        nickname: newPlayer.nickname,
        jobPosition: newPlayer.jobPosition,
      });

      io.emit('players', players);
    },
  );

  //유저가 이동할 때
  socket.on('move', (position) => {
    console.log('players', players);
    const player = players.find((player) => player.id === socket.id);
    if (player) {
      player.position = position;
      io.emit('players', players);
    }
  });

  // 채팅창
  socket.on('newText', (text) => {
    const sender = players.find((player) => player.id === socket.id);
    if (sender) {
      const { id, nickname, jobPosition } = sender;
      if (nickname && jobPosition) {
        io.emit('newText', {
          senderId: id,
          senderNickname: nickname,
          senderJobPosition: jobPosition,
          text,
          timestamp: new Date(),
        });
      }
    }
  });

  //마이룸
  socket.on('myRoomChange', (myRoom, otherPlayerId) => {
    console.log('방이 바뀌었나?');
    console.log('otherPlayerId', otherPlayerId);
    console.log('socket.id', socket.id);
    const id = otherPlayerId ?? socket.id;
    const player = players.find((player) => player.id === id);
    console.log('myRoom', myRoom);
    player.myRoom = myRoom;
    io.emit('players', players);
  });

  socket.on('disconnecting', () => {
    console.log('연결이 끊어지는 중!');
    const player = players.find((p) => p.id === socket.id);
    if (player) {
      io.emit('exit', {
        id: socket.id,
        nickname: player.nickname,
        jobPosition: player.jobPosition,
      });
    }
  });

  socket.on('disconnect', () => {
    console.log('연결이 끊어짐!');

    players.splice(
      players.findIndex((player) => player.id === socket.id),
      1,
    );

    io.emit('players', players);
  });
});
