import axios from "axios";


export default class SearchPhotos {
    constructor() { 
        this.searchQuery = '';
        this.page = 1;
        this.totalPage = 0;
    }

    search = async function () {
    const USER_KEY = 'key=29229306-2ad532334a119922b9cb31e3e';
    const BASE_URL = 'https://pixabay.com/api/'
    const PARAMS = `image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
    try {
        const photos = await axios.get(`${BASE_URL}?${USER_KEY}&q=${this.searchQuery}&${PARAMS}`);
        if (photos.data.totalHits === 0) { throw new Error; }
        this.totalPage = Math.ceil(photos.data.totalHits / 40);
        this.page += 1;
        return photos;
    } catch (error) {
        return console.error(error);
    }
    }

    resetPage() { 
        this.page = 1;
    }
    
    get query() { 
        return this.searchQuery;
    }

    set query(newQuery) { 
        this.searchQuery = newQuery;
    }
 }
