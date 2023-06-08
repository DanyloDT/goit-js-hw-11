import { PixabayAPI } from './pixabay-api'
import { createImgCards } from './photo-card'
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const searchFormEl = document.querySelector('.search-form')
const gallery = document.querySelector('.gallery')
const loadMoreBtn = document.querySelector('.load-more-btn')

const pixabayAPI = new PixabayAPI()

 
const onSearchFormEl = async event => {
    event.preventDefault()
    pixabayAPI.page = 1;
    pixabayAPI.query = event.target.elements.searchQuery.value.trim();

    // if (pixabayAPI.query === "") {
    //     return
    // }
    
    try {
        const { data } = await pixabayAPI.fetchPixabay()
       
    
        if (data.totalHits === 0 || pixabayAPI.query === "") {
            loadMoreBtn.classList.add('is-hidden')
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            return    
        }
            
        if (data.totalHits <= 40 ) {
            loadMoreBtn.classList.add('is-hidden')

        }
        
        if (data.totalHits > 40) {
            loadMoreBtn.classList.remove('is-hidden')
        }
        gallery.innerHTML = createImgCards(data.hits);
        
        new SimpleLightbox('.gallery a', {captions: true, captionDelay: 250});
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
        

    } catch (err) {
        console.log(err);
        
    }
       
}

const onLoadMore = async () => {
    pixabayAPI.page += 1;
     
    try {
        const { data } = await pixabayAPI.fetchPixabay()
        
        gallery.insertAdjacentHTML('beforeend', createImgCards(data.hits));
        new SimpleLightbox('.gallery a', {captions: true, captionDelay: 250}).refresh()
            
             
        if (pixabayAPI.page * pixabayAPI.perPage >= data.totalHits) {
            loadMoreBtn.classList.add('is-hidden')
            Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
            return
        }
        
    } catch (err) {
        console.log(err);
        
    }
    
}

searchFormEl.addEventListener('submit', onSearchFormEl)
loadMoreBtn.addEventListener('click', onLoadMore)