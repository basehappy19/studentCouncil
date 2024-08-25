import React from 'react';

const WorkStatsCard = ({ userId, works }) => {
    const postedWorks = works.filter(work => work.workPostBy === userId).length;

    const participatedWorks = works.filter(work => work.workOperator.includes(userId) && work.workPostBy !== userId).length;

    const totalUniqueWorks = postedWorks + participatedWorks;

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4">
                <h2 className="text-2xl font-bold text-white text-center">สถิติการทำงาน</h2>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4">
                <div className="text-center">
                    <div className="flex justify-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-12 h-12 text-indigo-500 icon icon-tabler icons-tabler-outline icon-tabler-briefcase"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" /><path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" /><path d="M12 12l0 .01" /><path d="M3 13a20 20 0 0 0 18 0" /></svg>
                    </div>
                    <p className="text-3xl font-bold text-gray-800">{postedWorks}</p>
                    <p className="text-sm text-gray-600">งานที่โพสต์เอง</p>
                </div>
                <div className="text-center">
                    <div className="flex justify-center mb-2">
                        <svg className="w-12 h-12 text-purple-500 transition duration-75 dark:text-custom-gray-400 group-hover:text-custom-gray-900 dark:group-hover:text-custom-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                        </svg>
                    </div>
                    <p className="text-3xl font-bold text-gray-800">{participatedWorks}</p>
                    <p className="text-sm text-gray-600">งานที่มีส่วนร่วม</p>
                </div>
            </div>
            <div className="bg-gray-100 p-4">
                <p className="text-center text-sm text-gray-600">
                    คุณมีส่วนร่วมทั้งหมด {totalUniqueWorks} งาน
                </p>
            </div>
        </div>
    );
};

export default WorkStatsCard;
