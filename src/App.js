import './App.css';
import {Route, BrowserRouter as Router, Routes} from "react-router-dom"
import React, {useState, useEffect} from "react"
import { useParams} from "react-router-dom";
import apiURL from './api';
import { UserPage } from './components/UserPage';
import { Home } from './components/Home';
import { Yearly } from './components/Yearly';
import dayjs from "dayjs";

function App() {

  const [success, setSuccess] = useState(false)
  const [userData, setUserData] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalExpPrice, setTotalExpPrice] = useState(0);
  const [totalIncPrice, setTotalIncPrice] = useState(0);
  const [categories, setCategories] = useState([]);
  const [catAndTot, setCatandTot] = useState([])
  const [updating, setUpdating] = useState(false)

//fetch user data and sets the satae for all categoies for a user, total net for a user, total expenses for a user, total income for a user
  async function fetchUserData(id){
      let url =`${apiURL}/user/${id}`
      const res = await fetch(url)
      const data = await res.json();

      let cat = [];
      let expArr = [];
      let incArr = [];
      let totOut = 0;
      let totIn = 0
      for(let i=0; i < data.expenses.length; i++){
          if(!cat.includes(data.expenses[i].category)){
              cat.push(data.expenses[i].category)
          }
          if(data.expenses[i].type==="expense"){
              expArr.push(data.expenses[i])
              setExpenses(expArr)
              totOut += data.expenses[i].price
              setTotal(totOut)
          } else {
              incArr.push(data.expenses[i]);
              setIncome(incArr)
              totIn += data.expenses[i].price
              setTotal(totIn)
          }
      }
      setCategories(cat)
      setTotalExpPrice(totOut)
      setTotalIncPrice(totIn)
      setTotal(totIn-totOut)
      setUserData(data)

      let catAndTot = [];

      for(let i=0; i < cat.length; i++){
          let obj = {
              value: 0,
              label: ""
          }

          for(let j=0; j< data.expenses.length; j++){
              if(data.expenses[j].category === cat[i] && data.expenses[j].type === "expense"){
                  obj.value += data.expenses[j].price
                  obj.label = cat[i]
              }
          }
          
          if(obj.label !== ""){
              catAndTot.push(obj);
          }
          
      }
      setCatandTot(catAndTot);
  }


  return (
    <>
      <Router>
        <Routes>
          <Route path='/'element={<Home/>}/>
          <Route path='/user/:id' element={<UserPage success={success} setSuccess={setSuccess} userData={userData} setUserData={setUserData} expenses={expenses}income={income} total={total} totalExpPrice={totalExpPrice} totalIncPrice={totalIncPrice} categories={categories} catAndTot={catAndTot} updating={updating} setUpdating={setUpdating} setCategories={setCategories} fetchUserData={fetchUserData}/>}/>
          <Route path='yearly/:userId' element={<Yearly  userData={userData} fetchUserData={fetchUserData}/>} />
        </Routes>
      </Router>
     
    </>
  );
}

export default App;
