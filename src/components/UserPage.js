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

export const UserPage = ({logout, fetchUserData, setCategories, updating, setUpdating, total, success, setSuccess, userData, expenses, income, totalExpPrice, totalIncPrice, categories, catAndTot}) => {

    const { id } = useParams();
    const navigate = useNavigate();


    const [addTrans, setAddTrans] = useState({
        type: "income",
        name:"", 
        price: "",
        date: dayjs().format('YYYY-MM-DD'),
        category: "",
        userId: id
    })

    //fetchs logout route for a user
    async function logout(e){
        e.preventDefault();
        let url = `${apiURL}/logout/${id}`
        try{
            const putTrans = await fetch(url, {
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
        fetchUserData(id);
    }, [success, updating])

    return(
        
        <main className="userPage">
        {userData ? (
             <> 
             { userData.loggedIn === 1 ? ( 
            <>
                <Nav userData={userData} logout={logout} id={id} navigate={navigate}/>
                <div className="d-flex main-content justify-content-around mx-auto">
                <Expenses title={"Income"} expenses={income} categories={categories} updating={updating} setUpdating={setUpdating} id={id} success={success} setSuccess={setSuccess}/>

                <div className="middle-wrapper d-flex flex-column ">
                  <section className="total-wrapper d-flex align-items-center justify-content-center">
                    <div className="total d-flex justify-content-between">                    
                        <section className="total-balace d-flex flex-column align-items-center justify-content-center p-2">
                            <h1 className="net-bal">Total Balance</h1>
                            { total !== 0 && (
                                <p className="display-6" style={total < 0 ? {color: 'red'} : total < 100 ? {color: "#e57842"}:{color: 'green'}}>{total.toFixed(2)}</p>
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
                            innerRadius:30,
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