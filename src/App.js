import React from 'react';
import './App.css';
import QUOTES from './quotes'
import pickElemAtRandom from './utils'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      quote: '',
      author: ''
    }

    this.pickNewQuote = this.pickNewQuote.bind(this)
  }
  
  getNewRandomQuoteAndAuthor(actualQuote) {
    if(!actualQuote) {
      return pickElemAtRandom(QUOTES)
    }
    
    let newQuote = actualQuote
    let newAuthor = ''
    
    while(newQuote === actualQuote) {
      const { quote, author } = pickElemAtRandom(QUOTES)
      newQuote = quote
      newAuthor = author
    }
    
    return {
      quote: newQuote,
      author: newAuthor
    }
  }
  
  componentDidMount() {
    const { quote, author } = this.getNewRandomQuoteAndAuthor()
    
    this.setState({
      quote,
      author
    })
  }
  
  pickNewQuote() {
    const { quote, author } = this.getNewRandomQuoteAndAuthor(this.state.quote)

    this.setState({
      quote,
      author
    })
  }

  render() {
    return (
      <div id="quote-box-container">
        <div id="quote-box">
          <div>
            <h1>Random Quotes Machine</h1>
          </div>
          <div id="quote">
            <p>{this.state.quote}</p>
          </div>
          <div id="author">
            <p>{this.state.author}</p>
          </div>
          <div>
            <button id="new-quote" onClick={this.pickNewQuote}>New quote</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
