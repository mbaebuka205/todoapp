import styled from "styled-components";
import React, {useState} from 'react';
import { GiCancel } from 'react-icons/gi'
import { createTodo } from "./api/Api";

interface iProps{
    toggle:any
    setToggle:any
}

const CreateTodoScreen:React.FC<iProps> = ({toggle, setToggle}) =>{
    const [text, setText] = useState('')
    const [timer, setTimer] = useState<number>(0)
    return(
        <div>
            <Container>
                <Card>
                  <div
                   onClick={()=>{
                    setToggle(false)
                   }}
                  >
                    <GiCancel/>
                  </div>
                  <Hold>
                    <Text 
                    placeholder = 'Enter your task'
                    value={text}
                    onChange={(e:any) =>{
                        setText(e.target.value)
                    }}
                    />
                    <Timer
                        type="number"
                        placeholder="Enter time in minute"
                        value={timer}
                        onChange={(e: any) => {
                          setTimer(e.target.value);
                        }}
                    />
                    <Button
                        onClick={() => {
                            let data = {
                              task: text,
                              timer,
                            };
                            createTodo(data);
                            setToggle(false);
                          }}
                    >
                        Add To Do
                    </Button>
                  </Hold>
                </Card>
                <Main
                 onClick={()=>{
                    setToggle(false)
                 }}
                >
                </Main>
            </Container>
        </div>
    )
}
export default CreateTodoScreen;
const Button = styled.div`
   background-color: purple;
  padding: 10px 15px;
  color: white;
  border-radius: 5px;
`
const Timer = styled.input`
  height: 50px;
  width: 100%;
  background-color: white;
  padding-left: 5px;
  border-radius: 5px;
`;

const Text = styled.textarea`
  padding: 10px;
  height: 50%;
  width: 100%;
  /* resize: none; */
  border-radius: 5px;
`

const Hold = styled.div`
  height: 90%;
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
`
const Card = styled.div`
  position: absolute;
  z-index: 10;
  width: 500px;
  height: 400px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
`
const Main = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`
const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(144, 19, 254, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(5.5px);
  -webkit-backdrop-filter:blur(5.5px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`