import React, { useState } from 'react';
import './App.css';

function App() {

  type BoardType = {
    id:number
    name:string
    users: UserType[]
  }

  type UserType = {
    id:number
    user:string
  }


  const [boards, setBoard] = useState<BoardType[]>([
    {id:1, name:'mentors', users:[{id:3, user:'Viktor'}, {id:4,  user:'Dimych'}]},
    {id:2, name:'users', users:[{id:5,user:'Andrei'}, {id:6, user:'Eugen'},]},
  ])

  const [currentBoard, setCurrentBoard] = useState<BoardType | null>(null)
  const [currentUser, setCurrentUser] = useState<UserType | null>(null)


  function dragOverHandler(e:React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    let {className, style} = e.target as HTMLDivElement
    if (className === 'user') {
      style.boxShadow = '0 2px 3px gray'
    }
  }

  function onDragLeaveHandler (e:any) {
    e.target.style.boxShadow = 'none'
  }

  function dragStartHandler(e:any, board:any, user:any) {
    console.log('drag start', user, board)
    setCurrentBoard(board)
    setCurrentUser(user)

  }

  function dragEndHandler(e:any ) {
    e.preventDefault()
    e.target.style.boxShadow = 'none'
  }


  function onDropHandler(e:any, board:any, user:any) {
    e.preventDefault()

    if (currentUser) {
      const currentIndex = currentBoard?.users.indexOf(currentUser)
      currentBoard?.users.splice(currentIndex!, 1)
      const dropIndex = board.users.indexOf(user)

      board.users.splice(dropIndex + 1, 0, currentUser)

      setBoard(boards.map((b: any) => {
        if (b.id === board.id) {
          return board
        }
        if (b.id === currentUser.id) {
          return currentBoard
        }
        return  b

      }))
    }

    e.target.style.boxShadow = 'none'

  }

  return (
    <>
    <h1>React Test DnD</h1>
    <div className="root">
      {boards.map((currentBoard:any) =>
        <div className={'category'} key={currentBoard.id}
        ><h4>{currentBoard.name}</h4><div>
          {currentBoard.users.map((user:any) => {
              return <div className={'user'} key={user.id}
                          draggable={true}
                          onDragStart={(e) => dragStartHandler(e, currentBoard, user )}
                          onDragEnd={(e) => dragEndHandler(e)}
                          onDragOver={(e) => dragOverHandler(e)}
                          onDrop={(e) => onDropHandler(e, currentBoard, user)}
                          onDragLeave={(e) => onDragLeaveHandler(e)}
              >{user.user}</div>
            }
          )}
        </div>
        </div>
      )}
    </div>
    </>
  );
}

export default App;
