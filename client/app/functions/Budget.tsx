export const AllBudget = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_APP_API_URL + "/budget",{ next: { revalidate: 0 } });
    return response.json();
};

export const getBudgetInDepartment = async (id: number) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/budget/department?id=${id}`,{ next: { revalidate: 0 } });
        if(!res.ok) {
            throw new Error(res.statusText);
        }
        return res.json();
    } catch (e : unknown) {
        if (e instanceof Error) {
            console.error(`Error Fetch Budget In Department:: ${e.message}`);
            throw new Error("Failed to Budget In Department");
        } else {
            console.error('An unknown error occurred');
            throw new Error("Failed to Budget In Department");
        }
    }
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

  
  
    
  
  