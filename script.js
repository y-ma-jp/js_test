const monthPicker = document.getElementById("monthPicker");
const monthTitle = document.getElementById("monthTitle");
const daysContainer = document.getElementById("days");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const todayBtn = document.getElementById("todayBtn");

const today = new Date();
let currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);

function formatMonthValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

function buildDayCell(number, { outside = false, isToday = false } = {}) {
  const cell = document.createElement("td");
  const classNames = ["day"];
  if (outside) classNames.push("outside");
  if (isToday) classNames.push("today");
  cell.className = classNames.join(" ");
  cell.textContent = String(number);
  return cell;
}

function buildWeekRow(dayCells) {
  const row = document.createElement("tr");
  dayCells.forEach((cell) => row.appendChild(cell));
  return row;
}

function buildMonthRows(year, month) {
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const cells = [];

  for (let i = firstWeekday - 1; i >= 0; i -= 1) {
    cells.push(buildDayCell(daysInPrevMonth - i, { outside: true }));
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const isToday =
      year === today.getFullYear() &&
      month === today.getMonth() &&
      day === today.getDate();

    cells.push(buildDayCell(day, { isToday }));
  }

  const trailingCells = (7 - (cells.length % 7)) % 7;
  for (let day = 1; day <= trailingCells; day += 1) {
    cells.push(buildDayCell(day, { outside: true }));
  }

  const rows = [];
  for (let i = 0; i < cells.length; i += 7) {
    rows.push(buildWeekRow(cells.slice(i, i + 7)));
  }

  return rows;
}

function renderCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();

  monthTitle.textContent = `${year} / ${String(month + 1).padStart(2, "0")}`;
  monthPicker.value = formatMonthValue(date);
  daysContainer.innerHTML = "";

  const monthRows = buildMonthRows(year, month);
  monthRows.forEach((row) => daysContainer.appendChild(row));
}

monthPicker.addEventListener("change", (event) => {
  if (!event.target.value) return;

  const [year, month] = event.target.value.split("-").map(Number);
  currentMonth = new Date(year, month - 1, 1);
  renderCalendar(currentMonth);
});

prevBtn.addEventListener("click", () => {
  currentMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() - 1,
    1,
  );
  renderCalendar(currentMonth);
});

nextBtn.addEventListener("click", () => {
  currentMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    1,
  );
  renderCalendar(currentMonth);
});

todayBtn.addEventListener("click", () => {
  currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  renderCalendar(currentMonth);
});

renderCalendar(currentMonth);
