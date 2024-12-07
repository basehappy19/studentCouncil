import { getBudgetInDepartment } from '@/app/functions/Budget'
import { Budget } from '@/app/interfaces/Budget/Budget'
import TransactionZone from './TransactionZone'


const TransactionInBudget = async (props: { params: Promise<{ id: string }> }) => {
    const params = await props.params
    const id = parseInt(params.id)
    const budget : Budget = await getBudgetInDepartment(id)
    
    return (
        <TransactionZone budget={budget} />
    )
}

export default TransactionInBudget