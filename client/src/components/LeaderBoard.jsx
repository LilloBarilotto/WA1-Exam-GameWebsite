import React, { useEffect, useState } from 'react';
import { Container, Row, Table } from 'react-bootstrap';
import API from '../API.mjs';

const LeaderBoard = () => {
    const [leaderboardData, setLeaderboardData] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch leaderboard data from API
        API.getLeaderboard()
            .then(data => {
                // Sort data in descending order based on totalPoints
                const sortedData = data.sort((a, b) => b.total_point - a.total_point);
                setLeaderboardData(sortedData);
                setLoading(false);
            })
            .catch(error => console.error(error));
    }, []);

    if(loading) return (<Container>Loading...</Container>);

    return (
        <Container className='rounded mt-4 bg-light custom-container'>
            <Row><h1>Leaderboard!</h1></Row>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>User</th>
                        <th>Total Points</th>
                    </tr>
                </thead>
                <tbody>
                     {leaderboardData.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.nickname}</td>
                            <td>{user.total_point}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>    
        </Container>
    );

};

export default LeaderBoard;