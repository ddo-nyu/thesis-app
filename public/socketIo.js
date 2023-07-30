const socket = io();

// client-side
socket.on("connect", () => {
    console.log(socket.connected); // true
});

socket.on("disconnect", () => {
    console.log(socket.connected); // false
});

socket.on("image uploaded", () => {
  console.log('image uploaded');
  setTimeout(() => {
    const wrapper = document.querySelector('.wrapper');
    wrapper.innerHTML = '';
    main();
  }, 3000);
  
});