"use client";
import CheckInTable from "@/components/PartyList/CheckInTable";
import { AllCheckIn } from "@/app/functions/CheckIn";
import NavbarPink from "@/app/layouts/NavbarSecondary";
import React, { FC, useEffect, useState } from "react";
import { CheckInData } from "@/app/interfaces/PartyList/checkIn";

const PartyListTrack: FC = () => {
  const [checkInData, setCheckInData] = useState<CheckInData[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  const handleSearch = (startDate: string, endDate: string, userId: string) => {
    setStartDate(startDate);
    setEndDate(endDate);
    setUserId(userId);
  };

  const fetchData = async () => {
    const filterData = {
      startDate: startDate,
      endDate: endDate,
      userId: userId,
    };
    await AllCheckIn(filterData)
      .then((res) => {
        setCheckInData(res as CheckInData[]); 
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate, userId]);

  return (
    <div className="bg-custom-background pb-5">
      <NavbarPink />
      <section className="bg-custom-section-primary p-10">
        <div className="w-full max-w-[600px] mx-auto">
          <h1
            className="text-center text-custom-white text-5xl font-semibold w-full"
            style={{
              textShadow:
                "0 1px 0 var(--color-text-shadow),0 1px 0 var(--color-text-shadow-1),0 3px 0 var(--color-text-shadow-3),0 0 0 var(--color-text-shadow-4),0 1px 0 var(--color-text-shadow-5),0 5px 0 var(--color-text-shadow-6),0 3px 0 var(--color-text-shadow-7),0 0 0 var(--color-text-shadow-8),0 0 2px var(--color-text-shadow-9),0 -1px 5px var(--color-text-shadow-10),0 3px 3px var(--color-text-shadow-11),0 6px 4px var(--color-text-shadow-12),0 8px 8px var(--color-text-shadow-13)",
            }}
          >
            ติดตามการเข้าทำงาน
          </h1>
        </div>
      </section>
      <section>
        <div className="container mx-auto px-4">
          {checkInData.length > 0 ? (
            <CheckInTable checkInData={checkInData} />
          ) : (
            <div>loading...</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default PartyListTrack;
