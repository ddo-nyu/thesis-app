function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}

async function main() {
    const wrapper = document.querySelector('.wrapper');
    const photos = await fetchPhotos();
    photos.splice(0, 10).reverse().forEach(photo => {
        const photoUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
        // You can do something with each photo URL here, such as displaying them on a webpage
        const photoDiv = document.createElement('div');
        photoDiv.classList.add('photo');
        const img = document.createElement('img');
        img.src = photoUrl;
        photoDiv.appendChild(img);
        wrapper.appendChild(photoDiv);
    });
    addAnimationTimeline();
}

function addAnimationTimeline() {
    // gsap.registerPlugin(ScrollTrigger);
    const tl = gsap.timeline({});
    gsap.set('.photo', {
        opacity: 0,
        x: (i, el) => (window.innerWidth / 2) - (el.clientWidth / 2),
        y: (i, el) => (window.innerHeight / 2) - (el.clientHeight / 2),
    });
    tl.to('.header', {
        opacity: 1,
        delay: 1,
    });
    tl.to('.header', {
        y: (i, el) => window.innerHeight - el.clientHeight - 40,
        color: '#F2F0EC',
        duration: 2,
        ease: "power4.out",
        delay: 1,
    });
    tl.to('.photo', {
        opacity: 1,
        duration: 0.3,
    })
    tl.to('.photo', {
        rotate: () => randomIntFromInterval(-10, 10),
        duration: 1,
        delay: 1,
    });
    tl.to('.photo', {
        x: (i, el) => randomIntFromInterval(0, window.innerWidth - (el.clientWidth)),
        y: (i, el) => randomIntFromInterval(0, window.innerHeight - (el.clientHeight)),
        duration: 2,
        ease: "power4.out"
    });

    const photos = document.querySelectorAll('.photo');
    photos.forEach((photo, i) => {
        photo.addEventListener('mouseover', () => {
            gsap.to(photo, {
                zIndex: 1,
                x: () => '+=' + randomIntFromInterval(-30, 30),
                y: () => '+=' + randomIntFromInterval(-30, 30),
                duration: 0.3,
            });
        });
        photo.addEventListener('mouseout', () => {
            gsap.to(photo, {
                zIndex: 0,
                duration: 0.5,
            });
        });
    });

    Draggable.create('.photo', {
        throwProps: true,
    });

}

function animateMouseMovement() {
    let prevX = 0, prevY = 0;
    window.addEventListener("mousemove", (e) => {
        gsap.to('.photo', {
            duration: 20,
            overwrite: "auto",
            // x: prevX <= e.clientX ? '+=50' : '-=50',
            // y: prevY <= e.clientY ? '+=50' : '-=50',
            x: e.screenX,
            y: e.screenY,
            // stagger: 0.3,
            ease: "none"
        });
        prevX = e.clientX
        prevY = e.clientY
    });
}

function openFullscreen() {
    const elem = document.querySelector("body");
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
}

window.onload = function () {
    main();
    window.addEventListener('dblclick', () => openFullscreen());
}

