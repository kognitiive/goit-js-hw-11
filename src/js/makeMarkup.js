export { makeMarkup }

async function makeMarkup(photos) {
    return cards = photos.data.hits.map((card) => {
        const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = card;
        return `<a class="gallery__item" href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" class="gallery__image"/>
            <div class="info">
                <p class="info-item">
                    <b>Likes ${likes}</b>
                </p>
                <p class="info-item">
                <b>Views ${views}</b>
                </p>
                <p class="info-item">
                <b>Comments ${comments}</b>
                </p>
                <p class="info-item">
                <b>Downloads ${downloads}</b>
                </p>
            </div>
        </a>`}).join('');
}
