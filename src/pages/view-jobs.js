import React from 'react'
import JobTable from "../Components/table/index"
import { Container, Row, Col } from 'react-bootstrap'

export default function ViewJobs() {

    return (
        <Container>
            <Row>
                <Col>
                    <JobTable />
                </Col>
            </Row>
        </Container>
    )
}
