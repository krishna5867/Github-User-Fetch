import './App.css';
import React, { useState } from 'react';
import { Row, Button, Input, Container, Card, CardBody } from "reactstrap";
import axios from 'axios';
import moment from 'moment/moment';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [data, setData] = useState("");
  const [repo, setRepo] = useState("")
  const [input, setInput] = useState("krishna5867");

  const handleGetUser = async () => {
    try {
      // Fetch user data
      const { data: userData } = await axios.get(`https://api.github.com/users/${input}`);

      // Fetch user repos
      const { data: reposData } = await axios.get(`https://api.github.com/users/${input}/repos`);

      // Update state variables
      setData(userData);
      setRepo(reposData);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="App">
      <h2 className='mt-5'>GitHub Fetch User</h2>
      <Container className='mt-5'>
        <Input type="text" placeholder='Enter User Details...' value={input} onChange={(e) => setInput(e.target.value)} />
        <Button className='bg-primary w-100 mt-4' onClick={handleGetUser}>Get User</Button>
      </Container>
      {data ?
        <>
          <Row>
            <div className="col-lg-5">
              <div className='mt-3'>
                <img src={data.avatar_url} alt="User Profile" className='rounded-circle' style={{ width: '20rem' }} />
              </div>
            </div>
            <div className='col-lg-5 mt-3'>
              <h3>{data.name}</h3>
              <h5>{data.bio}</h5>
              <h5>{data.location}</h5>
              <h5>Followers- {data.followers} &nbsp; &nbsp;<span>Following-{data.following}</span></h5>

                <h3 className='mt-3'>Total Repositories ({data.public_repos})</h3>
              <div className='overflow-scroll overflow-y-hidden' style={{ height: "100vh" }}>
                {repo && repo.map((item) =>
                  <>

                    <Card key={item.id}>
                      <>
                        Repository Name- &nbsp;{item.name} <br />
                        Repo Description- &nbsp;{item.description == null ? "Description not available" : "{item.description}"} <br />
                        Repo Language- &nbsp;{item.language} <br />
                        Repo Created- &nbsp;{moment(item.created).format("DD-MM-YYYY")} <br />
                        `<a href={item.html_url}>{item.html_url}</a>`
                      </>
                    </Card>
                  </>
                )}
              </div>


            </div>


          </Row>
        </>
        : "No User Found"
      }

    </div>
  );
}

export default App;
