if ('NodeList' in window && !NodeList.prototype.forEach) {
  console.info('polyfill for IE11');
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;
    for (let i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

(function () {
  const images = document.querySelectorAll('.lazy-image');

  const options = {
    rootMargin: '50px 0px',
    threshold: 0.01
  }


  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          const { target } = entry;
          const { src } = target.dataset;


          target.src = src;
          target.onload = () => {
            target.classList.add('loaded');
          }
          io.unobserve(target);

        }
      })
    }, options);

    images.forEach(image => {
      io.observe(image)
    })

  } else {
    images.forEach(image => {
      const src = image.dataset.src;
      image.src = src;
      image.classList.add('loaded')
    })
  }

  console.log('Lazyload is ready')
})();

(function () {

  const animated = document.querySelectorAll('.animated');

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          entry.target.classList.add('active');
        }
      })
    })

    animated.forEach(a => {
      io.observe(a);
    })

  }

  console.log('Animated is ready');

})();