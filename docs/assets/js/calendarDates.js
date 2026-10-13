(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const localeMap = { kr: 'ko-KR', ko: 'ko-KR', en: 'en-US', es: 'es-ES' };
    const locale = localeMap[document.documentElement.lang] || 'en-US';
    document.querySelectorAll('[data-calendar-date]').forEach(element => {
      const value = element.dataset.calendarDate;
      if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return;
      // Publication dates keep their calendar day in every reader's time zone.
      const date = new Date(value + 'T00:00:00Z');
      element.textContent = date.toLocaleDateString(locale, {
        year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC'
      });
    });
  });
})();
