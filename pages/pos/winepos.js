import * as React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, ButtonGroup, Button, Row , Col} from 'react-bootstrap';
import CoffeeCard from '../../components/CoffeeCard';
import { useLocalStorage } from 'react-use';



const dummyPrice = 59


function PosPage() {

     // window.localStorage['coffee'] = 'Latte'
    const [wine, setWine] = useLocalStorage('coffee', 'Latte')
  
    let [winesTitles, setWineTitles] = React.useState([])
    let [subMenu, setSubMenu] = React.useState('reds')
    //let [cart, setCard] = React.useState([])
    let [cart, setCart] = useLocalStorage('cart', [])

    function addToCard(wine) {
        //console.debug(coffee)
        cart.push(wine)
        console.push(cart)
        setCart([...cart])
    }

   
    React.useEffect(() => {
        let items = []
        fetch(`https://api.sampleapis.com/wines/${subMenu}`)
        .then(res => res.json())
        .then((wines) => {
        for (let i = 0; i < wines.length; i++) {
            //console.log(coffees[i].title)
            items.push(
                <CoffeeCard
                    key={i}
                    image={wines[i].image}
                    title={wines[i].title}
                    description={wines[i].description}
                    price={dummyPrice}
                    handleClick={() => {addToCard(wines[i])}}

                />
            )
        }

        setWineTitles(items)
    })

    }, [subMenu])


    return <Container>
        <h1>POS</h1>
        <ButtonGroup aria-label="Basic example">
            <Button variant="secondary" onClick={() => {setSubMenu('reds')}}>reds</Button>
            <Button variant="secondary" onClick={() => {setSubMenu('whites')}}>whites</Button>
            <Button variant="secondary" onClick={() => {setSubMenu('sparkling')}}>sparkling</Button>
            <Button variant="secondary" onClick={() => {setSubMenu('rose')}}>rose</Button>
            <Button variant="secondary" onClick={() => {setSubMenu('dessert')}}>dessert</Button>
        </ButtonGroup>
        <Row>
            <Col>
                <Row>
                    {winesTitles}
                </Row>
            </Col>
            <Col sm={3}>
                <h2>Cart {wine}</h2>
                {cart.map((item, i) => {
                    return <Row key={i}>
                        <Col>{item.title}</Col>
                        <Col>{dummyPrice}</Col>
                    </Row>
                })}
                <Row>
                Total: {cart.length * dummyPrice} Baht
                </Row>
            </Col>
        </Row>
    </Container >
}

export default PosPage