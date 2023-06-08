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
    
    try {
        const { data } = await pixabayAPI.fetchPixabay()
    
        if (data.totalHits === 0) {
            gallery.innerHTML = '';
            loadMoreBtn.classList.add('is-hidden')
            Notiflix.failure('Sorry, there are no images matching your search query. Please try again.'
      );
                return
            }
        if (data.totalHits !== 1) {
            loadMoreBtn.classList.remove('is-hidden')
        }
            
        gallery.innerHTML = createImgCards(data.hits);
        Notiflix.success(`Hooray! We found ${data.totalHits} images.`);
        new SimpleLightbox('.gallery a', {captions: true, captionDelay: 250});
        
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
            
        if (pixabayAPI.page === data.totalHits) {
                loadMoreBtn.classList.add('is-hidden')
            }
        
    } catch (err) {
        console.log(err);
        
    }
    
}

searchFormEl.addEventListener('submit', onSearchFormEl)
loadMoreBtn.addEventListener('click', onLoadMore)