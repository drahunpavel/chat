import React, { Component } from 'react'
import "./SendMessageForm.scss"


class SendMessageForm extends Component {
  state = {
    text: '',
  }
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     text: '',
  //   }
  //   this.onSubmit = this.onSubmit.bind(this)
  //   this.onChange = this.onChange.bind(this)
  // }

  onSubmit(EO) {
    EO.preventDefault()
    this.props.onSubmit(this.state.text)
    this.setState({
      text: ''
    })
  }

  onChange = (EO) => {
    //console.log(EO.target.value)
    this.setState({
      text: EO.target.value
    })
  }

  render() {
    return (
      <form className="ActiveChatEntryFieldText">
        <textarea
          className="ActiveChatFooterInput"
          type="text"
          placeholder="Напишите что-нибудь"
          onChange={this.onChange}
          value={this.state.text}
        />
      </form>
    )
  }
}

export default SendMessageForm