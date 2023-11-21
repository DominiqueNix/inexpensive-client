import * as React from 'react';
import { SingleExpense } from './SingleExpense';


export const Expenses =({expenses, title, categories, updating, setUpdating, id, success, setSuccess}) =>{

    return(
        <main className="expenses">
            <h1 className="display-4 text-center">{title}</h1>
            {
                expenses.map(exp => (
                    <SingleExpense key={exp.id} exp={exp} updating={updating} setUpdating={setUpdating} categories={categories} title={title} id={id} setSuccess={setSuccess} success={success}/>
                ))                
            }
        </main>
    )
}