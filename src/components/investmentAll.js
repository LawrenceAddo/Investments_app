import Axios from 'axios'
import React, { useState, useEffect } from 'react'

const Investment = () => {
  const [investments, setInvestments] = useState([])
  const [users, setUsers] = useState([])
  const [companies, setCompanies] = useState([])
  const [userId, setUserId] = useState('')
  const [companyId, setCompanyId] = useState('')
  const [numberOfShares, setNumberOfShares] = useState(
    'SHOWS THE NUMBER OF SHARES'
  )
  const [amount, setAmount] = useState('SHOWS THE AMOUNT')

  const investmentsList = async (userId) => {
    const { data } = await Axios.get(`/api/investments/${userId}`)
    setInvestments(data)
    setUserId(userId)
  }

  const usersList = async () => {
    const { data } = await Axios.get('/api/users')
    setUsers(data)
  }

  const companiesList = async (companyId) => {
    const { data } = await Axios.get(`/api/companies/${companyId}`)
    setCompanies([data])
    setCompanyId(companyId)
  }

  useEffect(
    () => {
      investmentsList(userId)
      usersList()
      companiesList(companyId)
    },
    [userId],
    [companyId]
  )

  const handleChange = (e) => {
    setUserId(e.target.value)
    investmentsList(e.target.value)
  }

  const handleInvestId = (e) => {
    const index = e.target.value
    const selectedInvestment = investments[index]
    console.log('event', index)
    console.log('selected Investment', selectedInvestment)

    setCompanyId(selectedInvestment._companyId)
    setNumberOfShares(selectedInvestment.numberOfShares)
    setAmount(selectedInvestment.amount)
    companiesList(selectedInvestment._companyId)
  }

  const investUser = investments.filter(
    (investment) => investment._userId === userId
  )
  console.log('IS INVESTMENT USER', investUser)

  const amountInvestUser = investUser.map((investUser) => investUser.amount)
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

  if (investments.length === 0 || companies.length === 0) {
    return <h1> Please wait while loading...</h1>
  }
  console.log('investments', investments)
  console.log('companies', companies)
  console.log('users', users)

  return (
    <section className="section">
      <div className="container is-fluid">
        <form className="form">
          <div className="field">
            <div className="control">
              <label className="label">UserName</label>
              <div className="select">
                <select onChange={handleChange}>
                  {users.map((user) => (
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
                  <option>{userId}</option>
                </select>
              </div>
            </div>
            <div className="control">
              <label className="label">Investments ID</label>
              <div className="select">
                <select onChange={handleInvestId}>
                  {investments.map((investment, index) => (
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
                  <option>{companyId}</option>
                </select>
              </div>
            </div>
            <div className="control">
              <label className="label">Companies Name</label>
              <div className="select">
                <select>
                  {companies.map((company) => (
                    <option key={company._id}>{company.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="control">
              <label className="label">Shares Per Company</label>
              <div className="select">
                <select>
                  <option>{numberOfShares}</option>
                </select>
              </div>
            </div>
            <div className="control">
              <label className="label">Amount Per Investment</label>
              <div className="select">
                <select>
                  <option>{amount}</option>
                </select>
              </div>
            </div>
            <div className="control">
              <label className="label">Total Amount</label>
              <div className="select">
                <select>
                  <option>{sumAmountInvestUser}</option>
                </select>
              </div>
            </div>
            <div className="control">
              <label className="label">Total Shares</label>
              <div className="select">
                <select>
                  <option>{sumSharesInvestUser}</option>
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Investment
