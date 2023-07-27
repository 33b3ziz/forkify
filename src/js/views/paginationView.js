import View from './View.js';
import icons from 'url:../../img/icons.svg'; // parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);
    // page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButton(1);
    }
    // last page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButton(-1);
    }
    // other page
    if (curPage < numPages) {
      return `${this._generateMarkupButton(-1)}
      ${this._generateMarkupButton(1)}`;
    }

    // page 1, and there are NO other pages
    return '';
  }

  _generateMarkupButton(num) {
    const curPage = this._data.page;
    const typeButton = num === 1 ? 'next' : 'prev';
    const arrow = num === 1 ? 'right' : 'left';
    return `
    <button data-goto="${
      curPage + num
    }" class="btn--inline pagination__btn--${typeButton}">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-${arrow}"></use>
      </svg>
      <span>Page ${curPage + num}</span>
    </button>
    `;
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      console.log(btn);
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }
}

export default new PaginationView();
