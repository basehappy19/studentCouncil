export const TransactionById = async (BudgetId: string) => {
    const response = await fetch(process.env.NEXT_PUBLIC_APP_API + "/transaction/"+BudgetId,{ next: { revalidate: 0 } });
    return response.json();
};

export const AddTransaction = async (transactionData) => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_APP_API + "/transaction",{
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

export const UpdateTransaction = async (id,transactionData) => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_APP_API + "/transaction/"+id,{
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

export const RemoveTransaction = async (id) => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_APP_API + "/transaction/"+id,{
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to RemoveTransaction');
        }

        return await response.json();
    } catch (err) {
        console.error('Error RemoveTransaction:', err);
        throw err;
    }
};