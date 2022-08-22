import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'

export default class CreateCar extends Component {

    async componentDidMount(){
        const res = await axios.get('http://localhost:4000/cars');
        console.log(res)
    }
    
    render() {
        return (
            <div className="col-md-6 offset-md-3">
            </div>
        )
    }
}
