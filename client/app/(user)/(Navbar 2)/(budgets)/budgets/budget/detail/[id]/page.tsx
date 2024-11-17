// export async function generateMetadata(props: { params : Promise<{ id: string }> }) {
//   const params = await props.params
//   const id = params.id
//   const budget: interfaceBudget[] = await getBudget(id);

//   return {
//     title: `งบประมาณ${budget.budgetTitle} ${process.env.NEXT_PUBLIC_APP_TITLE}`,
//     description:
//       "เพื่อทำสภาให้โปร่งใส นักเรียนทุกคนสามารถติดตามงบประมาณเราได้ที่นี้",
//     openGraph: {
//       title: `งบประมาณ${budget.budgetTitle} ${process.env.NEXT_PUBLIC_APP_TITLE}`,
//       description:
//         "เพื่อทำสภาให้โปร่งใส นักเรียนทุกคนสามารถติดตามงบประมาณเราได้ที่นี้",
//     },
//   };
// }

async function BudgetInDepartment(props: { params : Promise<{ id: string }> }) {
  const params = await props.params
  const id = params.id

  return (
    <div className="min-h-screen
        dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 
        bg-gradient-to-br from-blue-50 via-yellow-50 to-pink-50">
      <section className="bg-custom-section-primary p-10">
        <div className="container mx-auto px-4">
          <div className="w-full max-w-[600px] mx-auto">
            <div className="text-start">
              <h1
                style={{
                  textShadow:
                    "0 1px 0 var(--color-text-shadow),0 1px 0 var(--color-text-shadow-1),0 3px 0 var(--color-text-shadow-3),0 0 0 var(--color-text-shadow-4),0 1px 0 var(--color-text-shadow-5),0 5px 0 var(--color-text-shadow-6),0 3px 0 var(--color-text-shadow-7),0 0 0 var(--color-text-shadow-8),0 0 2px var(--color-text-shadow-9),0 -1px 5px var(--color-text-shadow-10),0 3px 3px var(--color-text-shadow-11),0 6px 4px var(--color-text-shadow-12),0 8px 8px var(--color-text-shadow-13)",
                }}
                className="text-custom-white text-5xl font-semibold w-full"
              >
                ติดตามงบประมาณ
              </h1>
            </div>
            <div className="text-end">
              <h1
                style={{
                  textShadow:
                    "0 1px 0 var(--color-text-shadow),0 1px 0 var(--color-text-shadow-1),0 3px 0 var(--color-text-shadow-3),0 0 0 var(--color-text-shadow-4),0 1px 0 var(--color-text-shadow-5),0 5px 0 var(--color-text-shadow-6),0 3px 0 var(--color-text-shadow-7),0 0 0 var(--color-text-shadow-8),0 0 2px var(--color-text-shadow-9),0 -1px 5px var(--color-text-shadow-10),0 3px 3px var(--color-text-shadow-11),0 6px 4px var(--color-text-shadow-12),0 8px 8px var(--color-text-shadow-13)",
                }}
                className="text-custom-white text-5xl font-semibold w-full"
              >
                ฝ่าย{budget.budgetTitle}
              </h1>
            </div>
          </div>
        </div>
      </section>
      <section className="p-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row flex-wrap justify-center">
            <div className={`w-full lg:w-1/2 mx-auto text-center`}>
              <div
                className={`mb-3 flex justify-center mx-auto w-[250px] h-[250px] border border-[#ccc] rounded-[50%] align-middle items-center`}
                style={{ backgroundColor: budget.budgetColor }}>
                <div className="text-5xl text-custom-white font-semibold">
                  {budget.budgetTitle}
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 mx-auto text-center items-start">
              <div className="mt-12">
                {/* <div className={`InfoAmountText`}>
                จำนวน{" "}
                <span className={`${budget[0].budgetAmountColor}`}>
                  {budget[0].budgetAmount}
                </span>{" "}
                บาท
              </div> */}
                <hr />
                <div className="text-2xl mt-4">
                  หน้าที่ของฝ่าย{budget.budgetTitle}
                </div>
                <div className="text-start text-custom-gray">
                  {budget.budgetDescription}
                </div>
              </div>
            </div>
          </div>
          <hr />
        </div>
        <div className="container mx-auto py-8 px-4">
          <h1 className="text-center font-semibold mb-8 text-3xl">
            บัญชีงบประมาณฝ่าย{budget.budgetTitle}
          </h1>
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
                    </tr>
                  ))
                ) : (
                  <tr className="bg-custom-white border-b border-custom-light-2 hover:bg-gray-300">
                    <td colSpan={6} className="text-center py-4">ไม่มีข้อมูล</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BudgetInDepartment;
