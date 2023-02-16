import React, { useState } from 'react';
import { Row, Button, Input, Container, Card, CardBody } from "reactstrap";
import axios from 'axios';
import moment from 'moment/moment';
import 'bootstrap/dist/css/bootstrap.min.css';

const FetchUsers = () => {
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
        <>
            {/* <Container className="text-center mt-3"><h2>Fetch GitHub User</h2></Container> */}
            <Row>
                <div className='col-lg-4 p-2 m-3 rounded border border-1 border-warning' style={{height: "80vh"}}>
                    <h4>Find Github User</h4>
                <Input type="text" placeholder='Enter User Details...' value={input} onChange={(e) => setInput(e.target.value)} />
                <Button className='bg-primary w-100 mt-4 mb-3' onClick={handleGetUser}>Get User</Button>
                <img  className='rounded-circle mx-2' src={data.avatar_url} alt="" style={{ width: '18.3rem' }} />
                </div>
                <div className='col-lg-7'>
                {data ?
                <>
                    <Row>
                        {/* User Details */}
                        <div className='col-lg-9 mt-3 mx-5'>
                            
                            <div className='p-2 rounded border border-1 border-warning'>
                            <h3>{data.name}</h3>
                            <h5>{data.bio}</h5>
                            <h5>{data.location}</h5>
                            <h5>Followers- {data.followers} &nbsp; &nbsp;<span>Following-{data.following}</span></h5>
                            </div>
                            {/* Repositories Section */}
                            <h3 className='mt-3'>Total Repositories ({data.public_repos})</h3>
                            <div className='overflow-scroll overflow-y-hidden' style={{ height: "100vh" }}>
                                {repo && repo.map((item) =>
                                    <>
                                        <Card key={item.id} className="mt-2 px-3 w-75">
                                            <div className='p-3'>
                                                Repository Name- &nbsp;{item.name} <br />
                                                Repo Description- &nbsp;{item.description == null ? "Description not available" : "{item.description}"} <br />
                                                Repo Language- &nbsp;{item.language} <br />
                                                Repo Created- &nbsp;{moment(item.created).format("DD-MM-YYYY")} <br />
                                                <a href={item.html_url}>{item.html_url}</a>
                                            </div>
                                        </Card>
                                    </>
                                )}
                            </div>
                        </div>
                    </Row>
                </>
                : 
                <Container className='text-center mt-5 d-flex justify-content-center p-5'>
                    <Card className='px-5 rounded border border-2 border-warning'>No User To Show</Card>
                </Container>
            }
                </div>
            </Row>
        </>
    );
}

export default FetchUsers;
