import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import SearchPhotos from './searchPhotos';
import { makeMarkup } from './makeMarkup';

const form = document.querySelector('#search-form')
const gallery = document.querySelector('.gallery')
const searchPhotos = new SearchPhotos();
const loadMore = document.querySelector('.load-more');

form.addEventListener("submit", onSearch);
loadMore.addEventListener('click', onLoadMore)

async function onSearch(event) {
    event.preventDefault();
    gallery.innerHTML = '';
    searchPhotos.query = event.currentTarget.elements.searchQuery.value;
    searchPhotos.resetPage();

    if (searchPhotos.query === "") {
        return Notify.warning("Please fill in all the fields!");
    }
    try {
        const data = await searchPhotos.search()
        if (!data) {return Notify.failure("Sorry, there are no images matching your search query. Please try again.")}
        const cards = await makeMarkup(data)
        gallery.insertAdjacentHTML('beforeend', cards)
    } catch (error) {
        return console.error(error);
    }
}

async function onLoadMore() { 
    try {
        const data = await searchPhotos.search()
        if (!data) {return Notify.failure("Sorry, there are no images matching your search query. Please try again.")}
        const cards = await makeMarkup(data)
        gallery.insertAdjacentHTML('beforeend', cards)
    } catch (error) {
        return console.error(error);
    }
}