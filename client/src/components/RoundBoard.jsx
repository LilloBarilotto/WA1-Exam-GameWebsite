import { Container, Col, Row, Button, CardGroup, Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useParams , useNavigate} from 'react-router-dom';


import PropTypes from "prop-types";
import Timer from './Timer.jsx';
import MemeCard from './Meme.jsx';
import CaptionCard from './Caption.jsx';

import API from "../API.mjs";

function Round(props){

    useEffect(() => {
        if(props.selectedCaption && Object.keys(props.selectedCaption).length > 0){
            props.handleEndRound();
        }
    }, [props.selectedCaption]);

    return (
        <Container className="mt-3 d-flex flex-column custom-container bg-light ">
            <Row><h1>Round {props.count + 1 }</h1></Row>
            <Row className="mx-auto">
                <Col md={8} >
                    {props.meme && < MemeCard id={props.meme.id} path_img={props.meme.path_img} />}
                </Col>
                <Col>
                    {props.seconds && <Timer seconds={props.seconds} handleEndTimer={props.handleEndRound} />}
                </Col>
            </Row>

            <Row><h3>Choose one of these captions! Only two of them are correct!</h3></Row>
            <Row>
            <CardGroup>
                {props.captions && props.captions.map((caption) => (
                    <Col key={caption.id} >
                        <CaptionCard
                            id={caption.id}
                            description={caption.description}
                            onClick={() => {
                                props.setSelectedCaption(caption);
                            }}
                        />
                    </Col>
                ))}
            </CardGroup>
            </Row>
        </Container>
    );
}

Round.propTypes = {
    count: PropTypes.number,
    meme: PropTypes.object,
    captions: PropTypes.array,
    selectedCaption: PropTypes.object,
    setSelectedCaption: PropTypes.func,
    handleEndRound: PropTypes.func
};

function RoundResult(props){
    return (
        <Container  className=" mt-3 d-flex flex-column custom-container bg-light ">
            <Row className="mx-auto">
                <Col>
                    <h3>You scored {props.point} point </h3>
                    {props.meme && < MemeCard id={props.meme.id} path_img={props.meme.path_img} />}
                </Col>
                <Col>
                    <h3>Correct Captions</h3>
                    <CardGroup>
                        {props.correctCaptions && props.correctCaptions.map((caption) => (
                            <Col key={caption.id} >
                                <CaptionCard id={caption.id} description={caption.description} />
                            </Col>
                        ))}
                    </CardGroup>
                </Col>
                <Col>
                    <h3>Your Caption Choice</h3>
                    <Col key={props.selectedCaption.id} >
                        <CaptionCard id={props.selectedCaption.id} description={props.selectedCaption.description}/>
                    </Col>
                </Col>
            </Row>
        </Container>);
};

function GameResult(){
    let { id } = useParams();
    const [game, setGame] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        API.getGame(id)
        .then(g => {
            setGame(g);
            setLoading(false);
        })
    }, [id]);

    if(loading) return (<Container>Loading...</Container>); 

    return (
        <Container className="flex-grow-1 d-flex flex-column">
            {game.id && <Row className="mx-auto">
                <Col>   
                    <h2 className="customH2 mt-2">Your final score is {game.point} . Here the list of your rounds</h2    >
                </Col>
            </Row>}
            {game.rounds && game.rounds.map((round) => (
                <Row key={round.id} className="mx-auto">
                    <RoundResult point={round.point} meme={round.meme} correctCaptions={round.bestCaptions}
                      selectedCaption={
                        round.selectedCaption && Object.keys(round.selectedCaption).length > 0 
                          ? round.selectedCaption 
                          : { "id": -1, "description": "No caption selected" }
                      } />
                </Row>
            ))}
        </Container>
    );
};


function GamesResult(){
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc' for ascending, 'desc' for descending
    const navigate = useNavigate();

    useEffect(() => {
        API.getGames()
            .then(games => {
                // Assuming games is an array of objects and each game object has a date property
                const sortedGames = games.sort((a, b) => {
                    return new Date(a.date) - new Date(b.date);
                });
                setGames(sortedGames);
                setLoading(false);
            })
    }, []);

    const toggleSortOrder = () => {
        const sortedGames = [...games].sort((a, b) => {
            if (sortOrder === 'asc') {
                return new Date(b.date) - new Date(a.date);
            } else {
                return new Date(a.date) - new Date(b.date);
            }
        });
        setGames(sortedGames);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    if(loading) return (<Container>Loading...</Container>);

    return (
        <Container className='rounded mt-4 bg-light custom-container'>
            <Row><h2>Here a list of your games!</h2></Row>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th onClick={toggleSortOrder} style={{cursor: 'pointer'}}>Date {sortOrder === 'asc' ? '↓' : '↑'}</th>
                        <th>Score</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {games.map((game) => (
                        <tr key={game.id}>
                            <td>{game.date}</td>
                            <td>{game.point}</td>
                            <td><Button onClick={() => navigate("/games/"+game.id)}>See Details</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>    
        </Container>
    );


}

export {Round, RoundResult, GameResult, GamesResult};