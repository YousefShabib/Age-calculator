const DateTime = luxon.DateTime;
const input = document.getElementById("birthdate");
const result = document.getElementById("result");
const button = document.getElementById("btn");
const icon = document.getElementById("calendarIcon");

const picker = flatpickr(input, {
  dateFormat: "d/m/Y",
  maxDate: "today",
  clickOpens: false,
  disableMobile: true
});

icon.addEventListener("click", () => {
  picker.open();
});

button.addEventListener("click", () => {
  const val = input.value.trim();
  if (!val) {
    result.textContent = "⚠️ Please select your birthdate.";
    return;
  }

  const [day, month, year] = val.split("/").map(Number);
  const birthDate = DateTime.fromObject({ day, month, year });
  const now = DateTime.now();

  if (!birthDate.isValid || birthDate > now) {
    result.textContent = "⚠️ Invalid birthdate.";
    return;
  }

  const diff = now.diff(birthDate, ["years", "months", "days"]).toObject();

  result.innerHTML = `You've been alive for :
    <ul>
      <li>${Math.floor(diff.years)} years</li>
      <li>${Math.floor(diff.months)} months</li>
      <li>${Math.floor(diff.days)} days</li>
    </ul>
  `;
});
