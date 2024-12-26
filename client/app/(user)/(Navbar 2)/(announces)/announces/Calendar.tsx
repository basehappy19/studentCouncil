'use client'
import React, { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, addDays, startOfWeek, endOfWeek } from 'date-fns';
import { th } from 'date-fns/locale';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from '@/lib/utils';
import { Event, ViewMode } from '@/app/interfaces/Event/Event';

const Calendar = ({events}:{events: Event[]}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('month');
  const [isEventsDialogOpen, setIsEventsDialogOpen] = useState(false);

  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(new Date(event.date), date));
  };

  const getEventsForWeek = (date: Date) => {
    const start = startOfWeek(date, { weekStartsOn: 0 });
    const end = endOfWeek(date, { weekStartsOn: 0 });
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= start && eventDate <= end;
    });
  };

  const getEventsForMonth = (date: Date) => {
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= start && eventDate <= end;
    });
  };

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });


  const getEventTypeColor = (type: Event['eventType']) => {
    switch (type) {
      case 'MEETING':
        return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20';
      case 'ACTIVITY':
        return 'bg-green-500/10 text-green-500 hover:bg-green-500/20';
      case 'IMPORTANT':
        return 'bg-red-500/10 text-red-500 hover:bg-red-500/20';
      case 'WORK':
        return 'bg-purple-500/10 text-purple-500 hover:bg-purple-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20';
    }
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsDialogOpen(true);
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setIsEventsDialogOpen(true);
  };

  const handleNavigate = (direction: 'prev' | 'next') => {
    switch (viewMode) {
      case 'day':
        setCurrentDate(direction === 'prev' ? addDays(currentDate, -1) : addDays(currentDate, 1));
        break;
      case 'week':
        setCurrentDate(direction === 'prev' ? addDays(currentDate, -7) : addDays(currentDate, 7));
        break;
      case 'month':
        setCurrentDate(direction === 'prev' ? subMonths(currentDate, 1) : addMonths(currentDate, 1));
        break;
    }
  };

  const renderDateTitle = () => {
    switch (viewMode) {
      case 'day':
        return format(currentDate, 'd MMMM ', { locale: th }) +
          (parseInt(format(currentDate, 'yyyy')) + 543);
      case 'week':
        const startDate = startOfWeek(currentDate, { weekStartsOn: 0 });
        const endDate = endOfWeek(currentDate, { weekStartsOn: 0 });
        const startMonth = format(startDate, 'MMMM', { locale: th });
        const endMonth = format(endDate, 'MMMM', { locale: th });
        const buddhistYear = parseInt(format(endDate, 'yyyy')) + 543;

        const weekStart = format(startDate, 'd', { locale: th });
        const weekEnd = format(endDate, 'd', { locale: th });

        return startMonth !== endMonth
          ? `${weekStart} ${startMonth} - ${weekEnd} ${endMonth} ${buddhistYear}`
          : `${weekStart} - ${weekEnd} ${endMonth} ${buddhistYear}`;
      case 'month':
        return format(currentDate, 'MMMM ', { locale: th }) + (parseInt(format(currentDate, 'yyyy')) + 543);
    }
  };

  const renderEvents = () => {
    let currentEvents: Event[] = [];
    let emptyMessage = '';

    switch (viewMode) {
      case 'day':
        currentEvents = getEventsForDate(currentDate);
        emptyMessage = `ไม่มีกิจกรรม`;
        break;
      case 'week':
        currentEvents = getEventsForWeek(currentDate);
        const weekStart = format(startOfWeek(currentDate, { weekStartsOn: 0 }), 'd', { locale: th });
        const weekEnd = format(endOfWeek(currentDate, { weekStartsOn: 0 }), 'd MMMM ', { locale: th }) +
          (parseInt(format(currentDate, 'yyyy')) + 543);
        emptyMessage = `ช่วงวันที่ ${weekStart} - ${weekEnd} ไม่มีกิจกรรม`;
        break;
      case 'month':
        currentEvents = getEventsForMonth(currentDate);
        break;
    }

    if (currentEvents.length === 0 && viewMode !== 'month') {
      return <div className="text-center text-muted-foreground py-4">{emptyMessage}</div>;
    }

    return currentEvents.map((event) => (
      <div
        key={event.id}
        className={cn(
          "p-2 rounded-lg mb-2 cursor-pointer",
          getEventTypeColor(event.eventType)
        )}
        onClick={() => handleEventClick(event)}
      >
        <div className="font-medium">{event.title}</div>
        <div className="text-xs flex items-center mt-1">
          <Clock className="h-3 w-3 mr-1" />
          {format(event.date, 'd MMMM ', { locale: th })}{parseInt(format(event.date, 'yyyy')) + 543}
          {event.time && ` ${event.time}`}
        </div>
        {event.location && (
          <div className="text-xs flex items-center mt-1">
            <MapPin className="h-3 w-3 mr-1" />
            {event.location}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="space-y-4">
      <Card className='dark:bg-slate-800'>
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <CardTitle className="flex items-center space-x-2">
              <CalendarIcon className="h-5 w-5" />
              <span>ปฏิทินกิจกรรมพรรค</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Select value={viewMode} onValueChange={(value: ViewMode) => setViewMode(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="เลือกมุมมอง" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">รายวัน</SelectItem>
                  <SelectItem value="week">รายสัปดาห์</SelectItem>
                  <SelectItem value="month">รายเดือน</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleNavigate('prev')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="min-w-[200px] text-center font-medium">
              {renderDateTitle()}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleNavigate('next')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {viewMode === 'month' ? (
            <>
              <div className="grid grid-cols-7 gap-px bg-muted text-center text-sm">
                {['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'].map((day) => (
                  <div key={day} className="px-2 py-3 font-medium">
                    {day}
                  </div>
                ))}
              </div>
              <div className="mt-px grid grid-cols-7 gap-px bg-muted">
                {daysInMonth.map((day) => {
                  const dayEvents = getEventsForDate(day);
                  const isSelected = selectedDate && isSameDay(day, selectedDate);

                  return (
                    <div
                      key={day.toString()}
                      onClick={() => handleDateClick(day)}
                      className={`relative bg-background px-2 py-2 min-h-[100px] cursor-pointer hover:bg-muted/50 ${!isSameMonth(day, currentDate) ? 'text-muted-foreground' : ''
                        } ${isSelected ? 'bg-muted' : ''}`}
                    >
                      <time
                        dateTime={format(day, 'yyyy-MM-dd')}
                        className={`ml-auto flex h-6 w-6 items-center justify-center rounded-full ${isToday(day) ? 'bg-primary text-primary-foreground' : ''
                          }`}
                      >
                        {format(day, 'd')}
                      </time>
                      {dayEvents.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {dayEvents.map((event) => (
                            <div
                              key={event.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEventClick(event);
                              }}
                              className={`cursor-pointer rounded-md px-2 py-1 text-xs ${getEventTypeColor(event.eventType)} active:opacity-70`}
                            >
                              {event.title}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <ScrollArea className="h-[600px]">
              {renderEvents()}
            </ScrollArea>
          )}
        </CardContent>
      </Card>

      {/* Event Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedEvent?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedEvent?.description && (
              <p className="text-sm text-muted-foreground">
                {selectedEvent.description}
              </p>
            )}
            <div className="flex items-center text-sm">
              <Clock className="mr-2 h-4 w-4" />
              {format(selectedEvent?.date || new Date(), 'd MMMM ', { locale: th })}
              {parseInt(format(selectedEvent?.date || new Date(), 'yyyy')) + 543}
              {selectedEvent?.time && ` ${selectedEvent.time}`}
            </div>
            {selectedEvent?.location && (
              <div className="flex items-center text-sm">
                <MapPin className="mr-2 h-4 w-4" />
                {selectedEvent.location}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Daily Events Dialog */}
      <Dialog open={isEventsDialogOpen} onOpenChange={setIsEventsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              กิจกรรมวันที่ {selectedDate && format(selectedDate, 'd MMMM yyyy', { locale: th })}
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[400px] pr-4">
            {selectedDate && getEventsForDate(selectedDate).map((event) => (
              <div
                key={event.id}
                onClick={() => {
                  setIsEventsDialogOpen(false);
                  handleEventClick(event);
                }}
                className={`cursor-pointer rounded-md px-3 py-2 mb-2 ${getEventTypeColor(event.eventType)} active:opacity-70`}
              >
                <div className="font-medium">{event.title}</div>
                <div className="text-sm mt-1">{event.time}</div>
                {event.location && (
                  <div className="text-sm flex items-center mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    {event.location}
                  </div>
                )}
              </div>
            ))}
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Legend */}
      <Card className='dark:bg-slate-800'>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
                ประชุม
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
                กิจกรรม
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-red-500/10 text-red-500 hover:bg-red-500/20">
                งานสำคัญ
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-purple-500/10 text-purple-500 hover:bg-purple-500/20">
                งาน
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Calendar;