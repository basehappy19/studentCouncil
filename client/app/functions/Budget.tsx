'use server'

export const AllBudget = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_APP_API_URL + "/budget",{ next: { revalidate: 0 } });
    return response.json();
};

export const getBudgetInDepartment = async (id: number) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/budget/department?id=${id.toString()}`,{ next: { revalidate: 0 } });
        if(!res.ok) {
            throw new Error(res.statusText);
        }
        return res.json();
    } catch (e : unknown) {
        if (e instanceof Error) {
            console.error(`Error Fetch Budget In Department: ${e.message}`);
            throw new Error("Failed to Budget In Department");
        } else {
            console.error('An unknown error occurred');
            throw new Error("Failed to Budget In Department");
        }
    }
};

export const getIncomeExpenseStatistics = async ({month,year}:{month: string | undefined, year: string | undefined}) => {
    try {
        const params = new URLSearchParams();
        if (month) params.append("month", month.toString());
        if (year) params.append("year", year.toString());
        const url = `${process.env.NEXT_PUBLIC_APP_API_URL}/budget/statistics/income_expense?${params.toString()}`;

        const res = await fetch(url,{ next: { revalidate: 0 } });
        if(!res.ok) {
            throw new Error(res.statusText);
        }
        return res.json();
    } catch (e : unknown) {
        if (e instanceof Error) {
            console.error(`Error Fetch IncomeExpenseStatistics: ${e.message}`);
            throw new Error("Failed to IncomeExpenseStatistics");
        } else {
            console.error('An unknown error occurred');
            throw new Error("Failed to IncomeExpenseStatistics");
        }
    }
};

export const IncomeExpenseStatisticsById = async (id: number) => {
    const response = await fetch(process.env.NEXT_PUBLIC_APP_API_URL + "/statistics/budget/income_expense/"+id,{ next: { revalidate: 0 } });
    return response.json();
};

  
  
    
  
  