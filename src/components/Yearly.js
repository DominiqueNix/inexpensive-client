import { useEffect, useState } from "react"
import { Nav } from "./Nav"
import apiURL from "../api";
import { useParams, useNavigate } from "react-router-dom";
import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';



export const Yearly = ({fetchUserData, userData, logout}) => {

    const [yealyTotals, setYearlyTotals] = useState("");
    const [dataSet, setdataSet] = useState(null);
    const [mostSpent, setMostSpent] = useState({month: "", price: 0});
    const [mostSaved, setMostSaved] = useState({month: "", price: 0});
    const [mostMade, setMostMade] = useState({month: "", price: 0});

    const { userId } = useParams();
    const navigate = useNavigate();

    async function logout(e){
        e.preventDefault();
        let url = `${apiURL}/logout/${userId}`
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

    async function fetchYearly(){
        let url =`${apiURL}/yearly/${userId}`
        const res = await fetch(url)
        const data = await res.json();
        setYearlyTotals(data)
            setdataSet([
              {
                  income: data[1][0],
                  expenses: data[0][0],
                  month: "Jan"
              },
              {
                  income: data[1][1],
                  expenses: data[0][1],
                  month: "Feb"
              },
              {
                  income: data[1][2],
                  expenses: data[0][2],
                  month: "Mar"
              },
              {
                  income: data[1][3],
                  expenses: data[0][3],
                  month: "Apr"
              },
              {
                  income: data[1][4],
                  expenses: data[0][4],
                  month: "May"
              },
              {
                  income: data[1][5],
                  expenses: data[0][5],
                  month: "Jun"
              },
              {
                  income: data[1][6],
                  expenses: data[0][6],
                  month: "Jul"
              },
              {
                  income: data[1][7],
                  expenses: data[0][7],
                  month: "Aug"
              },
              {
                  income: data[1][8],
                  expenses: data[0][8],
                  month: "Sep"
              },
              {
                  income: data[1][9],
                  expenses: data[0][9],
                  month: "Oct"
              },
              {
                  income: data[1][10],
                  expenses: data[0][10],
                  month: "Nov"
              },
              {
                  income: data[1][11],
                  expenses: data[0][11],
                  month: "Dec"
              }
          ]) 
        let mostSavedTemp = 0; 
        let mostSpentTemp = 0;
        let mostMadeTemp =0;
        let mostSavedMonth = ""; 
        let mostSpentMonth = "";
        let mostMadeMonth ="";
        for(let i=0; i < 12; i++){
            
            if(data[0][i] > mostSpentTemp){
                mostSpentTemp = data[0][i]
                mostSpentMonth = findMonth(i)
            }
            if(data[1][i] > mostMadeTemp){
                mostMadeTemp = data[1][i]
                mostMadeMonth = findMonth(i)
            }
            
            let currDiff = data[1][i] - data[0][i];
            if(currDiff > mostSavedTemp){
                mostSavedTemp = currDiff
                mostSavedMonth = findMonth(i)
            }
            
        }

        setMostMade({...mostMade,month:mostMadeMonth, price: mostMadeTemp});
        setMostSaved({...mostSaved,month:mostSavedMonth, price: mostSavedTemp});
        setMostSpent({...mostSpent, month:mostSpentMonth, price: mostSpentTemp})
    }

    function findMonth(num) {
        switch(num){
            case 0:
            return "January"
            break;
            case 1:
            return "February"
            break;
            case 2:
            return "March"
            break;
            case 3:
            return "April"
            break;
            case 4:
            return "May"
            break;
            case 5:
            return "June"
            break;
            case 6:
            return "July"
            break;
            case 7:
            return "August"
            break;
            case 8:
            return "September"
            break;
            case 9:
            return "October"
            break;
            case 10:
            return "November"
            break;
            case 11:
            return "December"
            break; 
        }
    }
    
    useEffect(()=>{
        fetchUserData(userId);
        fetchYearly()
    }, [])

    const chartSetting = {
    yAxis: [
        {
        label: 'Net Spending',
        },
    ],
    width: 500,
    height: 300,
    sx: {
        [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translate(-20px, 0)',
        },
    },
    };

    return(
        <>
            <Nav userData={userData} logout={logout} id={userId} navigate={navigate}/>
            <main className="yearlyPage d-flex flex-column align-items-center justify-content-center">
                { dataSet !== null ? (
                    <>
                  
                    
                    <section className="yearly-chart-container d-flex align-items-center justify-content-center">
                        <BarChart
                            dataset={dataSet}
                            xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                            series={[
                                { dataKey: 'income', label: 'Income'},
                                { dataKey: 'expenses', label: 'Expenses'},
                            ]}
                            {...chartSetting}
                        />  
                    </section>  
                    <div className="top-container d-flex flex-row justify-content-between">
                        <section className="mostSpent">
                            <h1 className=" text-center">You spent the most in {mostSpent.month} </h1>
                            <p className="text-center">${mostSpent.price.toFixed(2)}</p>
                        </section>
                        <section className="mostMade">
                        <h1 className="text-center">You made the most in {mostMade.month} </h1>
                        <p className="text-center">${mostMade.price.toFixed(2)}</p>
                        </section>
                        <section className="mostSaved">
                        <h1 className="text-center">You saved the most in {mostSaved.month} </h1>
                        <p className="text-center">${mostSaved.price.toFixed(2)}</p>
                        </section>  
                    </div>
                  </>
                ) : (
                    <h1>NO</h1>
                )

                }
                 
            </main>
    </>
    )
}