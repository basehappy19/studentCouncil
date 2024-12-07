"use client";
import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, TooltipItem, Chart, ChartEvent } from 'chart.js';
import { Department } from '@/app/interfaces/Department/Department';
import { Button } from '@/components/ui/button';

const AllBudgetChart = ({ departments }: { departments: Department[] }) => {
    const labels = departments.map(department => department.name);
    const data = departments.map(department => department.budget.total);
    const colors = departments.map(department => department.color);

    ChartJS.register(ArcElement, Tooltip, Legend);

    const [isChartVisible, setIsChartVisible] = useState(false);

    const toggleChartVisibility = () => {
        setIsChartVisible(!isChartVisible);
    };

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'งบประมาณ (บาท)',
                data: data,
                backgroundColor: colors,
                borderColor: colors,
                borderWidth: 1,
                hoverOffset: 4,
            },
        ],
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(value);
    };

    const options = {
        plugins: {
            tooltip: {
                titleFont: {
                    family: 'Prompt, sans-serif',
                },
                bodyFont: {
                    family: 'Prompt, sans-serif',
                },
                callbacks: {
                    label: function (context: TooltipItem<'pie'>) {
                        let label = context.label || '';
                        if (context.parsed !== null) {
                            label += `: ${formatCurrency(Number(context.parsed))}`;
                        }
                        return label;
                    }
                }
            },
            legend: {
                labels: {
                    font: {
                        family: 'Prompt, sans-serif',
                    },
                    generateLabels: function (chart: Chart<'pie'>) {
                        const datasets = chart.data.datasets;
                        const labels = chart.data.labels || [];
                        
                        return labels.map((label, i) => {
                            const meta = chart.getDatasetMeta(0);
                            const style = meta.controller.getStyle(i, false);
                            const value = datasets[0].data[i];
                            const formattedValue = formatCurrency(value);

                            return {
                                text: `${label}: ${formattedValue}`,
                                fillStyle: style.backgroundColor,
                                hidden: isNaN(value),
                                lineCap: style.borderCapStyle,
                                lineDash: style.borderDash,
                                lineDashOffset: style.borderDashOffset,
                                lineJoin: style.borderJoinStyle,
                                lineWidth: style.borderWidth,
                                strokeStyle: style.borderColor,
                                pointStyle: style.pointStyle,
                                rotation: style.rotation,
                                datasetIndex: 0,
                                index: i
                            };
                        });
                    },
                },
                onClick: function (e: ChartEvent, legendItem: any, legend: any) {
                    const index = legendItem.index;
                    const ci = legend.chart;
                    const meta = ci.getDatasetMeta(0);

                    meta.data[index]._view.hidden = !meta.data[index]._view.hidden;
                    ci.update();
                }
            }
        },
        scales: {
            y: {
                display: false,
            },
        },
    };

    return (
        <div className={`w-full md:w-1/2`}>
            <div>
                <h1 className='text-xl font-medium'>งบประมาณทุกฝ่าย</h1>
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
            {isChartVisible &&
                <div style={{
                    width: '100%',
                    maxWidth: '600px',
                    height: 'auto',
                    maxHeight: '600px',
                    margin: '0 auto',
                }}>
                    <Pie data={chartData} options={options} />
                </div>
            }
        </div>
    );
};

export default AllBudgetChart;
