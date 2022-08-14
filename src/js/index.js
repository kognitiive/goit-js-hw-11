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
loadMore.classList.add('visually-hidden')
gallery.addEventListener('click', event => {
    event.preventDefault();
})


async function onSearch(event) {
    event.preventDefault();

    if (loadMore.classList.contains('visually-hidden') === false) { 
        loadMore.classList.add('visually-hidden')
    }
    gallery.innerHTML = '';
    searchPhotos.query = event.currentTarget.elements.searchQuery.value;
    searchPhotos.resetPage();

    if (searchPhotos.query.trim() === "") {
        return Notify.warning("Please fill in all the fields!");
    }

    try {
        const data = await searchPhotos.search()
        if (!data) { return Notify.failure("Sorry, there are no images matching your search query. Please try again.") }
        const cards = await makeMarkup(data)
        gallery.insertAdjacentHTML('beforeend', cards)
        
        if (data.data.totalHits >= 40) { 
            loadMore.classList.remove('visually-hidden')
        }
        Notify.info(`Hooray! We found ${data.data.totalHits} images.`)
        let lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 })
    } catch (error) {
        return console.error(error);
    }
}

async function onLoadMore() { 
    try {
        const data = await searchPhotos.search()
        if (!data) { return Notify.failure("Sorry, there are no images matching your search query. Please try again.") }
        if (searchPhotos.page > searchPhotos.totalPage) {
            loadMore.classList.add('visually-hidden')
            return Notify.info("We're sorry, but you've reached the end of search results.")}
        const cards = await makeMarkup(data)
        gallery.insertAdjacentHTML('beforeend', cards)
        let lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 })
        lightbox.refresh();
    } catch (error) {
        return console.error(error);
    }
}