import Axios from 'axios'
import React, { Component } from 'react'

class Investment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      investments: [],
      users: [],
      companies: [],
      userId: 'SHOWS THE USER ID',
      companyId: null,
      numberOfShares: 'SHOWS THE NUMBER OF SHARES',
      amount: 'SHOWS THE AMOUNT'
    }
    this.investmentsList = this.investmentsList.bind(this)
    this.usersList = this.usersList.bind(this)
    this.companiesList = this.companiesList.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleInvestId = this.handleInvestId.bind(this)
  }

  componentDidMount() {
    this.investmentsList(this.state.userId)
    this.usersList()
    // this.companiesList(this.state.companyId)
  }

  investmentsList(userId) {
    Axios.get(`/api/investments/${userId}`)
      .then((res) => this.setState({ investments: res.data, userId }))
      .catch((err) => console.log(err))
  }

  usersList() {
    Axios.get('/api/users')
      .then((res) => this.setState({ users: res.data }))
      .catch((err) => console.log(err))
  }

  companiesList(companyId) {
    Axios.get(`/api/companies/${companyId}`).then((res) => {
      console.log('IS RES DATA', res.data)
      this.setState({ companies: [res.data], companyId }).catch((err) =>
        console.log(err)
      )
    })
  }

  handleChange(e) {
    this.setState({ userId: e.target.value })
    this.investmentsList(e.target.value)
  }

  handleInvestId(e) {
    const index = e.target.value
    const selectedInvestment = this.state.investments[index]
    console.log('event', e.target.value)
    console.log('selected Investment', selectedInvestment._companyId)
    this.setState({
      companyId: selectedInvestment._companyId,
      numberOfShares: selectedInvestment.numberOfShares,
      amount: selectedInvestment.amount
    })
    this.companiesList(selectedInvestment._companyId)
  }

  render() {
    const fetchedUserAndSumInvestments = this.state.users.map((user) => {
      const investUser = this.state.investments.filter(
        (investment) => (investment._userId = user._id)
      )
      console.log('IS INVESTMENT USER', investUser)

      const amountInvestUser = investUser.map(
        (investUser) => investUser.amount
      )
      console.log('IS AMOUNT FOR USER', amountInvestUser)

      const sumAmountInvestUser = amountInvestUser
        .reduce((acc, cur) => {
          return acc + cur
        }, 0)
        .toFixed(2)
      console.log('IS AMOUNT SUM', sumAmountInvestUser)

      const sharesInvestUser = investUser.map(
        (investUser) => investUser.numberOfShares
      )
      console.log('IS USER SHARES', sharesInvestUser)

      const sumSharesInvestUser = sharesInvestUser.reduce((acc, cur) => {
        return acc + cur
      }, 0)
      console.log('IS TOTAL SHARES', sumSharesInvestUser)
      return {
        id: user._id,
        sumAmountInvestUser,
        sumSharesInvestUser
      }
    })
    console.log(fetchedUserAndSumInvestments)

    if (!this.state.investments) return <h1> Please wait while loading...</h1>
    console.log('investments', this.state.investments)
    console.log('companies', this.state.companies)
    return (
      <section className="section">
        <div className="container is-fluid">
          <form className="form">
            <div className="field">
              <div className="control">
                <label className="label">UserName</label>
                <div className="select">
                  <select onChange={this.handleChange}>
                    {this.state.users.map((user) => (
                      <option
                        key={user._id}
                        value={user._id}
                      >{`${user.firstName} ${user.lastName}`}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="control">
                <label className="label">User ID</label>
                <div className="select">
                  <select>
                    <option>{this.state.userId}</option>
                  </select>
                </div>
              </div>
              <div className="control">
                <label className="label">Investments ID</label>
                <div className="select">
                  <select onChange={this.handleInvestId}>
                    {this.state.investments.map((investment, index) => (
                      <option key={index} value={index}>
                        {investment._id}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="control">
                <label className="label">Companies ID</label>
                <div className="select">
                  <select>
                    <option>{this.state.companyId}</option>
                  </select>
                </div>
              </div>
              <div className="control">
                <label className="label">Companies Name</label>
                <div className="select">
                  <select>
                    {this.state.companies.map((company, index) => (
                      <option key={index}>{company.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="control">
                <label className="label">Shares Per Company</label>
                <div className="select">
                  <select>
                    <option>{this.state.numberOfShares}</option>
                  </select>
                </div>
              </div>
              <div className="control">
                <label className="label">Amount Per Investment</label>
                <div className="select">
                  <select>
                    <option>{this.state.amount}</option>
                  </select>
                </div>
              </div>
              <div className="control">
                <label className="label">Total Amount</label>
                <div className="select">
                  <select>
                    {fetchedUserAndSumInvestments.map((user, index) => (
                      <option key={index}>
                        {user.sumAmountInvestUser}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="control">
                <label className="label">Total Shares</label>
                <div className="select">
                  <select>
                    {fetchedUserAndSumInvestments.map((user, index) => (
                      <option key={index}>{user.sumSharesInvestUser}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    )
  }
}

export default Investment
