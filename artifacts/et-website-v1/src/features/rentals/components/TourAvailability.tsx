"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { TourSettings } from "../lib/aptly";

const timezoneAliases: Record<string, string> = {
  "US/Eastern": "America/New_York",
  "US/Central": "America/Chicago",
  "US/Mountain": "America/Denver",
  "US/Pacific": "America/Los_Angeles",
  "US/Arizona": "America/Phoenix",
  "US/Alaska": "America/Anchorage",
  "US/Hawaii": "Pacific/Honolulu",
};

const timezoneLabels: Record<string, string> = {
  "US/Eastern": "Eastern Time",
  "US/Central": "Central Time",
  "US/Mountain": "Mountain Time",
  "US/Pacific": "Pacific Time",
  "US/Arizona": "Arizona Time",
  "US/Alaska": "Alaska Time",
  "US/Hawaii": "Hawaii Time",
};

function dateParts(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(date);
  const value = (type: Intl.DateTimeFormatPartTypes) => Number(parts.find((part) => part.type === type)?.value || 0);
  return { year: value("year"), month: value("month"), day: value("day"), hour: value("hour"), minute: value("minute") };
}

function timeLabel(value: number) {
  const hour = Math.floor(value / 100);
  const minute = value % 100;
  return new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone: "UTC" }).format(new Date(Date.UTC(2020, 0, 1, hour, minute)));
}

function isoForTour(dateKey: string, time: number, timeZone: string) {
  const hour = String(Math.floor(time / 100)).padStart(2, "0");
  const minute = String(time % 100).padStart(2, "0");
  const offsetPart = new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "longOffset" }).formatToParts(new Date(`${dateKey}T12:00:00Z`)).find((part) => part.type === "timeZoneName")?.value || "GMT+00:00";
  const offset = offsetPart.replace("GMT", "") || "+00:00";
  return new Date(`${dateKey}T${hour}:${minute}:00${offset}`).toISOString();
}

function dateLabel(date: Date) {
  return new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(date);
}

function monthLabel(date: Date) {
  return new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric", timeZone: "UTC" }).format(date);
}

export function TourAvailability(props: { bookingUrl: string; settings: TourSettings }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  // Tour dates are time-sensitive. Keep the prerendered and first client render
  // identical, then calculate the current windows in the visitor's browser.
  return mounted ? <TourCalendarView {...props} /> : <p role="status">Loading current tour windows…</p>;
}

