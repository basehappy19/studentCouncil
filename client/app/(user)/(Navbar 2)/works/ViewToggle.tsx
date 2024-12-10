'use client'
import React, { useState } from 'react'
import { LayoutGrid, AlignJustify, Columns } from 'lucide-react'

const GridViewToggle = ({ onViewChange }: { onViewChange: (columns: number) => void;}) => {
    const [activeView, setActiveView] = useState(2);

    const viewOptions = [
        { 
            columns: 1, 
            icon: <AlignJustify size={24} />,
            label: 'แสดง 1 คอลัมน์'
        },
        { 
            columns: 2, 
            icon: <Columns size={24} />,
            label: 'แสดง 2 คอลัมน์'
        },
        { 
            columns: 3, 
            icon: <LayoutGrid size={24} />,
            label: 'แสดง 3 คอลัมน์'
        }
    ];

    const handleViewChange = (columns : number) => {
        setActiveView(columns);
        onViewChange(columns);
    };

    return (
        <div className="hidden md:flex items-center border-2 border-gray-300 space-x-2 bg-gray-100 rounded-lg p-1">
            {viewOptions.map((option) => (
                <button
                    key={option.columns}
                    onClick={() => handleViewChange(option.columns)}
                    className={`
                        flex items-center justify-center 
                        p-2 rounded-md 
                        h-12
                        transition-all duration-300 
                        ${activeView === option.columns 
                            ? 'bg-blue-500 text-white' 
                            : 'text-gray-600 hover:bg-gray-200'}
                    `}
                    aria-label={option.label}
                >
                    {option.icon}
                </button>
            ))}
        </div>
    );
};

export default GridViewToggle;