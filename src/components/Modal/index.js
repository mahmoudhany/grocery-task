import React, { Component } from 'react'
import Modal from 'react-modal'
import ReactStars from "react-rating-stars-component";
import './modal.css'

export default class index extends Component {
  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.showModal}
          contentLabel="Minimal Modal Example"
          ariaHideApp={false}
          style={{
            overlay: {
              position: 'fixed',
              top: '10%',
              left: '30%',
              right: '30%',
              bottom: '10%',
              backgroundColor: 'rgba(255, 255, 255, 0.75)'
            }
          }}
        >
          <form className='review'>
            <h3>Submit a review</h3>
            <div className='stars'>
              <ReactStars
                count={5}
                onChange={this.props.ratingChanged}
                size={20}
                activeColor="#ffd700"
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Enter a message:</label>
              <textarea
                className="form-control message"
                id="message"
                onChange={this.props.reviewMessage}
                value={this.props.message}
                rows="3"></textarea>
            </div>
            <div className='action-btns'>
              <button type='submit' className='btn btn-primary'
                onClick={this.props.submitReview}>Submit Review </button>
              <button className='btn btn-danger'
                onClick={this.props.handleCloseModal}>Close</button>
            </div>
          </form>
        </Modal>
      </div>
    );
  }
}