function TourCalendarView({ bookingUrl, settings }: { bookingUrl: string; settings: TourSettings }) {
  const calendar = settings.calendar;
  const sourceTimezone = calendar?.businessHours?.timezone || "US/Eastern";
  const timeZone = timezoneAliases[sourceTimezone] || sourceTimezone;
  const rawDuration = calendar?.tourDurationMin;
  const duration = rawDuration && Number.isFinite(rawDuration) && rawDuration > 0 && rawDuration <= 1440 ? rawDuration : 60;
  const schedule = useMemo(() => {
    if (!settings.enabled || !calendar?.multiTimeRanges) return null;
    const now = new Date();
    const current = dateParts(now, timeZone);
    const todayKey = `${current.year}-${String(current.month).padStart(2, "0")}-${String(current.day).padStart(2, "0")}`;
    const base = new Date(Date.UTC(current.year, current.month - 1, current.day, 12));
    const maximum = new Date(base);
    maximum.setUTCFullYear(maximum.getUTCFullYear() + 1);
    const maxDateKey = maximum.toISOString().slice(0, 10);
    const dayForKey = (dateKey: string) => {
      if (dateKey < todayKey || dateKey > maxDateKey) return null;
      const anchor = new Date(`${dateKey}T12:00:00Z`);
      const dayConfig = calendar.multiTimeRanges?.[String(anchor.getUTCDay())];
      if (!dayConfig?.active) return null;
      const times: number[] = [];
      for (const slot of dayConfig.slots || []) {
        let minutes = Math.floor(slot.startTime / 100) * 60 + slot.startTime % 100;
        const endMinutes = Math.floor(slot.endTime / 100) * 60 + slot.endTime % 100;
        while (minutes < endMinutes) {
          const value = Math.floor(minutes / 60) * 100 + minutes % 60;
          if (dateKey !== todayKey || value > current.hour * 100 + current.minute) times.push(value);
          minutes += duration;
        }
      }
      const offset = Math.round((anchor.getTime() - base.getTime()) / 86400000);
      return times.length ? { dateKey, anchor, offset, times } : null;
    };
    const quickDays: NonNullable<ReturnType<typeof dayForKey>>[] = [];
    for (let offset = 0; offset <= 366 && quickDays.length < 5; offset += 1) {
      const anchor = new Date(base);
      anchor.setUTCDate(anchor.getUTCDate() + offset);
      const day = dayForKey(anchor.toISOString().slice(0, 10));
      if (day) quickDays.push(day);
    }
    return { quickDays, dayForKey, todayKey, maxDateKey };
  }, [calendar, duration, settings.enabled, timeZone]);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const [calendarCursor, setCalendarCursor] = useState<Date | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const selectedDay = (selectedKey && schedule?.dayForKey(selectedKey)) || schedule?.quickDays[0];
  const quickIndex = selectedDay ? schedule?.quickDays.findIndex((day) => day.dateKey === selectedDay.dateKey) ?? -1 : -1;
  const otherSelected = quickIndex < 0;
  const tourIso = selectedDay && selectedTime != null ? isoForTour(selectedDay.dateKey, selectedTime, timeZone) : null;
  const continueUrl = tourIso ? `${bookingUrl}${bookingUrl.includes("?") ? "&" : "?"}tourDate=${encodeURIComponent(tourIso)}` : bookingUrl;

  const cursor = calendarCursor || (selectedDay ? new Date(Date.UTC(selectedDay.anchor.getUTCFullYear(), selectedDay.anchor.getUTCMonth(), 1)) : new Date());
  const cursorMonthKey = `${cursor.getUTCFullYear()}-${String(cursor.getUTCMonth() + 1).padStart(2, "0")}`;
  const minimumMonth = schedule?.todayKey.slice(0, 7) || "";
  const maximumMonth = schedule?.maxDateKey.slice(0, 7) || "";
  const firstWeekday = new Date(Date.UTC(cursor.getUTCFullYear(), cursor.getUTCMonth(), 1)).getUTCDay();
  const daysInMonth = new Date(Date.UTC(cursor.getUTCFullYear(), cursor.getUTCMonth() + 1, 0)).getUTCDate();

  function openOther() {
    if (!selectedDay) return;
    setCalendarCursor(new Date(Date.UTC(selectedDay.anchor.getUTCFullYear(), selectedDay.anchor.getUTCMonth(), 1)));
    dialogRef.current?.showModal();
  }

  function moveMonth(direction: number) {
    setCalendarCursor(new Date(Date.UTC(cursor.getUTCFullYear(), cursor.getUTCMonth() + direction, 1)));
  }

  if (!settings.enabled || !calendar) return <p className="tour-unavailable">Aptly is not currently publishing self-tour times for this home. Contact the leasing team below to arrange a visit.</p>;
  if (!schedule?.quickDays.length || !selectedDay) return <p className="tour-unavailable">Aptly does not currently show an upcoming self-tour window for this home. Contact the leasing team below or check again later.</p>;

  return <div className="tour-scheduler">
    <div className="tour-days" role="tablist" aria-label="Tour dates published by Aptly">
      {schedule.quickDays.map((day) => <button type="button" key={day.dateKey} role="tab" aria-selected={selectedDay.dateKey === day.dateKey} className={selectedDay.dateKey === day.dateKey ? "is-selected" : ""} onClick={() => { setSelectedKey(day.dateKey); setSelectedTime(null); }}>
        <span>{day.offset === 0 ? "Today" : day.offset === 1 ? "Tomorrow" : new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone: "UTC" }).format(day.anchor)}</span>
        <strong>{new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" }).format(day.anchor)}</strong>
      </button>)}
      <button type="button" role="tab" aria-selected={otherSelected} className={`tour-other ${otherSelected ? "is-selected" : ""}`} onClick={openOther}>
        <span>Other</span><strong><i className="tour-calendar-icon" aria-hidden="true" /><span className="sr-only">Choose another date</span></strong>
      </button>
    </div>
    {otherSelected && <p className="tour-selected-date">Available times for <strong>{dateLabel(selectedDay.anchor)}</strong></p>}
    <p className="tour-time-note">Scheduling windows are loaded directly from Aptly. Final availability is confirmed when you reserve. Times shown in {timezoneLabels[sourceTimezone] || sourceTimezone}.</p>
    <div className="tour-times">
      {selectedDay.times.map((time) => <button type="button" key={time} className={selectedTime === time ? "is-selected" : ""} onClick={() => setSelectedTime(time)}>{timeLabel(time)}</button>)}
    </div>
    <a className={`button button-gold tour-continue ${selectedTime != null ? "" : "is-disabled"}`} href={selectedTime != null ? continueUrl : undefined} aria-disabled={selectedTime == null} target="_blank" rel="noreferrer">{selectedTime != null ? `Continue with ${timeLabel(selectedTime)}` : "Select a tour time"}</a>
    <dialog ref={dialogRef} className="tour-date-dialog" aria-labelledby="tour-date-title" onClick={(event) => { if (event.target === dialogRef.current) dialogRef.current?.close(); }}>
      <div className="tour-date-panel">
        <button type="button" className="tour-date-close" aria-label="Close date picker" onClick={() => dialogRef.current?.close()}>×</button>
        <p className="detail-kicker">Self-tour this home</p>
        <h3 id="tour-date-title">Choose another tour date</h3>
        <p className="tour-date-help">Select an available date from the current Aptly tour calendar.</p>
        <div className="tour-calendar-head">
          <button type="button" aria-label="Previous month" disabled={cursorMonthKey <= minimumMonth} onClick={() => moveMonth(-1)}>‹</button>
          <strong>{monthLabel(cursor)}</strong>
          <button type="button" aria-label="Next month" disabled={cursorMonthKey >= maximumMonth} onClick={() => moveMonth(1)}>›</button>
        </div>
        <div className="tour-calendar-weekdays" aria-hidden="true"><span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span></div>
        <div className="tour-calendar-grid">
          {Array.from({ length: firstWeekday }, (_, index) => <span key={`empty-${index}`} className="tour-calendar-empty" aria-hidden="true" />)}
          {Array.from({ length: daysInMonth }, (_, index) => {
            const dayNumber = index + 1;
            const dateKey = `${cursor.getUTCFullYear()}-${String(cursor.getUTCMonth() + 1).padStart(2, "0")}-${String(dayNumber).padStart(2, "0")}`;
            const available = schedule.dayForKey(dateKey);
            const selected = dateKey === selectedDay.dateKey;
            const anchor = new Date(`${dateKey}T12:00:00Z`);
            return <button type="button" key={dateKey} className={`tour-calendar-day ${selected ? "is-selected" : ""}`} disabled={!available} aria-label={`${dateLabel(anchor)}${available ? "" : ", unavailable"}`} aria-current={selected ? "date" : undefined} onClick={() => { if (!available) return; setSelectedKey(dateKey); setSelectedTime(null); dialogRef.current?.close(); }}>{dayNumber}</button>;
          })}
        </div>
        <p className="tour-date-footnote">Available dates follow the current recurring schedule published by Aptly for the next 12 months.</p>
      </div>
    </dialog>
  </div>;
}
