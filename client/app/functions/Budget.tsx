export const AllBudget = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_APP_API_URL + "/budget",{ next: { revalidate: 0 } });
    return response.json();
};

export const Budget = async (id: number) => {
    const response = await fetch(process.env.NEXT_PUBLIC_APP_API_URL + "/budget/"+id,{ next: { revalidate: 0 } });
    return response.json();
};

export const IncomeExpenseStatistics = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_APP_API_URL + "/statistics/budget/income_expense",{ next: { revalidate: 0 } });
    return response.json();
};

export const IncomeExpenseStatisticsByTime = async (filterTime) => {
    const response = await fetch(process.env.NEXT_PUBLIC_APP_API_URL + "/statistics/budget/all/income_expense",{ 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(filterTime)
     });
    return response.json();
};

export const IncomeExpenseStatisticsById = async (id: number) => {
    const response = await fetch(process.env.NEXT_PUBLIC_APP_API_URL + "/statistics/budget/income_expense/"+id,{ next: { revalidate: 0 } });
    return response.json();
};

  
  
    
  
  