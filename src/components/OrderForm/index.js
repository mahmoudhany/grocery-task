import React, { Component } from 'react'
import Input from '../Input/Input'
import Modal from '../Modal'
import { FormValidation } from '../../Utility/FormValidation';
import axios from '../../API';

export default class Form extends Component {
  state = {
    fields: [
      {
        name: 'name',
        label: 'name *',
        placeholder: "Enter Your Name",
        inputType: 'text',
        type: 'text',
        error: null,
        errorMsg: 'Name cannot be blank',
        value: '',
        isRequired: true
      },
      {
        name: 'phone',
        label: 'phone *',
        placeholder: "000-000-0000",
        inputType: 'text',
        type: 'text',
        error: null,
        errorMsg: 'phone cannot be blank',
        value: '',
        isRequired: true
      },
      {
        name: 'location',
        label: 'location *',
        placeholder: "Location",
        inputType: 'text',
        type: 'text',
        error: null,
        errorMsg: 'location cannot be blank',
        value: '',
        isRequired: true
      },
      {
        name: 'apple',
        label: 'Apple',
        inputType: 'number',
        type: 'number',
        error: null,
        min: 0,
        max: 3,
        width: 'col-4',
        value: '',
        isRequired: false
      },
      {
        name: 'banana',
        label: 'Banana',
        inputType: 'number',
        type: 'number',
        error: null,
        min: 0,
        max: 3,
        width: 'col-4',
        value: '',
        isRequired: false
      },
      {
        name: 'orange',
        label: 'Orange',
        inputType: 'number',
        type: 'number',
        error: null,
        min: 0,
        max: 3,
        width: 'col-4',
        value: '',
        isRequired: false
      },
      {
        name: 'timeToDeliver',
        label: 'Time to deliver',
        inputType: 'datetime-local',
        type: 'datetime-local',
        placeholder: "Time To Be Delivered",
        error: null,
        width: 'col-12',
        value: '',
        isRequired: false
      },
      {
        name: 'shopper',
        label: 'shopper',
        inputType: 'select',
        type: 'select',
        error: null,
        width: 'col-4',
        value: 'Employee 1',
        isRequired: false
      },
    ],
    isValid: false,
    shoppers: [],
    showModal: false,
    rating: {
      message: '',
      rateValue: null
    }
  }
  componentDidMount() {
    const fetchShoppers = async () => {
      try {
        const response = await axios.get('/Shoppers')
        this.setState(prev => ({
          ...prev, shoppers: response.data
        }))
      } catch (error) {
        console.log(error);
      }
    }
    fetchShoppers()
  }

  handleOpenModal = () => {
    this.setState({ showModal: true });
  }
  handleCloseModal = () => {
    this.setState({ showModal: false });
  }
  ratingChanged = (newRating) => {
    this.setState(prev => ({ ...prev, rating: { ...prev.rating, rateValue: newRating } }))
  }
  reviewMessage = (e) => {
    this.setState(prev => ({ ...prev, rating: { ...prev.rating, message: e.target.value } }))
  }
  submitReview = async (e) => {
    e.preventDefault();
    if (this.state.rating.rateValue > 0) {
      try {
        await axios.post('/Reviews', this.state.rating)
        this.handleCloseModal()
      } catch (error) {
        console.log(error);
      }
    }
  }

  onChangeInput = (val, index) => {
    const { fields } = this.state;
    fields[index].value = val;
    this.setState({ fields });
  }

  onSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: false })

    const { fields } = this.state;
    const { updatedFields, isValid } = FormValidation({ fields });

    this.setState({ fields: updatedFields });
    if (isValid) {
      this.setState({ isValid: true });
      try {
        const response = await axios.post('/Orders', this.prepareData())
        console.log(response);
        // open modal if success (API need A Fix here)
        this.handleOpenModal()
      } catch (error) {
        console.log(error.message);
      }
    }
  }
  prepareData = () => {
    let formData = {}
    const data = this.state.fields.map((data) => data)
    for (const key in data) {
      formData = {
        ...formData,
        ...{ [data[key].name]: data[key].value }
      }
    }
    const products = ['apple', 'banana', 'orange'];
    const dataList = [];
    Object.keys(formData).map(key => {
      if (products.includes(key)) {
        if (formData[key] !== '' && formData[key] !== '0')
          dataList.push({ name: key, count: formData[key] })
        delete formData[key];
      }
    });

    if (dataList.length > 0) {
      return {
        ...formData,
        items: dataList
      }
    } else {
      alert('You must select at least one item')
    }
  }
  render() {
    const { fields, shoppers } = this.state
    return (
      <div>
        {
          this.state.showModal ?
            <Modal
              ratingChanged={this.ratingChanged}
              handleCloseModal={this.handleCloseModal}
              showModal={this.state.showModal}
              message={this.state.rating.message}
              reviewMessage={this.reviewMessage}
              submitReview={this.submitReview}
            /> :
            ''
        }
        <form className='col-10 col-md-6 col-lg-4 mx-auto mt-5 px-1'>
          {shoppers.length > 0 ?
            <>
              <div className="row">
                {
                  fields.map((fld, index) => {
                    return (
                      <Input
                        key={fld.label}
                        {...fld}
                        options={shoppers}
                        onChange={val => this.onChangeInput(val, index)}
                      />
                    )
                  })
                }
              </div>
              <button
                type="submit"
                style={{ textAlign: 'center' }}
                className="btn btn-primary text-truncate"
                onClick={this.onSubmit}
              >Submit</button>
            </> : 'loading...'
          }
        </form>
      </div >
    )
  }
}
