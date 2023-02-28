import React, { useState } from 'react';
import { Row, Button, Input, Container, Card, CardBody } from "reactstrap";
import axios from 'axios';
import moment from 'moment/moment';
import 'bootstrap/dist/css/bootstrap.min.css';

const FetchUsers = () => {
    const [data, setData] = useState("");
    const [repo, setRepo] = useState("")
    const [input, setInput] = useState("");

    const handleGetUser = async () => {
        try {
            // Fetch user data
            const { data: userData } = await axios.get(`https://api.github.com/users/${input}`);

            // Fetch user repos
            const { data: reposData } = await axios.get(`https://api.github.com/users/${input}/repos`);

            setData(userData);
            setRepo(reposData);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                alert("User not found!");
            }
    };
}


    return (
        <div>
            <div className='d-sm-flex justify-content-between'>
                <div className='col-md-4 p-2 m-3 rounded border border-2 border-warning'>
                    <h4 className='mt-3'>Fetch Github User</h4>
                <Input type="text" className='mt-4' placeholder='Enter User Details...' value={input} onChange={(e) => setInput(e.target.value)} />
                <Button className='bg-primary w-100 mt-4 mb-3' onClick={handleGetUser}>Get User</Button>
                <div className='d-flex justify-content-center'>
                <img  className='rounded-circle' src={data.avatar_url} alt="" style={{ width: '18.3rem' }} />
                </div>
                </div>
                <div className='col-md-8'>
                {data ?
                <>
                    <div className='m-2 p-2'>
                        {/* User Details */}
                        <div className='col-lg-9'>
                            <div className='p-3 rounded border border-2 border-warning'>
                            <h3 className='text-uppercase'>{data.name}</h3>
                            <h6>({data.bio})</h6>
                            <h5>{data.location}</h5>
                            <h5>Followers- {data.followers} &nbsp; &nbsp;<span>Following-{data.following}</span></h5>
                            </div>
                            {/* Repositories Section */}
                            <h3 className='mt-3 text-center'>Total Repositories ({data.public_repos})</h3>
                            <div className='overflow-scroll overflow-hidden' style={{ height: "100vh" }}>
                                {repo && repo.map((item) =>
                                    <>
                                        <Card key={item.id} className="mt-2 rounded border border-1 border-warning">
                                            <div className='p-3'>
                                                Repository Name- &nbsp;{item.name} <br />
                                                Repo Description- &nbsp;{item.description == null ? "Description not available" : "{item.description}"} <br />
                                                Repo Language- &nbsp;{item.language} <br />
                                                Repo Created- &nbsp;{moment(item.created).format("DD-MM-YYYY")} <br />
                                                <a href={item.html_url} target="-blank">{item.html_url}</a>
                                            </div>
                                        </Card>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </>
                : 
                <Container className='text-center mt-5 d-flex justify-content-center p-5'>
                    <Card className='px-5 rounded border border-2 border-warning'>No User To Show !</Card>
                </Container>
            }
                </div>
            </div>
        </div>
    );
}

export default FetchUsers;
