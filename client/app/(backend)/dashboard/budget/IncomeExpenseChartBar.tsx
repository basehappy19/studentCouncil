'use client'
import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale, TooltipItem, ChartOptions } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Budget } from '@/app/interfaces/Budget/Budget';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

const IncomeExpenseChartBar = ({ budgets }: {
    budgets: {
        budgetData: Budget
        income: number,
        expense: number,
        balance: number,
    }[]
}) => {
    const currentDate = new Date();
    const [month, setMonth] = useState((currentDate.getMonth() + 1).toString());
    const [year, setYear] = useState(currentDate.getFullYear().toString());
    const [isChartVisible, setIsChartVisible] = useState(false);

    const toggleChartVisibility = () => {
        setIsChartVisible(!isChartVisible);
    };

    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());

            if (month && month.trim() !== '') {
                params.set('month', month); 
            } else {
                params.delete('month'); 
            }
            if (year && year.trim() !== '') {
                params.set('year', year); 
            } else {
                params.delete('year'); 
            }

            router.push(`${pathname}?${params.toString()}`, { scroll: false });
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [month, year, router, pathname, searchParams]);

    const data = {
        labels: budgets.map(item => item.budgetData.title),
        datasets: [
            {
                label: 'รายรับ',
                data: budgets.map(item => item.income),
                backgroundColor: '#22cfcf',
                yAxisID: 'y-axis-1'
            },
            {
                label: 'รายจ่าย',
                data: budgets.map(item => item.expense),
                backgroundColor: '#ff4069',
                yAxisID: 'y-axis-1'
            },
            {
                label: 'คงเหลือ',
                data: budgets.map(item => item.balance),
                backgroundColor: '#059bff',
                yAxisID: 'y-axis-1'
            }
        ]
    };

    const options: ChartOptions<'bar'> = {
        scales: {
            x: {
                stacked: false,
            },
            'y-axis-1': { 
                type: 'linear', 
                position: 'left',
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'จำนวนเงิน', 
                },
                ticks: {
                    callback: function (value: string | number) {
                        const numericValue = typeof value === 'string' ? parseFloat(value) : value;
                        if (!isNaN(numericValue)) {
                            return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(numericValue);
                        }
                        return value; 
                    }
                }
            },
        },
        plugins: {
            tooltip: {
                titleFont: {
                    family: 'Prompt, sans-serif',
                },
                bodyFont: {
                    family: 'Prompt, sans-serif',
                },
                callbacks: {
                    label: function (context: TooltipItem<'bar'>) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(context.parsed.y);
                        }
                        return label;
                    }
                }
            }
        }
    };

    // Handle month change
    const handleMonthChange = (value: string) => {
        setMonth(value);
    };

    // Handle year change
    const handleYearChange = (value: string) => {
        setYear(value);
    };

    // Increment month
    const incrementMonth = () => {
        setMonth(prev => {
            let newMonth = parseInt(prev) + 1;
            if (newMonth > 12) newMonth = 1;
            return newMonth.toString();
        });
    };

    // Decrement month
    const decrementMonth = () => {
        setMonth(prev => {
            let newMonth = parseInt(prev) - 1;
            if (newMonth < 1) newMonth = 12;
            return newMonth.toString();
        });
    };

    return (
        <div className={`md:w-full`}>
            <div className="space-y-4 mb-2">
                <div>
                    <h1 className='text-xl font-medium'>
                        งบประมาณในเดือน {new Date(parseInt(year), parseInt(month) - 1).toLocaleString('th-TH', { month: 'long' })} ปี {(parseInt(year) + 543).toString()}
                    </h1>
                    <Button
                        onClick={toggleChartVisibility}
                        variant="outline"
                        className="flex items-center space-x-2"
                    >
                        {isChartVisible ? (
                            <>
                                <span>ย่อ</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-flex icon icon-tabler icons-tabler-outline icon-tabler-caret-up"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 14l-6 -6l-6 6h12" /></svg>
                            </>
                        ) : (
                            <>
                                <span>ขยาย</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-flex icon icon-tabler icons-tabler-outline icon-tabler-caret-down"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6 10l6 6l6 -6h-12" /></svg>
                            </>
                        )}
                    </Button>
                </div>
                {isChartVisible && (
                    <>
                        <div className="flex items-center space-x-2">
                            <Button onClick={decrementMonth}>-</Button>
                            <Select value={month} onValueChange={handleMonthChange}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="เลือกเดือน" />
                                </SelectTrigger>
                                <SelectContent>
                                    {[...Array(12)].map((_, i) => (
                                        <SelectItem key={i + 1} value={(i + 1).toString()}>
                                            {new Date(0, i).toLocaleString('th-TH', { month: 'long' })}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Button onClick={incrementMonth}>+</Button>
                            <Select value={year} onValueChange={handleYearChange}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="เลือกปี" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="2024">2567</SelectItem>
                                    <SelectItem value="2025">2568</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Bar data={data} options={options} />
                    </>
                )}
            </div>
        </div>
    )
}

export default IncomeExpenseChartBar;
