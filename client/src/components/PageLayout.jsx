import { ListGroup, ListGroupItem} from "react-bootstrap";

function RoundLayout(props) {
    return (
        <div className="container">
            <Row>
                <Col>
                    <h2>Round {props.count+1}</h2>
                </Col>
            </Row>
            <Row>
                <Meme></Meme>
                <CaptionList></CaptionList>          
            </Row>
        </div>
    );
}

function CaptionList(){
    return (
        <Col>
            <ListGroup>
                {props.captions.map( (caption) => <Caption 
                    key={caption.id} 
                    caption={caption}
                />)}
            </ListGroup>
        </Col>
    )
}

function Caption(props){
    return (
        <ListGroupItem eventKey={props.id}>
            {props.caption.text}
        </ListGroupItem>
    )
}

function NotFoundLayout() {
    return (
        <>
            <Row><Col><h2>Error: page not found!</h2></Col></Row>
            <Row><Col> <img src="/GitHub404.png" alt="page not found" className="my-3" style={{display: 'block'}}/>
            </Col></Row>
            <Row><Col> <Link to="/" className="btn btn-primary mt-2 my-5">Go Home!</Link> </Col></Row>
        </>
    );
}
export { NotFoundLayout}