import React from 'react'
import StyleNumberSelect from '../components/selects/StyleNumbersSelect'

function AddOrder(props) {
    const { addOrder } = props

    return (
        <div>
            Customer: <input type='text' placeholder='Enter the Customer name' id='addOrderCustomer'></input><br></br><br></br>
            Style Number: <select id='addOrderStyleNumber'>
                <StyleNumberSelect />
            </select>
            <br></br><br></br>
            <button onClick={() => addOrder()}>Submit</button>
        </div>
    )
}

export default AddOrder
