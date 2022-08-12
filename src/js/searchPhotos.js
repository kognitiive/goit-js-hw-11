export { searchPhotos };
import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const USER_KEY = 'key=29229306-2ad532334a119922b9cb31e3e';
const BASE_URL = 'https://pixabay.com/api/'
const PARAMS = 'image_type=photo&orientation=horizontal&safesearch=true'

const searchPhotos = async function (query) {
    try {
        const photos = await axios.get(`${BASE_URL}?${USER_KEY}&q=${query}&${PARAMS}`);
        if (photos.data.hits.length === 0) {return Notify.failure("Sorry, there are no images matching your search query. Please try again.")}
        return photos;
    } catch (error) {
        return console.error(error);
    }
}