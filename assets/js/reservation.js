/**
 * Restaurant Kesar - Table Reservation Interactive Engine
 * Handles Date, 07:00-24:00 Timeslots, 15-Table Interactive Floor Plan & Grid,
 * LocalStorage Booking Database, Multilingual Support (DE/EN) & Receipt Modals.
 */

(function () {
  'use strict';

  // --- 1. Multilingual Translations Dictionary ---
  const i18n = {
    de: {
      brandSub: 'FEINE KÜCHE & GASTFREUNDSCHAFT SEIT 20 JAHREN',
      backToWeb: 'Zurück zur Website',
      myBookings: 'Meine Buchungen',
      bookingPolicy: 'Buchungspolitik',
      onlineStatus: 'Online-Reservierung geöffnet',
      policyText1: 'Unser Restaurant ist täglich von <strong>07:00 bis 24:00 Uhr</strong> für Sie geöffnet.',
      policyText2: 'Wir verfügen über <strong>15 exklusive Tische</strong> im gemütlichen Innenbereich, Wintergarten und Chef’s Room.',
      policyText3: 'Tischreservierungen werden für 15 Minuten bei Verspätung aufrechterhalten.',
      expTitle: 'MENÜ UND ABLAUF DES BESUCHS',
      expTextShort: 'Erleben Sie die Vielfalt unserer Küche, meisterhaft zubereitet mit frischen, regionalen und authentischen Zutaten. ',
      expTextMore: 'Für besondere Anlässe, Jubiläen oder geschäftliche Dinner stimmen wir das Menü gerne vorab persönlich mit Ihnen ab. Unser Service-Team begleitet Sie aufmerksam durch Ihren Genussmoment.',
      moreBtn: 'Mehr anzeigen',
      lessBtn: 'Weniger anzeigen',
      infoTitle: 'Informationen zum Restaurant',
      infoLateTitle: 'Tisch behalten bei Verspätung',
      infoLateDesc: 'Wir halten Ihre Reservierung 15 Minuten lang frei.',
      infoKidsTitle: 'Kinderfreundlich',
      infoKidsDesc: 'Herzlich willkommen, Hochstühle sind vorhanden.',
      infoPetsTitle: 'Haustiere',
      infoPetsDesc: 'Im Terrassen- und Außenbereich gerne gestattet.',
      infoAccessTitle: 'Barrierefreier Zugang',
      infoAccessDesc: 'Ebenerdiger Eingang für Rollstuhlfahrer.',
      infoGroupTitle: 'Gruppenreservierungen',
      infoGroupDesc: 'Ab 8 Personen bitte telefonisch anfragen.',
      infoHoursTitle: 'Öffnungszeiten',
      infoHoursDesc: 'Täglich von 07:00 bis 24:00 Uhr (Küche bis 23:00).',
      quickContact: 'Haben Sie Fragen oder spezielle Wünsche?',
      callUs: 'Rufen Sie uns an',
      step1: '1. Datum & Gäste wählen',
      step2: '2. Uhrzeit wählen (07:00 – 24:00 Uhr)',
      step3: '3. Tisch auswählen (15 Tische verfügbar)',
      step4: '4. Kontaktdaten eingeben',
      viewGrid: 'Kartenansicht',
      viewMap: 'Tischplan (Floor Map)',
      allTimes: 'Alle Zeiten',
      morning: 'Frühstück (07:00–11:00)',
      lunch: 'Mittag (11:30–15:00)',
      afternoon: 'Nachmittag (15:30–17:30)',
      dinner: 'Abend (18:00–23:30)',
      free: 'Frei',
      reserved: 'Belegt',
      selected: 'Gewählt',
      seats: 'Plätze',
      labelName: 'Vor- und Nachname *',
      labelPhone: 'Telefonnummer *',
      labelEmail: 'E-Mail-Adresse *',
      labelNotes: 'Besondere Wünsche / Anlass (optional)',
      placeholderNotes: 'z.B. Geburtstag, Fensterplatz gewünscht, Allergien...',
      sumDate: 'Datum',
      sumTime: 'Uhrzeit',
      sumGuests: 'Gäste',
      sumTable: 'Tisch-Nr.',
      btnSubmit: 'Tisch jetzt verbindlich reservieren',
      systemFootnote: 'Online-Reservierungen sind mit dem internen Tischverwaltungssystem von Restaurant Kesar verbunden.',
      modalSuccessTitle: 'Reservierung erfolgreich bestätigt!',
      modalSuccessText: 'Vielen Dank! Wir freuen uns sehr auf Ihren Besuch im Restaurant Kesar.',
      refCodeLabel: 'Ihre Buchungsnummer:',
      modalClose: 'Schließen',
      addToCalendar: 'Zu Kalender hinzufügen (.ics)',
      printBooking: 'Buchung drucken',
      newBooking: 'Weitere Reservierung machen',
      noBookingsYet: 'Sie haben derzeit keine aktiven Reservierungen.',
      cancelBookingBtn: 'Stornieren',
      cancelSuccess: 'Reservierung erfolgreich storniert.',
      pleaseSelectTable: 'Bitte wählen Sie einen verfügbaren Tisch aus!',
      pleaseFillFields: 'Bitte füllen Sie Name, Telefon und E-Mail aus!',
      dayNames: ['So.', 'Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.'],
      monthNames: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']
    },
    en: {
      brandSub: 'FINE CUISINE & HOSPITALITY FOR OVER 20 YEARS',
      backToWeb: 'Back to Website',
      myBookings: 'My Bookings',
      bookingPolicy: 'Booking Policy',
      onlineStatus: 'Online Bookings Open',
      policyText1: 'Our restaurant is open daily from <strong>07:00 AM to 12:00 Midnight</strong>.',
      policyText2: 'We offer <strong>15 exclusive tables</strong> in our cozy main hall, conservatory, and Chef’s Room.',
      policyText3: 'Table reservations are held for up to 15 minutes in case of late arrival.',
      expTitle: 'MENU & VISIT EXPERIENCE',
      expTextShort: 'Experience the richness of our culinary offerings, handcrafted with the freshest authentic spices and seasonal produce. ',
      expTextMore: 'For special celebrations or executive business dinners, we gladly tailor custom course menus for you upon request. Our team looks forward to serving you.',
      moreBtn: 'Read more',
      lessBtn: 'Read less',
      infoTitle: 'Restaurant Information',
      infoLateTitle: 'Grace Period',
      infoLateDesc: 'We hold tables for 15 minutes after reserved time.',
      infoKidsTitle: 'Family Friendly',
      infoKidsDesc: 'Children are welcome; highchairs available.',
      infoPetsTitle: 'Pets',
      infoPetsDesc: 'Allowed in the garden and terrace areas.',
      infoAccessTitle: 'Wheelchair Accessible',
      infoAccessDesc: 'Ground-level ramp and step-free access.',
      infoGroupTitle: 'Group Inquiries',
      infoGroupDesc: 'For parties of 8 or more, please contact us.',
      infoHoursTitle: 'Opening Hours',
      infoHoursDesc: 'Daily from 07:00 to 24:00 (Kitchen closes at 23:00).',
      quickContact: 'Do you have questions or special requirements?',
      callUs: 'Call us directly',
      step1: '1. Select Date & Party Size',
      step2: '2. Select Time (07:00 – 24:00)',
      step3: '3. Choose Table (15 Tables Available)',
      step4: '4. Guest Information',
      viewGrid: 'Card View',
      viewMap: 'Floor Map',
      allTimes: 'All Times',
      morning: 'Breakfast (07:00–11:00)',
      lunch: 'Lunch (11:30–15:00)',
      afternoon: 'Afternoon (15:30–17:30)',
      dinner: 'Dinner (18:00–23:30)',
      free: 'Available',
      reserved: 'Occupied',
      selected: 'Selected',
      seats: 'Seats',
      labelName: 'Full Name *',
      labelPhone: 'Phone Number *',
      labelEmail: 'Email Address *',
      labelNotes: 'Special Requests / Occasion (optional)',
      placeholderNotes: 'e.g. Birthday celebration, window seat preference, dietary...',
      sumDate: 'Date',
      sumTime: 'Time',
      sumGuests: 'Guests',
      sumTable: 'Table No.',
      btnSubmit: 'Confirm Table Reservation',
      systemFootnote: 'Online bookings are directly synchronized with the Restaurant Kesar guest management system.',
      modalSuccessTitle: 'Reservation Confirmed!',
      modalSuccessText: 'Thank you! We look forward to welcoming you at Restaurant Kesar.',
      refCodeLabel: 'Booking Reference Code:',
      modalClose: 'Close',
      addToCalendar: 'Add to Calendar (.ics)',
      printBooking: 'Print Confirmation',
      newBooking: 'Book Another Table',
      noBookingsYet: 'You currently have no active reservations.',
      cancelBookingBtn: 'Cancel',
      cancelSuccess: 'Reservation has been cancelled.',
      pleaseSelectTable: 'Please choose an available table!',
      pleaseFillFields: 'Please fill in your name, phone number, and email address!',
      dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    }
  };

  // --- 2. 15 Tables Specification ---
  const tablesDatabase = [
    { id: 1, num: 'Tisch 01', capacity: 2, zoneDe: 'Fensterplatz', zoneEn: 'Window View', shape: 'square', x: 70, y: 75 },
    { id: 2, num: 'Tisch 02', capacity: 2, zoneDe: 'Fensterplatz', zoneEn: 'Window View', shape: 'square', x: 170, y: 75 },
    { id: 3, num: 'Tisch 03', capacity: 4, zoneDe: 'Hauptsaal', zoneEn: 'Main Dining Hall', shape: 'rect', x: 280, y: 75 },
    { id: 4, num: 'Tisch 04', capacity: 4, zoneDe: 'Hauptsaal', zoneEn: 'Main Dining Hall', shape: 'rect', x: 420, y: 75 },
    { id: 5, num: 'Tisch 05', capacity: 4, zoneDe: 'Hauptsaal', zoneEn: 'Main Dining Hall', shape: 'rect', x: 560, y: 75 },
    { id: 6, num: 'Tisch 06', capacity: 6, zoneDe: 'Familien-Nische', zoneEn: 'Family Booth', shape: 'round', x: 700, y: 80 },
    { id: 7, num: 'Tisch 07', capacity: 2, zoneDe: 'Gemütliche Nische', zoneEn: 'Cozy Nook', shape: 'square', x: 70, y: 190 },
    { id: 8, num: 'Tisch 08', capacity: 4, zoneDe: 'Fensterplatz', zoneEn: 'Window View', shape: 'rect', x: 180, y: 190 },
    { id: 9, num: 'Tisch 09', capacity: 4, zoneDe: 'Hauptsaal Zentrum', zoneEn: 'Center Dining Hall', shape: 'rect', x: 340, y: 190 },
    { id: 10, num: 'Tisch 10', capacity: 6, zoneDe: 'Runder Tisch', zoneEn: 'Round Table', shape: 'round', x: 500, y: 195 },
    { id: 11, num: 'Tisch 11', capacity: 2, zoneDe: 'Romantik-Ecke', zoneEn: 'Intimate Corner', shape: 'square', x: 700, y: 190 },
    { id: 12, num: 'Tisch 12', capacity: 4, zoneDe: 'Wintergarten', zoneEn: 'Garden Conservatory', shape: 'rect', x: 100, y: 300 },
    { id: 13, num: 'Tisch 13', capacity: 4, zoneDe: 'Wintergarten', zoneEn: 'Garden Conservatory', shape: 'rect', x: 240, y: 300 },
    { id: 14, num: 'Tisch 14', capacity: 8, zoneDe: 'Chef’s Room (Jubiläum)', zoneEn: 'Chef’s Room (Anniversary)', shape: 'rect', x: 440, y: 295 },
    { id: 15, num: 'Tisch 15', capacity: 4, zoneDe: 'Lounge Bereich', zoneEn: 'Lounge Area', shape: 'round', x: 670, y: 300 }
  ];

  // --- 3. Time Slots from 07:00 to 24:00 (30 min steps) ---
  const allTimeSlots = [
    { time: '07:00', cat: 'morning' }, { time: '07:30', cat: 'morning' },
    { time: '08:00', cat: 'morning' }, { time: '08:30', cat: 'morning' },
    { time: '09:00', cat: 'morning' }, { time: '09:30', cat: 'morning' },
    { time: '10:00', cat: 'morning' }, { time: '10:30', cat: 'morning' },
    { time: '11:00', cat: 'morning' },
    { time: '11:30', cat: 'lunch' }, { time: '12:00', cat: 'lunch' },
    { time: '12:30', cat: 'lunch' }, { time: '13:00', cat: 'lunch' },
    { time: '13:30', cat: 'lunch' }, { time: '14:00', cat: 'lunch' },
    { time: '14:30', cat: 'lunch' }, { time: '15:00', cat: 'lunch' },
    { time: '15:30', cat: 'afternoon' }, { time: '16:00', cat: 'afternoon' },
    { time: '16:30', cat: 'afternoon' }, { time: '17:00', cat: 'afternoon' },
    { time: '17:30', cat: 'afternoon' },
    { time: '18:00', cat: 'dinner' }, { time: '18:30', cat: 'dinner' },
    { time: '19:00', cat: 'dinner' }, { time: '19:30', cat: 'dinner' },
    { time: '20:00', cat: 'dinner' }, { time: '20:30', cat: 'dinner' },
    { time: '21:00', cat: 'dinner' }, { time: '21:30', cat: 'dinner' },
    { time: '22:00', cat: 'dinner' }, { time: '22:30', cat: 'dinner' },
    { time: '23:00', cat: 'dinner' }, { time: '23:30', cat: 'dinner' }
  ];

  // --- 4. Application State ---
  const state = {
    lang: 'de',
    currentDate: new Date(),
    viewMonthDate: new Date(),
    selectedDateStr: '', // 'YYYY-MM-DD'
    selectedGuests: 2,
    selectedTime: '19:30',
    selectedTimeCat: 'all',
    selectedTableId: null,
    activeView: 'grid', // 'grid' | 'map'
    bookings: []
  };

  // --- 5. Storage Helper ---
  const STORAGE_KEY = 'kesar_reservations_db';

  function loadBookingsFromStorage() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        state.bookings = JSON.parse(data);
      } else {
        // Sample baseline reservations to feel realistic
        const todayStr = formatDateISO(new Date());
        state.bookings = [
          { id: 'KSR-1029', date: todayStr, time: '19:00', tableId: 3, tableNum: 'Tisch 03', guests: 4, name: 'H. Weber', phone: '+43 664 123456', email: 'weber@example.at', createdAt: new Date().toISOString() },
          { id: 'KSR-1035', date: todayStr, time: '20:00', tableId: 10, tableNum: 'Tisch 10', guests: 6, name: 'M. Steiner', phone: '+43 676 987654', email: 'steiner@example.at', createdAt: new Date().toISOString() }
        ];
        saveBookingsToStorage();
      }
    } catch (e) {
      console.error('Storage error:', e);
      state.bookings = [];
    }
    updateMyBookingsBadge();
  }

  function saveBookingsToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.bookings));
      updateMyBookingsBadge();
    } catch (e) {
      console.error('Save error:', e);
    }
  }

  function formatDateISO(d) {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function formatReadableDate(dateStr) {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    const d = new Date(parts[0], parts[1] - 1, parts[2]);
    const langObj = i18n[state.lang];
    const dayName = langObj.dayNames[d.getDay()];
    const monthName = langObj.monthNames[d.getMonth()];
    return `${dayName}, ${d.getDate()}. ${monthName} ${d.getFullYear()}`;
  }

  // --- 6. DOM Elements ---
  const els = {
    langToggle: document.getElementById('btnLangToggle'),
    langText: document.getElementById('langText'),
    langFlag: document.getElementById('langFlag'),
    btnBackHome: document.getElementById('btnBackHome'),
    btnMyBookings: document.getElementById('btnMyBookings'),
    bookingsCountBadge: document.getElementById('bookingsCountBadge'),
    
    // Info card
    brandSubtitle: document.getElementById('brandSubtitle'),
    restaurantTitle: document.getElementById('restaurantTitle'),
    restaurantAddress: document.getElementById('restaurantAddress'),
    policyTitle: document.getElementById('policyTitle'),
    policyStatus: document.getElementById('policyStatus'),
    policyP1: document.getElementById('policyP1'),
    policyP2: document.getElementById('policyP2'),
    policyP3: document.getElementById('policyP3'),
    expTitle: document.getElementById('expTitle'),
    expShort: document.getElementById('expShort'),
    expMore: document.getElementById('expMore'),
    btnToggleExp: document.getElementById('btnToggleExp'),
    infoTitle: document.getElementById('infoTitle'),
    infoLateTitle: document.getElementById('infoLateTitle'),
    infoLateDesc: document.getElementById('infoLateDesc'),
    infoKidsTitle: document.getElementById('infoKidsTitle'),
    infoKidsDesc: document.getElementById('infoKidsDesc'),
    infoPetsTitle: document.getElementById('infoPetsTitle'),
    infoPetsDesc: document.getElementById('infoPetsDesc'),
    infoAccessTitle: document.getElementById('infoAccessTitle'),
    infoAccessDesc: document.getElementById('infoAccessDesc'),
    infoGroupTitle: document.getElementById('infoGroupTitle'),
    infoGroupDesc: document.getElementById('infoGroupDesc'),
    infoHoursTitle: document.getElementById('infoHoursTitle'),
    infoHoursDesc: document.getElementById('infoHoursDesc'),
    quickContactText: document.getElementById('quickContactText'),
    callUsText: document.getElementById('callUsText'),

    // Booking widget steps
    step1Title: document.getElementById('step1Title'),
    step2Title: document.getElementById('step2Title'),
    step3Title: document.getElementById('step3Title'),
    step4Title: document.getElementById('step4Title'),
    monthDisplay: document.getElementById('monthDisplay'),
    btnPrevMonth: document.getElementById('btnPrevMonth'),
    btnNextMonth: document.getElementById('btnNextMonth'),
    daysStrip: document.getElementById('daysStrip'),
    guestPillsWrap: document.getElementById('guestPillsWrap'),
    timeCatTabs: document.getElementById('timeCatTabs'),
    timeSlotsGrid: document.getElementById('timeSlotsGrid'),
    viewGridBtn: document.getElementById('btnViewGrid'),
    viewMapBtn: document.getElementById('btnViewMap'),
    tablesGridView: document.getElementById('tablesGridView'),
    floorMapView: document.getElementById('floorMapView'),
    floorMapSvg: document.getElementById('floorMapSvg'),
    tableFilterInfo: document.getElementById('tableFilterInfo'),
    legendFree: document.getElementById('legendFree'),
    legendReserved: document.getElementById('legendReserved'),
    legendSelected: document.getElementById('legendSelected'),

    // Customer form & summary
    formCustomer: document.getElementById('formCustomer'),
    inputName: document.getElementById('inputName'),
    inputPhone: document.getElementById('inputPhone'),
    inputEmail: document.getElementById('inputEmail'),
    inputNotes: document.getElementById('inputNotes'),
    labelName: document.getElementById('labelName'),
    labelPhone: document.getElementById('labelPhone'),
    labelEmail: document.getElementById('labelEmail'),
    labelNotes: document.getElementById('labelNotes'),
    sumDateLabel: document.getElementById('sumDateLabel'),
    sumTimeLabel: document.getElementById('sumTimeLabel'),
    sumGuestsLabel: document.getElementById('sumGuestsLabel'),
    sumTableLabel: document.getElementById('sumTableLabel'),
    sumDateVal: document.getElementById('sumDateVal'),
    sumTimeVal: document.getElementById('sumTimeVal'),
    sumGuestsVal: document.getElementById('sumGuestsVal'),
    sumTableVal: document.getElementById('sumTableVal'),
    btnSubmit: document.getElementById('btnSubmitBooking'),
    systemFootnote: document.getElementById('systemFootnote'),

    // Modals
    modalSuccess: document.getElementById('modalSuccess'),
    modalSuccessTitle: document.getElementById('modalSuccessTitle'),
    modalSuccessText: document.getElementById('modalSuccessText'),
    refCodeLabel: document.getElementById('refCodeLabel'),
    confirmBookingCode: document.getElementById('confirmBookingCode'),
    receiptDate: document.getElementById('receiptDate'),
    receiptTime: document.getElementById('receiptTime'),
    receiptGuests: document.getElementById('receiptGuests'),
    receiptTable: document.getElementById('receiptTable'),
    receiptName: document.getElementById('receiptName'),
    btnModalCloseSuccess: document.getElementById('btnModalCloseSuccess'),
    btnAddToCalendar: document.getElementById('btnAddToCalendar'),
    btnPrintBooking: document.getElementById('btnPrintBooking'),
    btnNewBooking: document.getElementById('btnNewBooking'),

    modalMyBookings: document.getElementById('modalMyBookings'),
    btnModalCloseBookings: document.getElementById('btnModalCloseBookings'),
    myBookingsList: document.getElementById('myBookingsList'),
    myBookingsTitle: document.getElementById('myBookingsTitle')
  };

  // --- 7. Initialization ---
  function init() {
    // Check URL parameters for language (e.g. ?lang=en)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('lang') === 'en') {
      state.lang = 'en';
    }

    state.selectedDateStr = formatDateISO(new Date());

    loadBookingsFromStorage();
    renderStaticTexts();
    renderMonthHeader();
    renderDaysStrip();
    renderGuestPills();
    renderTimeCategoryTabs();
    renderTimeSlots();
    renderTables();
    renderFloorMap();
    updateSummaryBox();
    attachEventListeners();
  }

  // --- 8. Multilingual Rendering ---
  function renderStaticTexts() {
    const t = i18n[state.lang];
    document.title = state.lang === 'de' ? 'Tisch reservieren | Restaurant Kesar' : 'Table Reservation | Restaurant Kesar';

    // Header & Brand
    if (els.brandSubtitle) els.brandSubtitle.textContent = t.brandSub;
    if (els.btnBackHome) els.btnBackHome.innerHTML = `<span>&larr;</span> <span>${t.backToWeb}</span>`;
    if (els.btnMyBookings) els.btnMyBookings.innerHTML = `<span>&#128197;</span> <span>${t.myBookings}</span> <span class="bookings-count-badge" id="bookingsCountBadge">${state.bookings.length}</span>`;
    if (els.langText) els.langText.textContent = state.lang.toUpperCase();
    if (els.langFlag) els.langFlag.textContent = state.lang === 'de' ? '🇩🇪' : '🇬🇧';

    // Left card info
    if (els.policyTitle) els.policyTitle.textContent = t.bookingPolicy;
    if (els.policyStatus) els.policyStatus.textContent = t.onlineStatus;
    if (els.policyP1) els.policyP1.innerHTML = t.policyText1;
    if (els.policyP2) els.policyP2.innerHTML = t.policyText2;
    if (els.policyP3) els.policyP3.innerHTML = t.policyText3;
    if (els.expTitle) els.expTitle.textContent = t.expTitle;
    if (els.expShort) els.expShort.textContent = t.expTextShort;
    if (els.expMore) els.expMore.textContent = t.expTextMore;
    if (els.btnToggleExp) {
      const isExpanded = els.expMore && els.expMore.classList.contains('expanded');
      els.btnToggleExp.textContent = isExpanded ? t.lessBtn : t.moreBtn;
    }

    // Icons Grid
    if (els.infoTitle) els.infoTitle.textContent = t.infoTitle;
    if (els.infoLateTitle) els.infoLateTitle.textContent = t.infoLateTitle;
    if (els.infoLateDesc) els.infoLateDesc.textContent = t.infoLateDesc;
    if (els.infoKidsTitle) els.infoKidsTitle.textContent = t.infoKidsTitle;
    if (els.infoKidsDesc) els.infoKidsDesc.textContent = t.infoKidsDesc;
    if (els.infoPetsTitle) els.infoPetsTitle.textContent = t.infoPetsTitle;
    if (els.infoPetsDesc) els.infoPetsDesc.textContent = t.infoPetsDesc;
    if (els.infoAccessTitle) els.infoAccessTitle.textContent = t.infoAccessTitle;
    if (els.infoAccessDesc) els.infoAccessDesc.textContent = t.infoAccessDesc;
    if (els.infoGroupTitle) els.infoGroupTitle.textContent = t.infoGroupTitle;
    if (els.infoGroupDesc) els.infoGroupDesc.textContent = t.infoGroupDesc;
    if (els.infoHoursTitle) els.infoHoursTitle.textContent = t.infoHoursTitle;
    if (els.infoHoursDesc) els.infoHoursDesc.textContent = t.infoHoursDesc;
    if (els.quickContactText) els.quickContactText.textContent = t.quickContact;
    if (els.callUsText) els.callUsText.textContent = t.callUs;

    // Steps & Form
    if (els.step1Title) els.step1Title.innerHTML = `<span class="step-num-badge">1</span> ${t.step1}`;
    if (els.step2Title) els.step2Title.innerHTML = `<span class="step-num-badge">2</span> ${t.step2}`;
    if (els.step3Title) els.step3Title.innerHTML = `<span class="step-num-badge">3</span> ${t.step3}`;
    if (els.step4Title) els.step4Title.innerHTML = `<span class="step-num-badge">4</span> ${t.step4}`;

    if (els.viewGridBtn) els.viewGridBtn.innerHTML = `<span>&#128065;</span> ${t.viewGrid}`;
    if (els.viewMapBtn) els.viewMapBtn.innerHTML = `<span>&#128506;</span> ${t.viewMap}`;

    if (els.legendFree) els.legendFree.textContent = t.free;
    if (els.legendReserved) els.legendReserved.textContent = t.reserved;
    if (els.legendSelected) els.legendSelected.textContent = t.selected;

    if (els.labelName) els.labelName.textContent = t.labelName;
    if (els.labelPhone) els.labelPhone.textContent = t.labelPhone;
    if (els.labelEmail) els.labelEmail.textContent = t.labelEmail;
    if (els.labelNotes) els.labelNotes.textContent = t.labelNotes;
    if (els.inputNotes) els.inputNotes.placeholder = t.placeholderNotes;

    if (els.sumDateLabel) els.sumDateLabel.textContent = t.sumDate;
    if (els.sumTimeLabel) els.sumTimeLabel.textContent = t.sumTime;
    if (els.sumGuestsLabel) els.sumGuestsLabel.textContent = t.sumGuests;
    if (els.sumTableLabel) els.sumTableLabel.textContent = t.sumTable;

    if (els.btnSubmit) els.btnSubmit.innerHTML = `<span>${t.btnSubmit}</span> <span style="font-size:18px;">&rarr;</span>`;
    if (els.systemFootnote) els.systemFootnote.textContent = t.systemFootnote;

    // Modals
    if (els.modalSuccessTitle) els.modalSuccessTitle.textContent = t.modalSuccessTitle;
    if (els.modalSuccessText) els.modalSuccessText.textContent = t.modalSuccessText;
    if (els.refCodeLabel) els.refCodeLabel.textContent = t.refCodeLabel;
    if (els.btnAddToCalendar) els.btnAddToCalendar.innerHTML = `<span>&#128197;</span> ${t.addToCalendar}`;
    if (els.btnPrintBooking) els.btnPrintBooking.innerHTML = `<span>&#128438;</span> ${t.printBooking}`;
    if (els.btnNewBooking) els.btnNewBooking.textContent = t.newBooking;
    if (els.myBookingsTitle) els.myBookingsTitle.textContent = t.myBookings;
  }

  // --- 9. Calendar Day Strip ---
  function renderMonthHeader() {
    const t = i18n[state.lang];
    const month = t.monthNames[state.viewMonthDate.getMonth()];
    const year = state.viewMonthDate.getFullYear();
    if (els.monthDisplay) {
      els.monthDisplay.textContent = `${month} ${year}`;
    }
  }

  function renderDaysStrip() {
    if (!els.daysStrip) return;
    els.daysStrip.innerHTML = '';
    const t = i18n[state.lang];

    // Build 7 selectable days starting from the viewing date
    const start = new Date(state.viewMonthDate);
    // Align with today if in current month
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 7; i++) {
      const dayDate = new Date(start);
      dayDate.setDate(start.getDate() + i);

      const dayDateISO = formatDateISO(dayDate);
      const dayOfWeekIdx = dayDate.getDay();
      const dayName = t.dayNames[dayOfWeekIdx];
      const dateNum = dayDate.getDate();

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'day-item-btn';
      if (dayDateISO === state.selectedDateStr) {
        btn.classList.add('active');
      }

      const isToday = formatDateISO(today) === dayDateISO;
      if (isToday) btn.classList.add('is-today');

      const isPast = dayDate < today;
      if (isPast) btn.classList.add('is-past');

      btn.innerHTML = `
        <span class="day-label">${dayName}</span>
        <span class="date-num">${dateNum}</span>
      `;

      btn.addEventListener('click', () => {
        state.selectedDateStr = dayDateISO;
        renderDaysStrip();
        renderTables();
        renderFloorMap();
        updateSummaryBox();
      });

      els.daysStrip.appendChild(btn);
    }
  }

  // --- 10. Guest Count Pills ---
  function renderGuestPills() {
    if (!els.guestPillsWrap) return;
    els.guestPillsWrap.innerHTML = '';
    const guestCounts = [1, 2, 3, 4, 5, 6, 8];

    guestCounts.forEach(count => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'guest-pill-btn';
      if (state.selectedGuests === count) btn.classList.add('active');

      const label = state.lang === 'de' 
        ? (count === 1 ? '1 Gast' : (count === 8 ? '7-8 Gäste' : `${count} Gäste`))
        : (count === 1 ? '1 Guest' : (count === 8 ? '7-8 Guests' : `${count} Guests`));

      btn.textContent = label;

      btn.addEventListener('click', () => {
        state.selectedGuests = count;
        renderGuestPills();
        renderTables();
        renderFloorMap();
        updateSummaryBox();
      });

      els.guestPillsWrap.appendChild(btn);
    });
  }

  // --- 11. Time Slot Categories & Slots (07:00 to 24:00) ---
  function renderTimeCategoryTabs() {
    if (!els.timeCatTabs) return;
    els.timeCatTabs.innerHTML = '';
    const t = i18n[state.lang];

    const categories = [
      { id: 'all', label: t.allTimes },
      { id: 'morning', label: t.morning },
      { id: 'lunch', label: t.lunch },
      { id: 'afternoon', label: t.afternoon },
      { id: 'dinner', label: t.dinner }
    ];

    categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'time-cat-btn';
      if (state.selectedTimeCat === cat.id) btn.classList.add('active');
      btn.textContent = cat.label;

      btn.addEventListener('click', () => {
        state.selectedTimeCat = cat.id;
        renderTimeCategoryTabs();
        renderTimeSlots();
      });

      els.timeCatTabs.appendChild(btn);
    });
  }

  function renderTimeSlots() {
    if (!els.timeSlotsGrid) return;
    els.timeSlotsGrid.innerHTML = '';

    const filtered = allTimeSlots.filter(s => {
      if (state.selectedTimeCat === 'all') return true;
      return s.cat === state.selectedTimeCat;
    });

    filtered.forEach(slot => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'time-slot-btn';
      if (state.selectedTime === slot.time) btn.classList.add('active');
      btn.textContent = slot.time;

      btn.addEventListener('click', () => {
        state.selectedTime = slot.time;
        renderTimeSlots();
        renderTables();
        renderFloorMap();
        updateSummaryBox();
      });

      els.timeSlotsGrid.appendChild(btn);
    });
  }

  // --- 12. 15 Tables Availability Logic ---
  function isTableBooked(tableId, dateStr, timeStr) {
    return state.bookings.some(b => b.tableId === tableId && b.date === dateStr && b.time === timeStr);
  }

  function renderTables() {
    if (!els.tablesGridView) return;
    els.tablesGridView.innerHTML = '';
    const t = i18n[state.lang];

    // Automatically auto-select an available matching table if none selected or if previously selected is booked
    if (state.selectedTableId) {
      if (isTableBooked(state.selectedTableId, state.selectedDateStr, state.selectedTime)) {
        state.selectedTableId = null;
      }
    }

    if (!state.selectedTableId) {
      // Find first available table that matches capacity
      const suitable = tablesDatabase.find(tbl => 
        !isTableBooked(tbl.id, state.selectedDateStr, state.selectedTime) && tbl.capacity >= state.selectedGuests
      ) || tablesDatabase.find(tbl => !isTableBooked(tbl.id, state.selectedDateStr, state.selectedTime));

      if (suitable) {
        state.selectedTableId = suitable.id;
      }
    }

    tablesDatabase.forEach(table => {
      const booked = isTableBooked(table.id, state.selectedDateStr, state.selectedTime);
      const isSelected = state.selectedTableId === table.id;
      const zone = state.lang === 'de' ? table.zoneDe : table.zoneEn;

      const card = document.createElement('div');
      card.className = 'table-card-item';
      if (booked) card.classList.add('is-reserved');
      if (isSelected && !booked) card.classList.add('active');

      const statusBadge = booked
        ? `<span class="table-status-badge reserved">&#10006; ${t.reserved}</span>`
        : (isSelected
          ? `<span class="table-status-badge selected">&#9733; ${t.selected}</span>`
          : `<span class="table-status-badge free">&#9679; ${t.free}</span>`);

      card.innerHTML = `
        <div>
          <div class="table-card-top">
            <span class="table-num">${table.num}</span>
            <span class="table-capacity-pill">${table.capacity} ${t.seats}</span>
          </div>
          <div class="table-location-name">${zone}</div>
        </div>
        <div>
          ${statusBadge}
        </div>
      `;

      if (!booked) {
        card.addEventListener('click', () => {
          state.selectedTableId = table.id;
          renderTables();
          renderFloorMap();
          updateSummaryBox();
        });
      }

      els.tablesGridView.appendChild(card);
    });

    if (els.tableFilterInfo) {
      const freeCount = tablesDatabase.filter(tbl => !isTableBooked(tbl.id, state.selectedDateStr, state.selectedTime)).length;
      els.tableFilterInfo.textContent = state.lang === 'de'
        ? `${freeCount} von 15 Tischen für diese Uhrzeit verfügbar`
        : `${freeCount} of 15 tables available for this timeslot`;
    }
  }

  // --- 13. Interactive SVG Floor Map ---
  function renderFloorMap() {
    if (!els.floorMapSvg) return;
    const t = i18n[state.lang];

    let svgHtml = `
      <!-- Background & Floor Boundaries -->
      <rect x="10" y="10" width="760" height="360" rx="14" fill="#1b2421" stroke="rgba(211,153,105,0.25)" stroke-width="2" />
      
      <!-- Zone Borders & Labels -->
      <!-- Window Front (Top) -->
      <line x1="20" y1="140" x2="760" y2="140" stroke="rgba(255,255,255,0.08)" stroke-dasharray="4,4" />
      <text x="30" y="32" fill="#d39969" font-size="11" font-weight="700" letter-spacing="1">🪟 ${state.lang === 'de' ? 'FENSTERFRONT & TERRASSE' : 'WINDOW & TERRACE'}</text>

      <!-- Center Hall -->
      <line x1="20" y1="260" x2="760" y2="260" stroke="rgba(255,255,255,0.08)" stroke-dasharray="4,4" />
      <text x="30" y="160" fill="#d39969" font-size="11" font-weight="700" letter-spacing="1">🍽️ ${state.lang === 'de' ? 'HAUPTSAAL & NISCHEN' : 'MAIN DINING & BOOTHS'}</text>

      <!-- Lower: Wintergarten & Chef Room -->
      <text x="30" y="278" fill="#d39969" font-size="11" font-weight="700" letter-spacing="1">🌿 ${state.lang === 'de' ? 'WINTERGARTEN & CHEF’S ROOM' : 'CONSERVATORY & CHEF ROOM'}</text>

      <!-- Entrance Indicator -->
      <rect x="710" y="330" width="50" height="30" rx="4" fill="#2d3a35" />
      <text x="735" y="350" fill="#8c9692" font-size="9" text-anchor="middle">${state.lang === 'de' ? 'EINGANG' : 'ENTRY'}</text>
    `;

    // Render Table Nodes
    tablesDatabase.forEach(table => {
      const booked = isTableBooked(table.id, state.selectedDateStr, state.selectedTime);
      const isSelected = state.selectedTableId === table.id;

      let fill = '#263430';
      let stroke = '#41524b';
      let textColor = '#ffffff';

      if (booked) {
        fill = '#382525';
        stroke = '#803838';
        textColor = '#d98b8b';
      } else if (isSelected) {
        fill = '#d39969';
        stroke = '#ffffff';
        textColor = '#16201d';
      }

      const groupClass = `map-table-node ${booked ? 'is-reserved' : ''} ${isSelected ? 'is-active' : ''}`;

      if (table.shape === 'round') {
        const radius = table.capacity > 4 ? 26 : 22;
        svgHtml += `
          <g class="${groupClass}" data-table-id="${table.id}">
            <circle cx="${table.x}" cy="${table.y}" r="${radius}" fill="${fill}" stroke="${stroke}" stroke-width="2" />
            <text x="${table.x}" y="${table.y - 2}" fill="${textColor}" font-size="10" font-weight="700" text-anchor="middle" dominant-baseline="middle">${table.num.replace('Tisch ', 'T')}</text>
            <text x="${table.x}" y="${table.y + 10}" fill="${textColor}" font-size="8" text-anchor="middle">${table.capacity}P</text>
          </g>
        `;
      } else {
        const width = table.capacity >= 8 ? 84 : (table.capacity >= 4 ? 54 : 38);
        const height = 40;
        svgHtml += `
          <g class="${groupClass}" data-table-id="${table.id}">
            <rect x="${table.x - width/2}" y="${table.y - height/2}" width="${width}" height="${height}" rx="8" fill="${fill}" stroke="${stroke}" stroke-width="2" />
            <text x="${table.x}" y="${table.y - 3}" fill="${textColor}" font-size="10" font-weight="700" text-anchor="middle" dominant-baseline="middle">${table.num.replace('Tisch ', 'T')}</text>
            <text x="${table.x}" y="${table.y + 11}" fill="${textColor}" font-size="8" text-anchor="middle">${table.capacity}P</text>
          </g>
        `;
      }
    });

    els.floorMapSvg.innerHTML = svgHtml;

    // Attach click events on SVG table nodes
    const nodes = els.floorMapSvg.querySelectorAll('.map-table-node:not(.is-reserved)');
    nodes.forEach(node => {
      node.addEventListener('click', () => {
        const id = parseInt(node.getAttribute('data-table-id'), 10);
        state.selectedTableId = id;
        renderTables();
        renderFloorMap();
        updateSummaryBox();
      });
    });
  }

  // --- 14. Real-time Summary Bar Update ---
  function updateSummaryBox() {
    if (els.sumDateVal) {
      els.sumDateVal.textContent = formatReadableDate(state.selectedDateStr);
    }
    if (els.sumTimeVal) {
      els.sumTimeVal.textContent = `${state.selectedTime} Uhr`;
    }
    if (els.sumGuestsVal) {
      const gLabel = state.lang === 'de' ? 'Gäste' : 'Guests';
      els.sumGuestsVal.textContent = `${state.selectedGuests} ${gLabel}`;
    }
    if (els.sumTableVal) {
      const table = tablesDatabase.find(t => t.id === state.selectedTableId);
      if (table) {
        const zone = state.lang === 'de' ? table.zoneDe : table.zoneEn;
        els.sumTableVal.textContent = `${table.num} (${zone})`;
      } else {
        els.sumTableVal.textContent = state.lang === 'de' ? 'Kein Tisch gewählt' : 'No table selected';
      }
    }
  }

  // --- 15. Form Submission & Booking Creation ---
  function handleBookingSubmit(e) {
    e.preventDefault();
    const t = i18n[state.lang];

    const name = els.inputName.value.trim();
    const phone = els.inputPhone.value.trim();
    const email = els.inputEmail.value.trim();
    const notes = els.inputNotes.value.trim();

    if (!name || !phone || !email) {
      alert(t.pleaseFillFields);
      return;
    }

    if (!state.selectedTableId) {
      alert(t.pleaseSelectTable);
      return;
    }

    const table = tablesDatabase.find(tbl => tbl.id === state.selectedTableId);
    if (!table) return;

    // Check availability again
    if (isTableBooked(table.id, state.selectedDateStr, state.selectedTime)) {
      alert(state.lang === 'de' 
        ? 'Dieser Tisch wurde soeben für die gewählte Uhrzeit belegt. Bitte wählen Sie einen anderen Tisch!'
        : 'This table has just been booked for this timeslot. Please choose another table!');
      renderTables();
      renderFloorMap();
      return;
    }

    // Generate unique reference code
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const bookingCode = `KSR-${randomSuffix}`;

    const newBooking = {
      id: bookingCode,
      date: state.selectedDateStr,
      time: state.selectedTime,
      tableId: table.id,
      tableNum: table.num,
      tableZone: state.lang === 'de' ? table.zoneDe : table.zoneEn,
      guests: state.selectedGuests,
      name: name,
      phone: phone,
      email: email,
      notes: notes,
      createdAt: new Date().toISOString()
    };

    state.bookings.push(newBooking);
    saveBookingsToStorage();

    // Show Confirmation Receipt Modal
    showConfirmationModal(newBooking);

    // Refresh UI
    renderTables();
    renderFloorMap();
  }

  // --- 16. Confirmation Modal & Calendar Export ---
  function showConfirmationModal(booking) {
    if (!els.modalSuccess) return;
    const t = i18n[state.lang];

    if (els.confirmBookingCode) els.confirmBookingCode.textContent = booking.id;
    if (els.receiptDate) els.receiptDate.textContent = formatReadableDate(booking.date);
    if (els.receiptTime) els.receiptTime.textContent = `${booking.time} Uhr`;
    if (els.receiptGuests) els.receiptGuests.textContent = `${booking.guests} ${state.lang === 'de' ? 'Personen' : 'Persons'}`;
    if (els.receiptTable) els.receiptTable.textContent = `${booking.tableNum} • ${booking.tableZone}`;
    if (els.receiptName) els.receiptName.textContent = booking.name;

    // Setup iCal Download
    if (els.btnAddToCalendar) {
      els.btnAddToCalendar.onclick = () => downloadIcsFile(booking);
    }

    // Setup Print
    if (els.btnPrintBooking) {
      els.btnPrintBooking.onclick = () => window.print();
    }

    els.modalSuccess.classList.add('open');
  }

  function downloadIcsFile(booking) {
    const parts = booking.date.split('-');
    const [h, m] = booking.time.split(':');
    const startObj = new Date(parts[0], parts[1] - 1, parts[2], h, m);
    const endObj = new Date(startObj.getTime() + 2 * 60 * 60 * 1000); // 2 hours duration

    const pad = (n) => String(n).padStart(2, '0');
    const formatICSDate = (d) => `${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Restaurant Kesar//Tischreservierung//DE',
      'BEGIN:VEVENT',
      `UID:${booking.id}@restaurantkesar.at`,
      `DTSTAMP:${formatICSDate(new Date())}Z`,
      `DTSTART:${formatICSDate(startObj)}`,
      `DTEND:${formatICSDate(endObj)}`,
      `SUMMARY:Tischreservierung Restaurant Kesar (${booking.tableNum})`,
      `DESCRIPTION:Reservierung ${booking.id} für ${booking.name} (${booking.guests} Gäste) an ${booking.tableNum}.`,
      'LOCATION:Restaurant Kesar, Heidenreichsteinerstraße 28, 3830 Waidhofen an der Thaya',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `Reservierung_Kesar_${booking.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // --- 17. "My Bookings" Drawer/Modal ---
  function openMyBookingsModal() {
    if (!els.modalMyBookings || !els.myBookingsList) return;
    const t = i18n[state.lang];
    els.myBookingsList.innerHTML = '';

    if (state.bookings.length === 0) {
      els.myBookingsList.innerHTML = `
        <div style="text-align:center; padding:30px 10px; color:#8c9692;">
          <div style="font-size:32px; margin-bottom:8px;">&#128197;</div>
          <p>${t.noBookingsYet}</p>
        </div>
      `;
    } else {
      state.bookings.forEach((item, idx) => {
        const itemCard = document.createElement('div');
        itemCard.className = 'booking-item-card';
        itemCard.innerHTML = `
          <div>
            <div style="font-weight:700; color:#17201d; font-size:14px; margin-bottom:2px;">
              ${item.id} &bull; ${item.tableNum}
            </div>
            <div style="font-size:12.5px; color:#5a6460;">
              ${formatReadableDate(item.date)} um ${item.time} Uhr &bull; ${item.guests} ${state.lang === 'de' ? 'Gäste' : 'Guests'}
            </div>
            <div style="font-size:11.5px; color:#8c9692;">
              ${item.name} (${item.phone})
            </div>
          </div>
          <div>
            <button type="button" class="btn-cancel-booking" data-idx="${idx}">
              ${t.cancelBookingBtn}
            </button>
          </div>
        `;

        const cancelBtn = itemCard.querySelector('.btn-cancel-booking');
        cancelBtn.addEventListener('click', () => {
          if (confirm(state.lang === 'de' ? 'Möchten Sie diese Reservierung wirklich stornieren?' : 'Do you really want to cancel this reservation?')) {
            state.bookings.splice(idx, 1);
            saveBookingsToStorage();
            openMyBookingsModal();
            renderTables();
            renderFloorMap();
            updateSummaryBox();
          }
        });

        els.myBookingsList.appendChild(itemCard);
      });
    }

    els.modalMyBookings.classList.add('open');
  }

  function updateMyBookingsBadge() {
    if (els.bookingsCountBadge) {
      els.bookingsCountBadge.textContent = state.bookings.length;
    }
  }

  // --- 18. Event Listeners ---
  function attachEventListeners() {
    // Language Switch
    if (els.langToggle) {
      els.langToggle.addEventListener('click', () => {
        state.lang = state.lang === 'de' ? 'en' : 'de';
        renderStaticTexts();
        renderMonthHeader();
        renderDaysStrip();
        renderGuestPills();
        renderTimeCategoryTabs();
        renderTimeSlots();
        renderTables();
        renderFloorMap();
        updateSummaryBox();
      });
    }

    // Month Navigation
    if (els.btnPrevMonth) {
      els.btnPrevMonth.addEventListener('click', () => {
        state.viewMonthDate.setDate(state.viewMonthDate.getDate() - 7);
        renderMonthHeader();
        renderDaysStrip();
      });
    }

    if (els.btnNextMonth) {
      els.btnNextMonth.addEventListener('click', () => {
        state.viewMonthDate.setDate(state.viewMonthDate.getDate() + 7);
        renderMonthHeader();
        renderDaysStrip();
      });
    }

    // Toggle Experience More/Less
    if (els.btnToggleExp && els.expMore) {
      els.btnToggleExp.addEventListener('click', () => {
        const isExp = els.expMore.classList.toggle('expanded');
        const t = i18n[state.lang];
        els.btnToggleExp.textContent = isExp ? t.lessBtn : t.moreBtn;
      });
    }

    // View Switcher (Grid vs Floor Map)
    if (els.viewGridBtn && els.viewMapBtn && els.tablesGridView && els.floorMapView) {
      els.viewGridBtn.addEventListener('click', () => {
        state.activeView = 'grid';
        els.viewGridBtn.classList.add('active');
        els.viewMapBtn.classList.remove('active');
        els.tablesGridView.classList.remove('hidden-view');
        els.floorMapView.classList.remove('active-view');
      });

      els.viewMapBtn.addEventListener('click', () => {
        state.activeView = 'map';
        els.viewMapBtn.classList.add('active');
        els.viewGridBtn.classList.remove('active');
        els.tablesGridView.classList.add('hidden-view');
        els.floorMapView.classList.add('active-view');
        renderFloorMap();
      });
    }

    // Form submit
    if (els.formCustomer) {
      els.formCustomer.addEventListener('submit', handleBookingSubmit);
    }

    // Modals
    if (els.btnModalCloseSuccess && els.modalSuccess) {
      els.btnModalCloseSuccess.addEventListener('click', () => {
        els.modalSuccess.classList.remove('open');
      });
    }

    if (els.btnNewBooking && els.modalSuccess) {
      els.btnNewBooking.addEventListener('click', () => {
        els.modalSuccess.classList.remove('open');
        els.formCustomer.reset();
      });
    }

    if (els.btnMyBookings) {
      els.btnMyBookings.addEventListener('click', openMyBookingsModal);
    }

    if (els.btnModalCloseBookings && els.modalMyBookings) {
      els.btnModalCloseBookings.addEventListener('click', () => {
        els.modalMyBookings.classList.remove('open');
      });
    }

    // Close modal on click outside
    window.addEventListener('click', (e) => {
      if (e.target === els.modalSuccess) els.modalSuccess.classList.remove('open');
      if (e.target === els.modalMyBookings) els.modalMyBookings.classList.remove('open');
    });
  }

  // Run on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
