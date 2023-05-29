import { useState } from 'react';
import './spawnerPage.css'
import { useLocation, useNavigate } from 'react-router';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import UserManager from '../api/userManager/userManager';

const userManager = new UserManager()

const SpawnerPage = () => {
    const location = useLocation();
    const env = location.state?.env;
    const [requestCpu, setRequestCpu] = useState(env.requests.cpu);
    const [requestMemory, setRequestMemory] = useState(env.requests.memory);
    const [limitCpu, setLimitCpu] = useState(env.limits.cpu);
    const [limitMemory, setLimitMemory] = useState(env.limits.memory);
    const navigate = useNavigate();


    const handleRequestCpuChange = (event) => {
        setRequestCpu(event.target.value);
    };

    const handleRequestMemoryhange = (event) => {
        setRequestMemory(event.target.value);
    };

    const handleLimitCpuChange = (event) => {
        setLimitCpu(event.target.value);
    };

    const handleLimitMemoryChange = (event) => {
        setLimitMemory(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await userManager.addUserExecutorSpec(requestCpu, requestMemory, limitCpu, limitMemory);
        if (response.status === 200) {
            navigate('/');
        }
    };

    const isFormValid = () => {
        return (
            requestCpu !== '' &&
            requestMemory !== '' &&
            limitCpu !== '' &&
            limitMemory !== ''
        );
    }

    return (
        <div className='spawner-page'>
            <div className='spawner-form'>
                <Container>
                    <Row>
                        <Col
                        >
                            <Form onSubmit={handleSubmit}>
                                <span>Resources request:</span>
                                <Form.Group controlId="formRequestCPU">
                                    <Form.Control
                                        type="text"
                                        placeholder="CPU"
                                        value={requestCpu}
                                        onChange={handleRequestCpuChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formRequestMemory">
                                    <Form.Control
                                        type="text"
                                        placeholder="Memory"
                                        value={requestMemory}
                                        onChange={handleRequestMemoryhange}
                                    />
                                </Form.Group>
                                <span>Limits request:</span>
                                <Form.Group controlId="formLimitsCPU">
                                    <Form.Control
                                        type="text"
                                        placeholder="CPU"
                                        value={limitCpu}
                                        onChange={handleLimitCpuChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formLimitsMemory">
                                    <Form.Control
                                        type="text"
                                        placeholder="Memory"
                                        value={limitMemory}
                                        onChange={handleLimitMemoryChange}
                                    />
                                </Form.Group>



                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="btn-block"
                                    disabled={!isFormValid()}
                                >
                                    Apply
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default SpawnerPage;