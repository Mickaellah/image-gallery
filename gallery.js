function Gallery(gallery) {
    if (!gallery) {
        throw Error('No gallery found');
    }
    const images = Array.from(gallery.querySelectorAll('img'));
    const modal = document.querySelector('.modal');
    const prevButton = modal.querySelector('.prev');
    const nextButton = modal.querySelector('.next');

    let currentImage;

    function handleCLickOutside(e) {
        if (e.currentTarget === e.target) {
            closeModal();
        }
    }

    function openModal() {
        console.info('opeaning modal.....');
        if (modal.matches('.open')) {
            console.info('Modal already open');
            return; // Stop the function from running.
        }
        modal.classList.add('open');

        // Event listener to be bound when we 
        window.addEventListener('keyup', handleKeyUp);
        nextButton.addEventListener('click', showNextImage);
        modal.addEventListener('click', handleCLickOutside);
        prevButton.addEventListener('click', showPrevImage);
    }

    function closeModal() {
        modal.classList.remove('open');
        // TODO: add event listener to listen for the click.
        window.removeEventListener('keyup', handleKeyUp);
        nextButton.removeEventListener('click', showNextImage);
        modal.removeEventListener('click', handleCLickOutside);
        prevButton.removeEventListener('click', showPrevImage);
    }

    function showNextImage() {
        showImage(currentImage.nextElementSibling || gallery.firstElementChild);
    }

    function showPrevImage() {
        showImage(currentImage.previousElementSibling || gallery.lastElementChild);
    }


    function handleKeyUp(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
        if (e.key === 'ArrowRight') {
            showNextImage();
        }
        if (e.key === 'ArrowLeft') {
            showPrevImage();
        }
    }

    function showImage(el) {
        if (!el) {
            console.info('no image to show');
            return;
        }
        console.log(el);
        modal.querySelector('img').src = el.src;
        modal.querySelector('h2').textContent = el.title;
        modal.querySelector('figure p').textContent = el.dataset.description;
        currentImage = el;
        openModal();
    }

    images.forEach(image => {
        image.addEventListener('click', e => showImage(e.currentTarget));
    });
    // Loop over each image.
    images.forEach(image => {
        image.addEventListener('keyup', e => {
            if (e.key === 'Enter') {
                showImage(e.currentTarget);
        }
    });
});

}
const gallery1 = Gallery(document.querySelector('.gallery1'));
const gallery2 = Gallery(document.querySelector('.gallery2'));
const gallery3 = Gallery(document.querySelector('.gallery3'));
