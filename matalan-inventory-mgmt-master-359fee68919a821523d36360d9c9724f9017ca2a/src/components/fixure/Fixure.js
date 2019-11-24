import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import './Fixure.css';

class Fixure extends Component {
    constructor(props) {
        super();
        this.state = {
            //quantity: '',
            quantity: props.data.count,
        }
    }

    handleChange = name => event => {
        this.setState({
            ...this.state,
            [name]: event.target.value,
        });
    };


    render() {
        return (
            <Card className='fixurethumb'>
                <CardMedia
                    className='fixureimg'
                    image={`../../img/${this.props.data.name.toLowerCase().replace(/\s+/g,"")}.jpg`} 
                    title="Image"
                />
                <div className='fixuredetails'>
                    <CardContent className='fixuretitle'>
                        <Typography component="h6" variant="h6" className="fixurename">
                                {this.props.data.name}
                        </Typography>
                        <FormControl className="fixurecount">
                                <InputLabel htmlFor="fixure-count">Fixure Count</InputLabel>
                                <Select
                                    //value={this.props.data.count}
                                    value={this.state.quantity}
                                    onChange={this.handleChange('quantity')}
                                    inputProps={{
                                        name: `${this.props.data.name}`,
                                        id: 'fixure-count',
                                    }}
                                >
                                    {new Array(41).fill().map((_, i) => (
                                        <MenuItem key={i} value={i}>{i}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                    </CardContent>
                </div>
            </Card>
        );
    }
}
export default Fixure;