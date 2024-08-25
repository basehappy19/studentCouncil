const TransactionTable = ({ handleRemove, transaction, setIsOpenEdit, setDataSelect, isOpenEdit }) => {

    return (

        <div className="bg-custom-white relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th className="px-6 py-3" scope="col">
                            #
                        </th>
                        <th className="px-6 py-3" scope="col">
                            หัวข้อ
                        </th>
                        <th className="px-6 py-3" scope="col">
                            คำอธิบาย
                        </th>
                        <th className="px-6 py-3" scope="col">
                            จำนวน
                        </th>
                        <th className="text-center px-6 py-3" scope="col">
                            ประเภท
                        </th>
                        <th className="px-6 py-3" scope="col">
                            วันที่
                        </th>
                        <th className="px-6 py-3" scope="col">
                            แก้ไข / ลบ
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {transaction && transaction.length > 0 ? (
                        transaction.map((tran, index) => (
                            <tr
                                className="bg-custom-white border-b border-custom-light-2 hover:bg-gray-300"
                                key={tran.id}
                            >
                                <td className="px-6 py-4">{index + 1}</td>
                                <th scope="row" className="px-6 py-4">
                                    {tran.transactionTitle}
                                </th>
                                <td className="px-6 py-4">
                                    {tran.transactionDescription}
                                </td>
                                <td className="px-6 py-4">
                                    {tran.transactionAmount}
                                </td>
                                <td
                                    className="px-6 py-4"
                                    style={{
                                        backgroundColor:
                                            tran.transactionType === 1 ? "#74e5a1" : "#eb344f",
                                    }}
                                >
                                    {tran.transactionType === 1 ? (
                                        <div className="font-bold text-center text-custom-black">
                                            รายรับ
                                        </div>
                                    ) : (
                                        <div className="font-bold text-center text-custom-black">
                                            รายจ่าย
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    {new Date(
                                        new Date(tran.createdAt).getTime()
                                    ).toLocaleDateString("th-TH", {
                                        year: "numeric",
                                        month: "long",
                                        day: "2-digit",
                                    })}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-x-3">
                                        <button
                                            onClick={() => {
                                                setIsOpenEdit(!isOpenEdit);
                                                setDataSelect(tran.id);
                                            }}
                                            className=""
                                        >
                                            แก้ไข
                                        </button>
                                        <button onClick={() => handleRemove(tran.id, tran.transactionTitle)} className="">
                                            ลบ
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr className="bg-custom-white border-b border-custom-light-2 hover:bg-gray-300">
                            <td colSpan={7} className="text-center py-4">ไม่มีข้อมูล</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default TransactionTable