import React from 'react';
import './App.css';
import QUOTES from './quotes'
import pickElemAtRandom from './utils'
import Quote from './Quote'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      quote: '',
      author: '',
      color: {
        r: 0,
        g: 23,
        b: 54
      }
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
    const color = this.pickNewColor(this.state.color)

    this.setState({
      quote,
      author,
      color
    })
  }

  pickNewColor(color) {
    const maxColorValue = 255
    const minColorValue = 0
    const maxVariance = 80

    const highestAcceptableValue = 240
    const numTooHighValuesAllowed = 1

    const { r, g, b } = color

    let redVariance = Math.floor((Math.random() * 2 - 1) * maxVariance)
    let greenVariance = Math.floor((Math.random() * 2 - 1) * maxVariance)
    let blueVariance = Math.floor((Math.random() * 2 - 1) * maxVariance)

    let tempRed = Math.max(Math.min(r + redVariance, maxColorValue), minColorValue)
    let tempGreen = Math.max(Math.min(g + greenVariance, maxColorValue), minColorValue)
    let tempBlue = Math.max(Math.min(b + blueVariance, maxColorValue), minColorValue)
    let numTooHighValues = [tempRed, tempBlue, tempGreen].filter(value => value >= highestAcceptableValue).length

    while (numTooHighValues > numTooHighValuesAllowed) {
      redVariance = Math.floor((Math.random() * 2 - 1) * maxVariance)
      greenVariance = Math.floor((Math.random() * 2 - 1) * maxVariance)
      blueVariance = Math.floor((Math.random() * 2 - 1) * maxVariance)
  
      tempRed = Math.max(Math.min(r + redVariance, maxColorValue), minColorValue)
      tempGreen = Math.max(Math.min(g + greenVariance, maxColorValue), minColorValue)
      tempBlue = Math.max(Math.min(b + blueVariance, maxColorValue), minColorValue)
      numTooHighValues = [tempRed, tempBlue, tempGreen].filter(value => value >= highestAcceptableValue).length
    }

    return {
      r: tempRed,
      g: tempGreen,
      b: tempBlue
    }
  }

  render() {
    const color = `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, 0.9)`

    return (
      <div id="quote-box-container" style={{ backgroundColor: `${color}` }}>
        <div id="quote-box">
          <Quote
            quote={this.state.quote}
            author={this.state.author}
            color={color}
          />
          <div>
            <button
              id="new-quote"
              onClick={this.pickNewQuote}
              style={{ backgroundColor: `${color}` }}
            >New quote</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
