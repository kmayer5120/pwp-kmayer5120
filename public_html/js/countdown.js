function countdown(dateEnd) {
  let etsyLink = document.getElementById("etsy-link");
  let ravelryLink = document.getElementById("ravelry-link");

  let timer, days, hours, minutes, seconds;

  dateEnd = new Date(dateEnd);
  dateEnd = dateEnd.getTime();

  if (isNaN(dateEnd)) {
    return;
  }

  timer = setInterval(calculate, 1000);

  function calculate() {
    let dateStart = new Date();
    dateStart = new Date(
      dateStart.getUTCFullYear(),
      dateStart.getUTCMonth(),
      dateStart.getUTCDate(),
      dateStart.getUTCHours() - 6,
      dateStart.getUTCMinutes(),
      dateStart.getUTCSeconds()
    );
    let timeRemaining = parseInt((dateEnd - dateStart.getTime()) / 1000);

    if (timeRemaining >= 0) {
      days = parseInt(timeRemaining / 86400);
      timeRemaining = timeRemaining % 86400;
      hours = parseInt(timeRemaining / 3600);
      timeRemaining = timeRemaining % 3600;
      minutes = parseInt(timeRemaining / 60);
      timeRemaining = timeRemaining % 60;
      seconds = parseInt(timeRemaining);

      let daysText = "Days";

      daysText = days === 1 ? "Day" : "Days";

      document.getElementById("days").innerHTML = `${parseInt(
        days,
        10
      )} ${daysText}`;

      document.getElementById("hours").innerHTML = `${("0" + hours).slice(
        -2
      )}hr`;

      document.getElementById("minutes").innerHTML = `${("0" + minutes).slice(
        -2
      )}min`;

      document.getElementById("seconds").innerHTML = `${("0" + seconds).slice(
        -2
      )}s`;
    } else {
      document.getElementById(
        "countdown"
      ).innerHTML = `Pattern released. 25% off until 8/26/2021.`;

      etsyLink.style.visibility = "visible";
      ravelryLink.style.visibility = "visible";
    }
  }
}

countdown("08/19/2021 09:0:00 AM");
