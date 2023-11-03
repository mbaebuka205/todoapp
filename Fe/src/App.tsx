import styled from "styled-components";
import {useState, useEffect, useMemo} from 'react'
import { readAllTodo,updatTodo } from "./api/Api";
import CreateTodoScreen from "./CreateTodoScreen";

const App = () => {

	const [state, setState] = useState<Array<{}>>([])
	const [toggle, setToggle] = useState<any>()
	const [text, setText] = useState<string>("");
	const [stateSearch, setStateSearch] = useState<Array<{}>>([]);
   
	useEffect(()=>{
		readAllTodo().then((res)=>{
			setState(res)
		})
	},[state])

	useMemo(() => {
		// readAllTodo().then((res)=>{
		// 	setState(res)
		// })
		setStateSearch(state.filter((el: any) => el.task.includes(text)));
	  }, [state, text]);
	return (
		<div>
			<Container>
			<Br>
          <Button
            onClick={() => {
              setToggle(true);
            }}
          >
            Add Todo
          </Button>
        </Br>
		<Div>
          <Input
            placeholder="search a TODO"
            value={text}
            onChange={(e: any) => {
              setText(e.target.value);
            }}
          />
        </Div>
				<Main>
					{state && stateSearch?.map((prop:any)=>{
						return(
					<Card key={prop._id} style={{backgroundColor:`${prop.achieved ?'#CDF5DC':'#FDEEAC'}`}}>
						<Tasked>{prop.task}</Tasked>
						<Time fd="1">
							<TimeWrap><div>Created At:</div></TimeWrap>
								{prop.createdAt}
						</Time>
						<Time>
							<TimeWrap><div>EndedAt :</div></TimeWrap>
							{prop.achievedAt}
						</Time>
                         <hr/>
			              {prop.achieved? (<Text>Todo was Achieved</Text>)
			               :(<Text>Pending</Text>)}
                           <hr/>
                           <br/>
                          <But>
							{prop.achieved === null?( 
							<Button 
							 onClick={() =>{
								updatTodo(prop._id.bc="i")
							 }}
							 onChange={()=>{
								prop.bc
							 }}
							>
                            Update Todo
                             </Button>):(
                            <div>Time Elapse</div>
							 )}
                            
			            </But>
					</Card>
						)
					})}
				</Main>
			</Container>
			{toggle && <CreateTodoScreen toggle={toggle} setToggle={setToggle} />}
		</div>
	);
};

export default App;
const Input = styled.input`
  width: 500px;
  height: 40px;
  border-radius: 3px;
  border: 1px solid silver;
  outline: none;
  padding-left: 10px;
  margin-bottom: 20px;
  &::placeholder {
    font-family: "Poppins";
  }
`;

const Div = styled.div`
  display: flex;
  justify-content: center;
`;
const Br = styled.div`
  margin: 60px 0;
  display: flex;
  justify-content: center;
`;
const Text = styled.div`
  text-align: center;
  margin: 10px 0;
  font-size: 12px;
  font-weight: 600;
`
const But = styled.div`
  display: flex;
  justify-content: center;
`
const Button = styled.div`
  padding: 10px 17px;
  border-radius: 5px;
  background-color: purple;
  color: white;
  font-size: 12px;
  font-weight: 600;
`
const TimeWrap = styled.div`
	width: 90%;
`;

const Time = styled.div<{ fd?: string }>`
	font-size: 12px;
	margin: 5px 0;
	line-height: 1;

	display: flex;
	flex-direction: column;

	${TimeWrap} {
		display: flex;
		flex-direction: ${({ fd }) => (fd ? "row" : "row-reverse")};

		div {
			font-size: 10px;
			font-weight: 900;
			margin-bottom: 5px;
			font-family: "Poppins";
		}
	}
`;
const Tasked = styled.div`
	border-radius: 5px;
	border: 1px solid silver;
	padding: 5px;
	font-size: 12px;
	word-wrap: break-word;
`;
const Card = styled.div`
	width: 200px;
	min-height: 150px;
	border-radius: 5px;
	border: 1px solid silver;
	margin: 10px;
	padding: 5px;
`;
const Main = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
`;
const Container = styled.div``