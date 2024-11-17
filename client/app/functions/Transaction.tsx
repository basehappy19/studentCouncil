export const TransactionById = async (BudgetId: number) => {
    const response = await fetch(process.env.NEXT_PUBLIC_APP_API_URL + "/transaction/"+BudgetId,{ next: { revalidate: 0 } });
    return response.json();
};

export const AddTransaction = async (transactionData) => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_APP_API_URL + "/transaction",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(transactionData),
        });

        if (!response.ok) {
            throw new Error('Failed to AddTransaction');
        }

        return await response.json();
    } catch (err) {
        console.error('Error AddTransaction:', err);
        throw err;
    }
};

export const UpdateTransaction = async (id : number, transactionData) => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_APP_API_URL + "/transaction/"+id,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(transactionData),
        });

        if (!response.ok) {
            throw new Error('Failed to UpdateTransaction');
        }

        return await response.json();
    } catch (err) {
        console.error('Error UpdateTransaction:', err);
        throw err;
    }
};

export const RemoveTransaction = async (id : number) => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_APP_API_URL + "/transaction/"+id,{
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to RemoveTransaction : ${response.status} - ${errorText}`);
        }

        return await response.json();
    } catch (err) {
        console.error('Error RemoveTransaction:', err);
        throw err;
    }
};