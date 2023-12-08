import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DateService {
  dateInDateType: Date = new Date();

  constructor() {}

  toDateFormat(date: String): Date {
    const [annee, mois, jour] = date.split("-");
    this.dateInDateType = new Date(
      Number(annee),
      Number(mois) - 1,
      Number(jour)
    );
    return this.dateInDateType;
  }

  calculateNextMonth(currentDate: Date): Date {
    const nextMonth = new Date(currentDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    return nextMonth;
  }
  calculateFirstDayOfCurrentMonth(date: Date): Date {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
    return firstDay;
  }

  calculateLastDayOfCurrentMonth(date: Date): Date {
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    return lastDay;
  }
}
