import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { searchPhotos } from './searchPhotos';
import { makeMarkup } from './makeMarkup';

const form = document.querySelector('#search-form')
const gallery = document.querySelector('.gallery')

form.addEventListener("submit", handleSubmit);

async function handleSubmit(event) {
    event.preventDefault();
    gallery.innerHTML = '';
    const {
        elements: {searchQuery}
    } = event.currentTarget;

    if (searchQuery.value === "") {
        return Notify.warning("Please fill in all the fields!");
    }
    try {
        const data = await searchPhotos(searchQuery.value)
        console.log(data)
        const cards = await makeMarkup(data)
        gallery.insertAdjacentHTML('beforeend', cards)
    } catch (error) {
        return console.error(error);
    }
}