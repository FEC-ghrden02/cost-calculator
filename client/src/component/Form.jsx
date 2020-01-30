import React from 'react';

class Form extends React.Component {
  constructor(props){
    super(props) 
    this.state = {
      cost: 0,
      cashDown: 0,
      tradeInValue: 0,
      owed: 0,
      rateEstimate: 3.49,
      displayedRate: 0,
      creditScore: 1,
      term: 24,
      zipcode: 'Zip Code',
      myMonthlyPayment: 0
    }
    this.setMonthlyPayment = this.setMonthlyPayment.bind(this);
    this.onFormChange = this.onFormChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.changeRateEstimate = this.changeRateEstimate.bind(this);
    this.enterZipcode = this.enterZipcode.bind(this);
    this.hideTaxesAndFees = this.hideTaxesAndFees.bind(this);
    this.hideAll = this.hideAll.bind(this);
    this.showTaxesAndFees = this.showTaxesAndFees.bind(this);
    this.showCalculateTaxesAndFees = this.showCalculateTaxesAndFees.bind(this);
  }
  hideAll () {
    document.getElementById("calculateTaxesAndFees").style.display="none"
    document.getElementById("taxesAndFees").style.display="none"
    document.getElementById("calculateButton").style.display="block"
  }
  hideTaxesAndFees () {
    document.getElementById("calculateTaxesAndFees").style.display="block"
    document.getElementById("taxesAndFees").style.display="none"
    document.getElementById("calculateButton").style.display="none"
  }
  showCalculateTaxesAndFees() {
    document.getElementById("calculateTaxesAndFees").style.display="block";
    document.getElementById("calculateButton").style.display="none"
  }
  showTaxesAndFees() {
    document.getElementById("taxesAndFees").style.display="block";
    document.getElementById("calculateButton").style.display="none"
  }
  changeRateEstimate (event) {
    const key = 'displayedRate';
    const value = event.target.value * this.state.rateEstimate;
    this.setState({
      [key]:value
    }, ()=>{console.log('rateEstimate', this.state.rateEstimate)
    console.log('displayedRate', this.state.displayedRate)})
  }
  setMonthlyPayment () {
    let n = this.state.term
    let r = this.state.rateEstimate * this.state.creditScore * .01 / 12
    let a = this.state.cost - this.state.cashDown - (this.state.tradeInValue - this.state.owed)
    let d = (Math.pow(1+r, n) - 1) / (r * Math.pow(1+r, n))
    let payment = Math.round(a / d)
    this.setState({
      myMonthlyPayment: payment
    })
  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.state.cost !== prevProps.state.cost) {
      this.setState({cost:this.props.state.cost});
      this.setMonthlyPayment()
    }
  }
  onFormChange (event) {
    const key = event.target.name;
    const value = event.target.value;
    // //console.log('what is this:', this)
    this.setState({
      [key]:value
    })
  }
  enterZipcode(event) {
    event.preventDefault();
    let zipcode = document.getElementById("zipcode").value;
    console.log(zipcode)
    this.props.getZipcode(zipcode)
  }
  clearZipcode() {

  }
  onFormSubmit(event) {
    event.preventDefault();
    this.setMonthlyPayment();
  }
  render() {
    return (
      <div>
      <form onSubmit={this.onFormSubmit}>
      <label> Cash Down
        <input name="cashDown" value={this.state.cashDown} onChange={this.onFormChange} />
      </label>
      <label> Trade In Value
        <input name="tradeInValue" value={this.state.tradeInValue} onChange={this.onFormChange}/>
      </label>
      <label> Owed On Trade
        <input name="owed" value={this.state.owed} onChange={this.onFormChange}/>
      </label>
      <label> Rate Estimated By Echo Park:
        <input name="rateEstimate" value={this.state.displayedRate} readOnly/>
      </label>
      <label> Est. Credit Score
      <select name="creditScore" className="credit-data" onChange={this.onFormChange} onChange={this.changeRateEstimate}>
      <option value={1}>740-900</option>
      <option value={1.35}>700-739</option>
      <option value={1.5}>670-699</option>
      <option value={2}>630-669</option>
      <option value={2.85}>580-629</option>
        </select>
      </label>
      <label> Term
      <select name = "term" className="txn-data" onChange={this.onFormChange}>
      <option value={24}>24</option>
      <option value={36}>36</option>
      <option value={48}>48</option>
      <option value={60}>60</option>
      <option value={72}>72</option>
      <option value={84}>84</option>
        </select>
      </label>
      <button>Test</button>
      </form>
      <button id="calculateButton" onClick={this.showCalculateTaxesAndFees}>Calculate My Taxes and Fees</button>
      <form id="calculateTaxesAndFees">
        <label> Where Will This Vehicle Be Registered?
          <input id="zipcode" name="zipcode" value={this.state.zipcode} onChange={this.onFormChange} />
        </label>
        <button onClick={this.hideAll}>Back</button><button onClick={this.enterZipcode} onClick={this.showTaxesAndFees}>Next</button>
      </form>
      <div id="taxesAndFees">
      <label> 
        Taxes ${this.props.state.taxes}
      </label>
      <br></br>
      <label> 
        DMV Fees ${this.props.state.fees}
      </label>
      <br></br>
      <button onClick={this.hideAll}>Remove</button><button onClick={this.hideTaxesAndFees}>Edit</button>
      </div>
      <label> 
      My Monthly Payment             ${this.state.myMonthlyPayment}/mo  
      </label>
      </div>
    )
  }
}

export default Form;