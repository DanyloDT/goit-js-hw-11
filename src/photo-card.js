// {/* <div class="photo-card">
//   <img src="" alt="" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>Likes</b>
//     </p>
//     <p class="info-item">
//       <b>Views</b>
//     </p>
//     <p class="info-item">
//       <b>Comments</b>
//     </p>
//     <p class="info-item">
//       <b>Downloads</b>
//     </p>
//   </div>
// </div> */}


export const createImgCards  = imgCards => {
    const imgCardsEl = imgCards.map(imgCard => {
        return `<a class="photo-card" href="${imgCard.largeImageURL}">
        <img src="${imgCard.webformatURL}" alt="${imgCard.tags}" loading="lazy" />
        <div class="info">
            <p class="info-item">
                <b>Likes</b>
                <span>${imgCard.likes}</span>
            </p>
            <p class="info-item">
                <b>Views</b>
                <span>${imgCard.views}</span>
            </p>
            <p class="info-item">
                <b>Comments</b>
                <span>${imgCard.comments}</span>
            </p>
            <p class="info-item">
                <b>Downloads</b>
                <span>${imgCard.downloads}</span>
            </p>
        </div>
    </a>`;
    })

  return imgCardsEl.join('');
};