// Shared nav model for the clickable mock. Every sidebar item resolves to a real screen file.
const NAV_FILES={
  dashboard:'dashboard.card.html', scanner:'front-desk-scan.card.html', queue:'live-queue.card.html',
  bookings:'bookings.card.html', barbers:'barbers.card.html', services:'services.card.html',
  customers:'customers.card.html', sales:'sales.card.html', reports:'reports.card.html', users:'users-roles.card.html',
};
if(typeof module!=='undefined')module.exports={NAV_FILES};
