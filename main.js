let c = document.getElementById("myCanvas")
let ctx = c.getContext("2d")

let loadImage = (src, callback) => {
  let img = document.createElement("img")
  img.onload = () => callback(img)
  img.src = src
}

let imagePath = (frameNumber, animation) => {
  console.log("images/" + animation + "/" + frameNumber + ".png")
  return "images/" + animation + "/" + frameNumber + ".png"
}

let frames = {
  idle: [1, 2, 3, 4, 5, 6, 7, 8],
  kick: [1, 2, 3, 4, 5, 6, 7],
  punch: [1, 2, 3, 4, 5, 6, 7],
  backward: [1, 2, 3, 4, 5, 6],
  block: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  forward: [1, 2, 3, 4, 5, 6],
}

let loadImages = (callback) => {
  //calls back with array of loaded images

  let imageToLoad = 0
  let images = {
    idle: [],
    kick: [],
    punch: [],
    backward: [],
    block: [],
    forward: [],
  }

  let ar = ["idle", "kick", "punch", "backward", "block", "forward"]
  ar.forEach((animation) => {
    let animationFrames = frames[animation]
    imageToLoad += animationFrames.length

    animationFrames.forEach((frameNumber) => {
      let path = imagePath(frameNumber, animation)

      loadImage(path, (image) => {
        images[animation][frameNumber - 1] = image
        imageToLoad--

        if (imageToLoad === 0) {
          callback(images)
        }
      })
    })
  })
}

let animate = (ctx, images, animation, callback) => {
  console.log(animation)
  images[animation].forEach((image, index) => {
    setTimeout(() => {
      ctx.clearRect(0, 0, 550, 550)
      ctx.drawImage(image, 0, 0, 200, 150)
    }, index * 100)
  })

  setTimeout(callback, images[animation].length * 100)
}

loadImages((images) => {
  let queuedAnimations = []

  let aux = () => {
    let selected

    if (queuedAnimations.length == 0) {
      selected = "idle"
    } else {
      selected = queuedAnimations.shift()
    }
    animate(ctx, images, selected, aux)
  }
  aux()

  document.addEventListener("keyup", (event) => {
    const key = event.key

    if (key == "ArrowLeft") {
      queuedAnimations.push("backward")
    } else if (key == "ArrowRight") {
      queuedAnimations.push("forward")
    } else if (key == "p") {
      queuedAnimations.push("punch")
    } else if (key == "k") {
      queuedAnimations.push("kick")
    } else if (key == "b") {
      queuedAnimations.push("block")
    }
  })
})
