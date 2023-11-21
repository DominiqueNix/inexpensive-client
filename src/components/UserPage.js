import React, {useState, useEffect} from "react"
import { useParams, useNavigate } from "react-router-dom";
import apiURL from "../api";
import { Nav } from "./Nav";
import { Expenses } from "./Expenses";
import { AddTransaction } from "./AddTransaction";
import "bootstrap-icons/font/bootstrap-icons.css";
import dayjs from "dayjs";
import { PieChart } from '@mui/x-charts/PieChart'
import {BarChart} from '@mui/x-charts/BarChart'

export const UserPage = () => {

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
    const { id } = useParams();
    const navigate = useNavigate();

    //Monthly view refactor
        //have array called monexp 
        //create state for each month
        //create over total fpor each month
        //create state forr each
        //in fetch call set anny array of objects to each month delepending on date of tranaction

        //when view changes set the month expenses equal to the month picked (switch statement )
    // const [view, setView] = useState("");
    // const months = ["Jan", "Feb", "Mar","Apr" ,"May", "Jun", "Jul", "Aug", "Sep","Oct","Nov", "Dec", "Year"];


    const [addTrans, setAddTrans] = useState({
        // id: 0, 
        type: "",
        name:"", 
        price: "",
        date: dayjs().format('YYYY-MM-DD'),
        category: "",
        userId: id
    })

    async function fetchUserData(){
        const res = await fetch(`${apiURL}/user/${id}`)
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
    //  if(userData){
    //     console.log(userData)
    //  }

    async function logout(e){
        e.preventDefault();
        try{
            const putTrans = await fetch(`${apiURL}/logout/${id}`, {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json'
                }
            })
           
            navigate('/')
        }catch(err){
            console.log(err)
        }
        
    }

    useEffect(()=>{
        fetchUserData();
    }, [success, updating])

    return(
        
        <main className="userPage">
        {userData ? (
             <> 
             { userData.loggedIn === 1 ? ( 
            <>
            {/* Pass through username and id */}
                <Nav userData={userData} logout={logout}/>

                {/* do a ternary that sees if the  */}


                <div className="d-flex main-content justify-content-around mx-auto">
                  {/* pass through an object of expenses */}


                <Expenses title={"Income"} expenses={income} categories={categories} updating={updating} setUpdating={setUpdating} id={id} success={success} setSuccess={setSuccess}/>

                <div className="middle-wrapper d-flex flex-column ">
                  <section className="total-wrapper d-flex align-items-center justify-content-center">
                    <div className="total d-flex justify-content-around">                    
                        <section className="total-balace d-flex flex-column align-items-center justify-content-center p-2">
                            <h1 className="display-6">Total Balance</h1>
                            { total !== 0 && (
                                <p className="display-6">{total.toFixed(2)}</p>
                            )}
                             { totalIncPrice !== 0 && (
                                <p><i className="bi bi-arrow-up-circle"></i> Income: ${totalIncPrice.toFixed(2)}</p>
                            )}
                             { totalExpPrice !== 0 && (
                                <p><i className="bi bi-arrow-down-circle"></i> Expenses: ${totalExpPrice.toFixed(2)}</p>
                            )}
                        </section>
                        <section className="budget">
                        <BarChart
                            xAxis={[{scaleType: 'band',data: ['Income', 'Expenses'] }]}
                            series={[{ data: [totalIncPrice, totalExpPrice] }]} 
                            width= {300}
                            height= {300}
                        />
                        </section>
                    </div>
                </section>
                <AddTransaction addTrans={addTrans} setAddTrans={setAddTrans} setSuccess={setSuccess} success={success} id={id} categories={categories} setCategories={setCategories}/>
                <section className="chart d-flex justify-content-center align-items-center flex-column">
                <h1 className="display-6 pt-4">Spending breakdown</h1>
                <PieChart
                    series={[
                            {
                            data: catAndTot,
                            innerRadius: 30,
                            outerRadius: 100,
                            paddingAngle: 0,
                            cornerRadius: 5,
                            startAngle: -180,
                            endAngle: 180,
                            // cx: 150,
                            // cy: 150,
                            }
                        ]}
                        />
                </section>  
                </div>
                

                {/* pass through an object of income */}
                <Expenses title={"Expenses"} expenses={expenses} categories={categories} updating={updating} setUpdating={setUpdating} id={id} success={success} setSuccess={setSuccess}/>  
                </div>





                
            </>
             ) : (
            <section className="d-flex justify-content-center align-items-center">
            <div className="card" style={{width: "18rem"}}>
                <h1 className="display-2 text-center"><i class="bi bi-exclamation-triangle"></i></h1>
                <div className="card-body">
                    <p className="card-text">Must be logged in to view this page. Plase go home and login first.</p>
                </div>
                <div className="mx-auto">
                   <button onClick={() => navigate("/")} className="btn btn-primary">GO HOME</button> 
                </div>
            </div>
            
            </section>
           )}
           </>
        ) : (
            <div className="text-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )} 
        </main>
    )
}