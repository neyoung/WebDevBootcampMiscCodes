delayedColorChange = (newColor, delay) => {
	return new Promise((resolve, reject) => {
        setTimeout(() => {
            document.body.style.backgroundColor = newColor;
            resolve('Yay! ' + newColor);
        }, delay);
    })
}

// delayedColorChange('red', 1000)
//     .then((data) => {
//         console.log(data);
//         return delayedColorChange('orange', 1000)
//     })
//     .then((data) => {
//         console.log(data);
//         return delayedColorChange('yellow', 1000)
//     })
//     .then((data) => {
//         console.log(data);
//         return delayedColorChange('green', 1000)

//     })
//     .then((data) => {
//         console.log(data);
//         return delayedColorChange('blue', 1000)

//     })
//     .then((data) => {        
//         console.log(data);
//         return delayedColorChange('indigo', 1000)

//     })
//     .then((data) => {
//         console.log(data);
//         return delayedColorChange('violet', 1000)
//     })
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((error) => {
//         console.log(error);
//     });

// delayedColorChange('red', 1000)
//     .then((data) => delayedColorChange('orange', 1000))
//     .then((data) => delayedColorChange('yellow', 1000))
//     .then((data) => delayedColorChange('green', 1000))
//     .then((data) => delayedColorChange('blue', 1000))
//     .then((data) => delayedColorChange('indigo', 1000))
//     .then((data) => delayedColorChange('violet', 1000))

// delayedColorChange = (newColor, delay) => {
//     setTimeout(() => {
//         document.body.style.backgroundColor = newColor;
//     }, delay)
// }
let resolveMsg;
async function rainbow () {
    resolveMsg = await delayedColorChange('red', 1000);
    await delayedColorChange('orange', 2000);
    await delayedColorChange('yellow', 3000);
    await delayedColorChange('green', 1000);
    await delayedColorChange('blue', 1000);
    await delayedColorChange('indigo', 1000);
    await delayedColorChange('violet', 1000);
}

rainbow();


